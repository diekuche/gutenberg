import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "ui/Button";
import Input, { InputProps } from "ui/CreatePage/Input";
import Collapsible from "ui/CreatePage/Collapsible";
import styles from "./Form.module.css";

const defaultBalance = {
  id: uuidv4(),
  address: "",
  amount: "",
};

type Balance = typeof defaultBalance;

export type CreateCw20FormValues = {
  balances: Balance[];
  decimals: string;
  tokenName: string;
  tokenSymbol: string;
  quantity: string;
  logo: string;
  description: string;
};

export type CW20TokenFormProps = {
  isConnected: boolean;
  connect: () => void;
  onCreate: (values: CreateCw20FormValues) => void;
};

const CW20TokenForm = ({
  isConnected,
  connect,
  onCreate,
}: CW20TokenFormProps) => {
  const [balances, setBalances] = useState<Balance[]>([
    defaultBalance,
  ]);
  const [description, setDescription] = useState("");

  const handleAddNewBalance = () => {
    setBalances([
      ...balances,
      {
        id: uuidv4(),
        address: "",
        amount: "",
      },
    ]);
  };

  const removeBalance = (id: string) => () => {
    setBalances(balances.filter((item) => item.id !== id));
  };

  const handleChangeInitialBalance = (
    id: string,
    name: string,
  ): InputProps["onChange"] => (event) => {
    setBalances(
      balances.map((balance) => {
        if (balance.id === id) {
          return {
            ...balance,
            [name]: event.target.value,
          };
        }
        return balance;
      }),
    );
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const {
      token, symbol, quantity, decimals, logo,
    } = e.target as typeof e.target & {
      token: { value: string };
      symbol: { value: string };
      quantity: { value: string };
      decimals: { value: string };
      logo: { value: string };
    };

    onCreate({
      balances,
      decimals: decimals.value || "0",
      tokenName: token.value,
      tokenSymbol: symbol.value,
      quantity: quantity.value,
      logo: logo.value,
      description,
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
    >
      <div className={styles.formContent}>
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
        <Input
          id="quantity"
          htmlFor="quantity"
          label="Quantity:"
          name="quantity"
          subtitle="You can print as many tokens as you want"
          pattern="[0-9]{1,}"
          placeholder="0"
          required
        />
        <Input
          id="decimals"
          htmlFor="decimals"
          label="Decimals:"
          name="decimals"
          subtitle="The number of digits after the decimal point (e.x. Bitcoin has 8 digits, max 10 symbols)"
          pattern="[0-9]{0,10}"
          placeholder="0"
        />
        <Input
          id="logo"
          htmlFor="logo"
          label="Logo URL:"
          name="logo"
          placeholder="https://www.example.com/image.png"
        />
        <Collapsible title="Changing initial balances">
          <div className={styles.inputComponent}>
            <div className={styles.article}>
              By default all new tokens will be transfered to your wallet.
              <br />
              You can change that.
            </div>
            {balances.map(({ id, address: addr, amount }, index) => (
              <div className={styles.inputs} key={id}>
                <Input
                  id="address"
                  placeholder="bostrom..."
                  label="Wallet"
                  value={addr}
                  onChange={handleChangeInitialBalance(id, "address")}
                />
                <Input
                  id="amount"
                  placeholder="100"
                  label="Amount"
                  value={amount}
                  onChange={handleChangeInitialBalance(id, "amount")}
                />
                <button
                  className={styles.dot}
                  type="button"
                  onClick={
                      index === 0 ? handleAddNewBalance : removeBalance(id)
                    }
                >
                  {index === 0 ? "+" : "-"}
                </button>
              </div>
            ))}
          </div>
        </Collapsible>
        <Collapsible title="Token details">
          <div className={styles.article}>
            This information will be displayed in the description of the created
            token
            <br />
            (max 160 symbols):
          </div>
          <Input
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            isTextArea
          />
        </Collapsible>
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
        <Button type="submit" color="yellow">
          create!
        </Button>
      )}
    </form>
  );
};

export default CW20TokenForm;
