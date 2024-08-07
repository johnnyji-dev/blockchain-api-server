export function keyPairToSecretHex(_keyPair) {
    return Buffer.from(_keyPair.secretKey).toString('hex');
}