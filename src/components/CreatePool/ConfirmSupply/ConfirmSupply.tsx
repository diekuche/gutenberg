import React from "react";
import styles from "./ConfirmSupply.module.css";
import NewButton from "../../newButton/newButton";
import { TokenDetails } from "../../../hooks/useQueries";
import { formatBalance } from "../../../utils/balance";

type Props = {
  token1: TokenDetails;
  token2: TokenDetails;
  token1Amount: number;
  token2Amount: number;
  onSubmit: () => void;
};

const ConfirmSupply = ({
  token1, token2,
  token1Amount,
  token2Amount,
  onSubmit,
}: Props) => (
  <div className={styles.confirm}>
    <div>
      <div className={styles.name}>Confirm Supply</div>
      <div className={styles.text}>
        Creating
        {" "}
        {token1.symbol}
        /
        {token2.symbol}
        {" "}
        liquidity pool You are providing
        the listed assets. The exchange rate is calculated automatically. Make
        sure you are aware of all the risks of providing liquidity.
      </div>
      <div className={styles.change}>
        <div className={styles.firstString}>
          <div className={styles.nameString}>{token1.name}</div>
          <div className={styles.test}>
            <div className={styles.nameToken}>{token1.symbol}</div>
            <div className={styles.priceToken}>{formatBalance(token1Amount)}</div>
          </div>
        </div>
        <div className={styles.secondString}>
          <div className={styles.nameString}>{token2.name}</div>
          <div className={styles.test}>
            <div className={styles.nameToken}>{token2.symbol}</div>
            <div className={styles.priceToken}>{formatBalance(token2Amount)}</div>
          </div>
        </div>
        <div className={styles.thirdString}>
          <div className={styles.nameString}>Exchanged Rate</div>

          <div className={styles.priceSummary}>
            {(1 + token1Amount) / (token1Amount * token2Amount)}

          </div>
        </div>
      </div>
    </div>
    <NewButton onClick={onSubmit} size="hg">
      order deposit
    </NewButton>
  </div>
);

export default ConfirmSupply;
