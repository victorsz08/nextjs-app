"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UpdateStatusOrderForm } from "../forms/update-status";
import { DataOrderType } from "@/types";
import { Separator } from "../ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";




export function MenuOrder({ order }: { order: DataOrderType}) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <EllipsisVerticalIcon />
                  </Button>
                  </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1 p-0">
                <DropdownMenuLabel>
                    Menu pedido
                </DropdownMenuLabel>
                <Separator/>
                <DropdownMenuItem asChild>
                    <UpdateStatusOrderForm order={order}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}