import { NavLink } from "react-router-dom";
import {
  useContext, useEffect, useMemo, useState,
} from "react";
import SelectCustom, { SelectCustomProps } from "ui/SelectCustom";
import SelectChainLabel from "ui/SelectCustom/SelectChainLabel";
import { chains } from "chain-registry";
import { useAccount } from "hooks/useAccount";
import { useChain } from "hooks/useChain";
import { ChainId, Chains } from "config/chains";
import { AppStateContext } from "context/AppStateContext";
import styles from "./Header.module.css";
import ConnectButton from "./ConnectButton";
import icon from "../../assets/icon_wallet.svg";

const options = Object.keys(Chains)
  .map((chainId) => chainId as ChainId)
  // .filter((chainId) => !Chains[chainId].chainName.toLowerCase().includes("test"))
  .sort(
    (chainId1, chainId2) => Chains[chainId1].chainName.localeCompare(Chains[chainId2].chainName),
  )
  .map((chainId) => {
    const { chainName } = Chains[chainId as unknown as ChainId];
    return {
      value: chainId,
      label: <SelectChainLabel
        icon={
      chains.filter(({ chain_id }) => chain_id === chainId)[0].logo_URIs?.svg
}
        chainName={chainName}
      />,
    };
  });

const Header = () => {
  const chain = useChain();
  const { connect } = useAccount();
  const currentChainOption = useMemo(
    () => options.find(
      (option) => option.value === chain.config.chainId,
    ) || options[0],
    [chain],
  );
  const [selectedChainOption, setSelectedChainOption] = useState(
    currentChainOption,
  );

  const { setChainId } = useContext(AppStateContext);

  const handleSelect: SelectCustomProps<ChainId, JSX.Element>["onChange"] = (option) => {
    const chainInfo = option?.value;
    if (!chainInfo) {
      return;
    }
    setSelectedChainOption({
      value: option.value,
      label: option.label,
    });
    setChainId(chainInfo);
    connect();
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
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
