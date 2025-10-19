import { PushChain } from '@pushchain/core';
import { ethers } from 'ethers';

const RPC_SEPOLIA = 'https://ethereum-sepolia-rpc.publicnode.com';
const RPC_PUSH_TESTNET = 'https://evm.rpc-testnet-donut-node1.push.org/';

async function main() {
  console.log('🚀 Initializing Universal Transaction Example');

  // Define Simple Counter ABI, taking minimal ABI for the demo
  const SimpleCounterABI = [
    {
      inputs: [],
      name: 'increment',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'countPC',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  // Contract address for the Simple Counter
  const SIMPLE_COUNTER_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const pushProvider = new ethers.JsonRpcProvider(RPC_PUSH_TESTNET);

  // Prepare read-only contract instance for Push Testnet
  const counterRead = new ethers.Contract(SIMPLE_COUNTER_CONTRACT_ADDRESS, SimpleCounterABI, pushProvider);
  const countPCBefore = await counterRead.countPC();

  // 1) Create a wallet (in production, you'd use your own wallet)
  const wallet = ethers.Wallet.createRandom();
  console.log(`📝 Created wallet: ${wallet.address}`);

  // 2) Set up provider and connect wallet
  const sepoliaProvider = new ethers.JsonRpcProvider(RPC_SEPOLIA);
  const signer = wallet.connect(sepoliaProvider);

  // 3) Convert to Universal Signer
  console.log('🔄 Converting to Universal Signer...');
  const universalSigner = await PushChain.utils.signer.toUniversal(signer);

  // 4) Initialize Push Chain Client
  console.log('🔗 Initializing Push Chain Client...');
  const pushChainClient = await PushChain.initialize(universalSigner, {
    network: PushChain.CONSTANTS.PUSH_NETWORK.TESTNET,
    progressHook: (progress) => console.log(progress),
  });

  // 5) Prepare transaction parameters
  const txParams = {
    to: SIMPLE_COUNTER_CONTRACT_ADDRESS,
    value: BigInt(0),
    data: PushChain.utils.helpers.encodeTxData({
      abi: SimpleCounterABI,
      functionName: 'increment',
    }),
  };

  // wait for user to send funds first
  await waitForFunding(sepoliaProvider, wallet.address);

  // 6) Send universal transaction
  console.log(`📤 Interacting with Simple Counter contract: ${SIMPLE_COUNTER_CONTRACT_ADDRESS}`);

  try {
    // Note: This would fail in playground without funds
    // In production, ensure wallet has funds
    const txResponse = await pushChainClient.universal.sendTransaction(txParams);
    console.log(`✅ Transaction sent! Tx`);
    console.log(`🔍 View the transaction on PushScan: ${pushChainClient.explorer.getTransactionUrl(txResponse.hash)}`);
  } catch (error) {
    console.error('❌ Transaction failed:', error);
    // In playground, this will fail without funds
    console.log('Note: In playground, this might fail without funds. Ensure your wallet has PC tokens.');
  }

  // Read and log both values after attempting the universal transaction
  const countPCAfter = await counterRead.countPC();
  console.log(`🔢 countPC before: ${countPCBefore.toString()}`);
  console.log(`🔢 countPC after: ${countPCAfter.toString()}`);
}

main().catch(console.error);

async function waitForFunding(provider, address) {
  console.log(`🔔 Waiting to receive Ethereum Sepolia funds at ${address} to send the Universal Transaction...`);

  const timeout = Date.now() + 10 * 60_000; // 10 minutes
  while (Date.now() < timeout) {
    const balance = await provider.getBalance(address).catch(() => 0n);
    console.log(`💰 Current balance: ${balance.toString()} wei`);
    if (balance > 0n) return balance;
    await new Promise((r) => setTimeout(r, 5000));
  }

  throw new Error('⏱️ Timeout: No funds received. Please try again.');
}
