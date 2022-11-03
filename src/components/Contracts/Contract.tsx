import React from "react";
import styles from "./Contract.module.css";
import { useState, useEffect } from "react";
import { getContractInfo, getAddress } from "../../utils/wallet";

interface ContractProps {
  contractAddress: string;
}

export function Contract({ contractAddress }: ContractProps) {
  const [contractData, setContractData] = useState<string[]>([]);

  async function fetchContracts() {
    let address = (await getAddress()) as string;
    console.log("contractAddress", contractAddress);
    console.log("Address", address);
    const response = await getContractInfo(contractAddress, address);
    if (response !== undefined) {
      setContractData(response);
    }
  }

  console.log("contractData:", contractData);

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <>
      {contractData ? (
        <div>
          <div className={styles.line}></div>
          <div className={styles.cashName}>
            <div className={styles.cash}></div>
          </div>
        </div>
      ) : (
        console.log("Contract not found")
      )}
    </>
  );
}

export default Contract;
