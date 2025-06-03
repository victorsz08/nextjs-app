"use client";

import { DataOrderType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { CalendarCog } from "lucide-react";




const updateSchedulingSchema = z.object({
    schedulingDate: z.coerce.date().refine((date) => date >= new Date(), {
        message: "A data de agendamento deve ser no futuro",
    }),
    schedulingTime: z.string().min(1, "Horário de agendamento é obrigatório"),
});


export type UpdateSchedulingFormData = z.infer<typeof updateSchedulingSchema>;

export function UpdateSchedulingForm({ data } : { data: DataOrderType }) {
    const form = useForm<UpdateSchedulingFormData>({
        resolver: zodResolver(updateSchedulingSchema),
        defaultValues: {
            schedulingDate: new Date(data.schedulingDate),
            schedulingTime: data.schedulingTime,
        },
    });



    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-1 text-accent-foreground p-[10px] cursor-pointer hover:text-primary text-[12px] font-light">
                    <CalendarCog className="w-[12px] h-[12px]"/>
                    <span>Atualizar agendamento</span>
                </div>
            </DialogTrigger>
        </Dialog>
    )
}