import React from "react";
import styles from "./ClaimAll.module.css";
import atom from "../../../assets/atom.svg";
import circle from "../../../assets/circle.svg";
import pig from "../../../assets/pig_logo.svg";
import NewBT from "../../newButton/newButton";
import cross from "../../../assets/cross.svg";
import brandmark from "../../../assets/brandmark.svg";
import boot from "../../../assets/boot.svg";
import bootImg from "../../../assets/BootBig.svg";

const ClaimAll = () => {
  return (
    <div>
      <div className={styles.popUp}>
        <img className={styles.cross} src={cross} alt=""></img>
        <div className={styles.leftWindow}>
          <div className={styles.totalString}>
            <div className={styles.total}>total</div>
            <div className={styles.amount}>$34.583.03</div>
          </div>
          <div className={styles.scroll}>
            <div className={styles.poolOneString}>
              <div className={styles.firstString}>
                <img className={styles.atom} src={atom} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                <div className={styles.nameToken}>ATOM/BOOT</div>
              </div>
              <div className={styles.cash}>
                <div className={styles.cashString}>
                  <img className={styles.circleImg} src={circle} alt=""></img>
                  <div className={styles.firstCash}>200.300.765</div>
                  <div className={styles.tokenName}>BOOT</div>
                </div>
                <div className={styles.cashToken}>$1,2451</div>
              </div>
            </div>
            <div className={styles.poolTwoString}>
              <div className={styles.firstString}>
                <img className={styles.circleSecond} src={circle} alt=""></img>
                <img className={styles.pig} src={pig} alt=""></img>
                <div className={styles.nameToken}>BOOT/PIG</div>
              </div>
              <div className={styles.cash}>
                <div className={styles.cashString}>
                  <img className={styles.circleImg} src={circle} alt=""></img>
                  <div className={styles.firstCash}>21.356</div>
                  <div className={styles.tokenName}>BOOT</div>
                </div>
                <div className={styles.cashToken}>$34.45</div>
              </div>
              <div className={styles.cash}>
                <div className={styles.cashString}>
                  <img className={styles.pigImg} src={pig} alt=""></img>
                  <div className={styles.firstCash}>0.4273707</div>
                  <div className={styles.tokenName}>PIG</div>
                </div>
                <div className={styles.cashToken}>$0.0045</div>
              </div>
            </div>
            <div className={styles.poolThreeString}>
              <div className={styles.firstString}>
                <img className={styles.brandmark} src={brandmark} alt=""></img>
                <img className={styles.boot} src={boot} alt=""></img>
                <div className={styles.nameToken}>PS/SHIT</div>
              </div>
              <div className={styles.cash}>
                <div className={styles.cashString}>
                  <img className={styles.bootImg} src={bootImg} alt=""></img>
                  <div className={styles.firstCash}>0.0051</div>
                  <div className={styles.tokenName}>PS</div>
                </div>
                <div className={styles.cashToken}>$0.0000042</div>
              </div>
              <div className={styles.cash}>
                <div className={styles.cashString}>
                  <img className={styles.pigImg} src={pig} alt=""></img>
                  <div className={styles.firstCash}>0.4273707</div>
                  <div className={styles.tokenName}>PIG</div>
                </div>
                <div className={styles.cashToken}>$0.0045</div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <NewBT size="hg">claim all</NewBT>
    </div>
  );
};

export default ClaimAll;
