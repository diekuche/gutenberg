import React from "react";
import styles from "./Contract.module.css";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { getContractInfo, getAddress, sendTokens } from "../../utils/wallet";
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
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const collapse = () => {
    setOpen(!open);
  };
  const [balances, setBalances] = useState<Array<typeof sendBalance>>([
    sendBalance,
  ]);

  const handleSendChange =
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

  async function getTokensSent(
    contractAddress: string,
    recepient: string,
    amount: string
  ) {
    const response = await sendTokens(contractAddress, recepient, amount);
    if (response) {
      setIsVisible(true);
    }
    setBalances([]);
  }

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
        <div className={styles.contractData}>
          <div className={styles.line}></div>
          <button type="button" onClick={collapse} className={styles.cashName}>
            {contractData.logo && contractData.logo.length > 10 ? (
              <img
                src={contractData.logo}
                alt="icon"
                className={styles.logo}
              ></img>
            ) : (
              contractData.logo
            )}
            <div className={styles.token}>{contractData.token}</div>
            <div className={styles.balance}>{contractData.balance}</div>
          </button>
          {open &&
            balances.map(({ id, recepient, amount }) => (
              <div className={styles.children} key={id}>
                <div className={styles.label}>Recepient:</div>
                <input
                  type="text"
                  className={styles.addContract}
                  value={recepient}
                  onChange={handleSendChange(id, "recepient")}
                />
                <div className={styles.label}>Amount:</div>
                <input
                  type="text"
                  className={styles.addContract}
                  value={amount}
                  onChange={handleSendChange(id, "amount")}
                />
                <div className={styles.liner}></div>
                <Button
                  color="white"
                  type="button"
                  size="lg"
                  onClick={(e: any) =>
                    getTokensSent(contractAddress, recepient, amount)
                  }
                >
                  Send
                </Button>
              </div>
            ))}
          {isVisible && <div className={styles.info}>sent!</div>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Contract;
