import { StargateClient } from "@cosmjs/stargate";
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
