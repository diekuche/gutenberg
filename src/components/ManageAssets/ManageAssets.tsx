import React from "react";
import styles from "./ManageAssets.module.css";
import circle from "../../assets/circle.svg";
import swapMA from "../../assets/swapMA.svg";
import icon_send from "../../assets/icon_send.svg";
import icon_mint from "../../assets/icon_mint.svg";
import icon_burn from "../../assets/icon_burn.svg";
import Button from "../Button/Button";

const ManageAssets = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.name}>manage assets</div>
      <div className={styles.border}>
        <table className={styles.tableMA}>
          <thead className={styles.thead}>
            <th className={styles.tokens}>Tokens</th>
            <th className={styles.balance}>Balance</th>
            <th className={styles.other}>Send</th>
            <th className={styles.other}>Swap</th>
            <th className={styles.other}>Mint</th>
            <th className={styles.other}>Burn</th>
          </thead>
          <tbody>
            <tr className={styles.menu}>
              <td className={styles.nameToken}>
                <img src={circle} className={styles.circle} alt="" />
                <div>
                  <div className={styles.boot}>BOOT</div>
                  <div className={styles.bostorm}>Bostorm</div>
                </div>
              </td>
              <td className={styles.price}>937,453,452.00</td>
              <td>
                <img src={icon_send} alt="" />
              </td>
              <td>
                <img src={swapMA} alt="" />
              </td>
              <td>
                <img src={icon_mint} alt="" />
              </td>
              <td>
                <img src={icon_burn} alt="" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.exchange}>
          <div className={styles.exchangeField}>
            Recepient:
            <input className={styles.field} type="text" />
          </div>
          <div className={styles.exchangeField}>
            Amount:
            <input className={styles.field} type="text" />
          </div>
          <Button
            color="white"
            type="button"
            size="sm"
            className={styles.tokenSend}
          >
            Send
          </Button>
        </div>
        <div className={styles.add}>
          <Button
            color="green"
            type="button"
            size="lg"
            className={styles.addToken}
          >
            Add Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageAssets;
