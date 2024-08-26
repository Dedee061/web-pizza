import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { use } from "react";
import { OrderContext } from "@/src/providers/order";
import { CalculateTotalOrder } from "@/src/lib/helper";

export function Modalorder() {
  const { onRequestClose, order, FinishOrder } = use(OrderContext);

  async function HandlerFinishOrder() {
    await FinishOrder(order[0].order.id);
  }

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
                Qtd: {item.amount} <b>{item.product.name}</b> - R${" "}
                {parseFloat(item.product.price) * item.amount}
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}
          <h3 className={styles.total}>Valor Total: R$ {CalculateTotalOrder(order)}</h3>

          <button className={styles.buttonOrder} onClick={HandlerFinishOrder}>
            Concluir Pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
