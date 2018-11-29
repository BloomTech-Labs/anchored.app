const express = require('express');

const envs = require('../envelopes/envelopesModel');
const docusign = require('docusign-esign');
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
      if (env.status !== 'completed') {
        return res.status(400).json({ message: 'Documents not signed!' });
      }

      if (env.verified) {
        return res.status(400).json({ message: 'Document already verified!' });
      }

      if (env.waiting) {
        return res.status(400).json({ message: 'Waiting for anchor!' });
      }

      const documents = await getDocuments(
        envelopesApi,
        account_id,
        env.envelope_id
      );

      await postDoctoDB(req, res, documents);
      await proofDocuments(req, res, documents, env.id);

      return res.status(200).json({ id: env.id });
    })
    .catch(err => res.status(500).json({ ErrorMessage: err.message }));
});

router.get('/');

module.exports = router;
