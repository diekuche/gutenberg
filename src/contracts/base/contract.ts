import { CYBER } from "../../utils/config";
import { calculateFee } from "@cosmjs/stargate";
import { GasPrice } from "@cosmjs/launchpad";
import {
  SigningCyberClient,
} from "@cybercongress/cyber-js";

type Params = {
  name: string;
  symbol: string;
  quantity: string;
  decimals: string;
  logo: string;
  initialBalance: Array<{
    address: string,
    amount: string,
  }>
  description?: string;
}

export const initContract = async ({
  name,
  symbol,
  quantity,
  decimals,
  logo,
  initialBalance = [],
  description,
}: Params) => {
  if (window.keplr) {
    const offlineSigner = window.keplr.getOfflineSigner(CYBER.CHAIN_ID);
    const [{ address }] = await offlineSigner.getAccounts();
    const gasPrice = GasPrice.fromString("0.001boot") as any;
    
    const options = { prefix: CYBER.BECH32_PREFIX_ACC_ADDR_CYBER };
    const client = await SigningCyberClient.connectWithSigner(
      CYBER.CYBER_NODE_URL_API,
      offlineSigner,
      options
    ); 
    const data = {
      name,
      symbol,
      decimals: parseInt(decimals, 10),
      initial_balances: initialBalance,
      mint: {
        minter: address,
        cap: quantity,
      },
      marketing: {
        project: "",
        description: description,
        marketing: address,
        logo: {
          url: logo,
        },
      },
    };
    
    client
        .instantiate(
          address,
          1,
          data,
          data.name,
          calculateFee(600000, gasPrice)
        )
        .then((result) => {
          console.log("success", result);
          alert(`success: ${result.transactionHash}`)
        })
        .catch((err) => {
          console.log("err", err);
          alert(err);
        });
  }
}