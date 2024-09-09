export const SolWalletResultDescription = {
    createKeypair: 
    `<ul>
        <li><code>publicKey: &lt;string&gt;</code> - The public key of a keypair.</li>
        <li><code>secretKey: &lt;string&gt;</code> - base-58 encoded Pubkey of the program this account has
            been assigned to</li>
    </ul>`,
    
    generateMnemonics: 
    `<p><code>mnemonic&lt;string&gt;</code> - 12 a list of readable words</p><br>
    <p>Mnemonics are generally used to make the user experience within wallets better than a Keypair file by using a list of readable words (instead of a shorter string of random numbers and letters).</p>`,
}