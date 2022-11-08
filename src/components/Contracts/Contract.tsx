import React from "react";
import styles from "./Contract.module.css";
import { useState, useEffect } from "react";
import { getContractInfo, getAddress } from "../../utils/wallet";
import Collapsible from "../Collapsible/Collapsible";
import { v4 as uuidv4 } from "uuid";

interface ContractDataProps {
  contractAddress: string;
}

interface ContractData {
  token: string;
  balance: string;
  logo: string;
  marketingAddress: string;
}

const sendBalance = {
  id: uuidv4(),
  recepient: "",
  amount: "",
};

export function Contract({ contractAddress }: ContractDataProps) {
  const [contractData, setContractData] = useState<ContractData>();
  const [balances, setBalances] = useState<Array<typeof sendBalance>>([
    sendBalance,
  ]);

  const handleChange =
    (id: string, name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalances(
        balances.map((balance) => {
          if (balance.id === id) {
            return {
              ...balance,
              [name]: event.target.value,
            };
          } else {
            return balance;
          }
        })
      );
    };

  useEffect(() => {
    async function fetchContracts() {
      const address = (await getAddress()) as string;
      const response = await getContractInfo(contractAddress, address);
      if (response !== undefined) {
        setContractData({
          token: response.symbol,
          balance: response.balance,
          logo: response.logo.url,
          marketingAddress: response.marketing,
        });
      }
    }
    fetchContracts();
  }, [contractAddress]);

  return (
    <>
      {contractData ? (
        <div>
          <div className={styles.line}></div>
          <div className={styles.cashName}>
            <Collapsible
              title={
                contractData.logo && contractData.logo.length > 10 ? (
                  <>
                    <img
                      src={contractData.logo}
                      alt="icon"
                      className={styles.logo}
                    ></img>
                    <div className={styles.token}>{contractData.token}</div>
                    <div className={styles.balance}>{contractData.balance}</div>
                  </>
                ) : (
                  <>
                    {contractData.logo}
                    <div className={styles.token}>{contractData.token}</div>
                    <div className={styles.balance}>{contractData.balance}</div>
                  </>
                )
              }
            >
              <>
                <input
                  type="text"
                  className={styles.addContract}
                  id="recepient"
                  value={sendBalance.recepient}
                  onChange={handleChange(sendBalance.id, "recepient")}
                />
                <input
                  type="text"
                  id="amount"
                  className={styles.addContract}
                  value={sendBalance.amount}
                  onChange={handleChange(sendBalance.id, "amount")}
                />
              </>
            </Collapsible>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Contract;
