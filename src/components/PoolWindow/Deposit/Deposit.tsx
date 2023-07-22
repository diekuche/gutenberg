import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewButton from "ui/NewButton";
import InputTokenAmount from "ui/InputTokenAmount";
import {
  getShortTokenName,
  tokenAmountToFloat,
} from "utils/tokens";
import { formatBalance } from "utils/balance";
import { UserTokenDetails } from "types/tokens";
import { PoolDetails } from "types/pools";
import { useAccount } from "hooks/useAccount";
import { ADD_LIQUIDITY } from "mutations/pool";
import styles from "./Deposit.module.css";

export type DepProps = {
  pool: PoolDetails;
  token1: UserTokenDetails;
  token2: UserTokenDetails;
  reserve1: string;
  reserve2: string;
  onSuccess: ()=>void;
};

const SLIPPAGE = 0.01;

const Deposit = ({
  onSuccess,
  pool,
  token1,
  token2,
  reserve1,
  reserve2,
}: DepProps) => {
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { account, connect } = useAccount();
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Amount, setToken2Amount] = useState("0");
  const r1 = Number(reserve1);
  const r2 = Number(reserve2);
  const onToken1AmountChange = (value: string) => {
    if (r1 && r2) {
      if (Number(value) === 0) {
        setToken2Amount("0");
      } else {
        const amount = (Number(value) * r2) / r1 + 1;
        const token2Value = Math.ceil((amount + amount * SLIPPAGE));
        setToken2Amount(token2Value.toString());
      }
    }
    setToken1Amount(value);
  };
  const onToken2AmountChange = (value: string) => {
    if (r1 && r2) {
      if (Number(value) === 0) {
        setToken1Amount("0");
      } else {
        const amount = (Number(value) * r1) / r2 + 1;
        const token1Value = Math.ceil((amount + amount * SLIPPAGE));
        setToken1Amount(token1Value.toString());
      }
    }
    setToken2Amount(value);
  };

  useEffect(() => {
    if (account) {
      setLoading(false);
    } else {
      connect();
      setLoading(true);
    }
  }, [account]);
  const onDeposit = async () => {
    if (!token1Amount || !token2Amount) {
      toast.error("Please, specify token amount");
      return;
    }
    if (!account) {
      return;
    }
    setProcessing(true);
    ADD_LIQUIDITY(account, pool.address, token1, token1Amount, token2, token2Amount).then(() => {
      toast.success("Liquidity was added successfully");
      onSuccess();
    }).catch((e) => {
      // No allowance for this account
      console.log("Error when deposit to pool", pool);
      console.log(e);
      toast.error("Unknown error");
    }).finally(() => setProcessing(false));
  };
  return (
    <div className={styles.depositWindow}>
      <div className={styles.firstField}>
        <div className={styles.firstStringOneField}>
          <InputTokenAmount
            type="number"
            className={styles.value}
            value={token1Amount}
            decimals={token1.decimals}
            maxAmount={token1.balance}
            onChange={onToken1AmountChange}
          />
          <div className={styles.element}>
            <div
              className={styles.level}
              onClick={
                () => onToken1AmountChange(token1.balance)
}
            >
              max

            </div>
            {token1.logo
            && <img className={styles.circle} src={token1.logo} alt="" />}
            <div className={styles.bootToken}>{getShortTokenName(pool.token1)}</div>
          </div>
        </div>
        <div className={styles.secondStirngTwoField}>
          <div className={styles.cash}>$0.00</div>
          <div className={styles.balance}>
            Balance:
            {" "}
            {formatBalance(tokenAmountToFloat(token1.balance, token1.decimals), token1.decimals, ".")}
          </div>
        </div>
      </div>
      <div className={styles.secondField}>
        <div className={styles.firstStringOneField}>
          <InputTokenAmount
            type="number"
            className={styles.value}
            value={token2Amount}
            decimals={token2.decimals}
            maxAmount={token2.balance}
            onChange={onToken2AmountChange}
          />
          <div className={styles.element}>
            <div
              className={styles.level}
              onClick={
                () => onToken2AmountChange(token2.balance)
}
            >
              max

            </div>
            {token2.logo
            && <img className={styles.circle} src={token2.logo} alt="" />}
            <div className={styles.bootToken}>{getShortTokenName(pool.token2)}</div>
          </div>
        </div>
        <div className={styles.secondStirngTwoField}>
          <div className={styles.cash}>$0.00</div>
          <div className={styles.balance}>
            Balance:
            {" "}
            {formatBalance(tokenAmountToFloat(token2.balance, token2.decimals), token2.decimals, ".")}
          </div>
        </div>
      </div>

      <NewButton
        disabled={loading || processing}
        onClick={() => onDeposit()}
        size="hg"
      >
        {processing ? "processing" : "deposit"}

      </NewButton>
    </div>
  );
};

export default Deposit;
