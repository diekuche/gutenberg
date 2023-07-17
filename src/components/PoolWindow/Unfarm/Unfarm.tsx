import NewButton from "ui/NewButton";
import MySlider from "ui/PoolWindow/Slider";
import styles from "./Unfarm.module.css";

const Unfarm = () => (
  <div className={styles.depositWindow}>
    <div className={styles.firstField}>
      <div className={styles.percentString}>
        <div className={styles.max}>max</div>
        <div className={styles.percentNumber}>75</div>
        <div className={styles.percent}>%</div>
      </div>
      <div className={styles.cash}>($0.0459031)</div>
      <div className={styles.scale}>
        <MySlider />
      </div>
    </div>
    <div className={styles.secondField}>
      <div className={styles.firstString}>
        <div className={styles.firstStringName}>you deposit</div>
        <div className={styles.secondStringName}>you will unfarm</div>
      </div>
      <div className={styles.secondString}>
        <div className={styles.firstPair}>
          <div className={styles.numberToken}>0,35793003756</div>

          <div className={styles.nameToken}>pool token</div>
        </div>
        <div className={styles.secondPair}>
          <div className={styles.valueToken}>0</div>
          <div className={styles.nameToken}>pool token</div>
        </div>
      </div>
    </div>
    <NewButton size="hg">unfarm</NewButton>
  </div>
);

export default Unfarm;
