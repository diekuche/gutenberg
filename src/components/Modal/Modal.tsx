/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import styles from "./Modal.module.css";
import cross from "../../assets/cross.svg";

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
