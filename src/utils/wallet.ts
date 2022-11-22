import { Coin, StargateClient } from "@cosmjs/stargate";
import { CYBER } from "./config";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { SigningCyberClient, CyberClient } from "@cybercongress/cyber-js";
import { GasPrice } from "@cosmjs/launchpad";
import { calculateFee } from "@cosmjs/stargate";

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

export const getContractInfo = async (
  contractAddress: string,
  address: string
) => {
  const tendermintClient = await Tendermint34Client.connect(
    CYBER.CYBER_NODE_URL_API
  );
  // @ts-ignore next-line
  const queryClient = new CyberClient(tendermintClient);
  const result = await Promise.all([
    queryClient.queryContractSmart(contractAddress, {
      balance: { address },
    }),
    queryClient.queryContractSmart(contractAddress, {
      token_info: {},
    }),
    queryClient.queryContractSmart(contractAddress, {
      marketing_info: {},
    }),
  ]);
  if (result && result.length === 3) {
    return {
      ...result[0],
      ...result[1],
      ...result[2],
    };
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
