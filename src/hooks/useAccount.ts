import { useEffect, useMemo, useState } from "react";
import { Account } from "classes/Account";
import { useChain } from "./useChain";
import { useWallet } from "./useWallet";

export const useAccount = () => {
  const [account, setAccount] = useState<Account>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const chain = useChain();
  const wallet = useWallet();

  const connect = useMemo(() => () => wallet.connect(chain), [chain, wallet]);
  const disconnect = useMemo(() => () => wallet.disconnect(chain), [chain, wallet]);
  useEffect(() => {
    const onWalletUpdate = async () => {
      setLoading(true);
      try {
        const address = await wallet.getAddress(chain.config.chainId);
        const signer = await wallet.getSigner(chain.config.chainId);
        setAccount(new Account({
          chain,
          address,
          signer,
        }));
      } catch (e) {
        setAccount(undefined);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    wallet.onUpdate(onWalletUpdate);
    return () => wallet.offUpdate(onWalletUpdate);
  }, [chain, wallet]);

  return {
    account,
    connect,
    disconnect,
    error,
    isConnecting: loading,
    isConnected: !!account,
  };
};
