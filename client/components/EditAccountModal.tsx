"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Landmark, User, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"

interface EditAccountModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    account: any
}

const ACCOUNT_TYPES = [
    { id: "cash", label: "Cash / Wallet", icon: Wallet, color: "bg-blue-500" },
    { id: "bank", label: "Bank Account", icon: Landmark, color: "bg-emerald-500" },
    { id: "person", label: "Person", icon: User, color: "bg-amber-500" },
    { id: "other", label: "Other", icon: Plus, color: "bg-slate-500" },
]

export function EditAccountModal({ isOpen, onClose, onSuccess, account }: EditAccountModalProps) {
    const { toast } = useToast()
    const [name, setName] = useState("")
    const [type, setType] = useState("cash")
    const [isDefault, setIsDefault] = useState(false)
    const [isFeatured, setIsFeatured] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (account) {
            setName(account.name)
            setType(account.type)
            setIsDefault(account.isDefault)
            setIsFeatured(account.isFeatured || false)
        }
    }, [account])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        try {
            setLoading(true)
            await api.updateAccount(account.id, { name, type, isDefault, isFeatured })
            toast({ title: "Success", description: "Account updated successfully" })
            onSuccess()
            onClose()
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update account",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] rounded-[32px] overflow-hidden border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black">Edit Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-8 py-4">
                    <div className="space-y-3">
                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Account Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. My Wallet, HDFC Savings"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-2xl h-14 bg-muted/50 border-none text-base font-bold"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Account Type</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {ACCOUNT_TYPES.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setType(t.id)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl transition-all border-2 text-left ${type === t.id
                                        ? "bg-primary/5 border-primary"
                                        : "bg-muted/50 border-transparent hover:bg-muted"
                                        }`}
                                >
                                    <div className={`p-2 rounded-xl ${t.color} text-white`}>
                                        <t.icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-bold">{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                        <div className="space-y-0.5">
                            <Label htmlFor="isDefault" className="text-sm font-black">Set as Default</Label>
                            <p className="text-xs font-medium text-muted-foreground">Pre-selected for transactions</p>
                        </div>
                        <Switch
                            id="isDefault"
                            checked={isDefault}
                            onCheckedChange={setIsDefault}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                        <div className="space-y-0.5">
                            <Label htmlFor="isFeatured" className="text-sm font-black">Feature on Dashboard</Label>
                            <p className="text-xs font-medium text-muted-foreground">Show balance prominently on Overview</p>
                        </div>
                        <Switch
                            id="isFeatured"
                            checked={isFeatured}
                            onCheckedChange={setIsFeatured}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl font-black text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                        >
                            {loading ? "Updating..." : "Update Account"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
