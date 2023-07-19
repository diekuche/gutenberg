import Button from "ui/Button";
import { useState } from "react";
import styles from "./TokenList.module.css";
import TokenItem, { TokenItemProps } from "./TokenItem";

export type TokenListItem = Omit<
TokenItemProps,
"onBurn" | "onMint" | "onSend" | "onRemove"
> & {
  key: string;
};

type TokenListProps = {
  addTokenLoading: boolean;
  addCw20Token: (tokenAddress: string) => void;
  onBurn: (key: string, burnAmount: string) => void;
  onMint: (key: string, mintAmount: string) => void;
  onSend: (key: string, sendRecipient: string, sendAmount: string) => void;
  onRemove: (key: string) => void;
  tokens: TokenListItem[];
};

const TokenList = ({
  addTokenLoading,
  addCw20Token,
  onBurn,
  onMint,
  onSend,
  onRemove,
  tokens,
}: TokenListProps) => {
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [openNewToken, setOpenNewToken] = useState(false);
  return (
    <div className={styles.tableMA}>
      <table>
        <thead>
          <tr className={styles.theadMA}>
            <th className={styles.thLeft}>Tokens</th>
            <th className={styles.thLeft}>Balance</th>
            <th className={styles.thLeft} aria-label="divider" />
            <th className={styles.thwidth}>Send</th>
            <th className={styles.thwidth}>Swap</th>
            <th className={styles.thwidth}>Mint</th>
            <th className={styles.thwidth}>Burn</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((item) => (
            <TokenItem
              {...item}
              key={item.key}
              onSend={onSend}
              onBurn={onBurn}
              onMint={onMint}
              onRemove={onRemove}
            />
          ))}
          <tr>
            <td colSpan={7} className={styles.fix}>
              <div className={styles.addString}>
                {openNewToken && (
                <div className={styles.clickString}>
                  <div className={styles.textToken}>
                    To add a token, specify its address:
                  </div>
                  <input
                    type="text"
                    value={newTokenAddress}
                    onChange={(e) => setNewTokenAddress(e.target.value)}
                    className={styles.tokenAdd}
                  />
                  <Button
                    color="green"
                    type="button"
                    disabled={addTokenLoading}
                    onClick={() => addCw20Token(newTokenAddress)}
                    className={styles.buttonStyle}
                  >
                    {addTokenLoading ? "adding..." : "Add token"}
                  </Button>
                </div>
                )}

                <Button
                  color="green"
                  type="button"
                  className={styles.buttonToken}
                  onClick={() => setOpenNewToken(true)}
                >
                  Add Token
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TokenList;
