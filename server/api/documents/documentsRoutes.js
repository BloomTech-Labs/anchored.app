const express = require('express');

const docs = require('./documentsModel.js');
const users = require('../users/usersModel');

const docusign = require('docusign-esign');
const moment = require('moment');

const router = express.Router();

function checkExpiration(req, res, next) {
  users
    .findByEmail('iamcooled@gmail.com')
    .then(user => {
      let currentTime = new Date().getTime();
      if (currentTime > JSON.parse(user.expires)) {
        user.expires = JSON.stringify(new Date().getTime() + 1000);
        req.user = user;
        next();
      } else {
        return res.status(400).json({ error: '15 minutes not up' });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
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
router.get('/all', checkExpiration, (req, res, next) => {
  let user = req.session.passport.user;
  apiClient = new docusign.ApiClient();
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + user.accessToken);
  apiClient.setBasePath('https://demo.docusign.net/restapi');
  docusign.Configuration.default.setDefaultApiClient(apiClient);

  let envelopesApi = new docusign.EnvelopesApi();

  let options = {
    fromDate: moment()
      .subtract(30, 'days')
      .format(),
  };

  let account_id = user.accounts[0].account_id;
  envelopesApi.listStatusChanges(account_id, options, (error, envelopes) => {
    if (error) return;
    // loop through envelopes to get documents
    envelopes.envelopes.forEach(envelope => {
      // get list of documents
      envelopesApi.listDocuments(
        account_id,
        envelope.envelopeId,
        null,
        (error, docsList) => {
          if (error) return;
          // loop through documents to get page image
          docsList.envelopeDocuments.forEach(doc => {
            let documentId = doc.documentId;
            // get document page image
            envelopesApi.getDocumentPageImage(
              account_id,
              envelope.envelopeId,
              documentId,
              '1',
              null,
              (error, data) => {
                if (error) return;
                if (data) {
                  document = {
                    proof: envelope.envelopeId + documentId,
                    image: data,
                  };
                  docs.addDoc(document).catch(err => console.log(err));
                }
              }
            );
          });
        }
      );
    });
  });
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
