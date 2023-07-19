import React, {
  useEffect, useCallback, useRef, useState,
} from "react";
import { Coin, coins } from "@cosmjs/stargate";

import { toast } from "react-toastify";
import Button from "ui/Button";
import { useAccount } from "hooks/useAccount";
import styles from "./NativeTokenSender.module.css";
import plus from "../../../assets/plus.svg";
import minus from "../../../assets/minus.svg";
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
  const { account } = useAccount();
  const client = data?.stargate;
  const fee = useFee();
  const ref = useRef<HTMLDivElement>(null);

  const fetchBalance = useCallback(async () => {
    if (account?.bech32Address) {
      const balances = await client?.getAllBalances(account.bech32Address);
      if (balances?.[0]) {
        setCurrentBalance(balances[0]);
      }
    }
  }, [client, account]);

  const { sendTokens } = useSendTokens({
    onError: (error) => {
      toast(`${error}`, {
        type: "error",
      });
      console.log("error", error);
    },
    onSuccess: (result) => {
      toast("Success", {
        type: "success",
        autoClose: 2000,
      });
      console.log("success", result);
      fetchBalance();
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 2000);

      setBalance({ recepient: "", amount: "" });
    },
  });

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        console.log(ref.current);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [open]);

  const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance({
      ...balance,
      [name]: event.target.value,
    });
  };

  async function getBootSent(recipientAddress: string, amount: string) {
    if (recipientAddress !== "" && amount !== "" && currentBalance) {
      sendTokens({
        recipientAddress,
        amount: coins(amount, currentBalance.denom),
        fee,
      });
    }
  }

  if (!currentBalance) {
    return null;
  }

  return (
    <div className={styles.contractData} ref={ref}>
      <button type="button" className={styles.cashName} onClick={() => setOpen(!open)}>
        <div className={styles.token}>

          {" "}
          {
          currentBalance.denom.toLowerCase().startsWith("factory/")
            ? currentBalance.denom.split("/")[2] : currentBalance.denom

          }
        </div>
        <img alt="icons" className={styles.icon} src={open ? minus : plus} />
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
            onClick={() => getBootSent(balance.recepient, balance.amount)}
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
