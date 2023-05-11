import React, { useState } from "react";
import styles from "./MyWallet.module.css";
import circle from "../../assets/circle.svg";
import swapMA from "../../assets/swapMA.svg";
import icon_send from "../../assets/icon_send.svg";
import icon_mint from "../../assets/icon_mint.svg";
import icon_burn from "../../assets/icon_burn.svg";
import Button from "../Button/Button";
import MyInvestment from "../Pools/MyInvestment/MyInvestment";
import MyPools from "../Pools/MyPools/MyPools";
import pig from "../../assets/pig_logo.svg";
import swapMAYellow from "../../assets/SwapCircleYellow.svg";
import other from "../../assets/OtherToken.svg";
import icon_mint_yellow from "../../assets/icon_mint_yellow.svg";
import icon_burn_yellow from "../../assets/icon_burn_yellow.svg";
import basket from "../../assets/basket.svg";

const ManageAssets = () => {
  const [open, setOpen] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [openSendThird, setSendThird] = useState(false);
  const [mint, setMint] = useState(false);
  const [burn, setBurn] = useState(false);
  const [burnSend, setBurnSend] = useState(false);
  const [token, setToken] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.title}>manage assets</div>
      <div className={styles.tableMA}>
        <table>
          <thead>
            <tr className={styles.theadMA}>
              <th className={styles.thLeft}>Tokens</th>
              <th className={styles.thLeft}>Balance</th>
              <th className={styles.thLeft}></th>
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
                  <div>
                    BOOT
                    <div className={styles.test}>bostrom</div>
                  </div>
                </div>
              </td>
              <td className={styles.balance}>937,453,452.00</td>
              <td></td>
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
                        <input type="text" className={styles.sendform} />
                      </div>
                      <div className={styles.label}>
                        Amount:
                        <input type="text" className={styles.sendform} />
                      </div>
                    </div>
                    <Button
                      color="sendButton"
                      type="button"
                      className={styles.sendButton}
                    >
                      Send
                    </Button>
                  </div>
                </th>
              </tr>
            )}
            <tr>
              <td>
                <div className={styles.nameToken}>
                  <img src={pig} className={styles.iconToken} alt="" />
                  <div>
                    MyTok
                    <div className={styles.test}>PigNon</div>
                  </div>
                </div>
              </td>
              <td className={styles.balance}>123,456,789.00</td>
              <td>
                <img src={basket} alt="" />
              </td>
              <td className={styles.thwidth}>
                <div
                  className={styles.send}
                  onClick={() => setOpenSend(!openSend)}
                >
                  <img src={icon_send} alt="" />
                </div>
              </td>
              <td className={styles.thwidth}>
                <img src={swapMAYellow} alt="" />
              </td>
              <td className={styles.thwidth}>
                <div className={styles.send} onClick={() => setMint(!mint)}>
                  <img src={icon_mint_yellow} alt="" />
                </div>
              </td>
              <td className={styles.thwidth}>
                <div
                  className={styles.send}
                  onClick={() => setBurnSend(!burnSend)}
                >
                  <img src={icon_burn_yellow} alt="" />
                </div>
              </td>
            </tr>
            {openSend && (
              <tr>
                <th colSpan={7} className={styles.colspan}>
                  <div className={styles.tokenSend}>
                    <div className={styles.sendformblock}>
                      <div className={styles.label}>
                        Recepient:
                        <input type="text" className={styles.sendform} />
                      </div>
                      <div className={styles.label}>
                        Amount:
                        <input type="text" className={styles.sendform} />
                      </div>
                    </div>
                    <Button
                      color="sendButton"
                      type="button"
                      className={styles.sendButton}
                    >
                      Send
                    </Button>
                  </div>
                </th>
              </tr>
            )}
            {mint && (
              <tr>
                <th className={styles.colspan} colSpan={7}>
                  <div className={styles.tokenSend}>
                    <div className={styles.sendformblock}>
                      <div className={styles.label}>
                        Amount:
                        <input type="text" className={styles.sendformAmount} />
                      </div>
                      <Button
                        color="sendButton"
                        type="button"
                        className={styles.sendButton}
                      >
                        Mint
                      </Button>
                    </div>
                  </div>
                </th>
              </tr>
            )}
            {burnSend && (
              <tr>
                <th className={styles.colspan} colSpan={7}>
                  <div className={styles.tokenSend}>
                    <div className={styles.sendformblock}>
                      <div className={styles.label}>
                        Recepient:
                        <input type="text" className={styles.sendform} />
                      </div>
                      <Button
                        color="sendButton"
                        type="button"
                        className={styles.sendButton}
                      >
                        Burn
                      </Button>
                    </div>
                  </div>
                </th>
              </tr>
            )}
            <tr>
              <td>
                <div className={styles.nameToken}>
                  <img src={other} className={styles.iconToken} alt="" />
                  <div>
                    Other
                    <div className={styles.test}>Lighjhjna</div>
                  </div>
                </div>
              </td>
              <td className={styles.balance}>987,654,321,00</td>
              <td>
                <img src={basket} alt="" />
              </td>
              <td className={styles.thwidth}>
                <div
                  className={styles.send}
                  onClick={() => setSendThird(!openSendThird)}
                >
                  <img src={icon_send} alt="" />
                </div>
              </td>
              <td className={styles.thwidth}>
                <img src={swapMAYellow} alt="" />
              </td>
              <td className={styles.thwidth}>
                <img src={icon_mint} alt="" />
              </td>
              <td className={styles.thwidth}>
                <div className={styles.send} onClick={() => setBurn(!burn)}>
                  <img src={icon_burn_yellow} alt="" />
                </div>
              </td>
            </tr>
            {openSendThird && (
              <tr>
                <th colSpan={7} className={styles.colspan}>
                  <div className={styles.tokenSend}>
                    <div className={styles.sendformblock}>
                      <div className={styles.label}>
                        Recepient:
                        <input type="text" className={styles.sendform} />
                      </div>
                      <div className={styles.label}>
                        Amount:
                        <input type="text" className={styles.sendform} />
                      </div>
                    </div>
                    <Button
                      color="sendButton"
                      type="button"
                      className={styles.sendButton}
                    >
                      Send
                    </Button>
                  </div>
                </th>
              </tr>
            )}
            {burn && (
              <tr>
                <th className={styles.colspan} colSpan={7}>
                  <div className={styles.tokenSend}>
                    <div className={styles.sendformblock}>
                      <div className={styles.label}>
                        Amount:
                        <input type="text" className={styles.sendformAmount} />
                      </div>
                      <Button
                        color="sendButton"
                        type="button"
                        className={styles.sendButton}
                      >
                        Burn
                      </Button>
                    </div>
                  </div>
                </th>
              </tr>
            )}
            <td colSpan={7} className={styles.butonAddToken}>
              <div className={styles.addString}>
                {token && (
                  <div className={styles.clickString}>
                    <div className={styles.textToken}>
                      To add a token, specify its address:
                    </div>
                    <input type="text" className={styles.addTokenButton} />
                  </div>
                )}
                <Button
                  color="green"
                  type="button"
                  className={styles.buttonStyle}
                  onClick={() => setToken(!token)}
                >
                  Add Token
                </Button>
              </div>
            </td>
          </tbody>
        </table>
      </div>
      <MyInvestment />
      <MyPools />
    </div>
  );
};

export default ManageAssets;
