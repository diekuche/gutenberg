import { Coin } from "@cosmjs/stargate";
import { CYBER, configKeplr } from "./config";
// import { SigningCyberClient } from "@cybercongress/cyber-js";
// import { GasPrice } from "@cosmjs/launchpad";
// import { calculateFee } from "@cosmjs/stargate";


export const sendBoot = async (
  senderAddress: string,
  recepientAddress: string,
  amount: readonly Coin[]
) => {
  return true;
  // if (window.keplr) {
  //   const signer = window.keplr.getOfflineSigner(CYBER.CHAIN_ID);
  //   const options = { prefix: CYBER.BECH32_PREFIX_ACC_ADDR_CYBER };
  //   const client = await SigningCyberClient.connectWithSigner(
  //     CYBER.CYBER_NODE_URL_API,
  //     signer,
  //     options
  //   );
  //   const gasPrice = GasPrice.fromString("0.001boot") as any;
  //   return await client.sendTokens(
  //     senderAddress,
  //     recepientAddress,
  //     amount,
  //     calculateFee(400000, gasPrice)
  //   );
  // }
};

export const initKeplr = async () => {
  if (window.keplr) {
    await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
    await window.keplr.enable(CYBER.CHAIN_ID);
  }
}