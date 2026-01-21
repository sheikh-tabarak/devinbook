"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Check, Search, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AddCategoryModal } from "./AddCategoryModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as Icons from "lucide-react"

interface Category {
  id: string
  name: string
  type: "income" | "expense"
  icon?: string
}

interface AddTransactionProps {
  onBack: () => void
  onSuccess: () => void
  initialType?: "income" | "expense"
}

export function AddTransaction({ onBack, onSuccess, initialType = "expense" }: AddTransactionProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])

  // Theme colors
  const isIncome = initialType === "income"
  const activeColor = isIncome ? "bg-green-600" : "bg-red-600"
  const activeText = isIncome ? "text-green-600" : "text-red-600"
  const activeShadow = isIncome ? "shadow-green-600/30" : "shadow-red-600/30"
  const activeBorder = isIncome ? "border-green-600" : "border-red-600"
  const activeBgLight = isIncome ? "bg-green-50" : "bg-red-50"

  // Form state
  const [amount, setAmount] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAmountPopupOpen, setIsAmountPopupOpen] = useState(false)
  const [pendingCategory, setPendingCategory] = useState<Category | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = categories.filter(c => c.type === initialType)
    if (searchQuery.trim()) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    setFilteredCategories(filtered)
  }, [categories, initialType, searchQuery])

  const loadData = async () => {
    try {
      const data = await api.getCategories()
      setCategories(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    }
  }

  const handleAddCategorySuccess = async (newCategoryId?: string) => {
    setIsAddCategoryOpen(false)
    const data = await api.getCategories()
    setCategories(data)
    if (newCategoryId) {
      const newCat = data.find((c: Category) => c.id === newCategoryId)
      if (newCat) {
        setPendingCategory(newCat)
        setSelectedCategoryId(newCategoryId)
        setIsAmountPopupOpen(true)
      }
    }
  }

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (!selectedCategoryId) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await api.createTransaction({
        amount: Number.parseFloat(amount),
        type: initialType,
        categoryId: selectedCategoryId,
        description: description.trim() || undefined,
        date: new Date().toISOString().split("T")[0],
      })

      toast({
        title: "Success",
        description: "Added successfully",
      })
      setIsAmountPopupOpen(false)
      onSuccess()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (cat: Category) => {
    setPendingCategory(cat)
    setSelectedCategoryId(cat.id)
    setIsAmountPopupOpen(true)
    setAmount("") // Reset amount on new selection
  }

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <Icons.Tag className="h-6 w-6" />
    const IconComponent = (Icons as any)[iconName] || Icons.Tag
    return <IconComponent className="h-6 w-6" />
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-2xl bg-muted/50">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className={`text-xl font-black uppercase tracking-[0.2em] ${activeText}`}>
          {isIncome ? "Add Income" : "Add Expense"}
        </h1>
        <div className="w-10" />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pl-11 rounded-3xl bg-muted/30 border-none font-bold placeholder:font-medium focus-visible:ring-primary/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Category Grid */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="grid grid-cols-4 gap-y-8 gap-x-4">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all relative ${selectedCategoryId === cat.id
                ? `${activeColor} text-white shadow-xl ${activeShadow} scale-110`
                : "bg-muted text-muted-foreground hover:bg-muted/80 shadow-sm"
                }`}>
                {renderIcon(cat.icon)}
              </div>
              <span className={`text-[10px] font-black uppercase truncate w-16 text-center ${selectedCategoryId === cat.id ? activeText : "text-muted-foreground"
                }`}>
                {cat.name}
              </span>
            </button>
          ))}

          <button
            onClick={() => setIsAddCategoryOpen(true)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-16 h-16 rounded-[24px] bg-muted/30 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:${activeBorder}/50 hover:${activeBgLight} transition-all`}>
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-black uppercase text-muted-foreground">Add New</span>
          </button>
        </div>
      </div>

      {/* AirPod-style Amount Popup */}
      <Dialog open={isAmountPopupOpen} onOpenChange={setIsAmountPopupOpen}>
        <DialogContent className="fixed bottom-0 top-auto left-1/2 -translate-x-1/2 translate-y-0 sm:bottom-6 rounded-t-[48px] rounded-b-none sm:rounded-[48px] max-w-[420px] w-full p-8 border-none shadow-2xl animate-in slide-in-from-bottom-full duration-700 focus:outline-none bg-white dark:bg-slate-900">
          <DialogHeader className="sr-only">
            <DialogTitle>Add {initialType === "income" ? "Income" : "Expense"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-20 h-20 rounded-[32px] ${activeColor} text-white flex items-center justify-center shadow-2xl ${activeShadow} scale-110`}>
                {renderIcon(pendingCategory?.icon)}
              </div>
              <p className={`text-sm font-black uppercase tracking-[0.2em] ${activeText}`}>
                {pendingCategory?.name}
              </p>
            </div>

            {/* Amount Input */}
            <div className="relative flex items-center justify-center w-full px-4 h-32">
              <input
                type="number"
                inputMode="decimal"
                enterKeyHint="done"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`border-none bg-transparent text-right pr-2 text-[64px] sm:text-[90px] font-black h-full w-full max-w-[280px] focus:outline-none placeholder:text-muted-foreground/5 ${activeText} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 leading-none`}
                autoFocus
              />
              <span className={`text-4xl font-black ${activeText} mt-2 ml-2 opacity-30`}>Rs</span>
            </div>

            {/* Note Field in Popup */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Note (Optional)</p>
              <Input
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-14 rounded-2xl bg-muted/50 border-none px-6 font-bold placeholder:font-medium text-center focus-visible:ring-primary/20"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !amount}
              className={`w-full h-20 rounded-[32px] text-xl font-black shadow-2xl transition-all active:scale-95 ${activeColor} text-white hover:opacity-90 ${activeShadow}`}
            >
              {loading ? "Processing..." : `Add ${initialType === 'income' ? 'Income' : 'Spending'}`}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSuccess={handleAddCategorySuccess}
        initialType={initialType}
      />
    </div>
  )
}
