"use client";

import styles from "./styles.module.scss";

import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} disabled={pending} type="submit">
      {pending ? <AiOutlineLoading3Quarters className={styles.anim} /> :  name }
    </button>
  );
}
