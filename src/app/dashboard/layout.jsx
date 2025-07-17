import { DashboardShell } from "@/components/dashboardShell";
import { ThemeProvider } from "@/components/theam-provider";

export default function DashboardLayout({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <DashboardShell>
                {children}
            </DashboardShell>
        </ThemeProvider>
    )
}
