import React from "react";
import styles from "./Token.module.css";
import { useState, useEffect, useCallback } from "react";
import Button from "../Button/Button";
import { getContractInfo, getAddress, sendTokens } from "../../utils/wallet";
import deleteButton from "../../assets/Button_Delite.svg";
import collapse_arrow from "../../assets/collapse_arrow.svg";

interface ContractDataProps {
  contractAddress: string;
  removeContract: (contract: string) => void;
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

export function Token({ contractAddress, removeContract }: ContractDataProps) {
  const [contractData, setContractData] = useState<ContractData>();
  const [open, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);

  const collapse = () => {
    setOpen(!open);
  };

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
    const address = await getAddress();
    if (address) {
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
  }, [contractAddress]);

  useEffect(() => {
    fetchContracts();
    const interval = setInterval(() => fetchContracts(), 30000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchContracts]);

  return (
    <>
      {contractData ? (
        <div className={styles.contractData}>
          <div className={styles.tokenTitle}>
            <button
              type="button"
              onClick={collapse}
              className={styles.cashName}
            >
              {contractData.logo && contractData.logo.length > 10 ? (
                <img
                  src={contractData.logo}
                  alt=""
                  className={styles.logo}
                ></img>
              ) : (
                <div className={styles.logo}>{contractData.logo}</div>
              )}
              <div className={styles.token}>{contractData.token}</div>
              <img src={collapse_arrow} alt="" className={styles.image} />
              <div className={styles.balance}>{contractData.balance}</div>
            </button>
            <button
              className={styles.x}
              onClick={(e) => removeContract(contractAddress)}
            >
              <img src={deleteButton} alt=""></img>
            </button>
          </div>
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
              <Button
                color="white"
                type="button"
                className={styles.tokenButton}
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

export default Token;
