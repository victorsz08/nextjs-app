import { DataOrderType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil, Radio } from "lucide-react";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { StatusOrderType } from "@/types/index";
import { Label } from "../ui/label";
import { BadgeStatus } from "../badge/badge-status";
import { DialogClose } from "@radix-ui/react-dialog";
import { Separator } from "../ui/separator";

const statusOptions = [
  { value: StatusOrderType.PENDING },
  { value: StatusOrderType.CONNECTED },
  { value: StatusOrderType.CANCELED },
];

const updateStatusOrderSchema = z.object({
  status: z.string().min(1, "Status é obrigatório"),
});

type UpdateStatusOrderFormData = z.infer<typeof updateStatusOrderSchema>;

export function UpdateStatusOrderForm({ order }: { order: DataOrderType }) {
  const form = useForm<UpdateStatusOrderFormData>({
    resolver: zodResolver(updateStatusOrderSchema),
    defaultValues: {
      status: order.status,
    },
  });

  console.log(statusOptions);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-accent-foreground p-[10px] cursor-pointer hover:text-primary text-[12px] font-light flex items-center gap-1">
          <Pencil className="w-[14px] h-[14px]" />
          <span>Editar status</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col justify-center items-center gap-1 mb-8">
          <DialogTitle>Atualizar Status</DialogTitle>
          <DialogDescription className="text-[12px] text-primary font-light">
            Contrato: {order.number} - Cidade: {order.local}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 justify-center items-center">
                  <FormLabel>Status</FormLabel>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-row justify-center gap-1"
                  >
                    {statusOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-4"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only flex flex-col gap-3 items-center justify-center"
                        />
                        <Label
                          htmlFor={option.value}
                          className={`${field.value === option.value ? 
                            "border-2 border-primary rounded-xl outline-2" : 
                            "border-2 border-transparent"
                          } cursor-pointer p-1 transition-all`}
                        >
                            <BadgeStatus status={option.value} />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col w-full mt-8 gap-[10px]">
                <div className="flex flex-col gap-1 w-full">
                    <Button className="cursor-pointer w-full" type="submit">
                        Atualizar
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline" type="button" className="cursor-pointer w-full">
                            Cancelar
                        </Button>
                    </DialogClose>
                </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
