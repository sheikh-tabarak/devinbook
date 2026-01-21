"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck, Scale, Handshake } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
                    <h1 className="text-3xl font-black tracking-tight">Terms of Service</h1>
                </div>

                {/* Introduction */}
                <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <Handshake className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-1">Our Commitment to Fairness</h3>
                                <p className="text-sm">
                                    We believe in a "win-win" relationship. These terms are designed to protect both you (the user) and us (Devinsol), insuring a transparent, safe, and reliable environment for managing your financial data.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p>
                        Effective Date: {new Date().toLocaleDateString()}
                    </p>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using DevinsolERP ("Service"), you agree to accept and comply with these Terms of Service. If you do not agree, you should not use the Service.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            2. User Rights & Responsibilities
                        </h2>
                        <p>
                            <strong>Your Rights:</strong> You own your data. You can export it or request its deletion at any time. We grant you a non-exclusive, revocable license to use our platform for your personal or business financial tracking.
                        </p>
                        <p>
                            <strong>Your Responsibilities:</strong> You agree to provide accurate information and to keep your account credentials secure. You are responsible for all activities that occur under your account.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            3. Service Availability & Security
                        </h2>
                        <p>
                            We strive for 99.9% uptime and use industry-standard encryption to protect your data. However, like all technology, we cannot guarantee absolute immunity from errors or interruptions. We promise to communicate openly if any issues arise.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            4. Fair Usage
                        </h2>
                        <p>
                            We want you to get the most out of our tools. In return, you agree not to misuse the Service (e.g., attempting to hack it, overloading our servers, or using it for illegal activities). Fair usage ensures a fast experience for everyone.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            5. Limitation of Liability
                        </h2>
                        <p>
                            We build our tools with care, but we provide the Service "as is". We are not liable for any indirect damages or financial losses that may occur from the use of our tracking tools. Please double-check your important financial records.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            6. Changes to Terms
                        </h2>
                        <p>
                            We may update these terms as our Service evolves. We will notify you of significant changes. Continued use of the Service implies acceptance of the new terms.
                        </p>
                    </section>

                    <div className="pt-8 border-t">
                        <p className="text-sm">
                            Questions? Contact us at <a href="mailto:support@devinsol.com" className="text-primary hover:underline">support@devinsol.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
