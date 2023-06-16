import React, { useState } from "react";
// import styles from "./CreatePoolForm.module.css";
import CreatePoolForm from "../CreatePoolForm/CreatePoolForm";
import ConfirmSuplly from "../ConfirmSupply/ConfirmSuplly";
import Modal from "../../Modal/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (token: string, secondToken: string) => void;
};

function CreatePool({ open, onClose, onSubmit }: Props) {
  const [token, setToken] = useState("");
  const [secondToken, setSecondToken] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFormSubmit = (value: string, secondValue: string) => {
    setToken(value);
    setSecondToken(secondValue);
    setShowConfirm(true);
  };

  const handleSubmitConfirm = () => {
    onSubmit(token, secondToken);
  };

  return (
    <Modal open={open} onClose={onClose}>
      {showConfirm ? (
        <ConfirmSuplly
          token={token.slice(0, 10)}
          secondToken={secondToken.slice(0, 10)}
          onSubmit={handleSubmitConfirm}
        />
      ) : (
        <CreatePoolForm onSubmit={handleFormSubmit} />
      )}
    </Modal>
  );
}

export default CreatePool;
