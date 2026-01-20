"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function ResetPasswordPage() {
    const { token } = useParams<{ token: string }>()
    const router = useRouter()
    const { resetPassword } = useAuth()
    const { toast } = useToast()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            })
            setLoading(false)
            return
        }

        try {
            await resetPassword(token, password)
            toast({
                title: "Success",
                description: "Password reset successful. Please login.",
            })
            router.push("/dashboard") // Redirect to login (which is dashboard for unauth)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to reset password",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[120px]" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-black/5 dark:bg-white/5 backdrop-blur-sm p-4 ring-1 ring-black/5 dark:ring-white/10 shadow-xl mb-4">
                        <img
                            src="/logo.svg"
                            alt="DevinBook Logo"
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                        Reset Password
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Enter your new password below.
                    </p>
                </div>

                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[32px] p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">New Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 h-10 rounded-xl bg-black/5 dark:bg-black/20 border-black/5 dark:border-white/10 focus:border-primary/50 focus:ring-primary/20 hover:border-black/10 dark:hover:border-white/20 transition-all font-medium"
                                        required
                                    />
                                    <div
                                        className="absolute right-3 top-3 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Confirm Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 pr-10 h-10 rounded-xl bg-black/5 dark:bg-black/20 border-black/5 dark:border-white/10 focus:border-primary/50 focus:ring-primary/20 hover:border-black/10 dark:hover:border-white/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 font-bold text-md shadow-lg shadow-primary/25 mt-2 group text-primary-foreground"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Set New Password
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
