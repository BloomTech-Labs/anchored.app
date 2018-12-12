const express = require('express');

const docusign = require('docusign-esign');

const {
  ensureAuthenticated,
  getDSApi,
} = require('../auth/docusign/dsMiddleware');
const {
  checkToken,
  checkExpiration,
  getEnvelopes,
  getEnvelopesList,
  postEnvToDB,
} = require('./envsMiddleware');
const { getDocuments, postDoctoDB } = require('../documents/docsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

// Gets all of the users envelopes from docusign / adds them to the DB
router.get('/all', checkToken, checkExpiration, async (req, res, next) => {
  const user = req.user;
  const apiClient = getDSApi(user);
  const envelopesApi = new docusign.EnvelopesApi(apiClient);
  const account_id = user.account_id;

  try {
    let envelopesList = await getEnvelopesList(envelopesApi, account_id);
    let envelopes = await getEnvelopes(envelopesApi, account_id, envelopesList);
    let documents = await getDocuments(envelopesApi, account_id, envelopesList);

    await postDoctoDB(req, res, documents);
    await postEnvToDB(req, res, envelopes);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
