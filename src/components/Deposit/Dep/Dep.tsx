import { useEffect, useState } from "react";
import { useAccount } from "graz";
import { toast } from "react-toastify";
import styles from "./Dep.module.css";
import NewBT from "../../newButton/newButton";
import { AppStatePool } from "../../../context/AppStateContext";
import { UserTokenDetails } from "../../../hooks/useQueries";
import { formatBalance } from "../../../utils/balance";
import {
  tokenAmountToFloat,
} from "../../../utils/tokens";
import { useContracts } from "../../../hooks/useContracts";
import { useAddLiquidity } from "../../../hooks/useAddLiquidity";
import { InputTokenAmount } from "../../controls/InputTokenAmount";

export type DepProps = {
  pool: AppStatePool;
  token1: UserTokenDetails;
  token2: UserTokenDetails;
  reserve1: string;
  reserve2: string;
  onSuccess: ()=>void;
};

const SLIPPAGE = 0.01;

const Dep = ({
  onSuccess,
  pool,
  token1,
  token2,
  reserve1,
  reserve2,
}: DepProps) => {
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const contracts = useContracts();
  const { data: account } = useAccount();
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Amount, setToken2Amount] = useState("0");
  const { addLiquidity } = useAddLiquidity();
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
    if (contracts && account && addLiquidity) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account, contracts]);
  const onDeposit = async () => {
    if (!token1Amount || !token2Amount) {
      toast.error("Please, specify token amount");
      return;
    }
    if (!contracts || !account || !addLiquidity) {
      return;
    }
    setProcessing(true);
    addLiquidity(pool.address, token1, token1Amount, token2, token2Amount).then(() => {
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
            <div className={styles.bootToken}>{pool.symbol1}</div>
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
            <div className={styles.bootToken}>{pool.symbol2}</div>
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

      <NewBT
        disabled={loading || processing}
        onClick={() => onDeposit()}
        size="hg"
      >
        {processing ? "processing" : "deposit"}

      </NewBT>
    </div>
  );
};

export default Dep;
