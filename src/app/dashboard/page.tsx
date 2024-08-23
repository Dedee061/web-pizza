
import { GetCookiesServer } from "@/src/lib/cookieServe";
import { Orders } from "./components/orders"
import { api } from "@/src/service/api";
import { OrderProps } from "@/src/lib/order.type";

async function getOrders ():Promise<OrderProps[] | []> {
    try {
        const token = GetCookiesServer();
        const response = await api.get('/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data || [];
    } catch(err){
        console.error('Error:', err)
        return []
    }
}
export default async function Dashboard () {

    const orders = await getOrders();

    

    return(
        <>
        <title>Dashboard - pizza</title>
        <Orders  orders={orders}/>
        </>
    )
}   