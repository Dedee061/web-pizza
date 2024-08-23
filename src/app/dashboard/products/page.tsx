// import styles from './styles.module.scss'

import { Form } from '../components/form'
import { api } from '@/src/service/api'
import { GetCookiesServer } from '@/src/lib/cookieServe'

export default async function Product(){

        const token = GetCookiesServer();
    
        const response = await api.get('/category', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        console.log(response.data)
        return(
        
            <Form categories={response.data}/>
        
    )
}