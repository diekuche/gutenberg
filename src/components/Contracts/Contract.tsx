import React from "react";
import styles from "./Contract.module.css";
import { useState, useEffect } from "react";
import { getContractInfo, getAddress } from "../../utils/wallet";
import { isVisible } from "@testing-library/user-event/dist/utils";

interface ContractDataProps {
  contractAddress: string;
}

interface ContractData {
  token: string;
  balance: string;
  logo: string;
  marketingAddress: string;
}

export function Contract({ contractAddress }: ContractDataProps) {
  const [contractData, setContractData] = useState<ContractData>();

  async function fetchContracts() {
    const address = (await getAddress()) as string;
    const response = await getContractInfo(contractAddress, address);
    if (response !== undefined) {
      setContractData({
        token: response.symbol,
        balance: response.balance,
        logo: response.logo.url,
        marketingAddress: response.marketing,
      });
    }
  }

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts()]);

  return (
    <>
      {contractData ? (
        <div>
          <div className={styles.line}></div>
          <div className={styles.cashName}>
            {contractData.logo && contractData.logo.length > 1 ? (
              <img
                src={contractData.logo}
                alt="icon"
                className={styles.logo}
              ></img>
            ) : (
              contractData.logo
            )}
            <div className={styles.token}>{contractData.token}</div>
            <div className={styles.balance}>{contractData.balance}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Contract;
