import React from "react";
import cross from "ui/assets/cross.svg";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: Props) => (open ? (
  <div className={styles.modal}>
    <div className={styles.overlay} />
    <div className={styles.content}>
      <div className={styles.close}>
        <img src={cross} onClick={onClose} alt="" />
      </div>
      {children}
    </div>
  </div>
) : null);

export default Modal;
