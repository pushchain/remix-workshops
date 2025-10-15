Push Chain is a True Universal Layer 1 that is 100% EVM-compatible. **That means you can deploy your existing Solidity contracts to Push Chain with zero on-chain code changes: same Solidity, same ABI, same bytecode. Simply switch your deployment network to Push Chain and deploy as you would on any other EVM.**

Learn more in the official docs: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/" target="_blank">Intro to Push Chain</a>.

## Why deploy on Push Chain?

- **Zero code changes (EVM compatible)**: Push Chain is fully EVM-compatible, so you don’t need to modify your contracts to deploy here.
- **Instant multi-chain users, no bridges**: By deploying on Push Chain, you instantly reach users from all chains that Push Chain is connected to—without changing your on-chain code. Users can interact from Ethereum, Base, Arbitrum, Optimism, Solana, and other supported chains.
- **Universal wallet and fee abstraction**: Users can connect with popular wallets (MetaMask, Phantom, etc.) and even pay fees in their native token. No need for users to hold a special gas token.
- **Origin-aware transactions (True Universal L1)**: Push Chain natively links each transaction to its origin chain and originating address, so your contracts and apps can know where a call came from.

## How origin awareness works

Because Push Chain is a True Universal L1, transactions maintain their origin metadata:

- Origin chain namespace and chain ID
- Origin account/address on that chain

You can access this in two ways:

1. From Solidity using contract helpers

- See the next section `Universal Account Discovery with Solidity` for how to use the on-chain UEA Factory interface to discover the origin of the caller from Solidity.

2. From JavaScript using client helpers

- See the section `JavaScript UEAFactory Helper Scripts` for scripts that resolve origin <-> UEA mappings from JavaScript.

These helpers let your dApp attribute actions to the correct origin chain and address.

## Deploying to Push Chain

Push Chain behaves like any other EVM for deployment. Typical flows work out of the box. Just configure Push Chain RPC and chain info, and deploy.

1. Configure your tool with Push Chain RPC
   - Add Push Chain network to your deployment config (RPC URL, chain ID, currency symbol, etc.).
2. Compile your contracts as usual
   - No Solidity changes are required.
3. Switch network to Push Chain
   - In your wallet or in your tool’s network config, select Push Chain.
4. Deploy
   - Use your standard deploy command.

For step-by-step guides across Remix, Hardhat, and Foundry, see: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/setup/smart-contract-environment/" target="_blank">Smart Contract Environment</a>.

That’s it—your contract is live on Push Chain and immediately accessible to users coming from other supported chains.

## Push Chain Donut Testnet configuration

Use the following network details when deploying to Push Chain Donut Testnet. See full specs in the docs: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/setup/chain-config/" target="_blank">Chain Configuration</a>.

- Network Name: Push Chain Donut Testnet
- RPC URLs:
  - `https://evm.rpc-testnet-donut-node1.push.org/`
  - `https://evm.rpc-testnet-donut-node2.push.org/`
- Chain ID: 42101
- Currency Symbol: PC
- Block Explorer: `https://donut.push.network`
- Faucet: `https://faucet.push.org/`
