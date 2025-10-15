On this section, we will build the `UniversalCounter.sol` contract, a Push Chain smart contract that keeps separate counters for callers from different origin chains and a total across all chains.

## What it does

- **Per‑chain counts**: Maintains `countEth`, `countSol`, and `countPC` (Push Chain natives).
- **Universal caller detection**: Identifies if `msg.sender` is a native Push Chain EOA or a Universal Executor Account (UEA) representing an external chain user.
- **Chain‑aware increment**: `increment()` updates only the counter for the caller’s origin chain and emits a `CountIncremented` event.

## How it works

1. On `increment()`, the contract calls `IUEAFactory(0x00000000000000000000000000000000000000eA).getOriginForUEA(msg.sender)` to retrieve:
   - `UniversalAccountId { chainNamespace, chainId, owner }`
   - `isUEA` indicating whether the caller is an external-chain user (true) or a native Push EOA (false)
2. If `isUEA == false`, it increments `countPC` (native Push Chain caller).
3. If `isUEA == true`, it hashes `(chainNamespace, chainId)` and matches against known chains:
   - Solana Devnet: `("solana", "EtWTRABZaYq6iMfeYKouRu166VU2xqa1") → countSol++`
   - Ethereum Sepolia: `("eip155", "11155111") → countEth++`
4. Any other chain combination reverts with `"Invalid chain"`.

This behavior is natively supported by Push Chain via the UEA system—no external bridges, oracles, or third‑party messaging are needed.

## Public interface

- `function increment() public` — Updates the appropriate per‑chain counter based on caller origin; emits `CountIncremented`.
- `function reset() public` — Resets `countEth`, `countSol`, and `countPC` to zero.
- `function getCount() public view returns (uint256)` — Returns the total across all chains.
- Public getters: `countEth()`, `countSol()`, `countPC()`.
- `event CountIncremented(uint256 newCount, address indexed caller, string chainNamespace, string chainId)` — Emitted after each successful increment.

## Reference

- For a complete tutorial with a built UI, visit: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/tutorials/tutorial-universal-counter/" target="_blank">Universal Counter App</a>
