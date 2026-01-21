"use client"

import React, { useState, useEffect } from "react"
import { Smartphone, MonitorOff, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export const DesktopGuard = ({ children }: { children: React.ReactNode }) => {
    const [isDesktop, setIsDesktop] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const checkDevice = () => {
            // Check if width is greater than mobile threshold (768px)
            setIsDesktop(window.innerWidth > 768)
        }

        checkDevice()
        window.addEventListener("resize", checkDevice)
        return () => window.removeEventListener("resize", checkDevice)
    }, [])

    if (!mounted) return null

    if (isDesktop) {
        return (
            <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-6 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03),transparent_70%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-md w-full text-center space-y-8"
                >
                    {/* Icon Stack */}
                    <div className="relative flex justify-center">
                        <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center shadow-2xl shadow-purple-500/20">
                            <Smartphone className="w-10 h-10 text-white" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center border-4 border-white"
                        >
                            <MonitorOff className="w-5 h-5 text-red-500" />
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-black tracking-tight text-black">
                            Mobile Experience <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">Highly Encouraged.</span>
                        </h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            DevinBook is engineered specifically for micro-management on the go. To ensure absolute security and the best interface experience, please access your vault from a mobile device.
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col items-center gap-4">
                        <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PWA Ready — Scan or Visit on Mobile</span>
                        </div>

                        <div className="w-full h-px bg-slate-100" />

                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Built by Devinsol Group
                        </p>
                    </div>
                </motion.div>

                {/* Decorative floating elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-20 left-[10%] w-32 h-32 bg-[#8B5CF6]/5 blur-3xl rounded-full"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-20 right-[10%] w-40 h-40 bg-[#D946EF]/5 blur-3xl rounded-full"
                />
            </div>
        )
    }

    return <>{children}</>
}
