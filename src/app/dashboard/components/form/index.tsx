"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "../Button";

export function Form() {

    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function HandlerFile(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !=="image/png" && image.type !== "image/png") {
                console.log("Formato de imagem inválido. Aceite apenas PNG ou JPEG.")
                return
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
            console.log(image)
        }
    }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form action="" className={styles.form}>
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
            <option key={1} value={1}>
                Pizza
            </option>
            <option key={1} value={1}>
                Bebidas
            </option>
        </select>

        <input type="text" name="name" placeholder="Digite o nome do produto" required className={styles.input} />
        <input type="text" name="price" placeholder="Digite o Preço do produto" required className={styles.input} />

        <textarea placeholder="digite a descrição do produto" className={styles.input} required name="description"></textarea>


          <Button name="Cadastrar produto"/>
      </form>
        
    </main>
  );
}
