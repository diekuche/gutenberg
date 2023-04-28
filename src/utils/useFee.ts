import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { useAccount, useClients } from "graz";
import { useEffect} from "react";

type Chain = {
  gas?: {
    denom: string;
  };
};

export const useFee = (chain: Chain | null) => {
  const { data: account } = useAccount();
  const { data } = useClients();
  const client = data?.stargate;

  const denom = chain?.gas?.denom;

  useEffect(() => {
    if (account?.bech32Address && denom) {
      const fetchBalance = async () => {
        const balances = await client?.getAllBalances(account.bech32Address);
        if (balances?.[0]) {
          if (balances[0].denom !== denom) {
            console.error(`Denom mismatch: expected ${denom}, got ${balances[0].denom}`);
          }
        }
      };

      fetchBalance();
    }
  }, [client, account, denom]);

  if (!denom) {
    return "auto";
  }

  const gasPrice = GasPrice.fromString(`0.001${denom}`);
  return calculateFee(600000, gasPrice);
};
