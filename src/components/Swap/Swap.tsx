import React from "react";
import styles from "./Swap.module.css";
import UpDoAr from "../../assets/UpDoAr.svg";
import downyellow from "../../assets/downyellow.svg";
import NewBT from "../newButton/newButton";
import TList from "../TokenList/TList";
import iconYellowDown from "../../assets/IconYllowDown.svg";
import SelectCustom from "../SelectCustom/SelectCustom";
import Boot from "../Tokens/Boot/Boot";
import Pig from "../Tokens/Pig/Pig";
import Shit from "../Tokens/Shit/Shit";
import Mew from "../Tokens/Mew/Mew";
import Ps from "../Tokens/PS/Ps";

const options = [
  { value: "boot", label: <Boot /> },
  { value: "pig", label: <Pig /> },
  { value: "shit", label: <Shit /> },
  { value: "mew", label: <Mew /> },
  { value: "ps", label: <Ps /> },
];

const Swap = () => {
  return (
    <div className={styles.common}>
      <div className={styles.swap}>
        <div className={styles.up}>
          <div className={styles.priceUp}>0</div>
          <div className={styles.selectWrapper}>
            <SelectCustom options={options} placeholder="Select Token" />
          </div>
        </div>
        <div className={styles.secondString}>
          <div className={styles.priceDown}>$0.00</div>
          <div className={styles.priceDown}>Balance:0</div>
        </div>
        <div className={styles.center}>
          <div className={styles.line}></div>
          <div className={styles.circle}>
            <img className={styles.iconSwap} src={UpDoAr} alt="" />
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.lowerPrice}>0</div>
          <div className={styles.selectWrapper}>
            <SelectCustom options={options} placeholder="Select Token" />
          </div>
        </div>
        <div className={styles.secondString}>
          <div className={styles.priceDown}>$0.00</div>
          <div className={styles.priceDown}>Balance:0</div>
        </div>
        <div className={styles.stringSlipPage}>
          <div className={styles.slipPage}>
            Slippage 1%
            <img className={styles.downArrowYellow} src={downyellow} alt="" />
          </div>
          <div className={styles.fee}>Swap fee (0.3%)</div>
        </div>
        <div></div>
      </div>
      <NewBT size="hg">Connect Wallet!</NewBT>
      <div className={styles.middleString}>
        Provide liquidity to he market and receive swap fees each trade.
      </div>
      <img className={styles.iconYellowDown} src={iconYellowDown} alt="" />
      <TList />
    </div>
  );
};

export default Swap;
