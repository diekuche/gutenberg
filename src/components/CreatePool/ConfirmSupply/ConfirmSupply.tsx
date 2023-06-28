import React from "react";
import styles from "./ConfirmSupply.module.css";
import NewButton from "../../newButton/newButton";
import { TokenDetails } from "../../../hooks/useQueries";
import { formatBalance } from "../../../utils/balance";
import { calcTokenExchangePrice, tokenAmountToFloat } from "../../../utils/tokens";

type Props = {
  token1: TokenDetails;
  token2: TokenDetails;
  token1Amount: string;
  token2Amount: string;
  fee: number;
  onSubmit: () => void;
  processing: boolean;
};

const ConfirmSupply = ({
  fee,
  processing,
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
            <div className={styles.priceToken}>
              {formatBalance(tokenAmountToFloat(token1Amount, token1.decimals))}
            </div>
          </div>
        </div>
        <div className={styles.secondString}>
          <div className={styles.nameString}>{token2.name}</div>
          <div className={styles.test}>
            <div className={styles.nameToken}>{token2.symbol}</div>
            <div className={styles.priceToken}>
              {formatBalance(tokenAmountToFloat(token2Amount, token2.decimals))}

            </div>
          </div>
        </div>
        <div className={styles.thirdString}>
          <div className={styles.nameString}>Exchanged Rate</div>

          <div className={styles.priceSummary}>
            {
              (calcTokenExchangePrice(token1Amount, token2Amount, fee + 0.1)
              / Number(tokenAmountToFloat(token2Amount, token2.decimals))
              ).toFixed(token2.decimals)
          }
          </div>
        </div>
      </div>
    </div>
    <NewButton disabled={processing} onClick={onSubmit} size="hg">
      {processing ? "processing" : "order deposit"}
    </NewButton>
  </div>
);

export default ConfirmSupply;
