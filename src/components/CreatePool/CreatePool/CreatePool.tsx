import React, { useState } from "react";
import styles from "./CreatePool.module.css";
import NewBT from "../../newButton/newButton";
import SwapNew from "../SwapNew";
import Confirm from "../ConfirmSupply/ConfirmSuplly";

function CreatePool() {
  const [component, setComponent] = useState("Component1");
  const [buttonText, setButton] = useState("create pool");
  const handleButton = () => {
    if (component === "Component1") {
      setComponent("Component2");
      setButton("order deposit");
    } else {
      setComponent("Component1");
      setButton("create pool");
    }
  };
  return (
    <div className={styles.common}>
      {component === "Component1" ? <SwapNew /> : <Confirm />}
      <NewBT size="hg" onClick={handleButton}>
        {buttonText}
      </NewBT>
    </div>
  );
}

export default CreatePool;
