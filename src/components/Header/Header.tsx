import { NavLink } from "react-router-dom";
import {
  useSuggestChainAndConnect, useActiveChain, mainnetChains, GrazChain,
} from "graz";
import styles from "./Header.module.css";
import Wallet from "../Wallet/Wallet";
import icon from "../../assets/icon_wallet.svg";
import SelectCustom, { SelectCustomProps } from "../SelectCustom/SelectCustom";
import { CustomChains } from "../../utils/config";
import ChainUX from "../SelectCustom/Chain/ChainUX";

const options = [
  {
    value: CustomChains.bostrom,
    label: <ChainUX chainName="Bostrom" />,
  },
  {
    value: CustomChains.junotest,
    label: <ChainUX chainName="Junotest" />,
  },
];

const Header = () => {
  const { suggestAndConnect } = useSuggestChainAndConnect();
  const activeChain = useActiveChain();
  const defaultValue = options.find((option) => option.value.chainId === activeChain?.chainId)
    || options[0];

  const handleSelect: SelectCustomProps<GrazChain>["onChange"] = (option) => {
    const chainInfo = option?.value as any;
    if (!chainInfo) {
      return;
    }
    suggestAndConnect({
      chainInfo,
    });
  };

  return (
    <header>
      <div className={styles.nav}>
        <div>
          <NavLink to="/" className={styles.logo}>
            gutenberg!
          </NavLink>
        </div>
        <div className={styles.menu}>
          <div>
            <NavLink
              to="/swap"
              className={(link) => (link.isActive ? styles.active : styles.link)}
            >
              Swap
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/pools"
              className={(link) => (link.isActive ? styles.active : styles.link)}
            >
              Pools
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/create"
              className={(link) => (link.isActive ? styles.active : styles.link)}
            >
              Create Token
            </NavLink>
          </div>
        </div>
        <div className={styles.myWallet}>
          <img src={icon} alt="" />
          <NavLink
            to="/my-wallet"
            className={(myWalletText) => (myWalletText.isActive
              ? styles.activemyWalletText
              : styles.myWalletText)}
          >
            My Wallet
          </NavLink>
        </div>
        <div className={styles.rightButton}>
          <div className={styles.chainButton}>
            <SelectCustom<GrazChain>
              options={options}
              heightControl={42}
              fontSizePlaceholder={16}
              minWidthMenu={170}
              paddingMenu={0}
              topMenu={32}
              rightMenu={-6}
              defaultValue={defaultValue}
              onChange={handleSelect}
            />
          </div>
          <Wallet />
        </div>
      </div>
    </header>
  );
};

export default Header;
