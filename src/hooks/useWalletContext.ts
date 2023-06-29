/* eslint-disable consistent-return */
import { useAccount, useSigningClients } from "graz";
import { useMemo } from "react";

export const useWalletContext = () => {
  const { data: account } = useAccount();
  const { data: signingClients } = useSigningClients();
  return useMemo(() => {
    if (!account || !signingClients) {
      return;
    }
    return {
      account,
      signingClients,
    };
  }, [account, signingClients]);
};

export type WalletContext = NonNullable<ReturnType<typeof useWalletContext>>;
