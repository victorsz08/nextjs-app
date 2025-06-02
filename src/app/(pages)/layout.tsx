import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TriggerSidebar } from "@/components/sidebar/trigger-sidebar";
import { SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";





export default function Layout({ children } : { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar variant="sidebar" collapsible="icon"/>
            <main className="w-screen h-screen overflow-x-hidden">
                <header className="flex justify-start items-center px-4 py-2 bg-transparent">
                    <TriggerSidebar/>
                </header>
                {children}
            </main>
        </SidebarProvider>
    )
}