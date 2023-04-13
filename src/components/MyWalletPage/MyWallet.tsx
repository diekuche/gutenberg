import React from "react";
import styles from "./MyWallet.module.css";
import circle from "../../assets/circle.svg";
import swapMA from "../../assets/swapMA.svg";
import icon_send from "../../assets/icon_send.svg";
import icon_mint from "../../assets/icon_mint.svg";
import icon_burn from "../../assets/icon_burn.svg";
import Button from "../Button/Button";
import MyInvestment from "../Pools/MyInvestment/MyInvestment";
import MyPools from "../Pools/MyPools/MyPools";

const ManageAssets = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>manage assets</div>
      <div className={styles.tableMA}>
        <table>
          <thead>
            <tr className={styles.theadMA}>
              <th className={styles.thLeft}>Tokens</th>
              <th>Balance</th>
              <th className={styles.thwidth}>Send</th>
              <th className={styles.thwidth}>Swap</th>
              <th className={styles.thwidth}>Mint</th>
              <th className={styles.thwidth}>Burn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.nameToken}>
                  <img src={circle} className={styles.iconToken} alt="" />
                  BOOT</div>
              </td>
              <td className={styles.balance}>937,453,452.00</td>
              <td className={styles.thwidth}>
                <img src={icon_send} alt="" />
              </td>
              <td className={styles.thwidth}>
                <img src={swapMA} alt="" />
              </td>
              <td className={styles.thwidth}>
                <img src={icon_mint} alt="" />
              </td>
              <td className={styles.thwidth}>
                <img src={icon_burn} alt="" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.tokenSend}>
          <div className={styles.sendformblock}>
            <div className={styles.label}>Recepient:
              <input
                type="text"
                className={styles.sendform}
              />
            </div>
            <div className={styles.label}>Amount:
              <input
                type="text"
                className={styles.sendform}
              />
            </div>
          </div>
          <Button
            color="sendButton"
            type="button"
            className={styles.sendButton}
          >
            Send
          </Button>
        </div>
        <div className={styles.addToken}>
          <div className={styles.addTokenBlok}>
            <div className={styles.label}>
              To add a token, specify its address:
              <input
                type="text"
                className={styles.addContract}
              />
            </div>
            <Button
              color="green"
              type="button"
              className={styles.addTokenButton}
            >
              Add Token
            </Button>
          </div>
        </div>
      </div>
      <MyInvestment />
      <MyPools />
    </div>
  );
};

export default ManageAssets;
