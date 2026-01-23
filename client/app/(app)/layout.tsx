import { BottomNavigation } from "@/components/BottomNavigation"
import { DesktopGuard } from "@/components/DesktopGuard"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <DesktopGuard>
        <main className="mx-auto min-h-screen max-w-[450px] bg-background shadow-2xl relative overflow-x-hidden border-x border-border/50 pb-20">
            {children}
            <BottomNavigation />
        </main>
        // </DesktopGuard>
    )
}
