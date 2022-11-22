import React from "react";
import styles from "./BootSender.module.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { getAddress, getBalance, sendBoot } from "../../utils/wallet";
import { Coin } from "@cosmjs/stargate";

const sendBalance = {
  recepient: "",
  amount: "",
};

function BootSender() {
  const [bootBalance, setBootBalance] = useState("");
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const [isSent, setSent] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleSendChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalance({
        ...balance,
        [name]: event.target.value,
      });
    };

  async function fetchBalance() {
    let response = await getBalance();
    if (response) setBootBalance(response);
  }

  useEffect(() => {
    fetchBalance();
  }, [setSent]);

  async function getBootSent(recepientAddress: string, amount: string) {
    if (!recepientAddress || amount) {
      setIsShown(true);
    }
    let coin: readonly Coin[];
    coin = [{ denom: "boot", amount: amount }];
    const senderAddress = await getAddress();
    if (senderAddress) {
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
    <>
      <div className={styles.cashName}>
        <div className={styles.token}>🟢BOOT</div>
        <div className={styles.balance}>{bootBalance}</div>
      </div>
      {isShown && (
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
        </div>
      )}
      <Button
        color="white"
        type="button"
        size="lg"
        onClick={(e: any) => getBootSent(balance.recepient, balance.amount)}
      >
        Send
      </Button>

      {isSent && <div className={styles.info}>sent!</div>}
    </>
  );
}

export default BootSender;
