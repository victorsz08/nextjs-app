"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UpdateStatusOrderForm } from "../forms/update-status";
import { DataOrderType } from "@/types";
import { Separator } from "../ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UpdateSchedulingForm } from "../forms/update-scheduling-form";
import { UpdateOrderForm } from "../forms/update-order-form";




export function MenuOrder({ data }: { data: DataOrderType}) {

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
            <DropdownMenuContent align="end" className="min-w-[200px] flex flex-col gap-1">
                <DropdownMenuLabel className="text-[12px] font-mendium text-accent-foreground">
                    Menu pedido
                </DropdownMenuLabel>
                <Separator/>
                <DropdownMenuItem asChild>
                    <UpdateStatusOrderForm data={data}/>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateSchedulingForm data={data}/>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateOrderForm data={data}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}