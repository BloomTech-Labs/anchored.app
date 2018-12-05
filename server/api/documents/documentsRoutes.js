const express = require('express');

const docs = require('./documentsModel');

const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/:id', (req, res) => {
  docs.f;
});

module.exports = router;
