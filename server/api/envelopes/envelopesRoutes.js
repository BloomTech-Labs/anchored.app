const express = require('express');

const envs = require('./envelopesModel');

const docusign = require('docusign-esign');

const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');
const {
  checkToken,
  checkExpiration,
  getEnvelopes,
  getEnvelopesList,
  // getImages,
  postEnvToDB,
} = require('./envsMiddleware');
const { getDSApi } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

// route is /documents
router.get('/', (req, res) => {
  envs
    .find()
    .then(envs => {
      res.status(200).json(envs);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/all', checkToken, checkExpiration, async (req, res, next) => {
  const user = req.user;
  const apiClient = getDSApi(user);
  const envelopesApi = new docusign.EnvelopesApi(apiClient);
  const account_id = user.account_id;

  try {
    let envelopesList = await getEnvelopesList(envelopesApi, account_id);
    let envelopes = await getEnvelopes(envelopesApi, account_id, envelopesList);
    await postEnvToDB(req, res, envelopes);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// router.get('/:id/proof', (req, res) => {
//   const { id } = req.params;

//   const user = req.user;
//   const apiClient = getDSApi(user);
//   const envelopesApi = new docusign.EnvelopesApi(apiClient);
//   const account_id = user.account_id;

//   envs
//     .findById(id)
//     .then(async doc => {
//       let documentsList = await getDocumentsList(
//         envelopesApi,
//         account_id,
//         doc.envelope_id
//       );
//       let documents = await getDocuments(
//         envelopesApi,
//         account_id,
//         documentsList
//       );
//       res.status(200).json(documents);
//     })
//     .catch(err => res.status(500).json({ ErrorMessage: err.message }));
// });

// router.get('/:userId', (req, res) => {
//   const { userId } = req.params;

//   envs
//     .findAllByUser(userId)
//     .then(envs => {
//       if (envs.length > 0) {
//         res.status(200).json(envs);
//       } else {
//         res.status(404).json({
//           message: `No documents found associated to the supplied user.`,
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ ErrorMessage: err.message });
//     });
// });

// router.get('/id/:id', (req, res) => {
//   const { id } = req.params;

//   envs
//     .findById(id)
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res.status(404).json({ message: `No document at specified ID.` });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ ErrorMessage: err.message });
//     });
// });

// router.post('/', (req, res) => {
//   const document = req.body;

//   envs
//     .addDoc(document)
//     .then(ids => {
//       // TODO: GET user_id from logged in user token
//       // use user_id and ids[0] to call addUserToDoc here
//       res.status(201).json(ids[0]);
//     })
//     .catch(err => {
//       res.status(500).json({ ErrorMessage: err.message });
//     });
// });

// router.post('/add/:document_id/:user_id', (req, res) => {
//   const { document_id, user_id } = req.params;
//   const userDoc = { document_id, user_id };

//   envs
//     .addUserToDoc(userDoc)
//     .then(ids => {
//       res.status(201).json(ids[0]);
//     })
//     .catch(err => {
//       res.status(500).json({ ErrorMessage: err.message });
//     });
// });

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const document = req.body;

//   envs
//     .updateDoc(id, document)
//     .then(updatedCount => {
//       if (updatedCount > 0) {
//         res.status(200).json(updatedCount);
//       } else {
//         res.status(404).json({
//           message: `No document found at specified ID to update, or the required document field was insufficient.`,
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ ErrorMessage: err.message });
//     });
// });

// router.delete('/:id', (req, res) => {
//   const { id } = req.params;

//   envs
//     .removeDoc(id)
//     .then(removedCount => {
//       if (removedCount > 0) {
//         res.status(200).json(removedCount);
//       } else {
//         res
//           .status(404)
//           .json({ message: `No document at specified ID found to remove.` });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ ErrorMessage: err.message });
//     });
// });

module.exports = router;
