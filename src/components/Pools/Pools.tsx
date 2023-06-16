import React, { useState } from "react";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";

import Deposit from "../Deposit/Deposit";
import Modal from "../Modal/Modal";
import CreatePool from "../CreatePool/CreatePool/CreatePool";
import MyPools from "./MyPools/MyPools";
import { useAccount, useInstantiateContract, useQuerySmart } from "graz";
import { toast } from "react-toastify";
import { useFee } from "../../utils/useFee";

const Pools = () => {
  const [modal, setModal] = useState(false);
  const [isNewPoolOpen, setNewPoolOpen] = useState(false);
  const { data: account, isConnected } = useAccount();
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
    }
  );
  console.log("tokenInfo", tokenInfo);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleNewPoolModal = () => {
    setNewPoolOpen(!isNewPoolOpen);
  };

  const createPoolSubmit = (token: string, secondToken: string) => {
    console.log("token", token);
    console.log("secondToken", secondToken);

    const msg = {
      token1_denom: {
        cw20: token,
      },
      token2_denom: {
        cw20: secondToken,
      },
      lp_token_code_id: 1,
      protocol_fee_recipient: address,
      protocol_fee_percent: "0.01",
      lp_fee_percent: "0.01",
    };

    instantiateContract({
      msg,
      label: "my label",
      fee,
    });
  };

  return (
    <div>
      <Modal open={modal} onClose={toggleModal}>
        <Deposit />
      </Modal>
      <CreatePool
        onSubmit={createPoolSubmit}
        open={isNewPoolOpen}
        onClose={toggleNewPoolModal}
      />

      <div className={styles.main}>
        <div className={styles.firstString}>
          <div className={styles.name}>pools!</div>
          <button className={styles.buttonCreate} onClick={toggleNewPoolModal}>
            create new pools!
          </button>
        </div>

        {/* <div className={styles.secondString}>
          <div className={styles.allpools}>all pools</div>
          <input
            className={styles.filterTokens}
            type="text"
            placeholder="Filter tokens"
          />
        </div> */}
        {/* <div className={styles.tablePools}>
          <table>
            <thead>
              <tr className={styles.theadPools}>
                <th className={styles.pair}>Pair</th>
                <th>ARP</th>
                <th>
                  Total Liquidity
                  <img
                    className={styles.downarrow}
                    src={greyArrowDown}
                    alt=""
                  ></img>
                </th>
                <th className={styles.volume}>Volume (24h)</th>
              </tr>
            </thead>
            <tbody className={styles.mainTable}>
              <tr onClick={toggleModal}>
                <td className={styles.pairwidth}>
                  {modal && (
                    <div className={styles.content}>
                      <div className={styles.overlay}></div>
                      <Deposit />
                    </div>
                  )}
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$111,111,111</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$283,478,297</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.page}>
            <button className={styles.leftButton}>
              <img src={leftarrow} alt=""></img>
            </button>
            <div>Page 1 of 2</div>
            <button className={styles.rightButton}>
              <img src={rightarrow} alt=""></img>
            </button>
          </div>
        </div> */}
        <MyPools />
      </div>
    </div>
  );
};

export default Pools;
