"use client";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Collapsible } from "../ui/collapsible";
import Link from "next/link";

export interface NavMainProps {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible className="group/data" key={item.title}>
            <Link href={item.href}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={pathname === item.href}
                  className="data-[active=true]:text-primary bg-transparent data-[active=true]:bg-transparent
                                text-accent-foreground cursor-pointer py-[18px] font-light hover:bg-transparent hover:text-primary"
                >
                  <item.icon className="w-5 h-5" />
                  <p className="text-[12px] font-normal">{item.title}</p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
