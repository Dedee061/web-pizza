"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "../service/api";
import { getCookieClient } from "../lib/cookieClient";

type orderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: orderItemProps[]
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

  return (
    <OrderContext.Provider
      value={{
        order,
        isOpen,
        onRequestOpen,
        onRequestClose,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
