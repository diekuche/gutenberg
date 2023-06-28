import React, { useContext, useState } from "react";
import styles from "./CreatePoolForm.module.css";
import UpDoAr from "../../../assets/UpDoAr.svg";
import SelectCustom, { SelectCustomProps } from "../../SelectCustom/SelectCustom";
import NewButton from "../../newButton/newButton";
import { AppStateContext } from "../../../context/AppStateContext";

type Props = {
  onSubmit: (token: string, secondToken: string) => void;
};

const CreatePoolForm = ({ onSubmit }: Props) => {
  const [token, setToken] = useState("");
  const [secondToken, setSecondToken] = useState("");
  const { userTokens } = useContext(AppStateContext);

  const options = userTokens?.map((value) => ({
    value,
    label: value.slice(0, 10),
  }));

  const handleSelectToken: SelectCustomProps["onChange"] = (option) => {
    setToken(option?.value || "");
  };

  const handleSelectSecond: SelectCustomProps["onChange"] = (option) => {
    setSecondToken(option?.value || "");
  };

  const handleSubmit = () => {
    onSubmit(token, secondToken);
  };

  return (
    <div className={styles.common}>
      <div className={styles.swap}>
        <div className={styles.InputBlock}>
          <div className={styles.currencyInput}>0</div>
          <div className={styles.selectWrapper}>
            <SelectCustom
              options={options}
              onChange={handleSelectToken}
              placeholder="Select Token"
            />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>Balance: 0</div>
        </div>
        <div className={styles.center}>
          <div className={styles.line} />
          <div className={styles.circle}>
            <img className={styles.iconSwap} src={UpDoAr} alt="" />
          </div>
        </div>
        <div className={styles.OutputBlock}>
          <div className={styles.currencyOutput}>0</div>
          <div className={styles.selectWrapper}>
            <SelectCustom
              options={options}
              onChange={handleSelectSecond}
              placeholder="Select Token"
            />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>Balance: 0</div>
        </div>
        <div className={styles.stringSelect}>
          <div className={styles.fee}>Select Liquidity Provider Fee:</div>
          <div className={styles.percent}>
            <button type="button" className={styles.percent_1}>0.05%</button>
            <button type="button" className={styles.percent_2}>0.5%</button>
            <button type="button" className={styles.percent_1}>1%</button>
          </div>
        </div>
        <NewButton onClick={handleSubmit} size="hg">
          create pool
        </NewButton>
      </div>
    </div>
  );
};

export default CreatePoolForm;
