import { useState } from "react";
import Button from "ui/Button";
import { TokenListItem } from "types/tokens";
import styles from "./ManageAssets.module.css";
import ManageToken, { ManageTokenProps } from "./ManageToken";

export type ManageTokenInfo = Omit<ManageTokenProps, "onSend" | "onDelete"> & {
  key: string;
};

export type ManageAssetsProps = {
  isConnected: boolean;
  tokens: TokenListItem[];
  tokenSentIds: string[];
  onAddCw20Token: (contractAddress: string) => void;
  addTokenError?: string;
  onDelete: (id: string) => void;
  onSend: (id: string, recipient: string, amount: string) => void;
};
const ManageAssets = ({
  addTokenError,
  isConnected,
  onAddCw20Token,
  onDelete,
  onSend,
  tokens,
  tokenSentIds,
}: ManageAssetsProps) => {
  const [newContractAddress, setNewContractAddress] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.manageTok}>
      <div className={styles.highlighter}>
        <div className={styles.name}>Assets</div>
      </div>

      {isConnected ? (
        <div className={styles.tokens}>
          <div className={styles.tokenList}>
            {tokens.map((token) => (
              <ManageToken
                isSent={tokenSentIds.includes(token.id)}
                {...token}
                onDelete={onDelete}
                onSend={onSend}
              />
            ))}
          </div>
          <div className={styles.inputs}>
            <div className={styles.test} onClick={() => setOpen(!open)}>
              {open ? "" : "add token"}
            </div>
            {open && (
            <div>
              <div className={styles.info}>
                To add a token, specify its address:
              </div>
              <input
                type="text"
                className={styles.addContract}
                value={newContractAddress}
                onChange={(e) => setNewContractAddress(e.target.value)}
              />
              <Button
                color="green"
                type="button"
                onClick={() => {
                  setNewContractAddress("");
                  onAddCw20Token(newContractAddress);
                }}
                className={styles.addTokenButton}
              >
                Add Token
              </Button>
            </div>
            )}
            {addTokenError && <div className={styles.error}>Token not found</div>}
          </div>
        </div>
      ) : (
        <div className={styles.info2}>
          Please connect your wallet
          {" "}
          <br />
          {" "}
          to view your active positions.
        </div>
      )}
    </div>
  );
};

export default ManageAssets;
