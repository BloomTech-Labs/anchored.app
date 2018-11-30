
const express = require('express');

const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

module.exports = router;