import React from "react";
import styles from "./Token.module.css";
import { useState } from "react";
import Button from "../../Button/Button";
import deleteButton from "../../../assets/Button_Delite.svg";
import collapse_arrow from "../../../assets/plus.svg";
import { useQuerySmart, useAccount, useExecuteContract } from "graz";
import { useFee } from "../../../utils/useFee";

interface ContractDataProps {
  contractAddress: string;
  removeContract: (contract: string) => void;
}

const sendBalance = {
  recepient: "",
  amount: "",
};

export function Token({ contractAddress, removeContract }: ContractDataProps) {
  const [open, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const { data: account } = useAccount();
  const { data: tokenBalance, refetch } = useQuerySmart<any, any>(
    contractAddress,
    {
      balance: { address: account?.bech32Address },
    }
  );
  const { data: tokenInfo } = useQuerySmart<any, any>(contractAddress, {
    token_info: {},
  });
  const { data: marketingInfo } = useQuerySmart<any, any>(contractAddress, {
    marketing_info: {},
  });
  const fee = useFee();
  const { executeContract } = useExecuteContract<any>({
    contractAddress,
    onError: (error) => {
      console.log("error", error);
      alert(error);
    },
    onSuccess: (success) => {
      console.log("success", success);
      alert("Success!");
      refetch();
    },
  });

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

  async function getTokensSent(recipient: string, amount: string) {
    setSent(true);
    executeContract({
      msg: {
        transfer: {
          amount,
          recipient,
        },
      },
      fee,
    });
  }

  return (
    <>
      {tokenBalance && tokenInfo && marketingInfo ? (
        <div className={styles.contractData}>
          <div className={styles.tokenTitle}>
            <button
              type="button"
              onClick={collapse}
              className={styles.cashName}
            >
              {marketingInfo.logo?.url && (
                <img
                  src={marketingInfo.logo?.url}
                  alt=""
                  className={styles.logo}
                ></img>
              )}
              <div className={styles.token}>{tokenInfo.symbol}</div>
              <img src={collapse_arrow} alt="" className={styles.image} />
              <div className={styles.balance}>
                {Number(tokenBalance.balance).toLocaleString()}
              </div>
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
                color="sendButton"
                type="button"
                className={styles.tokenButton}
                onClick={(e: any) =>
                  getTokensSent(balance.recepient, balance.amount)
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
