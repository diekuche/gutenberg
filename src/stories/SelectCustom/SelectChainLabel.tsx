import circle from "ui/assets/circle.svg";
import styles from "./SelectChainLabel.module.css";

export interface SelectChainLabelProps {
  chainName: string;
  icon?: string;
}

const SelectChainLabel = ({ chainName, icon = circle }: SelectChainLabelProps) => (
  <div className={styles.chain}>
    <img className={styles.icon} src={icon} alt={`${chainName} logo`} />
    <div className={styles.nameWrapper}>
      <div className={styles.name}>{chainName}</div>
    </div>
  </div>
);

export default SelectChainLabel;
