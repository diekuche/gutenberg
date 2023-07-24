import { Account } from "classes/Account";
import { Chain } from "classes/Chain";
import { GasLimit } from "config/cosmwasm";
import {
  MsgBurn, MsgCreateDenom, MsgMint, MsgSetDenomMetadata,
} from "tokenfactory";

export const TOKENFACTORY_UPDATE_METADATA = async (
  chain: Chain,
  account: Account,
  metadata: MsgSetDenomMetadata["metadata"],
) => {
  const signingStargateClient = await chain.getSigningStargateClient(account.signer);
  console.log(`Set metadata for ${metadata.base}`);
  const message: MsgSetDenomMetadata = {
    sender: account.address,
    metadata,
  };
  console.log("message", message);
  const res = await signingStargateClient.signAndBroadcast(account.address, [{
    typeUrl: "/osmosis.tokenfactory.v1beta1.MsgSetDenomMetadata",
    value: message,
  }], chain.calculateFee(GasLimit.TokenFactoryUpdateMetaData));
  console.log("Factory token update denom metadata result", res);
  if (res.code !== 0) {
    throw new Error(res.rawLog || "Unknown error");
  }
};

export const TOKENFACTORY_CREATE = async (
  chain: Chain,
  account: Account,
  subdenom: string,
) => {
  const signingStargateClient = await chain.getSigningStargateClient(account.signer);
  console.log(`Create tokenfactory ${subdenom}`);
  const message: MsgCreateDenom = {
    sender: account.address,
    subdenom,
  };
  const res = await signingStargateClient.signAndBroadcast(account.address, [{
    typeUrl: "/osmosis.tokenfactory.v1beta1.MsgCreateDenom",
    value: message,
  }], chain.calculateFee(GasLimit.TokenFactoryCreateDenom));
  console.log("Factory token create result", res);
  if (res.code !== 0) {
    throw new Error(res.rawLog || "Unknown error");
  }
  return {
    denom: res.events.filter((e) => e.type === "create_denom")[0].attributes.filter((a) => a.key === "new_token_denom")[0].value,
  };
};

export const TOKENFACTORY_MINT = async (
  chain: Chain,
  account: Account,
  denom: string,
  amount: string,
  mintToAddress?: string,
) => {
  const signingStargateClient = await chain.getSigningStargateClient(account.signer);
  const message: MsgMint = {
    sender: account.address,
    mintToAddress: mintToAddress || account.address,
    amount: {
      denom,
      amount,
    },
  };
  const res = await signingStargateClient.signAndBroadcast(account.address, [{
    typeUrl: "/osmosis.tokenfactory.v1beta1.MsgMint",
    value: message,
  }], chain.calculateFee(GasLimit.TokenFactoryMint));
  console.log("Factory token mint result", res);
  if (res.code !== 0) {
    throw new Error(res.rawLog || "Unknown error");
  }
};

export const TOKENFACTORY_BURN = async (
  chain: Chain,
  account: Account,
  denom: string,
  amount: string,
) => {
  const signingStargateClient = await chain.getSigningStargateClient(account.signer);
  const message: MsgBurn = {
    sender: account.address,
    burnFromAddress: account.address,
    amount: {
      denom,
      amount,
    },
  };
  const res = await signingStargateClient.signAndBroadcast(account.address, [{
    typeUrl: "/osmosis.tokenfactory.v1beta1.MsgBurn",
    value: message,
  }], chain.calculateFee(GasLimit.TokenFactoryBurn));
  console.log("Factory token burn result", res);
  if (res.code !== 0) {
    throw new Error(res.rawLog || "Unknown error");
  }
};
