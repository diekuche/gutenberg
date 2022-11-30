import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  htmlFor?: string;
  subtitle?: string | undefined;
  isTextArea?: boolean;
  required?: boolean;
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
  required?: boolean;
  children: JSX.Element | JSX.Element[];
}

export type InputComponentProps = InputProps | TextAreaProps;

export const Input = (props: InputComponentProps) => {
  const { type = "text", isTextArea, name, onChange, ...rest } = props;

  const InputComponent = isTextArea ? `textarea` : `input`;

  return (
    <label htmlFor={props.htmlFor} className={styles.inputComp}>
      <div className={styles.label}>
        {props.label}
        {props.required && <span className={styles.star}>*</span>}
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
      {props.subtitle && (
        <div className={styles.subtitle}>{props.subtitle}</div>
      )}
    </label>
  );
};

export default Input;
