import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import logoimg from "../public/logo.svg";
import styles from "./styles/page.module.scss";
import { Input, TextArea } from "./compnents/ui";
import { Button } from "./compnents/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <title>Sujeito Pizza - Faça seu Login</title>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo sujeito pizzaria" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu Email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={true}>
              Acessar
            </Button>
          </form>
          <Link className={styles.text} href='/signup'>
          Não Possui uma conta ? Castadre-se
            
          </Link>

        </div>
      </div>
    </>
  );
}
