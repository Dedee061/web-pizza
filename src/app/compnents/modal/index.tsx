import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { use } from "react";
import { OrderContext } from "@/src/providers/order";

export function Modalorder() {
  const { onRequestClose, order } = use(OrderContext);

  function HandlerCloseDetail() {
    onRequestClose();
  }
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button onClick={HandlerCloseDetail} className={styles.dialogBack}>
          <X size={40} color="#ff3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do Pedido</h2>

          <span className={styles.table}>
            Mesa <b>{order[0].order.table}</b>
          </span>
          {order[0].order.name && (
            <span className={styles.name}>
             <b>{order[0].order.name}</b>
          </span>
          )}

          {order.map((item) => (
            <section className={styles.containerItem} key={item.id}>
              <span>
                {item.amount} <b>{item.product.name}</b>
              </span>
              <span className={styles.description}>{item.product.description}</span>
            </section>
          ))}

          <button className={styles.buttonOrder}>Concluir Pedido</button>
        </article>
      </section>
    </dialog>
  );
}
