const chp = require('chainpoint-client');
const SHA256 = require('crypto-js/sha256');
const envs = require('../envelopes/envelopesModel');
const moment = require('moment');

async function proofDocuments(req, res, documents, id) {
  // Convert documents into SHA256 hash
  const hash = [SHA256(documents.documents).toString()];
  try {
    // Submit hash to chainpoint to later retrieve proofs
    const proofHandles = await chp.submitHashes(hash);

    // Wait 15 seconds for proof to be anchored
    await new Promise(resolve => setTimeout(resolve, 15000));

    // Get proof(s) from hashes
    let proofs = await chp.getProofs(proofHandles);

    // Get a single proof that isn't null
    let index = proofs.findIndex(proof => proof.proof !== null);
    let proof = [proofs[index]];

    if (!proof[0]) {
      // Try one more time if getProofs failed
      await new Promise(resolve => setTimeout(resolve, 15000));
      proofs = await chp.getProofs(proofHandles);
      proof = [proofs.find(proof => proof.proof !== null)];
    }

    // Verify the proofs and update db with the result
    const verifiedProofs = await chp.verifyProofs(proof);
    const waiting_expiration = JSON.stringify(moment().add(2, 'hours'));

    await envs.updateEnv(id, {
      verified_proof: JSON.stringify(verifiedProofs[0]),
      proof_handle: JSON.stringify(proofHandles[index]),
      verified: 0,
      waiting: 1,
      waiting_expiration,
    });
  } catch (err) {
    return res.status(500).json({ ErrorMessage: err.message });
  }
}

module.exports = { proofDocuments };
