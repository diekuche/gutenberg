import React from "react";
import styles from "./Contract.module.css";
import { useState, useEffect, useCallback } from "react";
import Button from "../Button/Button";
import { getContractInfo, getAddress, sendTokens } from "../../utils/wallet";

interface ContractDataProps {
  contractAddress: string;
}

interface ContractData {
  token: string;
  balance: number;
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
  const [isSent, setSent] = useState(false);
  const collapse = () => {
    setOpen(!open);
  };
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);

  const handleSendChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalance({
        ...balance,
        [name]: event.target.value,
      });
    };

  async function getTokensSent(
    contractAddress: string,
    recepient: string,
    amount: string
  ) {
    const response = await sendTokens(contractAddress, recepient, amount);
    if (response && contractData) {
      setSent(true);
      setContractData({
        ...contractData,
        balance: +contractData.balance - +balance.amount,
      });

      setTimeout(() => {
        setSent(false);
      }, 2000);
    }
    setBalance({ recepient: "", amount: "" });
  }

  const fetchContracts = useCallback(async () => {
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
  }, [contractAddress]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return (
    <>
      {contractData ? (
        <div className={styles.contractData}>
          <div className={styles.line}></div>
          <button type="button" onClick={collapse} className={styles.cashName}>
            {contractData.logo && contractData.logo.length > 10 ? (
              <img src={contractData.logo} alt="" className={styles.logo}></img>
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
                value={balance.recepient}
                onChange={handleSendChange("recepient")}
              />
              <div className={styles.label}>Amount:</div>
              <input
                type="text"
                className={styles.addContract}
                value={balance.amount}
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
                    balance.recepient,
                    balance.amount
                  )
                }
              >
                Send
              </Button>
            </div>
          )}
          {isSent && <div className={styles.info}>sent!</div>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Contract;
