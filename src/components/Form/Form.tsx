import styles from "./index.module.css";
import React, { FormEvent, useState } from "react";
import Button from "../Button/Button";
import Collapsible from "../Collapsible/Collapsible";
import Input from "../Input/Input";
import { initContract } from "../../contracts/base/contract";
import { v4 as uuidv4 } from "uuid";
import { getAddress, getContractAddress } from "../../utils/wallet";
import { toast } from "react-toastify";
import { useAddressExists } from "../../hooks/useAddressExists";
import { AppStateContext } from "../../context/AppStateContext";
import { useContext } from "react";

const initialBalance = {
  id: uuidv4(),
  address: "",
  amount: "",
};

interface FormProps {
  initial: string[];
  setInitial: (st: string[]) => void;
}

export const Form = ({ setInitial, initial }: FormProps) => {
  const [balances, setBalances] = useState<Array<typeof initialBalance>>([
    initialBalance,
  ]);
  const [description, setDescription] = useState("");
  const { initKeplr } = useAddressExists();
  const { address } = useContext(AppStateContext);

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

    if (!decimals.value) {
      decimals.value = "0";
    }

    if (!initialBalance.amount) {
      let initialAddress = await getAddress();
      if (initialAddress) {
        initialBalance.address = initialAddress;
        initialBalance.amount = quantity.value;
      }
    }

    const txHash = await initContract({
      name: token.value,
      symbol: symbol.value,
      quantity: quantity.value,
      decimals: decimals.value,
      logo: logo.value,
      initialBalance: balances,
      description,
    });

    if (txHash) {
      console.log(txHash);
      const response = await getContractAddress(txHash);
      if (response) {
        setInitial([...initial, response]);
      }
      toast(
        <a
          href={"https://cyb.ai/network/bostrom/tx/" + txHash}
          target="_blank"
          rel="noreferrer"
        >
          Click to show tx
        </a>
      );
    }
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
      <Input
        id="token"
        label={`Token's Name:`}
        htmlFor="token"
        subtitle={`You can specify any name you like. But it is better to come up with something original (min 3, max 50 symbols)`}
        placeholder={`John's Obligations`}
        name="token"
        required
      />
      <Input
        id="symbol"
        htmlFor="symbol"
        label={`Symbol:`}
        name="symbol"
        subtitle={`How your token will be displayed in users'wallets (min 3, max 5 symbols)`}
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
        subtitle={`The number of digits after the decimal point (e.x. Bitcoin has 8 digits, max 10 symbols)`}
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
      <Collapsible title="Changing initial balances">
        <div className={styles.inputComponent}>
          <div className={styles.article}>
            By default all new tokens will be transfered to your wallet.
            <br />
            You can change that.
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
                  title="add bostrom wallet"
                  pattern="^bostrom.+"
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
      <Collapsible title="Token details">
        <Input
          value={description}
          name="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          label={
            "This information will be displayed in the description of the created token \n (max 160 symbols):"
          }
          isTextArea
        />
      </Collapsible>
      {!address ? (
        <Button
          color="black"
          size="sm"
          className={styles.connectButton}
          onClick={initKeplr}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button type="submit" color="black" size="sm">
          create
        </Button>
      )}
    </form>
  );
};

export default Form;
