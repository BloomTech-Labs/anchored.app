const express = require('express');

const chp = require('chainpoint-client');
const SHA256 = require("crypto-js/sha256");
const docs = require('../documents/documentsModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  docs
    .find()
    .then(docs => {
      const hashes = docs.map((doc) => {
        return SHA256(doc).toString();
      })
      chp.submitHashes(hashes)
      .then(proofHandles => {
        console.log(proofHandles);
        console.log("Sleeping 12 seconds to wait for proofs to generate...")
        new Promise(resolve => setTimeout(resolve, 15000))
        .then(() => {
          chp.getProofs(proofHandles).then(proofs => {
            console.log(proofs)
            chp.verifyProofs(proofs).then(verifiedProofs => {
              console.log(verifiedProofs);
            })
          })

        })
        

      })
      
      res.status(200).json(hashes);
    })
    
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;