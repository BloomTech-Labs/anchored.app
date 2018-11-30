const express = require('express');

const envs = require('../envelopes/envelopesModel');
const docusign = require('docusign-esign');
const moment = require('moment');
const { getDSApi } = require('../auth/docusign/dsMiddleware');
const { getDocuments, postDoctoDB } = require('../documents/docsMiddleware');
const { proofDocuments } = require('./chainpointMiddleware');
const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = req.user;
  const apiClient = getDSApi(user);
  const envelopesApi = new docusign.EnvelopesApi(apiClient);
  const account_id = user.account_id;

  envs
    .findById(id)
    .then(async env => {
      const loading_expiration = JSON.stringify(moment().add(60, 's'));
      const expired = moment().isAfter(JSON.parse(env.loading_expiration));
      if (env.loading && !expired) {
        return res.status(400).json({ message: 'Loading!' });
      } else if (env.loading && expired) {
        await envs.updateEnv(id, { loading: false, loading_expiration: 0 });
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

      const documents = await getDocuments(
        envelopesApi,
        account_id,
        env.envelope_id
      );

      postDoctoDB(req, res, documents);
      proofDocuments(req, res, documents, env.id);
    })
    .catch(async err => {
      // Reset env if a fail occurred
      await envs.updateEnv(id, {
        verified_proof: null,
        proof_handle: null,
        loading: 0,
        verified: 0,
        waiting: 0,
        waiting_expiration: 0,
        loading_expiration: 0,
      });
      return res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
