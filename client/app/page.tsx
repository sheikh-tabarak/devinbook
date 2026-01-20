"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, Shield, Zap, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="p-4 bg-primary/10 rounded-3xl">
          <TrendingUp className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Track Expenses <br />
            <span className="text-primary">Like a Pro</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-[300px] mx-auto">
            The premium finance tracker for people who value their time and money.
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 pt-4">
          <Button asChild size="lg" className="h-14 text-lg rounded-2xl shadow-xl shadow-primary/20">
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            No credit card required
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="p-6 grid grid-cols-2 gap-4 pb-12">
        <div className="p-4 bg-card border rounded-2xl space-y-2">
          <Shield className="h-6 w-6 text-primary" />
          <h3 className="font-bold text-sm">Secure</h3>
          <p className="text-xs text-muted-foreground">Your data is encrypted and safe.</p>
        </div>
        <div className="p-4 bg-card border rounded-2xl space-y-2">
          <Zap className="h-6 w-6 text-primary" />
          <h3 className="font-bold text-sm">Fast</h3>
          <p className="text-xs text-muted-foreground">Lightning fast entries and sync.</p>
        </div>
      </div>
    </div>
  )
}
