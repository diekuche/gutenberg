import styles from "./NativeTokenSender.module.css";
import React, { useEffect, useCallback } from "react";
import Button from "../../Button/Button";
import { useState } from "react";
import { Coin, coins } from "@cosmjs/stargate";
import plus from "../../../assets/plus.svg";
import minus from "../../../assets/minus.svg";
import { useSendTokens, useClients, useAccount } from "graz";
import { useFee } from "../../../utils/useFee";

const sendBalance = {
  recepient: "",
  amount: "",
};

function TokenSender() {
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const [currentBalance, setCurrentBalance] = useState<Coin | null>(null);
  const [isSent, setSent] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: account } = useAccount();
  const { data } = useClients();
  const client = data?.stargate;
  const fee = useFee();

  const { sendTokens } = useSendTokens({
    onError: (error) => {
      alert(error);
      console.log("error", error);
    },
    onSuccess: (result) => {
      console.log("success", result);
      fetchBalance();
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 2000);

      setBalance({ recepient: "", amount: "" });
    },
  });

  const fetchBalance = useCallback(async () => {
    if (account?.bech32Address) {
      const balances = await client?.getAllBalances(account.bech32Address);
      if (balances?.[0]) {
        setCurrentBalance(balances[0]);
      }
    }
  }, [client, account]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

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
      sendTokens({
        recipientAddress,
        amount: coins(amount, currentBalance!.denom),
        fee,
      });
    }
  }

  if (!currentBalance) {
    return null;
  }

  return (
    <div className={styles.contractData}>
      <button className={styles.cashName} onClick={collapse}>
        <div className={styles.token}>🟢 {currentBalance.denom}</div>
        <img
          alt="icons"
          className={styles.icon}
          src={open ? minus : plus}
        />
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
            color="sendButton"
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
