"use client"

import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import logoimg from "../public/logo.svg";
import styles from "./styles/page.module.scss";
import { Input, TextArea } from "./compnents/ui";
import { Button } from "./compnents/ui/Button";
import Link from "next/link";
import { AuthContext } from "./compnents/contexts/AuthContext";
import { FormEvent, useContext } from "react";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function HandlerLogin(event: FormEvent) {
    event.preventDefault()

    let data = {
      email: "teste@teste.com",
      password: "123123"
    }

    await signIn(data)
  }

  return (
    <>
      <title>Sujeito Pizza - Faça seu Login</title>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo sujeito pizzaria" />
        <div className={styles.login}>
          <form onSubmit={HandlerLogin}>
            <Input placeholder="Digite seu Email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false} >
              Acessar
            </Button>
          </form>
          <Link className={styles.text} href="/signup">
            Não Possui uma conta ? Castadre-se
          </Link>
        </div>
      </div>
    </>
  );
}
