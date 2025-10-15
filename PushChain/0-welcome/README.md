Push Chain is the first True Universal Layer 1 blockchain, built as a 100% EVM-compatible Proof of Stake (PoS) chain. **Deploy your Solidity smart contract once on Push Chain and instantly reach users on Ethereum, Base, Arbitrum, Optimism, Solana, and other supported chains without changing on-chain code.**

Before we start, let's understand some important concepts of Push Chain.

## Fee Abstraction and Cross-Chain Execution

Push Chain lets users execute contracts without holding $PC (Push Chain native token). Instead, users can initiate transactions from their source chains, such as Ethereum, Base or Solana, and pay gas fees in their native tokens like ETH or SOL.

When a user signs a transaction from a source chain such as Ethereum, Base or Solana, the orchestrator deploys a smart wallet (UEA) on Push Chain for that user, locks the required gas fees in their native tokens, and executes the contract on Push Chain using the signed payload.

**Your users interact exactly as they would on their home chain**, with no additional steps.

Learn more in <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/important-concepts/#fee-abstraction-and-cross-chain-execution" target="_blank">Important Concepts → Fee Abstraction and Cross-Chain Execution</a>.

## Account Types

As an EVM-compatible Universal Layer 1 blockchain, Push Chain naturally supports standard Ethereum accounts:

- **Externally Owned Accounts (EOAs)**<br />
  Standard private-key-controlled addresses (e.g. MetaMask wallets).

- **Smart Contract Accounts (Smart Accounts)**<br />
  On-chain contracts that hold logic (e.g. multisigs, social recovery wallets).

> Additionally, Push Chain innovates by introducing:

- **Universal Executor Accounts (UEAs)**<br />
  Proxy accounts that represent external chain wallets (users) on Push Chain.
  UEAs let Ethereum, Base, Arbitrum, Optimism, Solana, and other wallets execute Push Chain logic without the need for a native Push Chain wallet. This significantly enhances accessibility and overal UX.

- **Universal Origin Accounts (UOAs)**<br />
  The original source-chain wallet in chain agnostic address format that is behind each UEA.
  UOAs let you attribute activity back to the user’s home chain.

Learn more in <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/important-concepts/#account-types-on-push-chain" target="_blank">Important Concepts → Account Types on Push Chain</a>.

## Universal Transactions

Universal transactions are a core feature of Push Chain that enables **native transactions from any Layer 1 chain**—EVM or non-EVM, including Push Chain itself—without requiring wrapping, bridging, or additional tooling.

### How Universal Transactions Work

When you send a universal transaction, the Push Chain SDK automatically:

1. **Detects your origin chain** (Ethereum, Base, Arbitrum, Optimism, Solana, etc.)
2. **Estimates gas costs** and orchestrates signatures
3. **Executes the transaction** on Push Chain using your Universal Executor Account (UEA)

This means you can focus on building your application logic rather than dealing with complex cross-chain infrastructure.

Learn more in <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/build/send-universal-transaction/" target="_blank">PushChain Documentation - Send Universal Transaction</a>.
