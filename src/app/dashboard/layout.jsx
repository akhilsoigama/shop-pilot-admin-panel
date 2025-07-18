import { DashboardShell } from "@/components/dashboardShell";
import { ThemeProvider } from "@/components/theam-provider";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                }} />
            <DashboardShell>
                {children}
            </DashboardShell>
        </ThemeProvider>
    )
}
