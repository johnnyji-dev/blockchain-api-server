import { ApiProperty } from "@nestjs/swagger"

export const EthWalletResultDescription = {
    createRandom: 
    `<ul>
        <li><code>provider: &lt;string&gt;</code> - A Provider is the primary method to interact with the read-only content on Ethereum.</li>
        <li><code>address: &lt;string&gt;</code> - The wallet address.</li>
        <li><code>publicKey: &lt;string&gt;</code> - The compressed public key.</li>
        <li><code>fingerprint: &lt;string&gt;</code> - A fingerprint allows quick qay to detect parent and child nodes, but developers should be prepared to deal with collisions as it is only 4 bytes.</li>
        <li><code>parentFingerprint: &lt;string&gt;</code> - The parent fingerprint.</li>
        <li><code>mnemonic: &lt;null | Mnemonic&gt;</code> - The mnemonic used to create this HD Node, if available.
            Sources such as extended keys do not encode the mnemonic, which case this will be 'null'.</li>
        <ul>
            <li><code>pharse: &lt;string&gt;</code> - The mnemonic phrase of 12, 15, 18, 21 or 24 words.
                Use the [[wordlist]] 'split' method to get the individual words.</li>
            <li><code>password: &lt;string&gt;</code> - The password used for mnemonic. If no password is used this is the empty string (i.e. "") as per the specification.</li>
            <li><code>wordlist: &lt;Wordlist&gt;</code> - The wordlist for this mnemonic.</li>
            <ul>
                <li><code>locale: &lt;string&gt;</code> - The language of the wordlist this mnemonic is using</li>
            </ul>

            <li><code>entropy: &lt;string&gt;</code> - The underlying entropy which the mnemonic encodes.</li>
        </ul>
        <li><code>chainCode: &lt;string&gt;</code> - The chaincode, which is effectively a public key used to derive children.</li>
        <li><code>path: &lt;null | string&gt;</code> - The derivation path of this wallet.
            Since extended keys do not provide full path details, this may be 'null', if instantiated from a source that does not encode it.</li>
        <li><code>index: &lt;number&gt;</code> - The child index of this wallet. Values over '2 *\* 31' indicate the node is hardened.</li>
        <li><code>depth: &lt;number&gt;</code> - The depth of this wallet, which is the number of components in its path.</li>
    </ul>`,
    
    generateMnemonics: 
    `<p><code>mnemonic&lt;string&gt;</code> - 12 a list  crof readable words</p><br>
    <p>Mnemonics are generally used to make the user experience within wallets better than a Keypair file by using a list of readable words (instead of a shorter string of random numbers and letters).</p>`,
}

export class MnemonicPhrase {
    @ApiProperty({ description: 'mnemonic', required: true })
    mnemonic: string;
}