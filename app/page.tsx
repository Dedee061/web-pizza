import Head from "next/head";
import Image from "next/image"
import type { Metadata } from "next";
import logoimg from '../public/logo.svg'
import styles from './styles/page.module.scss'
import { Input } from "./compnents/ui";


export default function Home() {

  return (
    <>
     <Head>
        <title>Sujeito Pizza - Faça seu Login</title>
      </Head>
    <div className={styles.containerCenter}>
      <Image src={logoimg} alt="logo sujeito pizzaria"/>

      <div className={styles.login}>
        <form>
            <Input />
        </form>
        </div>
    </div>
    </>
)}
