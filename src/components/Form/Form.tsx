import styles from "./index.module.css";
import React, { FormEvent } from "react";
import Button from "../Button/Button";
import Collapsible from "../Collapsible/Collapsible";
import Input from "../Input/Input";
import { initContract } from "../../contracts/base/contract";

type FormProps = {};

export const Form: React.FC<FormProps> = (props: FormProps) => {
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

    console.log(
      token.value,
      symbol.value,
      quantity.value,
      decimals.value,
      logo.value
    );
    initContract({
      name: token.value,
      symbol: symbol.value,
      quantity: quantity.value,
      decimals: decimals.value,
      logo: logo.value,
    });
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
      <Collapsible title="Change Initial Balance" children="changed" />
      <Collapsible title="Token Details" children="changed" />
      <Button type="submit" color="black" size="lg">
        mint!
      </Button>
    </form>
  );
};

export default Form;
