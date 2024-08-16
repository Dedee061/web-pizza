import { cookies } from 'next/headers'

export function GetCookiesServer(){
    const token = cookies().get("session")?.value

    return token || null
}