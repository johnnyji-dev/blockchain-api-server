export enum NetworkSelector {
    Mainnet = "Mainnet",
    Testnet = "Testnet",
}

export const OnChainResultDescription = {
    getAccountInfo: // 01_01
    `<ul>
        <li><code>&lt;null&gt;</code> - if the requested account doesn't exist</li>
        <li><code>&lt;object&gt;</code> - otherwise, a JSON object containing:
            <ul>
                <li><code>lamports: &lt;u64&gt;</code> - number of lamports assigned to this account, as a u64</li>
                <li><code>owner: &lt;string&gt;</code> - base-58 encoded Pubkey of the program this account has
                    been assigned to</li>
                <li><code>data: &lt;[string, encoding]|object&gt;</code> - data associated with the account,
                    either as encoded binary data or JSON format <code>{&lt;program&gt;: &lt;state&gt;}</code> -
                    depending on encoding parameter</li>
                <li><code>executable: &lt;bool&gt;</code> - boolean indicating if the account contains a program
                    (and is strictly read-only)</li>
                <li><code>rentEpoch: &lt;u64&gt;</code> - the epoch at which this account will next owe rent, as
                    u64</li>
                <li><code>size: &lt;u64&gt;</code> - the data size of the account</li>
            </ul>
        </li>
    </ul>`,
    getBalance: // 01_02 
    `<p><code>RpcResponse&lt;u64&gt;</code> - RpcResponse JSON object with <code>value</code> field set to the balance</p>`,
    getBlock: // 01_03
    `<ul>
        <li><code>&lt;object&gt;</code> - if block is confirmed, an object with the following fields:
            <ul>
                <li><code>blockhash: &lt;string&gt;</code> - the blockhash of this block, as base-58 encoded
                    string</li>
                <li><code>previousBlockhash: &lt;string&gt;</code> - the blockhash of this block's parent, as
                    base-58 encoded string; if the parent block is not available due to ledger
                    cleanup, this field will return "11111111111111111111111111111111"</li>
                <li><code>parentSlot: &lt;u64&gt;</code> - the slot index of this block's parent</li>
                <li><code>transactions: &lt;array&gt;</code> - present if "full" transaction details are
                    requested; an array of JSON objects containing:
                    <ul>
                        <li><code>transaction: &lt;object|[string,encoding]&gt;</code> -
                            <a href="/ko/docs/rpc/json-structures#transactions">Transaction</a> object, either in
                            JSON format or encoded binary data, depending on encoding parameter
                        </li>
                        <li><code>meta: &lt;object&gt;</code> - transaction status metadata object, containing
                            <code>null</code>
                            or:
                            <ul>
                                <li><code>err: &lt;object|null&gt;</code> - Error if transaction failed, null if transaction
                                    succeeded.
                                    <a target="_blank"
                                        href="https://github.com/solana-labs/solana/blob/c0c60386544ec9a9ec7119229f37386d9f070523/sdk/src/transaction/error.rs#L13">TransactionError
                                        definitions</a>
                                </li>
                                <li><code>fee: &lt;u64&gt;</code> - fee this transaction was charged, as u64 integer</li>
                                <li><code>preBalances: &lt;array&gt;</code> - array of u64 account balances from before the
                                    transaction was processed</li>
                                <li><code>postBalances: &lt;array&gt;</code> - array of u64 account balances after the
                                    transaction was processed</li>
                                <li><code>innerInstructions: &lt;array|null&gt;</code> - List of
                                    <a href="/ko/docs/rpc/json-structures#inner-instructions">inner instructions</a> or
                                    <code>null</code> if inner instruction recording was not enabled during this
                                    transaction
                                </li>
                                <li><code>preTokenBalances: &lt;array|undefined&gt;</code> - List of
                                    <a href="/ko/docs/rpc/json-structures#token-balances">token balances</a> from before
                                    the transaction was processed or omitted if token balance recording was
                                    not yet enabled during this transaction
                                </li>
                                <li><code>postTokenBalances: &lt;array|undefined&gt;</code> - List of
                                    <a href="/ko/docs/rpc/json-structures#token-balances">token balances</a> from after
                                    the transaction was processed or omitted if token balance recording was
                                    not yet enabled during this transaction
                                </li>
                                <li><code>logMessages: &lt;array|null&gt;</code> - array of string log messages or
                                    <code>null</code> if
                                    log message recording was not enabled during this transaction</li>
                                <li><code>rewards: &lt;array|null&gt;</code> - transaction-level rewards, populated if
                                    rewards are requested; an array of JSON objects containing:
                                    <ul>
                                        <li><code>pubkey: &lt;string&gt;</code> - The public key, as base-58 encoded string,
                                            of the
                                            account that received the reward</li>
                                        <li><code>lamports: &lt;i64&gt;</code>- number of reward lamports credited or
                                            debited by
                                            the account, as a i64</li>
                                        <li><code>postBalance: &lt;u64&gt;</code> - account balance in lamports after the
                                            reward
                                            was applied</li>
                                        <li><code>rewardType: &lt;string|undefined&gt;</code> - type of reward: "fee",
                                            "rent",
                                            "voting", "staking"</li>
                                        <li><code>commission: &lt;u8|undefined&gt;</code> - vote account commission when the
                                            reward
                                            was credited, only present for voting and staking rewards</li>
                                    </ul>
                                </li>
                                <li>DEPRECATED: <code>status: &lt;object&gt;</code> - Transaction status
                                    <ul>
                                        <li><code>"Ok": &lt;null&gt;</code> - Transaction was successful</li>
                                        <li><code>"Err": &lt;ERR&gt;</code> - Transaction failed with TransactionError</li>
                                    </ul>
                                </li>
                                <li><code>loadedAddresses: &lt;object|undefined&gt;</code> - Transaction addresses loaded
                                    from address lookup tables. Undefined if
                                    <code>maxSupportedTransactionVersion</code> is not set in request params, or if
                                    <code>jsonParsed</code> encoding is set in request params.
                                    <ul>
                                        <li><code>writable: &lt;array[string]&gt;</code> - Ordered list of base-58 encoded
                                            addresses for writable loaded accounts</li>
                                        <li><code>readonly: &lt;array[string]&gt;</code> - Ordered list of base-58 encoded
                                            addresses for readonly loaded accounts</li>
                                    </ul>
                                </li>
                                <li><code>returnData: &lt;object|undefined&gt;</code> - the most-recent return data
                                    generated
                                    by an instruction in the transaction, with the following fields:
                                    <ul>
                                        <li><code>programId: &lt;string&gt;</code> - the program that generated the return
                                            data, as
                                            base-58 encoded Pubkey</li>
                                        <li><code>data: &lt;[string, encoding]&gt;</code> - the return data itself, as
                                            base-64
                                            encoded binary data</li>
                                    </ul>
                                </li>
                                <li><code>computeUnitsConsumed: &lt;u64|undefined&gt;</code> - number of
                                    <a href="/ko/docs/core/fees#compute-budget">compute units</a> consumed by the
                                    transaction
                                </li>
                            </ul>
                        </li>
                        <li><code>version: &lt;"legacy"|number|undefined&gt;</code> - Transaction version. Undefined if
                            <code>maxSupportedTransactionVersion</code> is not set in request params.
                        </li>
                    </ul>
                </li>
                <li><code>signatures: &lt;array&gt;</code> - present if "signatures" are requested for
                    transaction details; an array of signatures strings, corresponding to the
                    transaction order in the block</li>
                <li><code>rewards: &lt;array|undefined&gt;</code> - block-level rewards, present if rewards are
                    requested; an array of JSON objects containing:
                    <ul>
                        <li><code>pubkey: &lt;string&gt;</code> - The public key, as base-58 encoded string, of the
                            account that received the reward</li>
                        <li><code>lamports: &lt;i64&gt;</code>- number of reward lamports credited or debited by the
                            account, as a i64</li>
                        <li><code>postBalance: &lt;u64&gt;</code> - account balance in lamports after the reward was
                            applied</li>
                        <li><code>rewardType: &lt;string|undefined&gt;</code> - type of reward: "fee", "rent",
                            "voting", "staking"</li>
                        <li><code>commission: &lt;u8|undefined&gt;</code> - vote account commission when the reward was
                            credited, only present for voting and staking rewards</li>
                    </ul>
                </li>
                <li><code>blockTime: &lt;i64|null&gt;</code> - estimated production time, as Unix timestamp
                    (seconds since the Unix epoch). null if not available</li>
                <li><code>blockHeight: &lt;u64|null&gt;</code> - the number of blocks beneath this block</li>
            </ul>
        </li>
        <li><code>&lt;null&gt;</code> - if specified block is not confirmed</li>
    </ul>`,
    getBlockCommitment: // 01_04
    `<ul>
        <li><code>commitment</code> - commitment, comprising either:
            <ul>
                <li><code>&lt;null&gt;</code> - Unknown block</li>
                <li><code>&lt;array&gt;</code> - commitment, array of u64 integers logging the amount of cluster
                    stake in lamports that has voted on the block at each depth from 0 to
                    <code>MAX_LOCKOUT_HISTORY</code> + 1
                </li>
            </ul>
        </li>
        <li><code>totalStake</code> - total active stake, in lamports, of the current epoch</li>
    </ul>`,
    getBlockHeight: // 01_05
    `<ul>
        <li><code>&lt;u64&gt;</code> - Current block height</li>
    </ul>`,
    getBlockProduction: // 01_06
    `<ul>
        <li><code>&lt;object&gt;</code>
            <ul>
                <li><code>byIdentity: &lt;object&gt;</code> - a dictionary of validator identities, as base-58
                    encoded strings. Value is a two element array containing the number of
                    leader slots and the number of blocks produced.</li>
                <li><code>range: &lt;object&gt;</code> - Block production slot range
                    <ul>
                        <li><code>firstSlot: &lt;u64&gt;</code> - first slot of the block production information
                            (inclusive)</li>
                        <li><code>lastSlot: &lt;u64&gt;</code> - last slot of block production information (inclusive)</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>`,
    getBlockTime: // 01_07
    `<ul>
        <li><code>&lt;i64&gt;</code> - estimated production time, as Unix timestamp (seconds since the Unixepoch)</li>
    </ul>`,
    getBlocks: // 01_08
    `<p>The result field will be an array of u64 integers listing confirmed blocks between <code>start_slot</code> and either <code>end_slot</code> - if provided, or latest confirmed block, inclusive. Max range allowed is 500,000 slots.</p>`,
    getBlocksWithLimit: // 01_09
    `The result field will be an array of u64 integers listing confirmed blocks starting at start_slot for up to limit blocks, inclusive.`,
    getClusterNodes: // 01_10
    `<ul>
        <li><code>pubkey: &lt;string&gt;</code> - Node public key, as base-58 encoded string</li>
        <li><code>gossip: &lt;string|null&gt;</code> - Gossip network address for the node</li>
        <li><code>tpu: &lt;string|null&gt;</code> - TPU network address for the node</li>
        <li><code>rpc: &lt;string|null&gt;</code> - JSON RPC network address for the node, or <code>null</code> if the
            JSON RPC service is not enabled</li>
        <li><code>version: &lt;string|null&gt;</code> - The software version of the node, or <code>null</code> if the
            version information is not available</li>
        <li><code>featureSet: &lt;u32|null &gt;</code> - The unique identifier of the node's feature set</li>
        <li><code>shredVersion: &lt;u16|null&gt;</code> - The shred version the node has been configured to
            use</li>
    </ul>`,
    getEpochInfo: // 01_11
    `<ul>
        <li><code>absoluteSlot: &lt;u64&gt;</code> - the current slot</li>
        <li><code>blockHeight: &lt;u64&gt;</code> - the current block height</li>
        <li><code>epoch: &lt;u64&gt;</code> - the current epoch</li>
        <li><code>slotIndex: &lt;u64&gt;</code> - the current slot relative to the start of the current
            epoch</li>
        <li><code>slotsInEpoch: &lt;u64&gt;</code> - the number of slots in this epoch</li>
        <li><code>transactionCount: &lt;u64|null&gt;</code> - total number of transactions processed
            without error since genesis</li>
    </ul>`,
    getEpochSchedule: // 01_12
    `<ul>
        <li><code>slotsPerEpoch: &lt;u64&gt;</code> - the maximum number of slots in each epoch</li>
        <li><code>leaderScheduleSlotOffset: &lt;u64&gt;</code> - the number of slots before beginning of an
            epoch to calculate a leader schedule for that epoch</li>
        <li><code>warmup: &lt;bool&gt;</code> - whether epochs start short and grow</li>
        <li><code>firstNormalEpoch: &lt;u64&gt;</code> - first normal-length epoch, log2(slotsPerEpoch) -
            log2(MINIMUM_SLOTS_PER_EPOCH)</li>
        <li><code>firstNormalSlot: &lt;u64&gt;</code> - MINIMUM_SLOTS_PER_EPOCH *
            (2.pow(firstNormalEpoch) - 1)</li>
    </ul>`,
    getFeeForMessage: // 01_13
    `<ul>
        <li><code>&lt;u64|null&gt;</code> - Fee corresponding to the message at the specified blockhash</li>
    </ul>`,
    getFirstAvailableBlock: // 01_14
    `<ul>
        <li><code>&lt;u64&gt;</code> - Slot</li>
    </ul>`,
    getGenesisHash: // 01_15
    `<ul>
        <li><code>&lt;string&gt;</code> - a Hash as base-58 encoded string</li>
    </ul>`,
    getHealth: // 01_16
    `<p>If the node is healthy: "ok"</p>
    <p>If the node is unhealthy, a JSON RPC error response is returned. The specifics of the error response are <strong>UNSTABLE</strong> and may change in the future</p>`,
    getHighestSnapshotSlot: // 01_17
    `<ul>
        <li><code>full: &lt;u64&gt;</code> - Highest full snapshot slot</li>
        <li><code>incremental: &lt;u64|null&gt;</code> - Highest incremental snapshot slot <em>based on</em>
        <code>full</code></li>
    </ul>`,
    getIdentity: // 01_18
    `<ul>
        <li><code>identity</code> - the identity pubkey of the current node (as a base-58 encoded string)</li>
    </ul>`,
    getInflationGovernor: // 01_19
    `<ul>
        <li><code>initial: &lt;f64&gt;</code> - the initial inflation percentage from time 0</li>
        <li><code>terminal: &lt;f64&gt;</code> - terminal inflation percentage</li>
        <li><code>taper: &lt;f64&gt;</code> - rate per year at which inflation is lowered. (Rate reduction is derived using the target slot time in genesis config)</li>
        <li><code>foundation: &lt;f64&gt;</code> - percentage of total inflation allocated to the foundation</li>
        <li><code>foundationTerm: &lt;f64&gt;</code> - duration of foundation pool inflation in years</li>
    </ul>`,
    getInflationRate: // 01_20
    `<ul>
        <li><code>total: &lt;f64&gt;</code> - total inflation</li>
        <li><code>validator: &lt;f64&gt;</code> -inflation allocated to validators</li>
        <li><code>foundation: &lt;f64&gt;</code> - inflation allocated to the foundation</li>
        <li><code>epoch: &lt;u64&gt;</code> - epoch for which these values are valid</li>
    </ul>`,
    getInflationReward: // 01_21
    `<ul>
        <li><code>epoch: &lt;u64&gt;</code> - epoch for which reward occured</li>
        <li><code>effectiveSlot: &lt;u64&gt;</code> - the slot in which the rewards are effective</li>
        <li><code>amount: &lt;u64&gt;</code> - reward amount in lamports</li>
        <li><code>postBalance: &lt;u64&gt;</code> - post balance of the account in lamports</li>
        <li><code>commission: &lt;u8|undefined&gt;</code> - vote account commission when the reward was credited</li>
    </ul>`,
    getLargestAccounts: // 01_22
    `<ul>
        <li><code>address: &lt;string&gt;</code> - base-58 encoded address of the account</li>
        <li><code>lamports: &lt;u64&gt;</code> - number of lamports in the account, as a u64</li>
    </ul>`,
    getLatestBlockhash: // 01_23
    `<ul>
        <li><code>blockhash: &lt;string&gt;</code> - a Hash as base-58 encoded string</li>
        <li><code>lastValidBlockHeight: &lt;u64&gt;</code> - last <a href="/ko/docs/terminology#block-height">block height</a> at which the blockhash will be valid</li>
    </ul>`,
    getLeaderSchedule: // 01_24
    `<ul>
        <li><code>&lt;null&gt;</code> - if requested epoch is not found, or</li>
        <li><code>&lt;object&gt;</code> - the result field will be a dictionary of validator identities, as base-58 encoded strings, and their corresponding leader slot indices as values (indices are relative to the first slot in the requested epoch)</li>
    </ul>`,
    getMaxRetransmitSlot: // 01_25
    `<p><code>&lt;u64&gt;</code> - Slot number</p>`,
    getMaxShredInsertSlot: // 01_26
    `<p><code>&lt;u64&gt;</code> - Slot number</p>`,
    getMinimumBalanceForRentExemption: // 01_27
    `<p><code>&lt;u64&gt;</code> - minimum lamports required in the Account to remain rent free</p>`,
    getMultipleAccounts:  // 01_28
    `<ul>
        <li><code>&lt;null&gt;</code> - if the account at that Pubkey doesn't exist, or</li>
        <li><code>&lt;object&gt;</code> - a JSON object containing:
        <ul>
            <li><code>lamports: &lt;u64&gt;</code> - number of lamports assigned to this account, as a u64</li>
            <li><code>owner: &lt;string&gt;</code> - base-58 encoded Pubkey of the program this account has been assigned to</li>
            <li><code>data: &lt;[string, encoding]|object&gt;</code> - data associated with the account, either as encoded binary data or JSON format <code>{&lt;program&gt;: &lt;state&gt;}</code> - depending on encoding parameter</li>
            <li><code>executable: &lt;bool&gt;</code> - boolean indicating if the account contains a program (and is strictly read-only)</li>
            <li><code>rentEpoch: &lt;u64&gt;</code> - the epoch at which this account will next owe rent, as u64</li>
            <li><code>space: &lt;u64&gt;</code> - the data size of the account</li>
        </ul>
        </li>
    </ul>`,
    getProgramAccounts: // 01_29
    `<ul>
        <li><code>pubkey: &lt;string&gt;</code> - the account Pubkey as base-58 encoded string</li>
        <li><code>account: &lt;object&gt;</code> - a JSON object, with the following sub fields:
        <ul>
            <li><code>lamports: &lt;u64&gt;</code> - number of lamports assigned to this account, as a u64</li>
            <li><code>owner: &lt;string&gt;</code> - base-58 encoded Pubkey of the program this account has been assigned to</li>
            <li><code>data: &lt;[string,encoding]|object&gt;</code> - data associated with the account, either as encoded binary data or JSON format <code>{&lt;program&gt;: &lt;state&gt;}</code> - depending on encoding parameter</li>
            <li><code>executable: &lt;bool&gt;</code> - boolean indicating if the account contains a program (and is strictly read-only)</li>
            <li><code>rentEpoch: &lt;u64&gt;</code> - the epoch at which this account will next owe rent, as u64</li>
            <li><code>size: &lt;u64&gt;</code> - the data size of the account</li>
        </ul>
        </li>
    </ul>`,
    getRecentPerformanceSamples: // 01_30
    `<ul>
        <li><code>slot: &lt;u64&gt;</code> - Slot in which sample was taken at</li>
        <li><code>numTransactions: &lt;u64&gt;</code> - Number of transactions processed during the sample period</li>
        <li><code>numSlots: &lt;u64&gt;</code> - Number of slots completed during the sample period</li>
        <li><code>samplePeriodSecs: &lt;u16&gt;</code> - Number of seconds in a sample window</li>
        <li><code>numNonVoteTransaction: &lt;u64&gt;</code> - Number of non-vote transactions processed during the sample period.</li>
    </ul>`,
    getRecentPrioritizationFees: // 01_31
    `<ul>
        <li><code>slot: &lt;u64&gt;</code> - slot in which the fee was observed</li>
        <li><code>prioritizationFee: &lt;u64&gt;</code> - the per-compute-unit fee paid by at least one successfully landed transaction, specified in increments of micro-lamports (0.000001 lamports)</li>
    </ul>`,
    getSignatureStatuses: // 01_32
    `<ul>
        <li><code>&lt;null&gt;</code> - Unknown transaction, or</li>
        <li><code>&lt;object&gt;</code>
        <ul>
            <li><code>slot: &lt;u64&gt;</code> - The slot the transaction was processed</li>
            <li><code>confirmations: &lt;usize|null&gt;</code> - Number of blocks since signature confirmation, null if rooted, as well as finalized by a supermajority of the cluster</li>
            <li><code>err: &lt;object|null&gt;</code> - Error if transaction failed, null if transaction succeeded. See
            <a target="_blank" href="https://github.com/solana-labs/solana/blob/c0c60386544ec9a9ec7119229f37386d9f070523/sdk/src/transaction/error.rs#L13">TransactionError definitions</a></li>
            <li><code>confirmationStatus: &lt;string|null&gt;</code> - The transaction's cluster confirmation status; Either <code>processed</code>, <code>confirmed</code>, or <code>finalized</code>. See
            <a href="/ko/docs/rpc#configuring-state-commitment">Commitment</a> for more on optimistic confirmation.</li>
            <li>DEPRECATED: <code>status: &lt;object&gt;</code> - Transaction status
            <ul>
                <li><code>"Ok": &lt;null&gt;</code> - Transaction was successful</li>
                <li><code>"Err": &lt;ERR&gt;</code> - Transaction failed with TransactionError</li>
            </ul>
            </li>
        </ul>
        </li>
    </ul>`,
    getSignaturesForAddress: // 01_33 : Need To Debug
    `<ul>
        <li><code>signature: &lt;string&gt;</code> - transaction signature as base-58 encoded string</li>
        <li><code>slot: &lt;u64&gt;</code> - The slot that contains the block with the transaction</li>
        <li><code>err: &lt;object|null&gt;</code> - Error if transaction failed, null if transaction
        succeeded. See
        <a target="_blank" href="https://github.com/solana-labs/solana/blob/c0c60386544ec9a9ec7119229f37386d9f070523/sdk/src/transaction/error.rs#L13">TransactionError definitions</a>
        for more info.</li>
        <li><code>memo: &lt;string|null&gt;</code> - Memo associated with the transaction, null if no memo
        is present</li>
        <li><code>blockTime: &lt;i64|null&gt;</code> - estimated production time, as Unix timestamp
        (seconds since the Unix epoch) of when transaction was processed. null if not
        available.</li>
        <li><code>confirmationStatus: &lt;string|null&gt;</code> - The transaction's cluster confirmation
        status; Either <code>processed</code>, <code>confirmed</code>, or <code>finalized</code>. See
        <a href="/ko/docs/rpc#configuring-state-commitment">Commitment</a> for more on
        optimistic confirmation.</li>
    </ul>`,
    getSlot: // 01_34
    `<p><code>&lt;u64&gt;</code> - Current slot</p>`,
    getSlotLeader: // 01_35
    `<p><code>&lt;string&gt;</code> - Node identity Pubkey as base-58 encoded string</p>`,
    getSlotLeaders: // 01_36
    `<p><code>&lt;array[string]&gt;</code> - array of Node identity public keys as base-58 encodedstrings</p>`,
    getStakeActivation: // 01_37
    `<ul>
        <li><code>state: &lt;string&gt;</code> - the stake account's activation state, either: <code>active</code>, <code>inactive</code>, <code>activating</code>, or <code>deactivating</code></li>
        <li><code>active: &lt;u64&gt;</code> - stake active during the epoch</li>
        <li><code>inactive: &lt;u64&gt;</code> - stake inactive during the epoch</li>
    </ul>`,
    getStakeMinimumDelegation: // 01_38
    `<ul>
        <li><code>&lt;u64&gt;</code> - The stake minimum delegation, in lamports</li>
    </ul>`,
    getSupply: // 01_39
    `<ul>
        <li><code>total: &lt;u64&gt;</code> - Total supply in lamports</li>
        <li><code>circulating: &lt;u64&gt;</code> - Circulating supply in lamports</li>
        <li><code>nonCirculating: &lt;u64&gt;</code> - Non-circulating supply in lamports</li>
        <li><code>nonCirculatingAccounts: &lt;array&gt;</code> - an array of account addresses of non-circulating accounts, as strings. If <code>excludeNonCirculatingAccountsList</code> is enabled, the returned array will be empty.</li>
    </ul>`,
    getTokenAccountBalance: // 01_40
    `<ul>
        <li><code>amount: &lt;string&gt;</code> - the raw balance without decimals, a string representation of u64</li>
        <li><code>decimals: &lt;u8&gt;</code> - number of base 10 digits to the right of the decimal place</li>
        <li><code>uiAmount: &lt;number|null&gt;</code> - the balance, using mint-prescribed decimals <strong>DEPRECATED</strong></li>
        <li><code>uiAmountString: &lt;string&gt;</code> - the balance as a string, using mint-prescribed decimals</li>
    </ul>`,
    getTokenAccountsByDelegate: // 01_41
    `<ul>
        <li><code>pubkey: &lt;string&gt;</code> - the account Pubkey as base-58 encoded string</li>
        <li><code>account: &lt;object&gt;</code> - a JSON object, with the following sub fields:
        <ul>
            <li><code>lamports: &lt;u64&gt;</code> - number of lamports assigned to this account, as a u64</li>
            <li><code>owner: &lt;string&gt;</code> - base-58 encoded Pubkey of the program this account has been assigned to</li>
            <li><code>data: &lt;object&gt;</code> - Token state data associated with the account, either as encoded binary data or in JSON format <code>{&lt;program&gt;: &lt;state&gt;}</code></li>
            <li><code>executable: &lt;bool&gt;</code> - boolean indicating if the account contains a program (and is strictly read-only)</li>
            <li><code>rentEpoch: &lt;u64&gt;</code> - the epoch at which this account will next owe rent, as u64</li>
            <li><code>size: &lt;u64&gt;</code> - the data size of the account</li>
        </ul>
        </li>
    </ul>`,
    getTokenAccountsByOwner: // 01_42
    `<ul>
        <li><code>pubkey: &lt;string&gt;</code> - the account Pubkey as base-58 encoded string</li>
        <li><code>account: &lt;object&gt;</code> - a JSON object, with the following sub fields:
        <ul>
            <li><code>lamports: &lt;u64&gt;</code> - number of lamports assigned to this account, as a u64</li>
            <li><code>owner: &lt;string&gt;</code> - base-58 encoded Pubkey of the program this account has been assigned to</li>
            <li><code>data: &lt;object&gt;</code> - Token state data associated with the account, either as encoded binary data or in JSON format <code>{&lt;program&gt;: &lt;state&gt;}</code></li>
            <li><code>executable: &lt;bool&gt;</code> - boolean indicating if the account contains a program (and is strictly read-only)</li>
            <li><code>rentEpoch: &lt;u64&gt;</code> - the epoch at which this account will next owe rent, as u64</li>
            <li><code>size: &lt;u64&gt;</code> - the data size of the account</li>
        </ul>
        </li>
    </ul>`,
    getTokenLargestAccounts: // 01_43
    `<ul>
        <li><code>address: &lt;string&gt;</code> - the address of the token account</li>
        <li><code>amount: &lt;string&gt;</code> - the raw token account balance without decimals, a string representation of u64</li>
        <li><code>decimals: &lt;u8&gt;</code> - number of base 10 digits to the right of the decimal place</li>
        <li><code>uiAmount: &lt;number|null&gt;</code> - the token account balance, using mint-prescribed decimals <strong>DEPRECATED</strong></li>
        <li><code>uiAmountString: &lt;string&gt;</code> - the token account balance as a string, using mint-prescribed decimals</li>
    </ul>`,
    getTokenSupply: // 01_44
    `<ul>
        <li><code>amount: &lt;string&gt;</code> - the raw total token supply without decimals, a string representation of u64</li>
        <li><code>decimals: &lt;u8&gt;</code> - number of base 10 digits to the right of the decimal place</li>
        <li><code>uiAmount: &lt;number|null&gt;</code> - the total token supply, using mint-prescribed decimals <strong>DEPRECATED</strong></li>
        <li><code>uiAmountString: &lt;string&gt;</code> - the total token supply as a string, using mint-prescribed decimals</li>
    </ul>`,
    getTransaction: // 01_45
    `<ul>
    <li><code>&lt;null&gt;</code> - if transaction is not found or not confirmed</li>
    <li><code>&lt;object&gt;</code> - if transaction is confirmed, an object with the following fields:
        <ul>
            <li><code>slot: &lt;u64&gt;</code> - the slot this transaction was processed in</li>
            <li><code>transaction: &lt;object|[string,encoding]&gt;</code> -
                <a href="/ko/docs/rpc/json-structures#transactions">Transaction</a> object, either in JSON
                format or encoded binary data, depending on encoding parameter
            </li>
            <li><code>blockTime: &lt;i64|null&gt;</code> - estimated production time, as Unix timestamp
                (seconds since the Unix epoch) of when the transaction was processed. null
                if not available</li>
            <li><code>meta: &lt;object|null&gt;</code> - transaction status metadata object:
                <ul>
                    <li><code>err: &lt;object|null&gt;</code> - Error if transaction failed, null if transaction
                        succeeded.
                        <a target="_blank"
                            href="https://docs.rs/solana-sdk/latest/solana_sdk/transaction/enum.TransactionError.html">TransactionError
                            definitions</a>
                    </li>
                    <li><code>fee: &lt;u64&gt;</code> - fee this transaction was charged, as u64 integer</li>
                    <li><code>preBalances: &lt;array&gt;</code> - array of u64 account balances from before the
                        transaction was processed</li>
                    <li><code>postBalances: &lt;array&gt;</code> - array of u64 account balances after the
                        transaction was processed</li>
                    <li><code>innerInstructions: &lt;array|null&gt;</code> - List of
                        <a href="/ko/docs/rpc/json-structures#inner-instructions">inner instructions</a> or
                        <code>null</code> if inner instruction recording was not enabled during this
                        transaction
                    </li>
                    <li><code>preTokenBalances: &lt;array|undefined&gt;</code> - List of
                        <a href="/ko/docs/rpc/json-structures#token-balances">token balances</a> from before the
                        transaction was processed or omitted if token balance recording was not
                        yet enabled during this transaction
                    </li>
                    <li><code>postTokenBalances: &lt;array|undefined&gt;</code> - List of
                        <a href="/ko/docs/rpc/json-structures#token-balances">token balances</a> from after the
                        transaction was processed or omitted if token balance recording was not
                        yet enabled during this transaction
                    </li>
                    <li><code>logMessages: &lt;array|null&gt;</code> - array of string log messages or <code>null</code>
                        if
                        log message recording was not enabled during this transaction</li>
                    <li>DEPRECATED: <code>status: &lt;object&gt;</code> - Transaction status
                        <ul>
                            <li><code>"Ok": &lt;null&gt;</code> - Transaction was successful</li>
                            <li><code>"Err": &lt;ERR&gt;</code> - Transaction failed with TransactionError</li>
                        </ul>
                    </li>
                    <li><code>rewards: &lt;array|null&gt;</code> - transaction-level rewards, populated if rewards
                        are requested; an array of JSON objects containing:
                        <ul>
                            <li><code>pubkey: &lt;string&gt;</code> - The public key, as base-58 encoded string, of the
                                account that received the reward</li>
                            <li><code>lamports: &lt;i64&gt;</code>- number of reward lamports credited or debited by the
                                account, as a i64</li>
                            <li><code>postBalance: &lt;u64&gt;</code> - account balance in lamports after the reward was
                                applied</li>
                            <li><code>rewardType: &lt;string&gt;</code> - type of reward: currently only "rent", other
                                types may be added in the future</li>
                            <li><code>commission: &lt;u8|undefined&gt;</code> - vote account commission when the reward
                                was credited, only present for voting and staking rewards</li>
                        </ul>
                    </li>
                    <li><code>loadedAddresses: &lt;object|undefined&gt;</code> - Transaction addresses loaded from
                        address lookup tables. Undefined if <code>maxSupportedTransactionVersion</code> is
                        not set in request params, or if <code>jsonParsed</code> encoding is set in request
                        params.
                        <ul>
                            <li><code>writable: &lt;array[string]&gt;</code> - Ordered list of base-58 encoded addresses
                                for writable loaded accounts</li>
                            <li><code>readonly: &lt;array[string]&gt;</code> - Ordered list of base-58 encoded addresses
                                for readonly loaded accounts</li>
                        </ul>
                    </li>
                    <li><code>returnData: &lt;object|undefined&gt;</code> - the most-recent return data generated
                        by an instruction in the transaction, with the following fields:
                        <ul>
                            <li><code>programId: &lt;string&gt;</code> - the program that generated the return data, as
                                base-58 encoded Pubkey</li>
                            <li><code>data: &lt;[string, encoding]&gt;</code> - the return data itself, as base-64
                                encoded binary data</li>
                        </ul>
                    </li>
                    <li><code>computeUnitsConsumed: &lt;u64|undefined&gt;</code> - number of
                        <a href="/ko/docs/core/fees#compute-budget">compute units</a> consumed by the
                        transaction
                    </li>
                </ul>
            </li>
            <li><code>version: &lt;"legacy"|number|undefined&gt;</code> - Transaction version. Undefined if
                <code>maxSupportedTransactionVersion</code> is not set in request params.
            </li>
        </ul>
    </li>
    </ul>`,
    getTransactionCount: // 01_46
    `<p><code>&lt;u64&gt;</code> - the current Transaction count from the ledger</p>`,
    getVersion: // 01_47
    `<ul>
        <li><code>solana-core</code> - software version of solana-core as a <code>string</code></li>
        <li><code>feature-set</code> - unique identifier of the current software's feature set as a <code>u32</code></li>
    </ul>`,
    getVoteAccounts: // 01_48
    `<ul>
        <li><code>votePubkey: &lt;string&gt;</code> - Vote account address, as base-58 encoded string</li>
        <li><code>nodePubkey: &lt;string&gt;</code> - Validator identity, as base-58 encoded string</li>
        <li><code>activatedStake: &lt;u64&gt;</code> - the stake, in lamports, delegated to this vote account and active in this epoch</li>
        <li><code>epochVoteAccount: &lt;bool&gt;</code> - bool, whether the vote account is staked for this epoch</li>
        <li><code>commission: &lt;number&gt;</code> - percentage (0-100) of rewards payout owed to the vote account</li>
        <li><code>lastVote: &lt;u64&gt;</code> - Most recent slot voted on by this vote account</li>
        <li><code>epochCredits: &lt;array&gt;</code> - Latest history of earned credits for up to five epochs, as an array of arrays containing: <code>[epoch, credits, previousCredits]</code>.</li>
        <li><code>rootSlot: &lt;u64&gt;</code> - Current root slot for this vote account</li>
    </ul>`,
    getIsBlockhashValid: // 01_49
    `<p><code>&lt;bool&gt;</code> - <code>true</code> if the blockhash is still valid</p>`,
    getMinimumLedgerSlot: // 01_50
    `<p><code>u64</code> - Minimum ledger slot number</p>`,
    requestAirdrop: // 01_51
    `<p><code>&lt;string&gt;</code> - Transaction Signature of the airdrop, as a base-58 encoded string</p>`,
}