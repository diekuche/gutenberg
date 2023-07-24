import { Chain } from "classes/Chain";
import { NativeTokenDetails } from "types/tokens";

export const NATIVE_TOKEN_DETAILS = (denom: string) => ({
  queryKey: `v0.01/native/${denom}/details`,
  queryFn: async ({ chain }: {
    chain: Chain
  }): Promise<NativeTokenDetails> => {
    const isFactoryToken = denom.toLowerCase().startsWith("factory/");
    const bank = await chain.bank();
    const meta = await bank.denomMetadata(denom).catch(() => null);
    const minMetaDenom = meta ? meta.denomUnits.find((u) => u.exponent === 0) : null;

    if (isFactoryToken) {
      if (!meta) {
        throw new Error(`Not found factory token metadata for ${denom}`);
      }
      return {
        type: "native",
        denom,
        decimals: minMetaDenom?.exponent || 0,
        symbol: meta.symbol,
      };
    }

    const native = chain.config.currencies.find(
      (currency) => currency.coinMinimalDenom === denom,
    );

    if (native) {
      return {
        type: "native",
        logo: native.coinImageUrl,
        denom: meta ? meta.base : native.coinDenom,
        minimalDenom: minMetaDenom?.denom || native.coinMinimalDenom,
        decimals: minMetaDenom?.exponent || native.coinDecimals,
        symbol: meta?.symbol || native.coinDenom,
      };
    }
    return {
      type: "native",
      logo: "",
      denom,
      decimals: 0,
      symbol: denom,
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
