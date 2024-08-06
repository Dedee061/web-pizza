import styles from "./Input/styles.module.scss";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
interface InputRequest extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaRequest extends TextareaHTMLAttributes<HTMLAreaElement> {}

export function Input({ ...rest }: InputRequest) {
  return <input className={styles.input} {...rest} />;
}

export function TextArea({ ...rest }: TextAreaRequest) {
  return <textarea className={styles.input} {...rest}></textarea>
}
