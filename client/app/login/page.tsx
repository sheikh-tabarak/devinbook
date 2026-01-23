"use client"

import { AuthForm } from "@/components/AuthForm"
import { useTheme } from "next-themes"
import { useEffect } from "react"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
    const { setTheme } = useTheme()
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Force light theme for login page as requested
        setTheme("light")
    }, [setTheme])

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard")
        }
    }, [user, loading, router])

    if (loading) return null

    return <AuthForm />
}
