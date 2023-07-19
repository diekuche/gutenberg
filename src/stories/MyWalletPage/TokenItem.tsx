import { useState } from "react";
import Button from "ui/Button";
import BigNumber from "bignumber.js";
import basket from "ui/assets/basket.svg";
import icon_send from "ui/assets/icon_send.svg";
import swapMAYellow from "ui/assets/SwapCircleYellow.svg";
import icon_mint_yellow from "ui/assets/icon_mint_yellow.svg";
import icon_burn_yellow from "ui/assets/icon_burn_yellow.svg";
import icon_mint from "ui/assets/icon_mint.svg";
import icon_burn from "ui/assets/icon_burn.svg";
import styles from "./TokenItem.module.css";

export type TokenItemProps = {
  id: string;
  logoUrl: string;
  shortName: string;
  userBalance: BigNumber;
  isSendable: boolean;
  isBurnable: boolean;
  isMintable: boolean;
  isRemovable: boolean;
  onBurn: (id: string, burnAmount: string) => void;
  onMint: (id: string, mintAmount: string) => void;
  onSend: (id: string, sendRecipient: string, sendAmount: string) => void;
  onRemove: (id: string) => void;
};

const TokenItem = ({
  id,
  logoUrl,
  isBurnable,
  isMintable,
  isSendable,
  isRemovable,
  onBurn,
  onMint,
  onSend,
  onRemove,
  shortName,
  userBalance,
}: TokenItemProps) => {
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [currentAction, setCurrentAction] = useState("");

  const [sendRecipient, setSendRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  return (
    <>
      <tr>
        <td>
          <div className={styles.nameToken}>
            <img src={logoUrl} className={styles.iconToken} alt="" />
            <div>{shortName}</div>
          </div>
        </td>
        <td className={styles.balance}>
          {userBalance.toLocaleString()}
        </td>
        <td>
          {isRemovable ? (
            <img
              src={basket}
              alt=""
              onClick={() => onRemove(id)}
              style={{ cursor: "pointer" }}
            />
          ) : null}
        </td>
        <td className={styles.thwidth}>
          {isSendable && (
          <div className={styles.send} onClick={() => setCurrentAction("send")}>
            <img src={icon_send} alt="" />
          </div>
          )}
        </td>
        <td className={styles.thwidth}>
          <img src={swapMAYellow} alt="" />
        </td>
        <td className={styles.thwidth}>
          {isMintable
            ? (
              <div className={styles.send} onClick={() => setCurrentAction("mint")}>
                <img src={icon_mint_yellow} alt="" />
              </div>
            ) : <img src={icon_mint} alt="" /> }
        </td>
        <td className={styles.thwidth}>
          {isBurnable ? (
            <div className={styles.send} onClick={() => setCurrentAction("burn")}>
              <img src={icon_burn_yellow} alt="" />
            </div>
          )
            : <img src={icon_burn} alt="" />}
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
                    value={sendRecipient}
                    onChange={(e) => setSendRecipient(e.target.value)}
                    className={styles.sendform}
                  />
                </div>
                <div className={styles.label}>
                  Amount:
                  <input
                    type="text"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className={styles.sendform}
                  />
                </div>
              </div>
              <Button
                color="sendButton"
                type="button"
                className={styles.sendButton}
                onClick={() => onSend(id, sendRecipient, sendAmount)}
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
                  <input
                    type="text"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    className={styles.sendformAmount}
                  />
                </div>
                <Button
                  color="sendButton"
                  type="button"
                  onClick={() => onMint(id, mintAmount)}
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
                  <input
                    type="text"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    className={styles.sendform}
                  />
                </div>
                <Button
                  color="sendButton"
                  type="button"
                  className={styles.sendButton}
                  onClick={() => onBurn(id, burnAmount)}
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

export default TokenItem;
