"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Wallet,
    ChevronRight,
    Tag
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AddTransaction } from "@/components/AddTransaction"
import * as Icons from "lucide-react"

interface Transaction {
    id: string
    amount: number
    type: "income" | "expense"
    categoryId: any // Can be object after populate
    description?: string
    date: string
    createdAt: string
}

export default function TransactionsPage() {
    const { user } = useAuth()
    const { toast } = useToast()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [addType, setAddType] = useState<"income" | "expense">("expense")
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
    const [totalBalance, setTotalBalance] = useState(0)

    useEffect(() => {
        loadTransactions()
    }, [])

    const loadTransactions = async () => {
        try {
            setLoading(true)
            const [data, stats] = await Promise.all([
                api.getTransactions(),
                api.getDashboardStats()
            ])

            setTransactions(data)
            if (stats?.monthly) {
                setTotalBalance(stats.monthly.balance)
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load transactions",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const groupTransactionsByDate = (txs: Transaction[]) => {
        const groups: Record<string, Transaction[]> = {}
        txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).forEach(tx => {
            const date = new Date(tx.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long'
            })
            if (!groups[date]) groups[date] = []
            groups[date].push(tx)
        })
        return groups
    }

    const renderCategoryIcon = (category: any) => {
        if (!category?.icon) return <Tag className="h-5 w-5 text-muted-foreground" />
        const IconComponent = (Icons as any)[category.icon] || Tag
        return <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
    }

    if (isAdding) {
        return (
            <ProtectedRoute>
                <AddTransaction
                    onBack={() => setIsAdding(false)}
                    onSuccess={() => {
                        setIsAdding(false)
                        loadTransactions()
                    }}
                    initialType={addType}
                />
            </ProtectedRoute>
        )
    }

    const grouped = groupTransactionsByDate(transactions)

    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-background pb-24">
                {/* Account Balance Header */}
                <div className="p-6 pt-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Wallet className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-bold text-sm tracking-tight">Main Wallet</span>
                        </div>
                        <div className="bg-muted px-2 py-1 rounded-lg text-[10px] font-black uppercase">PKR</div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-muted-foreground text-sm font-medium">Account Balance</p>
                        <h1 className="text-4xl font-black tracking-tight">{(totalBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} Rs</h1>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={() => { setAddType("income"); setIsAdding(true); }}
                            className="w-14 h-14 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-green-600/20"
                            title="Add Income"
                        >
                            <ArrowDownLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            onClick={() => { setAddType("expense"); setIsAdding(true); }}
                            className="flex-1 h-14 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-red-600/20"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <ArrowUpRight className="h-4 w-4" />
                            </div>
                            <span className="font-bold">Add Spent</span>
                        </Button>
                    </div>
                </div>

                <div className="flex-1 bg-white dark:bg-slate-950 rounded-t-[40px] shadow-2xl border-t p-6 pb-20 space-y-8 min-h-[500px]">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="font-bold">No transactions yet</p>
                            <p className="text-sm">Start managing your money today</p>
                        </div>
                    ) : (
                        Object.entries(grouped).map(([date, items]) => (
                            <div key={date} className="space-y-4">
                                <h3 className="text-muted-foreground font-bold text-sm tracking-tight">{date}</h3>
                                <div className="space-y-4">
                                    {items.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                    {renderCategoryIcon(tx.categoryId)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm">{tx.description || tx.categoryId?.name || "Untitled"}</p>
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                                                        {tx.type === 'expense' ? 'Spending' : 'Income'} • {tx.categoryId?.name || 'General'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className={`font-black ${tx.type === 'income' ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>
                                                        {tx.type === 'income' ? '+' : '-'}{(tx.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} Rs
                                                    </p>
                                                    <div className={`ml-auto w-4 h-4 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                                        {tx.type === 'income' ? <ArrowDownLeft className="h-2 w-2" /> : <ArrowUpRight className="h-2 w-2" />}
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground/10" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </ProtectedRoute>
    )
}
