import React, { useState } from "react";
import styles from "./Input.module.css";
import classNames from "classnames";
import info from '../../../assets/info.svg';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  htmlFor?: string;
  subtitle?: string | undefined;
  isTextArea?: boolean;
}

export interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  htmlFor?: string;
  subtitle?: string | undefined;
  isTextArea?: boolean;
  children: JSX.Element | JSX.Element[];
}

export type InputComponentProps = InputProps | TextAreaProps;

export const Input = (props: InputComponentProps) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const { type = "text", isTextArea, name, onChange, ...rest } = props;

  const InputComponent = isTextArea ? `textarea` : `input`;

  return (
    <label htmlFor={props.htmlFor} className={styles.inputComp}>
      <div className={styles.label}>
        {props.label}
        {props.required && <span className={styles.star}>*</span>}
        {props.subtitle && <img src={info} alt="" className={styles.image} onMouseEnter={() => setShowSubtitle(true)} onMouseLeave={() => setShowSubtitle(false)} />}
        {showSubtitle && <div className={styles.subtitle}>{props.subtitle}</div>}

      </div>

      <InputComponent
        className={classNames(styles.input, {
          [styles.inputDescription]: name === "description",
        })}
        // @ts-ignore
        onChange={onChange}
        type={type}
        {...rest}
      />


    </label>
  );
};

export default Input;
