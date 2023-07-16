import React, { useState } from "react";
import { useQuerySmart, useAccount, useExecuteContract } from "graz";
import { toast } from "react-toastify";
import Button from "ui/Button";
import styles from "./OtherTokenSender.module.css";
import deleteButton from "../../../assets/Button_Delite.svg";
import plus from "../../../assets/plus.svg";
import minus from "../../../assets/minus.svg";
import { useFee } from "../../../utils/useFee";
import { BalanceResponse, MarketingInfoResponse, TokenInfoResponse } from "../../../ts/Cw20.types";

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
  const { data: tokenBalance, refetch } = useQuerySmart<BalanceResponse, string>(
    contractAddress,
    {
      balance: { address: account?.bech32Address },
    },
  );
  const { data: tokenInfo } = useQuerySmart<TokenInfoResponse, string>(contractAddress, {
    token_info: {},
  });
  const { data: marketingInfo } = useQuerySmart<MarketingInfoResponse, string>(contractAddress, {
    marketing_info: {},
  });
  // const { data: test } = useQuerySmart<any, any>(contractAddress, {
  //   get_config: {},
  // });
  // console.log("test", test);

  let logoId: string | undefined;
  if (marketingInfo?.logo === "embedded") {
    logoId = marketingInfo.logo;
  } else {
    logoId = marketingInfo?.logo?.url?.match(/d\/(.+)\//)?.[1];
  }
  const logoUrl = logoId && `https://drive.google.com/uc?id=${logoId}`;
  const fee = useFee();
  const { executeContract } = useExecuteContract({
    contractAddress,
    onError: (error) => {
      console.log("error", error);
      toast(`${error}`, {
        type: "error",
        autoClose: 2000,
      });
    },
    onSuccess: (success) => {
      console.log("success", success);
      toast("Success!", {
        type: "success",
        autoClose: 2000,
      });
      refetch();
    },
  });

  const collapse = () => {
    setOpen(!open);
  };

  const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
    tokenBalance && tokenInfo && marketingInfo ? (
      <div className={styles.contractData}>
        <div className={styles.tokenTitle}>
          <button
            type="button"
            onClick={collapse}
            className={styles.tokenName}
          >
            {logoUrl && (
            <img src={logoUrl} alt="" className={styles.logo} />
            )}
            <div className={styles.token}>
              {tokenInfo.symbol}

            </div>
            <img
              alt="icons"
              className={styles.icon}
              src={open ? minus : plus}
            />
            <div className={styles.balance}>
              {Number(tokenBalance.balance).toLocaleString()}
            </div>
            <button
              type="button"
              className={styles.x}
              onClick={() => removeContract(contractAddress)}
            >
              <img src={deleteButton} alt="" />
            </button>
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
            onClick={() => getTokensSent(balance.recepient, balance.amount)}
          >
            Send
          </Button>
        </div>
        )}
        {isSent && <div className={styles.info}>sent!</div>}
      </div>
    ) : (
      null
    )
  );
}

export default Token;
