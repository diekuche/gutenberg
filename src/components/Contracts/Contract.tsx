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
  const [balances, setBalances] = useState<typeof sendBalance>(sendBalance);

  const handleSendChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalances({
        ...balances,
        [name]: event.target.value,
      });
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
    setBalances({ recepient: "", amount: "" });
  }

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

  useEffect(() => {
    fetchContracts();
    if (isVisible === true) {
      setContractData(contractData);
    }
  }, [contractAddress, isVisible]);

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
          {open && (
            <div className={styles.children}>
              <div className={styles.label}>Recepient:</div>
              <input
                type="text"
                className={styles.addContract}
                value={balances.recepient}
                onChange={handleSendChange("recepient")}
              />
              <div className={styles.label}>Amount:</div>
              <input
                type="text"
                className={styles.addContract}
                value={balances.amount}
                onChange={handleSendChange("amount")}
              />
              <div className={styles.liner}></div>
              <Button
                color="white"
                type="button"
                size="lg"
                onClick={(e: any) =>
                  getTokensSent(
                    contractAddress,
                    balances.recepient,
                    balances.amount
                  )
                }
              >
                Send
              </Button>
            </div>
          )}
          {isVisible && <div className={styles.info}>sent!</div>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Contract;
