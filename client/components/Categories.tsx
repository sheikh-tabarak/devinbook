"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Tag, ChevronRight } from "lucide-react"
import { AddCategoryModal } from "./AddCategoryModal"
import { EditCategoryModal } from "./EditCategoryModal"
import { useToast } from "@/hooks/use-toast"
import * as Icons from "lucide-react"

interface Category {
  id: string
  name: string
  type: "income" | "expense"
  icon?: string
  createdAt: string
}

export function Categories() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await api.getCategories()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return

    try {
      const id = category.id || (category as any)._id
      await api.deleteCategory(id)
      toast({ title: "Success", description: "Category deleted" })
      loadCategories()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <Tag className="h-6 w-6 text-muted-foreground" />
    const IconComponent = (Icons as any)[iconName] || Tag
    return <IconComponent className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )

  const incomeCategories = categories.filter(c => c.type === "income")
  const expenseCategories = categories.filter(c => c.type === "expense")

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Budget Groups</p>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="rounded-xl font-bold bg-primary/10 text-primary hover:bg-primary/20">
          <Plus className="h-4 w-4 mr-1" /> Add Group
        </Button>
      </div>

      {/* Expense Categories */}
      <div className="space-y-4">
        <h3 className="px-4 text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Spending
        </h3>
        <div className="bg-white dark:bg-slate-900 border rounded-[32px] overflow-hidden shadow-sm">
          {expenseCategories.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Tag className="h-8 w-8 mx-auto opacity-20 mb-2" />
              <p className="text-xs font-bold">No spending categories</p>
            </div>
          ) : (
            expenseCategories.map((category, idx) => (
              <CategoryItem
                key={category.id}
                category={category}
                isLast={idx === expenseCategories.length - 1}
                onEdit={() => { setEditingCategory(category); setIsEditModalOpen(true); }}
                onDelete={() => handleDeleteCategory(category)}
                renderIcon={renderIcon}
              />
            ))
          )}
        </div>
      </div>

      {/* Income Categories */}
      <div className="space-y-4">
        <h3 className="px-4 text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Income
        </h3>
        <div className="bg-white dark:bg-slate-900 border rounded-[32px] overflow-hidden shadow-sm">
          {incomeCategories.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Plus className="h-8 w-8 mx-auto opacity-20 mb-2" />
              <p className="text-xs font-bold">No income categories</p>
            </div>
          ) : (
            incomeCategories.map((category, idx) => (
              <CategoryItem
                key={category.id}
                category={category}
                isLast={idx === incomeCategories.length - 1}
                onEdit={() => { setEditingCategory(category); setIsEditModalOpen(true); }}
                onDelete={() => handleDeleteCategory(category)}
                renderIcon={renderIcon}
              />
            ))
          )}
        </div>
      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={loadCategories}
      />

      <EditCategoryModal
        category={editingCategory}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingCategory(null)
        }}
        onSuccess={loadCategories}
      />
    </div>
  )
}

function CategoryItem({ category, isLast, onEdit, onDelete, renderIcon }: any) {
  return (
    <div
      className={`p-5 flex items-center justify-between group hover:bg-muted/30 transition-colors ${!isLast ? 'border-b' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          {renderIcon(category.icon)}
        </div>
        <div>
          <p className="font-black text-sm">{category.name}</p>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{category.type}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={onEdit} className="rounded-xl h-10 w-10">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-destructive hover:bg-destructive/10 rounded-xl h-10 w-10">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
