"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";





export function TriggerSidebar() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button variant="ghost" className="cursor-pointer" onClick={toggleSidebar}>
            <Menu className="w-[32px] h-[32px]"/>
        </Button>
    )
}