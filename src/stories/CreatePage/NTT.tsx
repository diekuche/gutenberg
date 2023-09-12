import { ForwardedRef, forwardRef } from "react";
import Button from "ui/Button";
import styles from "./NTT.module.css";
import Input from "./Input";

export type CreateFormValues = {
  tokenName: string;
  tokenSymbol: string;
};

export type NTTProps = {
  isConnected: boolean;
  connect: () => void;
  creating: boolean;
  onCreate: (values: CreateFormValues) => void;
};
const NTT = ({
  connect,
  creating,
  isConnected,
  onCreate,
}: NTTProps, ref: ForwardedRef<HTMLFormElement>) => {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const {
      token,
      symbol,
    } = e.target as typeof e.target & {
      token: { value: string };
      symbol: { value: string };
    };

    onCreate({
      tokenName: token.value,
      tokenSymbol: symbol.value,
    });
  };
  return (
    <div className={styles.ntt}>
      <div className={styles.cs}>
        <form
          className={styles.form}
          onSubmit={onSubmit}
          ref={ref}
        >
          <div className={styles.formContent}>
            <div style={{
              marginBottom: "10px",
              color: "white",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
            />
            <Input
              id="token"
              label={"Token's Name:"}
              htmlFor="token"
              subtitle="You can specify any name you like. But it is better to come up with something original (min 3, max 50 symbols)"
              placeholder={"John's Obligations"}
              name="token"
              required
            />
            <Input
              id="symbol"
              htmlFor="symbol"
              label="Symbol:"
              name="symbol"
              subtitle={"How your token will be displayed in users'wallets (min 3, max 5 symbols)"}
              pattern="[A-Za-z-0-9]{2,5}"
              placeholder="JUSD"
              required
            />
          </div>
          {!isConnected ? (
            <Button
              color="yellowTransp"
              className={styles.connectButton}
              onClick={() => {
                console.log("connect");
                connect();
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button disabled={creating} type="submit" color="yellow">
              {creating ? "creating..." : "create!"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default forwardRef<HTMLFormElement, NTTProps>(NTT);
