import Input from "ui/CreatePage/Input";

import { useState } from "react";
import Button from "ui/Button";
import styles from "./Form.module.css";

export type CreateFactoryTokenFormValues = {
  name: string;
};

type FactoryTokenFormProps = {
  isConnected: boolean;
  connect: () => void;
  creating: boolean;
  onCreate: (values: CreateFactoryTokenFormValues) => void;
};

const FactoryTokenForm = ({
  isConnected,
  connect,
  creating,
  onCreate,
}: FactoryTokenFormProps) => {
  const [name, setName] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onCreate({
      name,
    });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <Input
          id="token"
          label={"Token's Name:"}
          htmlFor="token"
          subtitle="You can specify any name you like. But it is better to come up with something original (min 3, max 50 symbols)"
          placeholder={"John's Obligations"}
          name="token"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
  );
};

export default FactoryTokenForm;
