import React, { useState } from "react";
import { useAccount, useInstantiateContract, useQuerySmart } from "graz";
import { toast } from "react-toastify";
import styles from "./Pools.module.css";

import CreatePool from "../CreatePool/CreatePool/CreatePool";
import MyPools from "./MyPools/MyPools";
import { useFee } from "../../utils/useFee";
import AllPools from "./AllPools";
import { useSwapPoolFactory } from "../../hooks/useSwapPoolFactory";

const Pools = () => {
  const [isNewPoolOpen, setNewPoolOpen] = useState(false);
  const { data: account, isConnected } = useAccount();
  const factory = useSwapPoolFactory();
  const { instantiateContract } = useInstantiateContract({
    codeId: 9,
    onError: (error: any) => {
      console.log("error", error);
      toast(error, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      console.log("data", data);
      toast(`Success! Contract address: ${data.contractAddress}`, {
        type: "success",
      });
      // addUserToken(data.contractAddress);
    },
  });
  const fee = useFee();
  const address = account?.bech32Address;
  const { data: tokenInfo } = useQuerySmart(
    "bostrom1slwnz9ruv0hf230a9hmxaw75lrv5y5fmg5zt429swu4mcm3z287q82vx2h",
    {
      info: {},
    },
  );
  console.log("tokenInfo", tokenInfo);

  const toggleNewPoolModal = () => {
    setNewPoolOpen(!isNewPoolOpen);
  };

  if (!factory) {
    return <p>Loading...</p>;
  }

  const createPoolSubmit = async (token: string, secondToken: string) => {
    console.log("token", token);
    console.log("secondToken", secondToken);

    const CreatePoolResponse = await factory.executor.createPool({
      lpFeePercent: "0.01",
      token1Denom: {
        cw20: token,
      },
      token2Denom: {
        cw20: secondToken,
      },
    }, fee);
    console.log("CreatePoolResponse", CreatePoolResponse);

    // const msg = {
    //   token1_denom: {
    //     cw20: token,
    //   },
    //   token2_denom: {
    //     cw20: secondToken,
    //   },
    //   lp_token_code_id: 1,
    //   protocol_fee_recipient: address,
    //   protocol_fee_percent: "0.01",
    //   lp_fee_percent: "0.01",
    // };

    // instantiateContract({
    //   msg,
    //   label: "my label",
    //   fee,
    // });
  };

  return (
    <div>

      <CreatePool
        onSubmit={createPoolSubmit}
        open={isNewPoolOpen}
        onClose={toggleNewPoolModal}
      />

      <div className={styles.main}>
        <div className={styles.firstString}>
          <div className={styles.name}>pools!</div>
          <button type="button" className={styles.buttonCreate} onClick={toggleNewPoolModal}>
            create new pools!
          </button>
        </div>
        {/* <MyPools /> */}
        <AllPools />

      </div>
    </div>
  );
};

export default Pools;
