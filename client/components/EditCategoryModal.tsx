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
  Sparkles, Settings, Pizza, Theater, Baby, Stethoscope, Trees, Tv, Zap, Waves,
  Camera, Bike, Dog, Cat, Pill, Library, Building2, Store, Shield, GlassWater,
  Hammer, Pencil, Rocket, Wifi, Phone, Beer, Soup, Salad, Cookie, Cake,
  Anchor, Ship, Truck, Mountain, Tent, Lamp, Key, DoorOpen, Bath, Bed,
  PartyPopper, Mic, Dice5, Trophy, Clapperboard, Monitor, Headphones,
  PenTool, Code, Cpu, Database, Cloud, Sun, Moon, CloudRain, Snowflake, Flame,
  Leaf, Fish, Bird, Ghost
} from "lucide-react"

const ICONS = [
  // Spending & Shop
  { name: "Wallet", icon: Wallet },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Store", icon: Store },
  { name: "CreditCard", icon: CreditCard },
  { name: "Receipt", icon: Receipt },

  // Food & Drink
  { name: "Coffee", icon: Coffee },
  { name: "Utensils", icon: Utensils },
  { name: "Pizza", icon: Pizza },
  { name: "Beer", icon: Beer },
  { name: "Soup", icon: Soup },
  { name: "Salad", icon: Salad },
  { name: "Cookie", icon: Cookie },
  { name: "Cake", icon: Cake },
  { name: "GlassWater", icon: GlassWater },

  // Transport
  { name: "Car", icon: Car },
  { name: "Bus", icon: Bus },
  { name: "Bike", icon: Bike },
  { name: "Truck", icon: Truck },
  { name: "Plane", icon: Plane },
  { name: "Ship", icon: Ship },
  { name: "Anchor", icon: Anchor },

  // Home & Living
  { name: "Home", icon: Home },
  { name: "Building2", icon: Building2 },
  { name: "Key", icon: Key },
  { name: "DoorOpen", icon: DoorOpen },
  { name: "Lamp", icon: Lamp },
  { name: "Bath", icon: Bath },
  { name: "Bed", icon: Bed },

  // Health & Family
  { name: "Heart", icon: Heart },
  { name: "Stethoscope", icon: Stethoscope },
  { name: "Pill", icon: Pill },
  { name: "Baby", icon: Baby },
  { name: "Dog", icon: Dog },
  { name: "Cat", icon: Cat },
  { name: "Fish", icon: Fish },
  { name: "Bird", icon: Bird },

  // Work & Education
  { name: "Briefcase", icon: Briefcase },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Library", icon: Library },
  { name: "Pencil", icon: Pencil },
  { name: "Code", icon: Code },
  { name: "Cpu", icon: Cpu },
  { name: "Database", icon: Database },

  // Fun & Entertainment
  { name: "Gift", icon: Gift },
  { name: "PartyPopper", icon: PartyPopper },
  { name: "Music", icon: Music },
  { name: "Theater", icon: Theater },
  { name: "Tv", icon: Tv },
  { name: "Monitor", icon: Monitor },
  { name: "Gamepad", icon: Gamepad },
  { name: "Smartphone", icon: Smartphone },
  { name: "Headphones", icon: Headphones },
  { name: "Mic", icon: Mic },
  { name: "Dice5", icon: Dice5 },
  { name: "Trophy", icon: Trophy },
  { name: "Clapperboard", icon: Clapperboard },
  { name: "Camera", icon: Camera },

  // Utilities & Tech
  { name: "Zap", icon: Zap },
  { name: "Wifi", icon: Wifi },
  { name: "Phone", icon: Phone },
  { name: "Cloud", icon: Cloud },
  { name: "Shield", icon: Shield },
  { name: "Settings", icon: Settings },
  { name: "Hammer", icon: Hammer },
  { name: "PenTool", icon: PenTool },

  // Nature & Weather
  { name: "Trees", icon: Trees },
  { name: "Mountain", icon: Mountain },
  { name: "Tent", icon: Tent },
  { name: "Waves", icon: Waves },
  { name: "Sun", icon: Sun },
  { name: "Moon", icon: Moon },
  { name: "CloudRain", icon: CloudRain },
  { name: "Snowflake", icon: Snowflake },
  { name: "Flame", icon: Flame },
  { name: "Leaf", icon: Leaf },

  // Other
  { name: "PiggyBank", icon: PiggyBank },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "Sparkles", icon: Sparkles },
  { name: "Rocket", icon: Rocket },
  { name: "Ghost", icon: Ghost },
  { name: "Smile", icon: Smile },
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
      await api.request(`/categories/${category.id || (category as any)._id}`, {
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
      <DialogContent className="fixed top-1/2 left-0 right-0 mx-auto -translate-y-1/2 translate-x-0 max-w-[420px] w-[calc(100%-2rem)] rounded-[32px] p-8 border-none shadow-2xl focus:outline-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-center">Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-4">
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
            <div className="grid grid-cols-5 gap-3 max-h-[250px] overflow-y-auto p-3 rounded-2xl bg-muted/30 scrollbar-hide">
              {ICONS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedIcon(item.name)}
                  className={`aspect-square rounded-xl flex items-center justify-center transition-all ${selectedIcon === item.name
                    ? "bg-[#5a4cf1] text-white shadow-lg scale-110"
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
