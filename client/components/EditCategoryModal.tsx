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
  { name: "Settings", icon: Settings },
]

interface Category {
  id: string
  name: string
  type: "income" | "expense"
  icon?: string
  createdAt: string
}

interface EditCategoryModalProps {
  category: Category | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function EditCategoryModal({ category, isOpen, onClose, onSuccess }: EditCategoryModalProps) {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [selectedIcon, setSelectedIcon] = useState("Wallet")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setType(category.type)
      setSelectedIcon(category.icon || "Wallet")
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await api.request(`/categories/${category.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name.trim(),
          type,
          icon: selectedIcon
        }),
      })
      toast({
        title: "Success",
        description: "Category updated successfully",
      })
      onSuccess()
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update category",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!category) return

    if (!confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
      return
    }

    setLoading(true)

    try {
      const id = category.id || (category as any)._id
      if (!id) throw new Error("Category ID is missing")
      await api.deleteCategory(id)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      onSuccess()
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-[32px] p-8 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-center">Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`h-12 rounded-2xl font-black transition-all ${type === "expense" ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" : "bg-muted text-muted-foreground"
                  }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                className={`h-12 rounded-2xl font-black transition-all ${type === "income" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-muted text-muted-foreground"
                  }`}
              >
                Income
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-14 rounded-2xl bg-muted/50 border-none font-bold placeholder:font-medium focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Icon</Label>
            <div className="grid grid-cols-5 gap-3 max-h-[200px] overflow-y-auto p-2 rounded-2xl bg-muted/30">
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
                  <item.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" className="w-full h-14 rounded-2xl font-black bg-[#5a4cf1] hover:bg-[#4a3ce1] text-white shadow-xl shadow-indigo-500/20" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="ghost" onClick={handleDelete} className="w-full h-14 rounded-2xl font-bold text-destructive hover:bg-destructive/10" disabled={loading}>
              Delete Group
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
