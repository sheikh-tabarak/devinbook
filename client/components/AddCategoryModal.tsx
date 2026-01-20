"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Wallet, ShoppingBag, Coffee, Car, Home, Heart, Briefcase, Gift,
  Music, Smartphone, Dumbbell, Plane, Utensils, Bus, Gamepad,
  TrendingUp, TrendingDown, CreditCard, Receipt, PiggyBank, Smile, GraduationCap,
  Sparkles, Settings
} from "lucide-react"

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

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (newCategoryId?: string) => void
  initialType?: "income" | "expense"
}

export function AddCategoryModal({ isOpen, onClose, onSuccess, initialType = "expense" }: AddCategoryModalProps) {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [type, setType] = useState<"income" | "expense">(initialType)
  const [selectedIcon, setSelectedIcon] = useState("Wallet")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setType(initialType)
    }
  }, [isOpen, initialType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await api.createCategory(name.trim(), type, selectedIcon)
      toast({
        title: "Success",
        description: "Category created successfully",
      })
      setName("")
      setSelectedIcon("Wallet")
      onSuccess(response.id || response._id)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create category",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setName("")
    setSelectedIcon("Wallet")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-[32px] p-8 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight text-center">New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => setType("expense")}
                className={`h-12 rounded-2xl font-black transition-all ${type === "expense" ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                Expense
              </Button>
              <Button
                type="button"
                onClick={() => setType("income")}
                className={`h-12 rounded-2xl font-black transition-all ${type === "income" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                Income
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Salary, Rent, Coffee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-14 rounded-2xl bg-muted/50 border-none font-bold placeholder:font-medium focus-visible:ring-primary/20"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Choose Icon</Label>
            <div className="grid grid-cols-5 gap-3 max-h-[200px] overflow-y-auto p-2 rounded-2xl bg-muted/30">
              {ICONS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedIcon(item.name)}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${selectedIcon === item.name
                    ? "bg-primary text-primary-foreground shadow-lg scale-110"
                    : "bg-white dark:bg-slate-900 text-muted-foreground hover:bg-white/80"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={handleClose} className="flex-1 h-14 rounded-2xl font-bold">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-14 rounded-2xl font-black bg-[#5a4cf1] hover:bg-[#4a3ce1] text-white shadow-xl shadow-indigo-500/20" disabled={loading}>
              {loading ? "Creating..." : "Add Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
