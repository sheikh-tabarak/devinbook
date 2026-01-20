"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Transaction {
  id: string
  amount: number
  type: "income" | "expense"
  categoryId: string
  itemId?: string
  description?: string
  date: string
  createdAt: string
}

interface Category {
  id: string
  name: string
  type: "income" | "expense"
  createdAt?: string
}

interface EditTransactionModalProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function EditTransactionModal({ transaction, isOpen, onClose, onSuccess }: EditTransactionModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  // Form state
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    if (isOpen) {
      loadData()
    }
  }, [isOpen])

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString())
      setType(transaction.type)
      setSelectedCategoryId(transaction.categoryId)
      setDescription(transaction.description || "")
      setDate(transaction.date.split("T")[0])
    }
  }, [transaction])

  const loadData = async () => {
    try {
      const categoriesData = await api.getCategories()
      setCategories(categoriesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transaction || !amount || !selectedCategoryId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const id = transaction.id || (transaction as any)._id
      if (!id) throw new Error("Transaction ID is missing")
      await api.updateTransaction(id, {
        amount: Number.parseFloat(amount),
        type,
        categoryId: selectedCategoryId,
        itemId: transaction.itemId || undefined,
        description: description.trim() || undefined,
        date,
      })

      toast({
        title: "Success",
        description: "Transaction updated successfully",
      })

      onSuccess()
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update transaction",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!transaction) return

    if (!confirm("Are you sure you want to delete this transaction?")) return

    setLoading(true)

    try {
      const id = transaction.id || (transaction as any)._id
      if (!id) throw new Error("Transaction ID is missing")
      await api.deleteTransaction(id)
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      })

      onSuccess()
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete transaction",
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
          <DialogTitle className="text-2xl font-black text-center">Edit Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Amount</Label>
            <div className="relative flex items-center">
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-16 pr-10 rounded-2xl bg-muted/50 border-none text-2xl font-black text-right"
                required
              />
              <span className="ml-2 text-2xl font-black text-muted-foreground/30">₹</span>
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => setType("expense")}
                className={`h-12 rounded-2xl font-black transition-all ${type === "expense" ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                Expense
              </Button>
              <Button
                type="button"
                onClick={() => setType("income")}
                className={`h-12 rounded-2xl font-black transition-all ${type === "income" ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                Income
              </Button>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId} required>
              <SelectTrigger className="h-14 rounded-2xl bg-muted/50 border-none font-bold">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-2xl">
                {categories.filter(c => c.type === type).map((category) => (
                  <SelectItem key={category.id} value={category.id} className="rounded-xl font-bold">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="h-14 rounded-2xl bg-muted/50 border-none font-bold" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Note (Optional)</Label>
            <Textarea
              placeholder="Add a note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 rounded-2xl bg-muted/50 border-none p-4 font-bold"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" className="w-full h-14 rounded-2xl font-black bg-[#5a4cf1] hover:bg-[#4a3ce1] text-white shadow-xl shadow-indigo-500/20" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
            <Button type="button" variant="ghost" onClick={handleDelete} className="w-full h-14 rounded-2xl font-bold text-destructive hover:bg-destructive/10" disabled={loading}>
              Delete Entry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
