import React, { useState } from "react";
import { useQuerySmart, useAccount, useExecuteContract } from "graz";
import { useFee } from "../../../utils/useFee";
import { toast } from "react-toastify";
import basket from "../../../assets/basket.svg";
import icon_send from "../../../assets/icon_send.svg";
import swapMAYellow from "../../../assets/SwapCircleYellow.svg";
import icon_mint_yellow from "../../../assets/icon_mint_yellow.svg";
import icon_burn_yellow from "../../../assets/icon_burn_yellow.svg";
import styles from "./Token.module.css";
import Button from "../../Button/Button";

type Props = {
  contractAddress: string;
  removeContract: (contract: string) => void;
};

const sendBalance = {
  recipient: "",
  amount: "",
};

const Token = ({ contractAddress, removeContract }: Props) => {
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const [currentAction, setCurrentAction] = useState("");
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
  const logoId = marketingInfo?.logo?.url?.match(/d\/(.+)\//)?.[1];
  const logoUrl = logoId && `https://drive.google.com/uc?id=${logoId}`;
  const { executeContract } = useExecuteContract<any>({
    contractAddress,
    onError: (error: any) => {
      console.log("error", error);
      toast(error, {
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
  const fee = useFee();

  const handleSendChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalance({
        ...balance,
        [name]: event.target.value,
      });
    };

  const handleSendTokens = () => {
    const { recipient, amount } = balance;
    executeContract({
      msg: {
        transfer: {
          amount,
          recipient,
        },
      },
      fee,
    });
  };

  return (
    <>
      <tr>
        <td>
          <div className={styles.nameToken}>
            <img src={logoUrl} className={styles.iconToken} alt="" />
            <div>{tokenInfo?.symbol}</div>
          </div>
        </td>
        <td className={styles.balance}>
          {Number(tokenBalance.balance).toLocaleString()}
        </td>
        <td>
          <img src={basket} alt="" />
        </td>
        <td className={styles.thwidth}>
          <div className={styles.send} onClick={() => setCurrentAction("send")}>
            <img src={icon_send} alt="" />
          </div>
        </td>
        <td className={styles.thwidth}>
          <img src={swapMAYellow} alt="" />
        </td>
        <td className={styles.thwidth}>
          <div className={styles.send} onClick={() => setCurrentAction("mint")}>
            <img src={icon_mint_yellow} alt="" />
          </div>
        </td>
        <td className={styles.thwidth}>
          <div className={styles.send} onClick={() => setCurrentAction("burn")}>
            <img src={icon_burn_yellow} alt="" />
          </div>
        </td>
      </tr>
      {currentAction === "send" && (
        <tr>
          <th colSpan={7} className={styles.colspan}>
            <div className={styles.tokenSend}>
              <div className={styles.sendformblock}>
                <div className={styles.label}>
                  Recepient:
                  <input
                    type="text"
                    value={balance.recipient}
                    onChange={handleSendChange("recipient")}
                    className={styles.sendform}
                  />
                </div>
                <div className={styles.label}>
                  Amount:
                  <input
                    type="text"
                    value={balance.amount}
                    onChange={handleSendChange("amount")}
                    className={styles.sendform}
                  />
                </div>
              </div>
              <Button
                color="sendButton"
                type="button"
                className={styles.sendButton}
                onClick={handleSendTokens}
              >
                Send
              </Button>
            </div>
          </th>
        </tr>
      )}
      {currentAction === "mint" && (
        <tr>
          <th className={styles.colspan} colSpan={7}>
            <div className={styles.tokenSend}>
              <div className={styles.sendformblock}>
                <div className={styles.label}>
                  Amount:
                  <input type="text" className={styles.sendformAmount} />
                </div>
                <Button
                  color="sendButton"
                  type="button"
                  className={styles.sendButton}
                >
                  Mint
                </Button>
              </div>
            </div>
          </th>
        </tr>
      )}
      {currentAction === "burn" && (
        <tr>
          <th className={styles.colspan} colSpan={7}>
            <div className={styles.tokenSend}>
              <div className={styles.sendformblock}>
                <div className={styles.label}>
                  Recepient:
                  <input type="text" className={styles.sendform} />
                </div>
                <Button
                  color="sendButton"
                  type="button"
                  className={styles.sendButton}
                >
                  Burn
                </Button>
              </div>
            </div>
          </th>
        </tr>
      )}
    </>
  );
};

export default Token;
