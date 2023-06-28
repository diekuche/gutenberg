import {
  ComponentType,
  useMemo,
} from "react";
import { SingleValueProps } from "react-select";
import { toast } from "react-toastify";
import styles from "./CreatePoolForm.module.css";
import UpDoAr from "../../../assets/UpDoAr.svg";
import SelectCustom, { SelectCustomProps } from "../../SelectCustom/SelectCustom";
import NewButton from "../../newButton/newButton";
import { UserTokenDetails } from "../../../hooks/useQueries";
import { useChain } from "../../../hooks/useChain";
import TokenUI from "../../SelectCustom/TokenUI/TokenUI";
import { formatBalance } from "../../../utils/balance";
import { compareDenoms } from "../../../utils/tokens";

type CreatePoolFormProps = {
  onSubmit: () => void;
  token1: UserTokenDetails | null;
  token2: UserTokenDetails | null;
  setToken1: (token: UserTokenDetails | null) => void;
  setToken2: (token: UserTokenDetails | null) => void;
  token1Amount: number;
  token2Amount: number;
  setToken1Amount: (value: number) => void;
  setToken2Amount: (value: number) => void;
  tokens: UserTokenDetails[];
  lpFee: number;
  setLpFee: (value: number) => void;
};

const LP_PERCENTS = [0.05, 0.5, 1];

const SelectValue: ComponentType<SingleValueProps<{
  label: unknown;
  value: UserTokenDetails;
}, false>> = (
  { data: { value: { symbol } } },
) => <div className={styles.selectValue}>{symbol}</div>;

const CreatePoolForm = ({
  onSubmit,
  token1,
  token2,
  setToken1,
  setToken2,
  token1Amount,
  token2Amount,
  setToken1Amount,
  setToken2Amount,
  tokens,
  lpFee,
  setLpFee,
}: CreatePoolFormProps) => {
  const chain = useChain();
  const options = useMemo(() => tokens.map((token) => ({
    value: token,
    label: <TokenUI
      name={token.symbol}
      chainName={chain.chainId}
      balance={formatBalance(Number(token.balance) / (10 ** token.decimals))}
      icon={token.logo || ""}
    />,
  })), [tokens]);

  const handleSelectToken: SelectCustomProps<UserTokenDetails>["onChange"] = (option) => {
    setToken1(option?.value || null);
    const balance = option?.value.balance;
    setToken1Amount(balance ? Number(balance) : 0);
  };

  const handleSelectSecond: SelectCustomProps<UserTokenDetails>["onChange"] = (option) => {
    setToken2(option?.value || null);
    const balance = option?.value.balance;
    setToken2Amount(balance ? Number(balance) : 0);
  };

  const handleSubmit = () => {
    if (!token1 || !token2) {
      toast.warning("Please, select tokens");
      return;
    }
    onSubmit();
  };
  const swapTokens = () => {
    if (!token1 || !token2) {
      return;
    }
    setToken2(token1);
    setToken1(token2);
    setToken1Amount(token2Amount);
    setToken2Amount(token1Amount);
  };

  return (
    <div className={styles.common}>
      <div className={styles.swap}>
        <div className={styles.InputBlock}>
          <input
            disabled={!token1}
            type="number"
            className={styles.currencyInput}
            value={token1Amount.toString()}
            onChange={(e) => setToken1Amount(Number(e.target.value))}
          />
          <div className={styles.selectWrapper}>
            <SelectCustom<UserTokenDetails>
              options={options}
              onChange={handleSelectToken}
              placeholder="Select Token"
              components={{ SingleValue: SelectValue }}
              value={token1
                && options.find(
                  ({ value }) => compareDenoms(value.denom, token1.denom),
                )}
            />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>
            Balance:
            {" "}
            {token1 ? token1.balance : 0}
            {" "}
          </div>
        </div>
        <div className={styles.center} style={{ zIndex: 1 }}>
          <div className={styles.line} />
          <div className={styles.circle} onClick={() => swapTokens()}>
            <img className={styles.iconSwap} src={UpDoAr} alt="" />
          </div>
        </div>
        <div className={styles.OutputBlock}>
          <input
            disabled={!token2}
            type="number"
            className={styles.currencyInput}
            value={token2Amount.toString()}
            onChange={(e) => setToken2Amount(Number(e.target.value))}
          />
          <div className={styles.selectWrapper}>
            <SelectCustom<UserTokenDetails>
              components={{ SingleValue: SelectValue }}
              options={options}
              onChange={handleSelectSecond}
              placeholder="Select Token"
              value={token2
                && options.find(
                  ({ value }) => compareDenoms(value.denom, token2.denom),
                )}
            />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>
            Balance:
            {" "}
            {token2 ? token2.balance : 0}
          </div>
        </div>
        <div className={styles.stringSelect}>
          <div className={styles.fee}>Select Liquidity Provider Fee:</div>
          <div className={styles.percent}>
            {LP_PERCENTS.map((percent) => (
              <button
                key={percent.toString()}
                type="button"
                onClick={() => setLpFee(percent)}
                className={`${styles.percent_1} ${(percent === lpFee ? styles.percent_1__active : "")}`}
              >
                {percent}
                %

              </button>
            ))}
          </div>
        </div>
        <NewButton disabled={!token1 || !token2} onClick={handleSubmit} size="hg">
          create pool
        </NewButton>
      </div>
    </div>
  );
};

export default CreatePoolForm;
