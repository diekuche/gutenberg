import styles from "./SelectTokenLabel.module.css";

interface SelectTokenLabelProps {
  name: string;
  chainName: string;
  balance: string;
  icon: string;
}

const SelectTokenLabel = ({
  name, chainName, balance, icon,
}: SelectTokenLabelProps) => (
  <div className={styles.token}>
    {icon && (
    <div>
      <img className={styles.icon} src={icon} alt={`${name} logo`} />
    </div>
    )}
    <div className={styles.nameWrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.chainName}>{chainName}</div>
    </div>
    <div className={styles.balanceWrapper}>
      <div className={styles.balance}>{balance}</div>
    </div>
  </div>
);

export default SelectTokenLabel;
