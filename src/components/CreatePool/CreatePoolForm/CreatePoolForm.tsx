import React, {
  useContext, useEffect, useMemo, useState,
} from "react";
import styles from "./CreatePoolForm.module.css";
import UpDoAr from "../../../assets/UpDoAr.svg";
import SelectCustom, { SelectCustomProps } from "../../SelectCustom/SelectCustom";
import NewButton from "../../newButton/newButton";
import { AppStateContext } from "../../../context/AppStateContext";
import { UserTokenDetails, useQueries } from "../../../hooks/useQueries";
import { useChain } from "../../../hooks/useChain";
import TokenUI from "../../SelectCustom/TokenUI/TokenUI";
import { formatBalance } from "../../../utils/balance";

type Props = {
  onSubmit: (token: string, secondToken: string) => void;
};

const CreatePoolForm = ({ onSubmit }: Props) => {
  const [loading, setLoading] = useState(true);
  const [token1, setToken1] = useState("");
  const [secondToken, setSecondToken] = useState("");
  const { userTokens } = useContext(AppStateContext);
  const [tokens, setTokens] = useState<UserTokenDetails[]>([]);

  const queries = useQueries();
  const chain = useChain();
  console.log(`tokens`,tokens)
  const options = useMemo(() => tokens.map((token) => ({
    value: token.address,
    label: <TokenUI
      name={token.symbol}
      chainName={chain.chainId}
      balance={formatBalance(+token.balance / (10 ** token.decimals))}
      icon={token.logo || ""}
    />,
  })), [tokens]);

  const handleSelectToken: SelectCustomProps["onChange"] = (option) => {
    setToken1(option?.value || "");
  };

  const handleSelectSecond: SelectCustomProps["onChange"] = (option) => {
    setSecondToken(option?.value || "");
  };

  const handleSubmit = () => {
    onSubmit(token1, secondToken);
  };

  useEffect(() => {
    if (!queries) {
      return;
    }
    alert(1);
    const fetch = async () => {
      setTokens(
        await Promise.all(
          (userTokens || []).map((tokenAddr) => queries.USER_TOKEN_DETAILS({
            cw20: tokenAddr,
          })),
        ),
      );
      setLoading(false);
    };
    fetch();
  }, [queries]);

  if (loading) {
    return <p>Loading...</p>;
  }

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
