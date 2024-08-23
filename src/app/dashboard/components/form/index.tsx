"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "../Button";
import { api } from "@/src/service/api";
import { getCookieClient } from "@/src/lib/cookieClient";
import { redirect } from "next/navigation";
import { toast, Toaster } from "sonner";

interface categoryProps{
  id: string,
  name:string

}
interface Props {
  categories: categoryProps[]
}

export function Form({categories}: Props) {

    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function HandlerFile(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !=="image/png" && image.type !== "image/png") {
                toast.warning("Formato de imagem inválido. Aceite apenas PNG ou JPEG.")
                
                return
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
            console.log(image)
        }
    }

      
    async function handleRegisterProduct(formData: FormData) {
      const category = formData.get('Category')
      const name = formData.get('name')
      const price = formData.get('price')
      const description = formData.get('description')

      if(!name || !category || !price || !description || !image  ){
        toast.warning('Preencha todos os campos')
        return;
      }

      const data = new FormData()
      data.append("name", name)
      data.append("price", price)
      data.append("description", description)
      data.append("category_id", categories[Number(category)].id)
      data.append("file", image)
    
      const token = getCookieClient()

      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`
        },

      })
      .catch((err) => {
        console.error(err)
        toast.warning('Falha a cadastrar')
      })
      toast.success('Produto Registrado com sucesso')
      redirect('/dashboard')
    
    }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form action={handleRegisterProduct} className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#fff" />
          </span>

          <input type="file" accept="image/png, image/jpeg" required  onChange={HandlerFile}/>

          { previewImage && (
                < Image alt="Image de preview" src={previewImage} className={styles.preview} fill={true} quality={100} priority={true} />
            )
          }
        </label>

        <select name="Category">
            {categories.map(
              (category, index) => (
                <option key={category.id} value={index}>{category.name}</option>
              )
            )}
        </select>

        <input type="text" name="name" placeholder="Digite o nome do produto" required className={styles.input} />
        <input type="text" name="price" placeholder="Digite o Preço do produto" required className={styles.input} />

        <textarea placeholder="digite a descrição do produto" className={styles.input} required name="description"></textarea>


          <Button name="Cadastrar produto"/>
      </form>
        
    </main>
  );
}
