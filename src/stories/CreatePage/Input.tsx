import React, { useState } from "react";
import classNames from "classnames";
import info from "ui/assets/info.svg";
import styles from "./Input.module.css";

type HtmlInputProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
>;

type HtmlTextAreaProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement
>;

export type InputProps = Omit<HtmlInputProps & HtmlTextAreaProps, "onChange"> & {
  isTextArea?: boolean;
  subtitle?: string;
  htmlFor?: string;
  label?: string;
  onChange?: (e: { target: { value: string } }) => void;
};

const Input = (props: InputProps) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const {
    type = "text", isTextArea, name, onChange, ...rest
  } = props;

  const InputComponent = isTextArea ? "textarea" : "input";

  const {
    htmlFor, label, required, subtitle,
  } = props;

  return (
    <label htmlFor={htmlFor} className={styles.inputComp}>
      <div className={styles.label}>
        {label}
        {required && <span className={styles.star}>*</span>}
        {subtitle && (
        <img
          src={info}
          alt=""
          className={styles.image}
          onMouseEnter={() => setShowSubtitle(true)}
          onMouseLeave={() => setShowSubtitle(false)}
        />
        )}
        {showSubtitle && <div className={styles.subtitle}>{subtitle}</div>}

      </div>
      <InputComponent
        className={classNames(styles.input, {
          [styles.inputDescription]: name === "description",
        })}
        onChange={onChange}
        type={type}
        {...rest}
      />

    </label>
  );
};

export default Input;
