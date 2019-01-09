const chp = require('chainpoint-client');
const SHA256 = require('crypto-js/sha256');
const envs = require('../envelopes/envelopesModel');
const moment = require('moment');

async function proofDocuments(req, res, documents, id) {
  // Convert documents into SHA256 hash
  const hash = [SHA256(documents.document).toString()];

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
    index = proofs.findIndex(proof => proof.proof !== null);
    proof = [proofs[index]];
  }

  // Verify the proofs and update db with the result
  const verifiedProofs = await chp.verifyProofs(proof);
  const waiting_expiration = JSON.stringify(moment().add(2, 'hours'));
  const changes = {
    verified_proof: JSON.stringify(verifiedProofs[0]),
    proof_handle: JSON.stringify(proofHandles[index]),
    loading: 0,
    verified: 0,
    waiting: 1,
    waiting_expiration,
  };

  await envs.updateEnv(id, changes);
  return res.status(200).json({ id, verified_proof: changes.verified_proof });
}

module.exports = { proofDocuments };
