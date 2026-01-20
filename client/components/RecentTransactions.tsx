"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  type: "income" | "expense"
  categoryId: string
  itemId: string
  description?: string
  date: string
  createdAt: string
}

interface RecentTransactionsProps {
  transactions: Transaction[]
  onTransactionUpdate?: () => void
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-[32px]">
        <p className="font-bold">No activity yet</p>
        <p className="text-sm">Your transactions will appear here</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4 p-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${transaction.type === "income"
                  ? "bg-green-100 text-green-600 dark:bg-green-500/10"
                  : "bg-red-100 text-red-600 dark:bg-red-500/10"
                  }`}
              >
                {transaction.type === "income" ? (
                  <ArrowDownLeft className="h-5 w-5" />
                ) : (
                  <ArrowUpRight className="h-5 w-5" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="font-black text-sm">{transaction.description || (transaction.categoryId as any)?.name || "Untitled Entry"}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  {new Date(transaction.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className={`font-black tracking-tight ${transaction.type === "income" ? "text-green-600" : "text-slate-900 dark:text-white"}`}>
                {transaction.type === "income" ? "+" : "-"}{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} Rs
              </p>
              <ChevronRight className="h-4 w-4 text-muted-foreground/10" />
            </div>
          </div>
        ))}
      </div>

    </>
  )
}
