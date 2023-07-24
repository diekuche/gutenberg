import { useState } from "react";
import Button from "ui/Button";
import deleteButton from "ui/assets/Button_Delite.svg";
import plus from "ui/assets/plus.svg";
import minus from "ui/assets/minus.svg";
import { TokenListItem } from "types/tokens";
import styles from "./ManageToken.module.css";

export type ManageTokenProps = TokenListItem & {
  isSent: boolean;
  onDelete: (id: string) => void;
  onSend: (id: string, recipient: string, amount: string) => void;
};

const ManageToken = ({
  id,
  userBalance,
  isSent,
  logoUrl,
  isRemovable,
  onDelete,
  onSend,
  shortName,
}: ManageTokenProps) => {
  const [open, setOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendRecipient, setSendRecipient] = useState("");
  return (
    <div className={styles.contractData}>
      <div className={styles.tokenTitle}>
        <button
          type="button"
          onClick={() => setOpen((old) => !old)}
          className={styles.tokenName}
        >
          {logoUrl && (
          <img src={logoUrl} alt="" className={styles.logo} />
          )}
          <div className={styles.token}>
            {shortName}

          </div>
          <img
            alt="icons"
            className={styles.icon}
            src={open ? minus : plus}
          />
          <div className={styles.balance}>
            {Number(userBalance).toLocaleString()}
          </div>
          {isRemovable && (
          <button
            type="button"
            className={styles.x}
            onClick={() => onDelete(id)}
          >
            <img src={deleteButton} alt="" />
          </button>
          )}
        </button>
      </div>
      {open && (
      <div className={styles.children}>
        <div className={styles.label}>Recepient:</div>
        <input
          type="text"
          className={styles.addContract}
          value={sendRecipient}
          onChange={(e) => setSendRecipient(e.target.value)}
        />
        <div className={styles.label}>Amount:</div>
        <input
          type="text"
          className={styles.addContract}
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
        />
        <Button
          color="sendButton"
          type="button"
          className={styles.tokenButton}
          onClick={() => onSend(id, sendRecipient, sendAmount)}
        >
          Send
        </Button>
      </div>
      )}
      {isSent && <div className={styles.info}>sent!</div>}
    </div>
  );
};

export default ManageToken;
