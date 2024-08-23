import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import logoimg from "@/public/logo.svg";
import styles from "./../styles/page.module.scss";

import { Input } from "../compnents/ui";
import Link from "next/link";
import { api } from '@/src/service/api'
import {redirect} from 'next/navigation'
import { toast } from "sonner";

export default function SignUp() {
  async function handlerRegister(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name == "" || email == "" || password == "") {
      console.log('Preencha todos os campos')
      return;
    }

    try{
      await api.post('/users', {
        name,
        email,
        
        password,
      })
    toast.success('Login Realizado com sucesso')
    }catch(err){
      console.log(err)
      console.log('erro')
    }

    redirect('/')
  }

  return (
    <>
      <title>Sujeito Pizza - Faça seu Registro</title>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo sujeito pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handlerRegister}>
            <Input placeholder="Digite seu nome" type="text" name="name" />
            <Input placeholder="Digite seu Email" type="email" name="email" />
            <Input
              placeholder="Digite sua senha"
              type="password"
              name="password"
            />

            <button type="submit" >
              Cadastra
            </button>
          </form>
          <Link className={styles.text} href="/">
            Já Possui uma conta? Faça seu login
          </Link>
        </div>
      </div>
    </>
  );
}
