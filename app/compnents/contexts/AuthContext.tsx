"use client"

import { createContext, ReactNode, useState } from 'react'

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean
    signIn: (credential: SignInProps) => Promise<void>
}

type SignInProps = {
    email:string;
    password: string
}
type UserProps = {
    id: string;
    name: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()

    const isAuthenticated = !!user;

    async function signIn() {
        alert("clicou")
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
         {children}
        </AuthContext.Provider>
    )
}