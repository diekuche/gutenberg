import React from "react";
import styles from "./Swap.module.css";
import UpDoAr from "../../assets/UpDoAr.svg";
import downyellow from "../../assets/downyellow.svg";
import NewBT from "../newButton/newButton";
import TList from "../TokenList/TList";
import iconYellowDown from "../../assets/IconYllowDown.svg";
import SelectCustom from "../SelectCustom/SelectCustom";
import TokenUI from "../Token/TokenUI";
import pig_icon from "../../assets/pig_logo.svg";
import mew_icon from "../../assets/mew_logo.svg";
import shit_icon from "../../assets/shit_logo.svg";
import ps_icon from "../../assets/ps_logo.svg";
import boot_icon from "../../assets/boot_logo.svg";

const options = [
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
