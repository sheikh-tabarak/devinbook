"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock, Eye, Database } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" asChild className="rounded-xl">
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight">Privacy Policy</h1>
                </div>

                {/* Core Philosophy */}
                <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-card border rounded-2xl space-y-2">
                            <Lock className="h-5 w-5 text-green-500" />
                            <h3 className="font-bold text-foreground">Encrypted</h3>
                            <p className="text-xs">Your data is encrypted at rest and in transit.</p>
                        </div>
                        <div className="p-4 bg-card border rounded-2xl space-y-2">
                            <Eye className="h-5 w-5 text-blue-500" />
                            <h3 className="font-bold text-foreground">Private</h3>
                            <p className="text-xs">We do not sell your personal data to advertisers.</p>
                        </div>
                        <div className="p-4 bg-card border rounded-2xl space-y-2">
                            <Database className="h-5 w-5 text-purple-500" />
                            <h3 className="font-bold text-foreground">Ownership</h3>
                            <p className="text-xs">You retain full ownership of your financial records.</p>
                        </div>
                    </div>

                    <p>
                        Effective Date: {new Date().toLocaleDateString()}
                    </p>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">1. Data We Collect</h2>
                        <p>
                            We collect the minimum data necessary to provide you with great service:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Account Info:</strong> Name and email address for login.</li>
                            <li><strong>Financial Data:</strong> Transactions, categories, and budgets you input.</li>
                            <li><strong>Usage Data:</strong> Anonymous analytics to help us improve app performance.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">2. How We Use Your Data</h2>
                        <p>
                            Your data is used solely to:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Provide and maintain the Service.</li>
                            <li>Generate your financial reports and insights.</li>
                            <li>Improve user experience and fix bugs.</li>
                        </ul>
                        <p className="text-foreground font-medium mt-2">
                            We do NOT sell your data to third parties.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">3. Data Security</h2>
                        <p>
                            We implement robust security measures, including strong encryption and secure server infrastructure, to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">4. Cookies</h2>
                        <p>
                            We use essential cookies to keep you logged in and remember your preferences. We believe in a clutter-free web, so we don't use aggressive tracking cookies.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">5. Your Choices</h2>
                        <p>
                            You have the right to access, update, or delete your information at any time. You can export your data from the dashboard or delete your account via the Profile settings.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground">6. Contact Us</h2>
                        <p>
                            If you have any questions or concerns about this policy, please reach out to our Data Privacy Officer at <a href="mailto:privacy@devinsol.com" className="text-primary hover:underline">privacy@devinsol.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
