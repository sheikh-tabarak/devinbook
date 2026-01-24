"use client"

import type React from "react"
import { useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Wallet, ShoppingBag, Coffee, Utensils, Car, Bus, Home, Heart, Briefcase, Gift, Music, Smartphone, Gamepad, Plane, Dumbbell, CreditCard, Receipt, PiggyBank, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ICONS = [
  { name: "Wallet", icon: Wallet },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Coffee", icon: Coffee },
  { name: "Utensils", icon: Utensils },
  { name: "Car", icon: Car },
  { name: "Bus", icon: Bus },
  { name: "Home", icon: Home },
  { name: "Heart", icon: Heart },
  { name: "Briefcase", icon: Briefcase },
  { name: "Gift", icon: Gift },
  { name: "Music", icon: Music },
  { name: "Smartphone", icon: Smartphone },
  { name: "Gamepad", icon: Gamepad },
  { name: "Plane", icon: Plane },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "CreditCard", icon: CreditCard },
  { name: "Receipt", icon: Receipt },
  { name: "PiggyBank", icon: PiggyBank },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Sparkles", icon: Sparkles },
]

interface InitialSetupProps {
  onComplete: () => void
}

export function InitialSetup({ onComplete }: InitialSetupProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [categoryType, setCategoryType] = useState<"income" | "expense">("expense")
  const [selectedIcon, setSelectedIcon] = useState("Wallet")

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryName.trim()) return

    setLoading(true)
    try {
      await api.createCategory(categoryName.trim(), categoryType, selectedIcon)
      toast({
        title: "Success",
        description: "Welcome to Expense Tracker!",
      })
      onComplete()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create group",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8">
      <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center animate-bounce">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tighter">Welcome abroad!</h1>
        <p className="text-muted-foreground text-sm font-medium">Let's set up your first group.</p>
      </div>

      <Card className="w-full max-w-sm rounded-[40px] border-none shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          <form onSubmit={handleFinish} className="space-y-6">
            <div className="bg-muted/30 p-1 rounded-2xl grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setCategoryType("expense")}
                className={`py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${categoryType === "expense" ? "bg-slate-900 text-white shadow-lg" : "text-muted-foreground"}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setCategoryType("income")}
                className={`py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${categoryType === "income" ? "bg-[#5a4cf1] text-white shadow-lg" : "text-muted-foreground"}`}
              >
                Income
              </button>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Group Name (e.g. Rent)"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="h-14 rounded-2xl bg-muted/50 border-none font-bold placeholder:font-medium focus-visible:ring-primary/20"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Choose Icon</p>
              <div className="grid grid-cols-5 gap-2 max-h-[160px] overflow-y-auto p-2 rounded-2xl bg-muted/20">
                {ICONS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedIcon(item.name)}
                    className={`aspect-square rounded-xl flex items-center justify-center transition-all ${selectedIcon === item.name
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : "bg-white dark:bg-slate-900 text-muted-foreground hover:bg-white/80"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl font-black bg-[#5a4cf1] hover:bg-[#4a3ce1] text-white shadow-xl shadow-indigo-500/20" disabled={loading}>
              {loading ? "Setting up..." : "Finish Setup"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-50">Secure • Private • Fast</p>
    </div>
  )
}
