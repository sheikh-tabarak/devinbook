"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Categories } from "@/components/Categories"
import { Accounts } from "@/components/Accounts"
import { cn } from "@/lib/utils"

export default function ManagePage() {
    const [activeTab, setActiveTab] = useState<"groups" | "accounts">("groups")

    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-background p-6 pb-24 space-y-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight uppercase">Manage</h1>
                        <p className="text-muted-foreground font-medium">Control your budget and accounts</p>
                    </div>

                    <div className="flex p-1.5 bg-muted/50 rounded-2xl w-full max-w-sm">
                        <button
                            onClick={() => setActiveTab("groups")}
                            className={cn(
                                "flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all",
                                activeTab === "groups"
                                    ? "bg-white dark:bg-slate-900 shadow-sm text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            CATEGORIES
                        </button>
                        <button
                            onClick={() => setActiveTab("accounts")}
                            className={cn(
                                "flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all",
                                activeTab === "accounts"
                                    ? "bg-white dark:bg-slate-900 shadow-sm text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            ACCOUNTS
                        </button>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === "groups" ? <Categories /> : <Accounts />}
                </div>
            </div>
        </ProtectedRoute>
    )
}
