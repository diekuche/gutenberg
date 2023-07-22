import { Chain } from "classes/Chain";
import { NativeTokenDetails } from "types/tokens";

export const NATIVE_TOKEN_DETAILS = (denom: string) => ({
  queryKey: `v0.1/native/${denom}/details`,
  queryFn: async ({ chain }: {
    chain: Chain
  }): Promise<NativeTokenDetails> => {
    const isFactoryToken = denom.toLowerCase().startsWith("factory/");
    if (isFactoryToken) {
      const bank = await chain.bank();
      const meta = await bank.denomMetadata(denom);
      return {
        type: "native",
        denom,
        decimals: meta.denomUnits[0].exponent,
      };
    }

    const native = chain.config.currencies.find(
      (currency) => currency.coinMinimalDenom === denom,
    );
    if (native) {
      return {

        type: "native",
        logo: native.coinImageUrl,
        denom: native.coinDenom,
        minimalDenom: native.coinMinimalDenom,
        decimals: native.coinDecimals,
      };
    }
    return {
      type: "native",
      logo: "",
      denom,
      decimals: 0,
    };
  },
});

export const CHAIN_DENOMS_METADATA = () => ({
  queryKey: "/denoms/metadata",
  queryFn: async ({ chain }:{ chain: Chain }) => {
    const bank = await chain.bank();
    return bank.denomsMetadata();
  },
});
