import React from "react";
import styles from "./TokenSender.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import { sendBoot } from "../../utils/wallet";
import { coins } from "@cosmjs/stargate";
import collapse_arrow from "../../assets/collapse_arrow.svg";
import { useBalances, useAccount } from "graz";

const sendBalance = {
  recepient: "",
  amount: "",
};

function TokenSender() {
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const [isSent, setSent] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: balances = [], refetch } = useBalances();
  const { data: account } = useAccount();

  const currentBalance = balances[0];

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

  async function getBootSent(recipientAddress: string, amount: string) {
    if (recipientAddress !== "" && amount !== "") {
      const response = await sendBoot(
        account?.bech32Address!,
        recipientAddress,
        coins(amount, currentBalance.denom)
      );
      if (response) {
        setSent(true);

        setTimeout(() => {
          setSent(false);
        }, 2000);

        setTimeout(() => {
          refetch();
        }, 10000);

        setBalance({ recepient: "", amount: "" });
      }
    }
  }

  if (!currentBalance) {
    return null;
  }

  return (
    <div className={styles.contractData}>
      <button className={styles.cashName} onClick={collapse}>
        <div className={styles.token}>🟢 {currentBalance.denom}</div>
        <img src={collapse_arrow} alt="" className={styles.image} />
        <div className={styles.balance}>
          {Number(currentBalance.amount).toLocaleString()}
        </div>
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

export default TokenSender;