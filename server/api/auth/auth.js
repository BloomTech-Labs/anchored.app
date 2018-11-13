const express = require('express');

const docusignRoutes = require('./docusign/docusignRoutes');
const auth0Routes = require('./auth0/auth0Routes');

const router = express.Router();

router.use('/docusign', docusignRoutes);
router.use('/auth0', auth0Routes);

module.exports = router;
