import React from "react";
import styles from "./Contract.module.css";
import { useState, useEffect } from "react";
import { getContractInfo, getAddress } from "../../utils/wallet";

interface ContractProps {
  contractAddress: string;
}

interface ContractDataProps extends ContractProps {
  token: string;
  balance: string;
  logo: string;
}

export function Contract({ contractAddress }: ContractProps) {
  const [contractData, setContractData] = useState<ContractDataProps>();

  async function fetchContracts() {
    let address = (await getAddress()) as string;
    const response = await getContractInfo(contractAddress, address);
    if (response !== undefined) {
      setContractData({
        token: response.symbol,
        balance: response.balance,
        logo: response.logo.url,
        contractAddress: response.marketing,
      });
    }
  }

  useEffect(() => {
    fetchContracts();
  });

  return (
    <>
      {contractData ? (
        <div key={contractAddress}>
          <div className={styles.line}></div>
          <div className={styles.cashName}>
            {contractData.logo} {contractData.token}
            <div className={styles.cash}> {contractData.balance}</div>
          </div>
        </div>
      ) : (
        console.log("Token not found")
      )}
    </>
  );
}

export default Contract;
