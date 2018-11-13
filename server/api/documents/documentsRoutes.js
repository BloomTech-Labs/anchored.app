const express = require('express');

const docs = require('./documentsModel.js');
const users = require('../users/usersModel');

const docusign = require('docusign-esign');
const moment = require('moment');
const { promisify } = require('util');

const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

function checkExpiration(req, res, next) {
  let current_time = new Date().getTime();

  if (current_time > Number(req.user.document_expiration)) {
    req.user = new Date().getTime() + 15 * 60 * 1000;
    req.session.save();
    users.updateUser(req.user.id, req.user).catch(err => console.log(err));
    return next();
  }

  return res.status(400).json({ error: '15 minutes not up' });
}

function checkToken(req, res, next) {
  if (!req.user.access_token)
    return res.status(401).json({ message: 'You need to be logged in!' });
  next();
}

// route is /documents
router.get('/', (req, res) => {
  docs
    .find()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

// temp test route
router.get('/all', checkToken, checkExpiration, async (req, res, next) => {
  console.log(req.user);
  const user = req.user;

  let apiClient = new docusign.ApiClient();
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + user.access_token);
  apiClient.setBasePath(`${user.base_uri}/restapi`);
  docusign.Configuration.default.setDefaultApiClient(apiClient);

  let envelopesApi = new docusign.EnvelopesApi();
  let options = {
    fromDate: moment()
      .subtract(30, 'days')
      .format(),
  };

  let account_id = user.account_id;
  let envelopesP = promisify(envelopesApi.listStatusChanges).bind(envelopesApi);

  try {
    let env_results = await envelopesP(account_id, options);
    let promises = env_results.envelopes.map(envelope => {
      let envelope_id = envelope.envelopeId;
      let documentsP = promisify(envelopesApi.listDocuments).bind(envelopesApi);
      return documentsP(account_id, envelope_id, null);
    });
    return Promise.all(promises).then(results => res.status(200).json(results));
  } catch (err) {
    console.log(err);
  }
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  docs
    .findAllByUser(userId)
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: `No documents found associated to the supplied user.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/id/:id', (req, res) => {
  const { id } = req.params;

  docs
    .findById(id)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: `No document at specified ID.` });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.post('/', (req, res) => {
  const document = req.body;

  docs
    .addDoc(document)
    .then(ids => {
      // TODO: GET user_id from logged in user token
      // use user_id and ids[0] to call addUserToDoc here
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.post('/add/:document_id/:user_id', (req, res) => {
  const { document_id, user_id } = req.params;
  const userDoc = { document_id, user_id };

  docs
    .addUserToDoc(userDoc)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const document = req.body;

  docs
    .updateDoc(id, document)
    .then(updatedCount => {
      if (updatedCount > 0) {
        res.status(200).json(updatedCount);
      } else {
        res.status(404).json({
          message: `No document found at specified ID to update, or the required document field was insufficient.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  docs
    .removeDoc(id)
    .then(removedCount => {
      if (removedCount > 0) {
        res.status(200).json(removedCount);
      } else {
        res
          .status(404)
          .json({ message: `No document at specified ID found to remove.` });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
