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

export type DepProps = {
  pool: AppStatePool;
  token1: UserTokenDetails;
  token2: UserTokenDetails;
  token1ForToken2Price: string;
  onSuccess: ()=>void;
};

const SLIPPAGE = 0.01;

const Dep = ({
  onSuccess,
  pool,
  token1,
  token2,
  token1ForToken2Price,
}: DepProps) => {
  const [loading, setLoading] = useState(true);
  const contracts = useContracts();
  const { data: account } = useAccount();
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Amount, setToken2Amount] = useState("0");
  const { addLiquidity } = useAddLiquidity();
  const onToken1AmountChange = (value: string) => {
    setToken1Amount(value);
    if (+token1ForToken2Price) {
      const amount = Number(value) * Number(token1ForToken2Price);
      setToken2Amount((amount + amount * SLIPPAGE).toString());
    }
  };
  const onToken2AmountChange = (value: string) => {
    setToken2Amount(value);
    if (+token1ForToken2Price) {
      const amount = Number(value);
      setToken1Amount(((amount - amount * SLIPPAGE) / Number(token1ForToken2Price)).toString());
    }
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
    addLiquidity(pool.address, token1, token1Amount, token2, token2Amount).then(() => {
      toast.success("Liquidity was added successfully");
      onSuccess();
    }).catch((e) => {
      // No allowance for this account
      console.log("Error when deposit to pool", pool);
      console.log(e);
      toast.error("Unknown error");
    });
  };
  return (
    <div className={styles.depositWindow}>
      <div className={styles.firstField}>
        <div className={styles.firstStringOneField}>
          <input
            type="number"
            className={styles.value}
            value={+token1Amount}
            onChange={(e) => onToken1AmountChange(e.target.value)}
          />
          <div className={styles.element}>
            <div
              className={styles.level}
              onClick={
                () => onToken1AmountChange(tokenAmountToFloat(token1.balance, token1.decimals))
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
            {formatBalance(tokenAmountToFloat(token1.balance, token1.decimals), ".")}
          </div>
        </div>
      </div>
      <div className={styles.secondField}>
        <div className={styles.firstStringOneField}>
          <input
            type="number"
            className={styles.value}
            value={+token2Amount}
            onChange={(e) => onToken2AmountChange(e.target.value)}
          />
          <div className={styles.element}>
            <div
              className={styles.level}
              onClick={
                () => onToken2AmountChange(tokenAmountToFloat(token2.balance, token2.decimals))
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
            {formatBalance(tokenAmountToFloat(token2.balance, token2.decimals), ".")}
          </div>
        </div>
      </div>

      <NewBT disabled={loading} onClick={() => onDeposit()} size="hg">deposit</NewBT>
    </div>
  );
};

export default Dep;
