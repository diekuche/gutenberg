// ui
import NewButton from "ui/NewButton";
import Slider from "ui/PoolWindow/Slider";
// styles
import { useAccount } from "hooks/useAccount";
import { useEffect, useState } from "react";
import { useChain } from "hooks/useChain";
import { SwapPoolClient, SwapPoolQueryClient } from "generated/SwapPool.client";
import { PoolDetails } from "types/pools";
import { ThreeCircles } from "react-loader-spinner";
import { Cw20Client, Cw20QueryClient } from "generated/Cw20.client";
import { tokenAmountToFloat } from "utils/tokens";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { GasLimit } from "config/cosmwasm";
import styles from "./Withdraw.module.css";

type WithdrawProps = {
  pool: PoolDetails;
};

const Withdraw = ({
  pool,
}: WithdrawProps) => {
  const chain = useChain();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const [percent, setPercent] = useState(75);
  const [balance, setBalance] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [lpTokenAddress, setLpTokenAddress] = useState("");
  const [updated, setUpdated] = useState(new Date().getTime());
  useEffect(() => {
    if (!account) {
      return;
    }
    const fetch = async () => {
      const cosmwasm = await chain.getCosmWasmClient();
      const client = new SwapPoolQueryClient(
        cosmwasm,
        pool.address,
      );
      const lpTokenInfo = await client.info();
      console.log("lpTokenInfo", lpTokenInfo);
      const lpTokenAddr = lpTokenInfo.lp_token_address as string;
      setLpTokenAddress(lpTokenAddr);
      const cw20 = new Cw20QueryClient(cosmwasm, lpTokenAddr);
      const tokenInfo = (await cw20.tokenInfo());

      setDecimals(tokenInfo.decimals);
      const lpBalance = (await cw20.balance({
        address: account.address,
      })).balance;
      setBalance(lpBalance);
    };
    setLoading(true);
    fetch().finally(() => setLoading(false));
  }, [account, chain, updated]);

  const withdraw = async () => {
    if (!account) {
      toast.error("Not connected");
      return;
    }
    const amount = BigNumber(balance).dividedBy(100).multipliedBy(percent);
    if (!(BigNumber(amount).gt(0))) {
      toast.error("Zero amount");
      return;
    }
    const signing = await chain.getSigningCosmWasmClient(account.signer);
    const client = new SwapPoolClient(
      signing,
      account.address,
      pool.address,
    );
    const cosmwasm = await chain.getCosmWasmClient();
    const cw20 = new Cw20QueryClient(cosmwasm, lpTokenAddress);
    try {
      const allowance = BigNumber((await cw20.allowance({
        owner: account.address,
        spender: pool.address,
      })).allowance);

      const allowanceDiff = amount.minus(allowance);
      if (allowanceDiff.gt(0)) {
        const res = await new Cw20Client(
          signing,
          account.address,
          lpTokenAddress,
        ).increaseAllowance({
          amount: allowanceDiff.toFixed(0),
          spender: pool.address,
        }, chain.calculateFee(GasLimit.Cw20IncreaseAllowance));
        console.log("Approve response", res);
      }

      console.log(`Remove liquidity from pool ${pool.address} for ${account.address}`, amount);
      await client.removeLiquidity({
        amount: amount.toFixed(0),
        minToken1: "0",
        minToken2: "0",
      }, chain.calculateFee(GasLimit.PoolRemoveLiquidity));
      setUpdated(new Date().getTime());
      setPercent(50);
      toast.success("Liquidity was removed successfully");
    } catch (e) {
      console.log("Error when remove liquidity");
      console.log(e);
      toast.error(`Error when remove liquidity: ${e}`);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", padding: "30px",
      }}
      >
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          visible
        />
      </div>
    );
  }

  return (
    <div className={styles.depositWindow}>
      <div className={styles.firstField}>
        <div className={styles.percentString}>
          <div className={styles.max} onClick={() => setPercent(100)}>max</div>
          <div className={styles.percentNumber}>{percent}</div>
          <div className={styles.percent}>%</div>
        </div>
        <div className={styles.cash}>($0.0000000)</div>
        <div className={styles.scale}>
          <Slider value={percent} setValue={setPercent} />
        </div>
      </div>
      <div className={styles.secondField}>
        <div className={styles.firstString}>
          <div className={styles.firstStringName}>you deposit</div>
          <div className={styles.secondStringName}>you will unfarm</div>
        </div>
        <div className={styles.secondString}>
          <div className={styles.firstPair}>
            <div className={styles.numberToken}>
              {tokenAmountToFloat(balance, decimals)}
            </div>
            <div className={styles.nameToken}>pool token</div>
          </div>
          <div className={styles.secondPair}>
            <div className={styles.valueToken}>
              {tokenAmountToFloat(
                BigNumber(balance).dividedBy(100).multipliedBy(percent).toFixed(0),
                decimals,
              )}
            </div>
            <div className={styles.nameToken}>pool token</div>
          </div>
        </div>
      </div>
      <NewButton size="hg" onClick={() => withdraw()}>withdraw</NewButton>
    </div>
  );
};

export default Withdraw;
