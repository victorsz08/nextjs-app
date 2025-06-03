"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UpdateStatusOrderForm } from "../forms/update-status";
import { DataOrderType } from "@/types";
import { Separator } from "../ui/separator";




export function MenuOrder({ order }: { order: DataOrderType}) {

    return (
        <Popover>
            <PopoverTrigger asChild>
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
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col gap-1 p-0">
                <div className="text-sm font-semibold text-foreground px-[10px] py-[6px]">Menu</div>
                <Separator/>
                <UpdateStatusOrderForm order={order}/>
            </PopoverContent>
        </Popover>
    )
}