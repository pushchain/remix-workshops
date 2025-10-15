In this step, we provide a minimal Solidity contract `UEAFactoryDemo.sol` that demonstrates how to call two essential Push Chain `UEAFactory` functions from on-chain code:

- **`getOriginForUEA()`** - Determines if an address is a native Push Chain account or a Universal Executor Account (UEA) representing an external chain user, and returns the source chain identity information
- **`getUEAForOrigin()`** - Computes the deterministic UEA address for any Universal Account and checks its deployment status on Push Chain

## What the contract does

- Exposes a function named `discoverOrigin()` that calls `getOriginForUEA(msg.sender)` on the `UEAFactory` at `0x00000000000000000000000000000000000000eA` and returns the origin `UniversalAccountId` plus a boolean indicating whether the caller (`msg.sender`) is a Universal Executor Account (UEA).
- Exposes a function named `discoverUEAForOrigin(UniversalAccountId)` that calls `getUEAForOrigin(account)` on the same `UEAFactory` and returns the deterministic `uea` address and `isDeployed` status for that Universal Account.

## Notes

- The `UEAFactory` address is the predeployed contract used by Push Chain.
- If you want to compare with a more feature-rich example, check the <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/tutorials/tutorial-universal-counter/" target="_blank">Universal Counter tutorial</a> which includes a React app with an interface for interacting with the contract.
- `getUEAForOrigin` can return a deterministic UEA address even if the account is not yet deployed (`isDeployed == false`).

## Sample responses

- `discoverOrigin()` returns:

```json
[["eip155","11155111","0xfd6c2fe69be13d8be379ccb6c9306e74193ec1a9"], true]
```

- `discoverUEAForOrigin(UniversalAccountId)` returns:

```json
["0x3445AEE60c70c9f5A947A28B879ca6B449B0a4ce", false]
```

## References

- Tutorial example: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/tutorials/tutorial-universal-counter/" target="_blank">Universal Counter (contract calling getOriginForUEA)</a>
- Concepts: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/important-concepts/#account-types-on-push-chain" target="_blank">Account types on Push Chain</a>
- Contract Helpers: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/build/contract-helpers/#ueafactory--getoriginforuea" target="_blank">UEAFactory → getOriginForUEA</a>
- Contract Helpers: <a href="https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/build/contract-helpers/#ueafactory--getueafororigin" target="_blank">UEAFactory → getUEAForOrigin</a>
