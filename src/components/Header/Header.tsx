import { NavLink } from "react-router-dom";
import {
  useSuggestChainAndConnect,
} from "graz";
import { useContext } from "react";
import styles from "./Header.module.css";
import Wallet from "../Wallet/Wallet";
import icon from "../../assets/icon_wallet.svg";
import SelectCustom, { SelectCustomProps } from "../SelectCustom/SelectCustom";
import ChainUX from "../SelectCustom/Chain/ChainUX";
import { useChain } from "../../hooks/useChain";
import { ChainConfig, Chains } from "../../config/chains";
import { AppStateContext } from "../../context/AppStateContext";

const options = [
  {
    value: Chains.bostrom,
    label: <ChainUX chainName="Bostrom" />,
  },
  // {
  //   value: Chains["uni-6"],
  //   label: <ChainUX chainName="Junotest" />,
  // },
  {
    value: Chains["juno-1"],
    label: <ChainUX chainName="Juno" />,
  },
];

const Header = () => {
  const { suggestAndConnect } = useSuggestChainAndConnect();
  const { chainId } = useChain();
  const { setChainId } = useContext(AppStateContext);
  const defaultValue = options.find((option) => option.value.chainId === chainId)
    || options[0];

  const handleSelect: SelectCustomProps<ChainConfig>["onChange"] = (option) => {
    const chainInfo = option?.value;
    if (!chainInfo) {
      return;
    }
    setChainId(chainInfo.chainId);
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
            <SelectCustom<ChainConfig>
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
