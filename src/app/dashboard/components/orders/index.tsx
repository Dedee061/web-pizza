import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";

import { OrderProps } from "@/src/lib/order.type";

interface Props {
  orders: OrderProps[];
}
export function Orders({ orders }: Props) {
  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>ùltimos Pedidos</h1>
        <button>
          <RefreshCw size={24} color="#3fffa3" />
        </button>
      </section>

      <section className={styles.listOrders}>
        {orders.map((order) => {
          return (
            <button className={styles.orderItem} key={order.id}>
              <div className={styles.tag}> </div>
              <span>Mesa: {order.table}</span>
            </button>
          );
        })}
      </section>
    </main>
  );
}
