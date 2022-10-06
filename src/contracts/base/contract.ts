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
}

export const initContract = async ({
  name,
  symbol,
  quantity,
  decimals,
  logo,
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
      initial_balances: 10,
      mint: {
        minter: address,
        cap: parseInt(quantity, 10),
      },
      marketing: {
        project: "My Awesome Project",
        description: "This is my awesome contract project",
        marketing: address,
        logo: {
          url: logo || "https://toppng.com/uploads/preview/sample-logo-11551056375txoo49urn6.png",
        },
      },
    };
    
    client
        .instantiate(
          address,
          5,
          data,
          data.name,
          calculateFee(600000, gasPrice)
        )
        .then((result) => {
          console.log("success", result);
        })
        .catch((err) => {
          console.log("err", err);
          alert(err);
        });
  }
}