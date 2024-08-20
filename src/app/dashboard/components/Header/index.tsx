import styles from "./styles.module.scss"
import Link from "next/link";
import Image from "next/image";
import LogoImg from "/public/logo.svg";
import {LogOutIcon} from 'lucide-react'
export function Header() {
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
          <Link href="/dashborad/category">Categoria</Link>
          <Link href="/dashborad/product">Produto</Link>
          
          <form>
            <button type="submit">
            <LogOutIcon size={24} color="#fff"/>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
