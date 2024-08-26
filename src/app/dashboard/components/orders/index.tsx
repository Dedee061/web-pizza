"use client"

import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";

import { OrderProps } from "@/src/lib/order.type";
import { Modalorder } from "@/src/app/compnents/modal";
import { use } from "react";
import { OrderContext } from "@/src/providers/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  orders: OrderProps[];
}
export function Orders({ orders }: Props) {
  const {isOpen, onRequestOpen} = use(OrderContext)
  const router = useRouter()
  async function HandlerDetailOrder(order_id: string) {
   await onRequestOpen(order_id)
    toast.success("Detalhe do pedido")
    // Abre modal com detalhes do pedido
  }

  async function HandlerRefresh() {
    router.refresh()
    toast.success("Pedidos atualizados")
  }


  return (


    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos Pedidos</h1>
          <button onClick={HandlerRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>

          {orders.length === 0 && (
            <span className={styles.empyItem}>Nenhum pedido aberto no momento</span>
          )}

          {orders.map((order) => {
            return (
              <button className={styles.orderItem} key={order.id} onClick={() => HandlerDetailOrder(order.id)}>
                <div className={styles.tag}> </div>
                <span>Mesa: {order.table}</span>
              </button>
            );
          })}
        </section>
      </main>
          {isOpen && <Modalorder /> }
      
    </>
  );
}
