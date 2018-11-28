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
      const unprovenDocuments = documents.filter(doc => {
        return doc.proof === null;
      });
      console.log('UnprovenDocs: ', unprovenDocuments);
      const hashes = unprovenDocuments.map(doc => {
        return SHA256(doc).toString();
      });
      console.log('Hashes: ', hashes);
      chp.submitHashes(hashes).then(proofHandles => {
        console.log('ProofHandles: ', proofHandles);
        console.log('Sleeping 15 seconds to wait for proofs to generate...');
        new Promise(resolve => setTimeout(resolve, 15000)).then(() => {
          chp.getProofs(proofHandles).then(proofs => {
            console.log('Proofs: ', proofs);
            console.log('UnprovenDocsII: ', unprovenDocuments);
            unprovenDocuments.forEach(doc => {
              const correctProofHandles = proofHandles.filter(proofHandle => {
                return proofHandle.hash === hashes[0];
              });
              console.log('Correct ProofHandles: ', correctProofHandles);
              docs
                .updateDoc(doc.document_id, {
                  proof: JSON.stringify(correctProofHandles),
                })
                .catch(err => console.log(err));
            });

            chp.verifyProofs(proofs).then(verifiedProofs => {
              console.log('Verified Proofs: ', verifiedProofs);
              res.status(200).json(verifiedProofs);
              unprovenDocuments.forEach(doc => {
                const correctVerifiedProofs = verifiedProofs.filter(proof => {
                  return proof.hash === hashes[0];
                });
                console.log('Correct Verified Proofs: ', correctVerifiedProofs);
                docs
                  .updateDoc(doc.document_id, {
                    verified_proof: JSON.stringify(correctVerifiedProofs),
                  })
                  .catch(err => console.log(err));
              });
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
