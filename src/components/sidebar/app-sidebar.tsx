"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Collapsible } from "../ui/collapsible";
import { NavMain } from "./nav-main";
import { title } from "process";
import { ChartNoAxesColumn, Clipboard, House, LogOut, Notebook, UserRound } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

const mainItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Contratos",
    href: "/contratos",
    icon: Clipboard,
  },
  {
    title: "Anotações",
    href: "/anotacoes",
    icon: Notebook,
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: ChartNoAxesColumn,
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="icon" className="bg-sidebar">
      <SidebarHeader>
        <div className="flex flex-row items-center gap-[10px] py-[24px]">
          <Image src="icon.svg" width={26} height={26} alt="Logo Notetools" />
          <p
            className="text-[18px] font-semibold text-primary 
            group-data-[collapsible=icon]:hidden"
          >
            Notetools
          </p>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={mainItems} />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarMenu>
          <Collapsible className="group/data">
            <SidebarMenuItem>
              <Link href="/perfil">
                <SidebarMenuButton
                  className="data-[active=true]:text-primary bg-transparent data-[active=true]:bg-transparent
                text-accent-foreground cursor-pointer py-[24px] font-light hover:bg-transparent hover:text-primary"
                >
                  <UserRound className="w-5 h-5" />
                  <p className="text-sm font-light group-data-[collapsible=icon]:hidden">
                    Perfil
                  </p>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Collapsible>
          <Collapsible className="group/data">
            <SidebarMenuItem>
              <Link href="/perfil">
                <SidebarMenuButton
                  className="cursor-pointer hover:bg-red-100 hover:text-red-600
                bg-red-100 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <p className="text-sm font-light group-data-[collapsible=icon]:hidden">
                    Sair
                  </p>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
        <div className="flex flex-col px-[10px] py-[12px] group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] text-accent-foreground font-light">
            Copyright © 2024 - 2025 Notetools. Todos os direitos reservados.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
