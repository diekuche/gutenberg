import styles from "./index.module.css";
import React, { FormEvent, useState } from "react";
import Button from "../Button/Button";
import Collapsible from "../Collapsible/Collapsible";
import Input from "../Input/Input";
import { initContract } from "../../contracts/base/contract";
import { v4 as uuidv4 } from "uuid";

const initialBalance = {
  id: uuidv4(),
  address: "",
  amount: "",
};

export const Form: React.FC = () => {
  const [balances, setBalances] = useState<Array<typeof initialBalance>>([
    initialBalance,
  ]);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { token, symbol, quantity, decimals, logo } =
      event.target as typeof event.target & {
        token: { value: string };
        symbol: { value: string };
        quantity: { value: string };
        decimals: { value: string };
        logo: { value: string };
      };

    initContract({
      name: token.value,
      symbol: symbol.value,
      quantity: quantity.value,
      decimals: decimals.value,
      logo: logo.value,
      initialBalance: balances,
      description,
    });
  };

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

  const handleChangeInitialBalance =
    (id: string, name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBalances(
        balances.map((balance) => {
          if (balance.id === id) {
            return {
              ...balance,
              [name]: event.target.value,
            };
          } else {
            return balance;
          }
        })
      );
    };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formheader}>Create New Token</div>
      <Input
        id="token"
        label={`Token's Name:`}
        htmlFor="token"
        subtitle={`You can specify any name you like. But it is better to come up with something original`}
        placeholder={`John's Obligations`}
        name="token"
        required
      />
      <Input
        id="symbol"
        htmlFor="symbol"
        label={`Symbol:`}
        name="symbol"
        subtitle={`How your token will be displayed in users' wallets`}
        pattern={`[A-Za-z-0-9]{2,5}`}
        placeholder={`JUSD`}
        required
      />
      <Input
        id="quantity"
        htmlFor="quantity"
        label={`Quantity:`}
        name="quantity"
        subtitle={`You can print as many tokens as you want`}
        pattern={`[0-9]{1,}`}
        placeholder={`0`}
        required
      />
      <Input
        id="decimals"
        htmlFor="decimals"
        label={`Decimals:`}
        name="decimals"
        subtitle={`The number of digits after the decimal point (e.x. Bitcoin has 8 digits)`}
        pattern={`[0-9]{0,10}`}
        placeholder={`0`}
      />
      <Input
        id="logo"
        htmlFor="logo"
        label={`Logo URL:`}
        name="logo"
        placeholder={`https://www.example.com/image.png`}
      />
      <Collapsible title={<>Changing Initial Balance</>}>
        <div className={styles.inputComponent}>
          <div className={styles.article}>
            By default all new tokens will be transfered to your wallet. You can
            change that.
          </div>
          {balances.map(({ id, address, amount }, index) => {
            return (
              <div className={styles.inputs} key={id}>
                <Input
                  id="address"
                  placeholder="bostrom..."
                  label="Wallet"
                  value={address}
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
            );
          })}
        </div>
      </Collapsible>
      <Collapsible title={<>Token Details</>}>
        <Input
          value={description}
          name="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          label="This information will be displayed in the description of the created token:"
          isTextArea
        />
      </Collapsible>

      <Button type="submit" color="black" size="lg">
        mint!
      </Button>
    </form>
  );
};

export default Form;
