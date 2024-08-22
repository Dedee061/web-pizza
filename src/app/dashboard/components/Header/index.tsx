"use client"

import styles from "./styles.module.scss"
import Link from "next/link";
import Image from "next/image";
import LogoImg from "/public/logo.svg";
import {LogOutIcon} from 'lucide-react'
import { deleteCookie } from "cookies-next";
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter();

  async function handlerLogout(){
    deleteCookie('session', {path: '/'})
    router.replace('/')
  }


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="logo sujeito pizza"
            src={LogoImg}
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>
        <nav>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/products">Produto</Link>
          
          <form action={handlerLogout}>
            <button type="submit">
            <LogOutIcon size={24} color="#fff"/>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
