"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "../service/api";
import { getCookieClient } from "../lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type orderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: orderItemProps[]
  FinishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

interface orderItemProps {
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category_id: string;
    banner: string;
  };
  order: {
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
  };
}

export const OrderContext = createContext({} as orderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [order, setOrder] = useState<orderItemProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  async function onRequestOpen(order_id: string) {

    const token = getCookieClient()
    const response = await api.get("/orders/detail", {
        headers:{
            Authorization: `Bearer ${token}`,
        },
      params: { order_id: order_id },
    });

    setOrder(response.data)
    setIsOpen(true);
  }
  function onRequestClose() {
    setIsOpen(false);
  }

  async function FinishOrder(order_id: string) {
    const token = getCookieClient()
    const data = {
      order_id: order_id,
    }

    try {
      await api.put('/order/finish', data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    } catch (err) { 
      console.error('Error:', err);
      toast.error('Falha ao finalizar o pedido')
    }

    toast.success('Pedido Finalizado com sucesso')
    setIsOpen(false)
    router.refresh()
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        isOpen,
        onRequestOpen,
        onRequestClose,
        FinishOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
