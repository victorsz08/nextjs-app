"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TriggerSidebar } from "@/components/sidebar/trigger-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";





export default function Layout({ children } : { children: React.ReactNode }) {
    const paths = usePathname();
    const pathnames = paths.split("/").filter((path) => path !== "");

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar variant="sidebar" collapsible="icon"/>
            <main className="w-screen h-screen overflow-x-hidden">
                <header className="flex justify-between items-center px-4 py-[26px] bg-transparent">
                    <nav className="flex items-center gap-4">
                        <TriggerSidebar/>
                        <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="font-light">operacao</BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            {pathnames.map((path, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <BreadcrumbItem 
                                        key={index} 
                                        className={`${index === pathnames.length - 1 ? "text-primary" : "text-accent-foreground"}
                                        font-light `}
                                    >
                                        {path}
                                    </BreadcrumbItem>
                                    {index < pathnames.length - 1 && (
                                        <BreadcrumbSeparator className="text-gray-500" />
                                    )}
                                </div>
                            ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </nav>
                    <div>
                        <Avatar className="border border-primary">
                            <AvatarFallback
                                className="text-[14px] font-bold">VS</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                {children}
            </main>
        </SidebarProvider>
    )
}