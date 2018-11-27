const express = require('express');

const chp = require('chainpoint-client');
const SHA256 = require('crypto-js/sha256');
const docs = require('../documents/documentsModel.js');

const router = express.Router();

router.get('/:user_id', (req, res) => {
  user_id = req.params.user_id;
  docs
    .findAllByUser(user_id)
    .then(documents => {
      console.log('Docs: ', documents);
      const hashes = documents.map(doc => {
        return SHA256(doc).toString();
      });
      console.log('Hashes: ', hashes);
      chp.submitHashes(hashes).then(proofHandles => {
        console.log(proofHandles);
        console.log('Sleeping 15 seconds to wait for proofs to generate...');
        new Promise(resolve => setTimeout(resolve, 15000)).then(() => {
          chp.getProofs(proofHandles).then(proofs => {
            console.log(proofs);
            docs.updateDoc(1 , { proof: proofs[0].proof }).catch(err => console.log(err));
            chp.verifyProofs(proofs).then(verifiedProofs => {
              console.log(verifiedProofs);
              res.status(200).json(verifiedProofs);
            });
          });
        });
      });
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
