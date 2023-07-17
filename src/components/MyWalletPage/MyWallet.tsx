import React, {
  useCallback, useContext, useEffect, useState,
} from "react";
import { Coin, coins } from "@cosmjs/stargate";
import {
  useAccount,
  useClients,
  useSendTokens,
} from "graz";
import { toast } from "react-toastify";
import Button from "ui/Button";
import { getShortTokenName } from "utils/tokens";
import styles from "./MyWallet.module.css";
import circle from "../../assets/circle.svg";
import swapMA from "../../assets/swapMA.svg";
import icon_send from "../../assets/icon_send.svg";
import icon_mint from "../../assets/icon_mint.svg";
import icon_burn from "../../assets/icon_burn.svg";
// import MyInvestment from "../Pools/MyInvestment/MyInvestment";
// import MyPools from "../Pools/MyPools/MyPools";
import { AppStateContext } from "../../context/AppStateContext";
import Token from "./Token/Token";
import { useFee } from "../../utils/useFee";
import { useChain } from "../../hooks/useChain";
import { validateAddress } from "../../utils/wallet";

const sendBalance = {
  recepient: "",
  amount: "",
};

const ManageAssets = () => {
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(false);
  const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
  const { data: account } = useAccount();
  const { data } = useClients();
  const client = data?.stargate;
  const [currentBalance, setCurrentBalance] = useState<Coin | null>(null);
  const { userTokens, removeUserToken, addUserToken } = useContext(AppStateContext);
  const fee = useFee();

  const chain = useChain();

  const fetchBalance = useCallback(async () => {
    if (account?.bech32Address) {
      const balances = await client?.getAllBalances(account.bech32Address);
      if (balances?.[0]) {
        setCurrentBalance(balances[0]);
      }
    }
  }, [client, account]);

  const { sendTokens } = useSendTokens({
    onError: (error) => {
      toast(String(error), {
        type: "error",
      });
      console.log("Error when send tokens");
      console.log("error", error);
    },
    onSuccess: (result) => {
      toast("Success", {
        type: "success",
        autoClose: 2000,
      });
      console.log("success", result);
      fetchBalance();

      setBalance({ recepient: "", amount: "" });
      setOpen(false);
    },
  });

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleSendTokens = () => {
    const { recepient, amount } = balance;
    if (recepient !== "" && amount !== "" && currentBalance) {
      sendTokens({
        recipientAddress: recepient,
        amount: coins(amount, currentBalance.denom),
        fee,
      });
    }
  };

  const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance({
      ...balance,
      [name]: event.target.value,
    });
  };

  const addContract = () => {
    if (userTokens.includes(newTokenAddress)) {
      setNewTokenAddress("");
      toast("Token already exist", {
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    if (validateAddress(newTokenAddress, chain.bech32Config.bech32PrefixAccAddr)) {
      addUserToken(newTokenAddress);
      setNewTokenAddress("");
    } else {
      toast("Invalid contract address", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>manage assets</div>

      {currentBalance && (
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
              <tr>
                <td>
                  <div className={styles.nameToken}>
                    <img src={circle} className={styles.iconToken} alt="" />
                    <div>{getShortTokenName(currentBalance?.denom?.toUpperCase())}</div>
                  </div>
                </td>
                <td className={styles.balance}>
                  {Number(currentBalance?.amount).toLocaleString()}
                </td>
                <td />
                <td className={styles.thwidth}>
                  <div className={styles.send} onClick={() => setOpen(!open)}>
                    <img src={icon_send} alt="" />
                  </div>
                </td>

                <td className={styles.thwidth}>
                  <img src={swapMA} alt="" />
                </td>
                <td className={styles.thwidth}>
                  <img src={icon_mint} alt="" />
                </td>
                <td className={styles.thwidth}>
                  <img src={icon_burn} alt="" />
                </td>
              </tr>
              {open && (
                <tr>
                  <th colSpan={7} className={styles.colspan}>
                    <div className={styles.tokenSend}>
                      <div className={styles.sendformblock}>
                        <div className={styles.label}>
                          Recepient:
                          <input
                            type="text"
                            value={balance.recepient}
                            onChange={handleSendChange("recepient")}
                            className={styles.sendform}
                          />
                        </div>
                        <div className={styles.label}>
                          Amount:
                          <input
                            type="text"
                            value={balance.amount}
                            className={styles.sendform}
                            onChange={handleSendChange("amount")}
                          />
                        </div>
                      </div>
                      <Button
                        color="sendButton"
                        type="button"
                        className={styles.sendButton}
                        onClick={handleSendTokens}
                      >
                        Send
                      </Button>
                    </div>
                  </th>
                </tr>
              )}
              {userTokens.map((address) => (
                <Token
                  key={address}
                  contractAddress={address}
                  removeContract={removeUserToken}
                />
              ))}
              <tr>
                <td colSpan={7} className={styles.fix}>
                  <div className={styles.addString}>
                    {token && (
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
                          onClick={addContract}
                          className={styles.buttonStyle}
                        >
                          Add Token
                        </Button>
                      </div>
                    )}

                    <Button
                      color="green"
                      type="button"
                      className={styles.buttonToken}
                      onClick={() => setToken(!token)}
                    >
                      Add Token
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* <MyInvestment />
      <MyPools /> */}
    </div>
  );
};

export default ManageAssets;
