import React from "react";
import styles from "./Swap.module.css";
import UpDoAr from "../../assets/UpDoAr.svg";
import NewBT from "../newButton/newButton";
import SelectCustom from "../SelectCustom/SelectCustom";
import TokenUI from "../SelectCustom/TokenUI/TokenUI";
import pig_icon from "../../assets/pig_logo.svg";
import mew_icon from "../../assets/mew_logo.svg";
import shit_icon from "../../assets/shit_logo.svg";
import ps_icon from "../../assets/ps_logo.svg";
import boot_icon from "../../assets/boot_logo.svg";
import { Link } from "react-router-dom";
import Search from "../SelectCustom/Search/Search";

const options = [
  {
    value: "search",
    label: <Search />,
  },
  {
    value: "boot",
    label: (
      <TokenUI
        name="BOOT"
        chainName="Bostrom"
        balance="200,300,765"
        icon={boot_icon}
      />
    ),
  },
  {
    value: "pig",
    label: (
      <TokenUI name="PIG" chainName="PigNon" balance="2,901" icon={pig_icon} />
    ),
  },
  {
    value: "shit",
    label: (
      <TokenUI name="Shit" chainName="Shitcoin" balance="4" icon={shit_icon} />
    ),
  },
  {
    value: "mew",
    label: (
      <TokenUI
        name="MEW"
        chainName="Mew Mew Paw Paw Rrrrr"
        balance="194,34"
        icon={mew_icon}
      />
    ),
  },
  {
    value: "ps",
    label: <TokenUI name="Ps" chainName="Pussy" balance="0" icon={ps_icon} />,
  },
];

const Swap = () => {
  return (
    <div className={styles.common}>
      <div className={styles.swap}>
        <div className={styles.InputBlock}>
          <div className={styles.currencyInput}>0</div>
          <div className={styles.selectWrapper}>
            <SelectCustom options={options} placeholder="Select Token" />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>Balance: 0</div>
        </div>
        <div className={styles.center}>
          <div className={styles.line}></div>
          <div className={styles.circle}>
            <img className={styles.iconSwap} src={UpDoAr} alt="" />
          </div>
        </div>
        <div className={styles.OutputBlock}>
          <div className={styles.currencyOutput}>0</div>
          <div className={styles.selectWrapper}>
            <SelectCustom options={options} placeholder="Select Token" />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>Balance: 0</div>
        </div>
        <div className={styles.stringSwapFee}>
          <div className={styles.fee}>Swap fee</div>
          <div className={styles.fee}>0.00%</div>
        </div>
        <div></div>
      </div>
      <NewBT size="hg">swap!</NewBT>
      <div className={styles.textToPools}>
        <Link to="/pools">Provide liquidity</Link> to he market and receive swap
        fees each trade.
      </div>
    </div>
  );
};

export default Swap;
