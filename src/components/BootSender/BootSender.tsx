import React from "react";
import styles from "./BootSender.module.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { getAddress, getBalance, sendBoot } from "../../utils/wallet";
import { Coin } from "@cosmjs/stargate";
import collapse_arrow from "../../assets/collapse_arrow.svg";

const sendBalance = {
  recepient: "",
  amount: "",
};

function BootSender() {
  const [bootBalance, setBootBalance] = useState("");
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const [isSent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

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

  async function fetchBalance() {
    let response = await getBalance();
    if (response !== undefined) setBootBalance(response);
    else setBootBalance("0");
  }

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(() => fetchBalance(), 30000);
    return () => {
      clearInterval(interval);
    };
  }, [setSent]);

  async function getBootSent(recepientAddress: string, amount: string) {
    let coin: readonly Coin[];
    coin = [{ denom: "boot", amount: amount }];
    const senderAddress = await getAddress();
    if (senderAddress && recepientAddress !== "" && amount !== "") {
      const response = await sendBoot(senderAddress, recepientAddress, coin);
      if (response) {
        setSent(true);

        setTimeout(() => {
          setSent(false);
        }, 2000);
      }
      setBalance({ recepient: "", amount: "" });
    }
  }

  return (
    <div className={styles.contractData}>
      <button className={styles.cashName} onClick={collapse}>
        <div className={styles.token}>🟢 BOOT</div>
        <img src={collapse_arrow} alt="" className={styles.image} />
        <div className={styles.balance}>{bootBalance.toLocaleString()}</div>
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
          <Button
            color="white"
            type="button"
            className={styles.tokenButton}
            onClick={(e: any) => getBootSent(balance.recepient, balance.amount)}
          >
            Send
          </Button>
        </div>
      )}

      {isSent && <div className={styles.info}>sent!</div>}
    </div>
  );
}

export default BootSender;
