import { NextRequest, NextResponse } from "next/server";
import { GetCookiesServer } from "./lib/cookieServe";
import { api } from "./service/api";

export async function middleware(req: NextRequest){
    
    const { pathname } = req.nextUrl
    if(pathname.startsWith('/_next') || pathname === '/' ){
        
        return NextResponse.next()

    }

    const token = GetCookiesServer()
    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL('/', req.url))
        }
        
        
        const isValid = await vaidateToken(token)
        
        if(!isValid) {
            
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return NextResponse.next()
}

async function vaidateToken(token: string){
    if(!token) return false

    try{

        await api.get('/me', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true

    }catch(err){
        return false
    }
}