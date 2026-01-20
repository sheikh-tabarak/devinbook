"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  CircleHelp,
  Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import packageInfo from "../package.json"

export function Settings() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const menuItems = [
    { icon: <Bell className="h-5 w-5 text-blue-500" />, label: "Notifications", value: "Push" },
    { icon: <Shield className="h-5 w-5 text-green-500" />, label: "Security", value: "Face ID" },
    { icon: <CircleHelp className="h-5 w-5 text-orange-500" />, label: "Help Center", value: null },
    { icon: <Info className="h-5 w-5 text-slate-500" />, label: "About App", value: `v${packageInfo.version}` },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* User Card */}
      <Card className="rounded-[32px] border-none bg-slate-900 text-white shadow-2xl overflow-hidden relative">
        <CardContent className="p-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-3xl font-black">
            {user?.name?.[0].toUpperCase()}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">{user?.name}</h2>
            <p className="text-slate-400 text-sm font-medium">{user?.email}</p>
            <div className="pt-2">
              <span className="bg-white/10 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Premium Member</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground px-2">System</h3>
        <div className="bg-card border rounded-[32px] overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-black text-sm">Dark Mode</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Adjust appearance</p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          {menuItems.map((item, idx) => (
            <div key={idx} className={`p-6 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors ${idx !== menuItems.length - 1 ? 'border-b' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="font-black text-sm">{item.label}</p>
                  {item.value && <p className="text-[10px] uppercase font-bold text-muted-foreground">{item.value}</p>}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="w-full h-16 rounded-[24px] text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center justify-center gap-3 font-black"
      >
        <LogOut className="h-6 w-6" />
        Sign Out
      </Button>

      {/* Devinsol Branding Footer */}
      <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-12 opacity-60">
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer" onClick={() => window.open('https://devinsol.com', '_blank')}>
          <img src="https://devinsol.com/wp-content/uploads/2025/07/devinsol-favicon.png" alt="Devinsol Icon" className="w-5 h-5 object-contain" />
          <img src="https://devinsol.com/wp-content/uploads/2025/08/Devinsol-e1754743293456.png" alt="Devinsol Logo" className="h-4 object-contain" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Designed by Devinsol</p>
          <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Version {packageInfo.version} • Build {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}
