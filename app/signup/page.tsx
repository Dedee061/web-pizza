import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import logoimg from "../../public/logo.svg";
import styles from "./../styles/page.module.scss";
import { Button } from "../compnents/ui/Button";
import { Input } from "../compnents/ui";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <title>Sujeito Pizza - Faça seu Registro</title>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo sujeito pizzaria" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="name" />
            <Input placeholder="Digite seu Email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false}>
              Cadastra
            </Button>
          </form>
          <Link className={styles.text} href='/'>
          Já Possui uma conta? Faça seu login
            
          </Link>

        </div>
      </div>
    </>
  );
}
