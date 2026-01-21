"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Settings } from "@/components/Settings"

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen bg-background p-4">
                <h1 className="text-3xl font-extrabold mb-6 tracking-tight">Settings</h1>
                <Settings />
            </div>
        </ProtectedRoute>
    )
}
