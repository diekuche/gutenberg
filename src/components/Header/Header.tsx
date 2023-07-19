import { NavLink } from "react-router-dom";
import {
  useEffect, useMemo, useState,
} from "react";
import SelectCustom, { SelectCustomProps } from "ui/SelectCustom";
import SelectChainLabel from "ui/SelectCustom/SelectChainLabel";
import { ChainId } from "config/chains";
import styles from "./Header.module.css";
import ConnectButton from "./ConnectButton";
import iconWallet from "../../assets/icon_wallet.svg";

export type HeaderProps = {
  chains: {
    id: ChainId;
    name: string;
    icon?: string;
  }[];
  chainId: ChainId;
  onSelectChainId: (chainId: ChainId) => void;
  address?: string;
  connect: () => void;
  disconnect: () => void;
};

const Header = ({
  address,
  connect,
  disconnect,
  chainId,
  onSelectChainId,
  chains,
}: HeaderProps) => {
  const options = chains.map(({ id, name, icon }) => ({
    value: id,
    label: <SelectChainLabel
      icon={icon}
      chainName={name}
    />,
  }));
  const currentChainOption = useMemo(
    () => options.find(
      (option) => option.value === chainId,
    ) || options[0],
    [chainId],
  );
  const [selectedChainOption, setSelectedChainOption] = useState(
    currentChainOption,
  );

  const handleSelect: SelectCustomProps<ChainId, JSX.Element>["onChange"] = (option) => {
    const chainInfo = option?.value;
    if (!chainInfo) {
      return;
    }
    setSelectedChainOption({
      value: option.value,
      label: option.label,
    });
    onSelectChainId(chainInfo);
  };

  useEffect(() => {
    setSelectedChainOption(currentChainOption);
  }, [currentChainOption]);

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
          <img src={iconWallet} alt="" />
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
            <SelectCustom<ChainId, JSX.Element>
              options={options}
              heightControl={42}
              fontSizePlaceholder={16}
              minWidthMenu={170}
              paddingMenu={0}
              topMenu={32}
              rightMenu={-6}
              value={selectedChainOption}
              onChange={handleSelect}
            />
          </div>
          <ConnectButton
            address={address}
            connect={connect}
            disconnect={disconnect}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
