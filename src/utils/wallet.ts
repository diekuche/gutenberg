import { Coin, StargateClient } from "@cosmjs/stargate";
import { configKeplr, CYBER } from "./config";
import { SigningCyberClient } from "@cybercongress/cyber-js";
import { GasPrice } from "@cosmjs/launchpad";
import { calculateFee } from "@cosmjs/stargate";


export const initKeplr = async () => {
  if (window.keplr) {
    await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
    await window.keplr.enable(CYBER.CHAIN_ID);
  }
}


export const getAddress = async () => {
  if (window.keplr) {
    const offlineSigner = window.keplr.getOfflineSigner(CYBER.CHAIN_ID);
    const [{ address }] = await offlineSigner.getAccounts();
    return address;
  }
};

export const getBalance = async () => {
  if (window.keplr) {
    const client = await StargateClient.connect(CYBER.CYBER_NODE_URL_API);

    const address = await getAddress();
    if (address) {
      const balances = await client.getAllBalances(address);
      return balances?.filter((balance) => balance.denom === "boot")[0]?.amount;
    }
  }
};

export const getDisconnected = async () => {
  if (window.keplr) {
    const client = await StargateClient.connect(CYBER.CYBER_NODE_URL_API);
    if (client) {
      const result = await client.disconnect();
      return console.log("disconnected", result);
    }
  }
};

export const sendTokens = async (
  contractAddress: string,
  recipient: string,
  amount: string
) => {
  const address = await getAddress();
  if (window.keplr && address) {
    const signer = window.keplr.getOfflineSigner(CYBER.CHAIN_ID);
    const options = { prefix: CYBER.BECH32_PREFIX_ACC_ADDR_CYBER };
    const client = await SigningCyberClient.connectWithSigner(
      CYBER.CYBER_NODE_URL_API,
      signer,
      options
    );
    const gasPrice = GasPrice.fromString("0.001boot") as any;
    return await client.execute(
      address,
      contractAddress,
      {
        transfer: {
          recipient,
          amount,
        },
      },
      calculateFee(400000, gasPrice)
    );
  }
};

export const sendBoot = async (
  senderAddress: string,
  recepientAddress: string,
  amount: readonly Coin[]
) => {
  const address = await getAddress();
  if (window.keplr && address) {
    const signer = window.keplr.getOfflineSigner(CYBER.CHAIN_ID);
    const options = { prefix: CYBER.BECH32_PREFIX_ACC_ADDR_CYBER };
    const client = await SigningCyberClient.connectWithSigner(
      CYBER.CYBER_NODE_URL_API,
      signer,
      options
    );
    const gasPrice = GasPrice.fromString("0.001boot") as any;
    return await client.sendTokens(
      senderAddress,
      recepientAddress,
      amount,
      calculateFee(400000, gasPrice)
    );
  }
};

export const getContractAddress = async (
  txHash: string
): Promise<string | null> => {
  const regexp = /bostrom([a-z0-9]){59}/;
  let retries = 0;
  const maxRetries = 10;
  const retryDelay = 2000;
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  let result = await fetch(`https://lcd.bostrom.cybernode.ai/txs/${txHash}`);

  while (result.status === 404 && retries < maxRetries) {
    await delay(retryDelay);
    result = await fetch(`https://lcd.bostrom.cybernode.ai/txs/${txHash}`);
    retries += 1;
  }

  if (result.status === 200) {
    const json = await result.json();
    if (json && json.raw_log && json.raw_log.match) {
      return json.raw_log.match(regexp)[0];
    }
  }

  return null;
};
