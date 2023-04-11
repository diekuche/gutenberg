import React from "react";
import styles from "./Token.module.css";
import { useState } from "react";
import Button from "../../Button/Button";
import deleteButton from "../../../assets/Button_Delite.svg";
import collapse_arrow from "../../../assets/plus.svg";
import { useQuerySmart, useAccount, useExecuteContract } from "graz";
import { GasPrice } from "@cosmjs/launchpad";

const gasPrice = GasPrice.fromString("0.001boot") as any;

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
  const { data: tokenBalance } = useQuerySmart<any, any>(contractAddress, {
    balance: { address: account?.bech32Address },
  });
  const { data: tokenInfo } = useQuerySmart<any, any>(contractAddress, {
    token_info: {},
  });
  const { data: marketingInfo } = useQuerySmart<any, any>(contractAddress, {
    marketing_info: {},
  });
  const { executeContract } = useExecuteContract<any>({
    contractAddress,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (success) => {
      console.log("success", success);
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

  async function getTokensSent(
    contractAddress: string,
    recepient: string,
    amount: string
  ) {
    setSent(true);
    executeContract({
      msg: {
        transfer: {
          amount,
          recepient,
        },
      },
      fee: gasPrice,
    });
    // const response = await sendTokens(contractAddress, recepient, amount);
    // if (response && contractData) {
    //   setSent(true);
    //   setContractData({
    //     ...contractData,
    //     balance: +contractData.balance - +balance.amount,
    //   });
    //   setTimeout(() => {
    //     setSent(false);
    //   }, 2000);
    // }
    // setBalance({ recepient: "", amount: "" });
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
              <div className={styles.token}>{tokenInfo.name}</div>
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
