import { Chain } from "classes/Chain";
import { NativeTokenDetails } from "types/tokens";
import { nativeTokenDetails } from "utils/tokens";

export const NATIVE_TOKEN_DETAILS = (denom: { native: string }) => ({
  queryKey: `v0.1/native/${denom.native}/details`,
  queryFn: async ({ chain }: {
    chain: Chain
  }): Promise<NativeTokenDetails> => {
    const bank = await chain.bank();
    const native = await bank.denomMetadata(denom.native);
    return nativeTokenDetails(native);
  },
});

export const CHAIN_DENOMS_METADATA = () => ({
  queryKey: "/denoms/metadata",
  queryFn: async ({ chain }:{ chain: Chain }) => {
    const bank = await chain.bank();
    return bank.denomsMetadata();
  },
});
