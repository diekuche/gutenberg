/* eslint-disable no-nested-ternary */
import {
  ComponentType,
  useMemo,
} from "react";
import { SingleValueProps } from "react-select";
import { toast } from "react-toastify";
import NewButton from "ui/NewButton";
import SelectCustom, { SelectCustomProps } from "ui/SelectCustom";
import { useChain } from "hooks/useChain";
import SelectTokenLabel from "ui/SelectCustom/SelectTokenLabel";
import InputTokenAmount from "ui/InputTokenAmount";
import { formatBalance } from "utils/balance";
import {
  compareTokens, getShortTokenName, tokenAmountToFloat,
} from "utils/tokens";
import { UserTokenDetails } from "types/tokens";
import { useAccount } from "hooks/useAccount";
import styles from "./CreatePoolForm.module.css";
import UpDoAr from "../../../assets/UpDoAr.svg";

type CreatePoolFormProps = {
  onSubmit: () => void;
  token1: UserTokenDetails | null;
  token2: UserTokenDetails | null;
  setToken1: (token: UserTokenDetails | null) => void;
  setToken2: (token: UserTokenDetails | null) => void;
  token1Amount: string;
  token2Amount: string;
  setToken1Amount: (value: string) => void;
  setToken2Amount: (value: string) => void;
  tokens: UserTokenDetails[];
  lpFee: number;
  setLpFee: (value: number) => void;
};

const LP_PERCENTS = [0.05, 0.5, 0.9] as const;

const SelectValue: ComponentType<SingleValueProps<{
  label: unknown;
  value: UserTokenDetails;
}, false>> = (
  { data: { value: token } },
) => <div className={styles.selectValue}>{getShortTokenName(token)}</div>;

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
  const { isConnected, connect, isConnecting } = useAccount();
  const options = useMemo(() => tokens.map((token) => ({
    value: token,
    label: <SelectTokenLabel
      name={getShortTokenName(token)}
      chainName={chain.config.chainId}
      balance={formatBalance(tokenAmountToFloat(token.balance, token.decimals), token.decimals)}
      icon={token.logo || ""}
    />,
  })), [tokens]);

  const handleSelectToken: SelectCustomProps<UserTokenDetails>["onChange"] = (option) => {
    setToken1(option?.value || null);
    const balance = option?.value.balance;
    setToken1Amount(balance || "0");
  };

  const handleSelectSecond: SelectCustomProps<UserTokenDetails>["onChange"] = (option) => {
    setToken2(option?.value || null);
    const balance = option?.value.balance;
    setToken2Amount(balance || "0");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!isConnected) {
      connect();
      return;
    }
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
      <form className={styles.swap} onSubmit={handleSubmit}>
        <div className={styles.InputBlock}>
          <InputTokenAmount
            decimals={token1?.decimals || 0}
            maxAmount={token1?.balance || 0}
            disabled={!token1}
            className={styles.currencyInput}
            value={token1Amount || "0"}
            onChange={setToken1Amount}
          />
          <div className={styles.selectWrapper}>
            <SelectCustom<UserTokenDetails>
              options={options}
              onChange={handleSelectToken}
              placeholder="Select Token"
              components={{ SingleValue: SelectValue }}
              value={token1
                && options.find(
                  ({ value }) => compareTokens(value, token1),
                )}
            />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>
            Balance:
            {" "}
            {token1 ? tokenAmountToFloat(token1.balance, token1.decimals) : 0}
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
          <InputTokenAmount
            decimals={token2?.decimals || 0}
            maxAmount={token2?.balance || 0}
            disabled={!token2}
            type="number"
            className={styles.currencyInput}
            value={token2Amount || "0"}
            onChange={setToken2Amount}
          />
          <div className={styles.selectWrapper}>
            <SelectCustom<UserTokenDetails>
              components={{ SingleValue: SelectValue }}
              options={options}
              onChange={handleSelectSecond}
              placeholder="Select Token"
              value={token2
                && options.find(
                  ({ value }) => compareTokens(value, token2),
                )}
            />
          </div>
        </div>
        <div className={styles.balanceBlock}>
          <div className={styles.balance}>
            Balance:
            {" "}
            {token2 ? tokenAmountToFloat(token2.balance, token2.decimals) : 0}
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
        <NewButton
          type="submit"
          disabled={
            !isConnected ? isConnecting : (!token1 || !token2 || !token1Amount || !token2Amount)
}
          size="hg"
        >
          {!isConnected ? "connect wallet"
            : (!token1 || !token2 ? "select tokens"
              : (!token1Amount || !token2Amount ? "enter amount" : "create pool"))}

        </NewButton>
      </form>
    </div>
  );
};

export default CreatePoolForm;
