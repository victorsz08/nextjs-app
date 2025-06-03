"use client";

import { StatusOrderType } from "@/types";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";
import { FormField, FormItem } from "../ui/form";
import { Label } from "recharts";
import { DateRangePicker } from "../date-picker/date-range";
import { endOfMonth, startOfMonth } from "date-fns";



export interface FilterOrderFormProps {
    status?: "PENDING" | "CONNECTED" | "CANCELLED" | "ALL";
    createdDateFilter?: {
        in?: Date;
        out?: Date;
    }
    schedulingDateFilter?: {
        in?: Date;
        out?: Date;
    };
};


export function FilterOrderForm() {
    const form = useForm<FilterOrderFormProps>({
        defaultValues: {
            status: "ALL",
            createdDateFilter: {
                in: startOfMonth(new Date()),
                out: endOfMonth(new Date()),
            },
            schedulingDateFilter: {
                in: undefined,
                out: undefined,
            },
        },
    });


    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button type="button" variant="outline" className="cursor-pointer bg-transparent border border-primary text-primary">
                        <span>Filtrar</span>
                        <ListFilter className="w-[16px] h-[16px]" />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="schedulingDateFilter"
                            render={({ field }) => (
                              <FormItem>
                                <Label>Filtrar por data de agendamento</Label>
                                <DateRangePicker date={{ from: field.value?.in, to: field.value?.out }}/>
                              </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}