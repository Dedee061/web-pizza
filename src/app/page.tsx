
import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import logoimg from "@/public/logo.svg";
import styles from "./styles/page.module.scss";
import { Input, TextArea } from "./compnents/ui";

import Link from "next/link";
import { api } from "@/src/service/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  
 async function handlerLogin(formData: FormData) {
  "use server"
  const email = formData.get("email")
  const password = formData.get("password")

  if(email == '' || password == '') {
    console.log('preencha os campos')
    return
  }

  try{
    const response = await api.post('session', {
      email,
      password
    })
    if(!response.data.token){
      return
    }
    console.log(response.data)
    const expressTime = 60* 60 * 24 * 30 * 1000
    cookies().set('session', response.data.token ,{
      maxAge: expressTime,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production'
    })
  }catch(err){
    console.log(err)
  }

  redirect('/dashboard')
 }


  return (
    <>
      <title>Sujeito Pizza - Faça seu Login</title>

      <div className={styles.containerCenter}>
        <Image src={logoimg} alt="logo sujeito pizzaria" />
        <div className={styles.login}>
          <form action={handlerLogin}>
            <Input placeholder="Digite seu Email" required type="email" name="email"/>
            <Input placeholder="Digite sua senha" type="password" name="password"/>

            <button type="submit" >
              Acessar
            </button>
          </form>
          <Link className={styles.text} href="/signup">
            Não Possui uma conta ? Castadre-se
          </Link>
        </div>
      </div>
    </>
  );
}
