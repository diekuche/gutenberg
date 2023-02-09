import React from "react";
import styles from "./ManageAssets.module.css";
import circle from "../../assets/circle.svg";
import swapMA from "../../assets/swapMA.svg";
import icon_send from "../../assets/icon_send.svg";
import icon_mint from "../../assets/icon_mint.svg";
import icon_burn from "../../assets/icon_burn.svg";

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
            <tr>
              <td className={styles.exchangeField} colSpan={2}>
                Recepient
                <input
                  className={styles.field}
                  type="text"
                  placeholder="example"
                />
              </td>
              <td className={styles.exchangeField}>
                Amount
                <input
                  className={styles.field}
                  type="text"
                  placeholder="example"
                />
              </td>
              <td className={styles.buttonY}>Button</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAssets;
