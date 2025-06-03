import { DataOrderType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Form } from "../ui/form";




const updateStatusOrderSchema = z.object({
    status: z.string().min(1, "Status é obrigatório"),
});


type UpdateStatusOrderFormData = z.infer<typeof updateStatusOrderSchema>;

export function UpdateStatusOrderForm({ order } : {order: DataOrderType}) {
    const form = useForm<UpdateStatusOrderFormData>({
        resolver: zodResolver(updateStatusOrderSchema),
        defaultValues: {
            status: order.status,
        },
    });


    return (
        <Dialog>
            <DialogTrigger>
                <div className="text-accent-foreground p-[10px] cursor-pointer hover:text-primary text-[12px] font-light flex items-center gap-1">
                    <Pencil className="w-[14px] h-[14px]"/>
                    <span>Editar status</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}