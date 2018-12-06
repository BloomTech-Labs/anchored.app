const express = require('express');

const users = require('../users/usersModel');
const envs = require('../envelopes/envelopesModel');
const docs = require('../documents/documentsModel');

const moment = require('moment');
const { proofDocuments } = require('./chainpointMiddleware');
const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await users.findByUserId(req.user.id);

  if (user.credits <= 0) {
    return res.status(400).json({ message: 'No credits available' });
  }

  try {
    const env = await envs.findById(id);
    const loading_expiration = JSON.stringify(moment().add(60, 's'));
    const expired = moment().isAfter(JSON.parse(env.loading_expiration));

    if (env.loading && !expired) {
      return res.status(400).json({ message: 'Loading!' });
    } else if (env.loading && expired) {
      await envs.updateEnv(id, { loading: false, loading_expiration: 0 });
      await users.incrementCredit(req.user.id, 1);
      ++req.user.credits;
      req.session.save();
    }

    if (env.status !== 'completed') {
      return res.status(400).json({ message: 'Documents not signed!' });
    }

    if (env.verified) {
      return res.status(400).json({ message: 'Document already verified!' });
    }

    if (env.waiting) {
      return res.status(400).json({ message: 'Waiting for anchor!' });
    }

    await envs.updateEnv(id, { loading: true, loading_expiration });
    await users.decrementCredit(req.user.id);

    --req.user.credits;
    req.session.save();

    const documents = await docs.findbyEnvelopeId(env.envelope_id);
    await proofDocuments(req, res, documents, env.id);
  } catch (err) {
    await users.incrementCredit(req.user.id, 1);
    await envs.updateEnv(id, {
      verified_proof: null,
      proof_handle: null,
      loading: 0,
      verified: 0,
      waiting: 0,
      waiting_expiration: 0,
      loading_expiration: 0,
    });
    ++req.user.credits;
    req.session.save();
    return res.status(500).json({ ErrorMessage: err.message, id });
  }
});

router.get('/:id/loading', async (req, res) => {
  const { id } = req.params;

  try {
    const envelope = await envs.findById(id);
    const expired = moment().isAfter(JSON.parse(envelope.loading_expiration));

    if (expired && envelope.loading) {
      await envs.updateEnv(id, { loading: false, loading_expiration: 0 });
      await users.incrementCredit(req.user.id, 1);
      ++req.user.credits;
      req.session.save();
    }

    return res
      .status(200)
      .json({ loading: envelope.loading, waiting: envelope.waiting });
  } catch (err) {
    return res.status(500).json({ ErrorMessage: err.message, id });
  }
});

module.exports = router;
