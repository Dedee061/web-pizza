import styles from "./styles.module.scss";
import { Button } from "../components/Button";
import { api } from "@/src/service/api";
import { GetCookiesServer } from "@/src/lib/cookieServe";
import { redirect } from "next/navigation";

export default function Category() {
  async function handlerRegisterCategory(formData: FormData) {
    "use server";
    
    const name = formData.get('name')

    if(!name) return

    const data = {
      name: name
    }

    const token = GetCookiesServer();

    await api.post('/category', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.log(err)
      return
    })

    redirect('/dashboard')
  }

  return (
    <>

    <title>Registrar nova Categoria - pizza</title>
      <main className={styles.container}>
        <h1>Nova Categoria</h1>

        <form action={handlerRegisterCategory} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome da categoria"
            required
            className={styles.input}
          />

          <Button name="Cadastrar" />
        </form>
      </main>
    </>
  );
}
