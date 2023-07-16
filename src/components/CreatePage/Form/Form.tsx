import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { FormEvent, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useAccount, useConnect, useInstantiateContract,
} from "graz";
import { toast } from "react-toastify";
import Button from "ui/Button";
import Input, { InputProps } from "ui/CreatePage/Input";
import Collapsible from "ui/CreatePage/Collapsible";
import { useChain } from "hooks/useChain";
import styles from "./Form.module.css";
import { AppStateContext } from "../../../context/AppStateContext";
import { ContractConfigs } from "../../../config/contracts";

const defaultBalance = {
  id: uuidv4(),
  address: "",
  amount: "",
};

export const Form = () => {
  const [balances, setBalances] = useState<Array<typeof defaultBalance>>([
    defaultBalance,
  ]);
  const [description, setDescription] = useState("");
  const { connect } = useConnect();
  const chain = useChain();
  const { data: account, isConnected } = useAccount();
  const { addUserToken } = useContext(AppStateContext);
  const codeId = ContractConfigs[chain.chainId].cw20ContractCodeId;
  const { instantiateContract } = useInstantiateContract({
    codeId,
    onError: (error) => {
      console.log("error", error);
      toast(error as string, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      console.log("data", data);
      toast(`Success! Contract address: ${data.contractAddress}`, {
        type: "success",
      });
      addUserToken(data.contractAddress);
    },
  });
  // const fee = useFee();

  const address = account?.bech32Address;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const initialBalance = { ...balances[0] };

    const {
      token, symbol, quantity, decimals, logo,
    } = event.target as typeof event.target & {
      token: { value: string };
      symbol: { value: string };
      quantity: { value: string };
      decimals: { value: string };
      logo: { value: string };
    };

    if (!decimals.value) {
      decimals.value = "0";
    }

    if (!initialBalance?.amount && address) {
      initialBalance.address = address;
      initialBalance.amount = quantity.value;
    }

    const msg = {
      name: token.value,
      symbol: symbol.value,
      decimals: parseInt(decimals.value, 10),
      initial_balances: [initialBalance, ...balances.slice(1)].map((value) => ({
        ...value,
        id: undefined,
      })),
      mint: {
        minter: address,
        cap: quantity.value,
      },
      marketing: {
        project: "",
        description,
        marketing: address,
        logo: {
          url: logo.value,
        },
      },
    };

    const gasPrice = GasPrice.fromString(
      `${chain.feeCurrencies[0].gasPriceStep?.low || 0}${
        chain.feeCurrencies[0].coinDenom
      }`,
    );
    const fee = calculateFee(600000, gasPrice);

    console.log("msg", {
      msg,
      label: token.value,
      fee,
    }, "activeChain", chain.chainId);
    instantiateContract({
      msg,
      label: token.value,
      fee,
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

export default Form;
