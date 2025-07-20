import { DashboardShell } from "@/components/dashboardShell";
import { ThemeProvider } from "@/components/theam-provider";
import { RouteLoader } from "@/components/ui/route-loader";
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
                <RouteLoader />
                {children}
            </DashboardShell>
        </ThemeProvider>
    )
}
