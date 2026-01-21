"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Categories } from "@/components/Categories"

export default function ManagePage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-background p-6 space-y-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">Manage</h1>
                    <p className="text-muted-foreground font-medium">Control your budget groups</p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Categories />
                </div>
            </div>
        </ProtectedRoute>
    )
}
