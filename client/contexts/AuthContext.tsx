"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../lib/api"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    try {
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (storedToken && storedUser &&
        storedToken !== "undefined" &&
        storedUser !== "undefined" &&
        storedUser !== "[object Object]") {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } else {
        // Clean up corrupted storage
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    } catch (error) {
      console.error("Error restoration session:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password)

      if (data.token && data.user) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setToken(data.token)
        setUser(data.user)
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Login Error:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await api.register(name, email, password)

      if (data.token && data.user) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setToken(data.token)
        setUser(data.user)
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Registration Error:", error)
      throw error
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await api.forgotPassword(email)
    } catch (error) {
      console.error("Forgot Password Error:", error)
      throw error
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      await api.resetPassword(token, password)
    } catch (error) {
      console.error("Reset Password Error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, forgotPassword, resetPassword, logout, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
