import React from "react";
import styles from "./ManageTok.module.css";
import Button from "../Button/Button";
import Contract from "../Contracts/Contract";
import { useState, useEffect } from "react";
import { getContractInfo, getAddress } from "../../utils/wallet";
import { IContract } from "../../models";

const contracts: IContract[] = [
  {
    id: 0,
    token: "",
    logo: "",
    amount: 0,
  },
];

function ManageTokens() {
  const [contractData, setContractData] = useState<IContract[]>(contracts);
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState("");

  const fetchAddress = async () => {
    let response = await getAddress();
    if (response) {
      setAddress(response);
    }
  };

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response) {
      setContract(response);
    }
  }

  async function fetchContracts() {
    const response = await getContractInfo(address, contract);
    if (response) {
      console.log(response.data);
      setContractData(response.data);
    }
  }

  useEffect(() => {
    fetchAddress();
    fetchContracts();
  }, []);

  console.log(address, contract);
  console.log(contractData);

  function handleAddNewContract(event: any) {
    setContractData(contractData);
  }

  return (
    <div className={styles.manageTok}>
      <div className={styles.name}>Manage Tokens</div>
      <div className={styles.cashName}>
        🟢 StBOOT
        <div className={styles.cash}>3 000 000 000</div>
      </div>
      <div className={styles.info}>
        Saint Bostrom — Blessed Bostroms for charitable deeds
      </div>
      <div className={styles.info}>
        Contract Address:
        bostrom17s7emulfygjuk0xn906athk5e5efsdtumsat5n2nad7mtrg4xresu66g83{" "}
      </div>
      <Button color="white" type="button" size="lg">
        Send
      </Button>
      <div className={styles.indent}>
        {contractData.map((contract) => (
          <Contract contract={contract} key={contract.id} />
        ))}
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.addContract}
            value={contract}
            onChange={handleChangeContractAddress}
          />
        </div>
      </div>
      <Button
        color="green"
        type="button"
        size="lg"
        onClick={handleAddNewContract}
      >
        Add Token
      </Button>
    </div>
  );
}

export default ManageTokens;
