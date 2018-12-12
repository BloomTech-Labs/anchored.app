const express = require('express');

const docs = require('./documentsModel');

const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

// Gets all of an envelopes documents
router.get('/:id', (req, res) => {
  const { id } = req.params;
  docs
    .findbyEnvelopeId(id)
    .then(doc => res.status(200).json(doc))
    .catch(err => console.log(err));
});

module.exports = router;
