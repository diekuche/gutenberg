import hammer from "ui/assets/Icon2.svg";
import styles from "./NFT.module.css";

const NFT = () => (
  <div className={styles.nft}>
    <div className={styles.cs}>
      <img src={hammer} className={styles.icon} alt="NFTpreview" />
    </div>
  </div>
);

export default NFT;
