import { ChangeEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "ui/Button";
import { useAccount } from "hooks/useAccount";
import { useStore } from "hooks/useStore";
import { useChain } from "hooks/useChain";
import { STORE_USER_CW20_TOKENS_KEY } from "store/cw20";
import { FidgetSpinner } from "react-loader-spinner";
import styles from "./ManageAssets.module.css";
import OtherTokenSender from "./OtherTokenSender/OtherTokenSender";
import TokenSender from "./NativeTokenSender/NativeTokenSender";

function ManageTokens() {
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState("");
  const [isVisible, setVisible] = useState(false);
  const chain = useChain();
  const { account } = useAccount();
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [userTokens, setUserTokens] = useState<string []>([]);
  const store = useStore();

  const handleChangeContractAddress: ChangeEventHandler<HTMLInputElement> = (event) => {
    const response = event.target.value;
    if (response) {
      setContract(response);
    }
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    store.get<string[]>(STORE_USER_CW20_TOKENS_KEY(chain, account)).then((data) => {
      if (data) {
        setUserTokens(data);
      }
    }).catch((e) => {
      console.log("Error when load store");
      console.log(e);
      toast("Store loading error");
    }).finally(() => {
      setLoading(false);
    });
  }, [chain, account]);

  const addContract = async () => {
    if (!account) {
      toast("Account is not connected");
      return;
    }
    if (userTokens.includes(contract)) {
      setContract("");
      toast("Token already exist", {
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    if (chain.validateAddress(contract)) {
      await store.setInArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, contract);
      setUserTokens([...userTokens, contract]);
      setContract("");
    } else {
      toast("Invalid contract address", {
        type: "error",
        autoClose: 2000,
      });
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  const removeUserToken = async () => {
    if (!account) {
      toast("Account is not connected");
      return;
    }
    await store.deleteFromArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, contract);
    setUserTokens(userTokens.filter((t) => t !== contract));
  };

  if (loading) {
    return <FidgetSpinner />;
  }

  return (
    <div className={styles.manageTok}>
      <div className={styles.highlighter}>
        <div className={styles.name}>Assets</div>
      </div>

      {isConnected ? (
        <div className={styles.tokens}>
          <TokenSender />
          <div className={styles.tokenList}>
            {userTokens.map((contractAddress) => (
              <OtherTokenSender
                contractAddress={contractAddress}
                removeContract={removeUserToken}
                key={contractAddress}
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
                  value={contract}
                  onChange={handleChangeContractAddress}
                />
                <Button
                  color="green"
                  type="button"
                  onClick={() => addContract()}
                  className={styles.addTokenButton}
                >
                  Add Token
                </Button>
              </div>
            )}
            {isVisible && <div className={styles.error}>Token not found</div>}
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
}

export default ManageTokens;
