"use client";

import { TypeOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Settings } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Combobox } from "../combobox/combobox";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "@/services/orders/update-order";


const updateOrderSchema = z.object({
  number: z.coerce.number().min(1, "Número do pedido é obrigatório"),
  local: z.string().min(1, "Local é obrigatório"),
  contact: z.string().min(1, "Contato é obrigatório"),
  price: z.string().min(0, "Preço deve ser um número positivo"),
});

type UpdateOrderFormValues = z.infer<typeof updateOrderSchema>;

export interface UpdateOrderFormProps {
  data: TypeOrder;
}

export function UpdateOrderForm({ data }: UpdateOrderFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newData: UpdateOrderFormValues) => {
      await updateOrder({ ...newData, id: data.id });
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setOpen(false);
    },
    mutationKey: ["orders"],
  });

  const citiesOptions = queryClient.getQueryCache().find("cities");

  const form = useForm<UpdateOrderFormValues>({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      number: data.number,
      local: data.local,
      contact: data.contact,
      price: data.price.toString(),
    },
  });

  const formatPrice = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number((value)) / 100);
  };

  const price = form.watch("price") ? formatPrice(form.watch("price")) : "";


  function onSubmit(data: UpdateOrderFormValues) {
    mutate(data);
  };


  return (
    <Dialog defaultOpen={open} onOpenChange={setOpen} modal>
      <DialogTrigger>
        <div className="flex items-center gap-1 text-accent-foreground p-[10px] cursor-pointer hover:text-primary text-[12px] font-light">
          <Settings className="w-[12px] h-[12px]" />
          <span>Atualizar pedido</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col justify-center items-center gap-1 mb-8">
          <DialogTitle>Atualizar Status</DialogTitle>
          <DialogDescription className="text-[12px] text-primary font-light">
            Contrato: {data.number} - Cidade: {data.local}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <Label className="text-[12px] font-medium text-accent-foreground">
                    N° do contrato
                  </Label>
                  <Input {...field} />
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <Label className="text-[12px] font-medium text-accent-foreground">
                    Cidade
                  </Label>
                  <Combobox
                    options={citiesOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <Label className="text-[12px] font-medium text-accent-foreground">
                    Valor
                  </Label>
                  <Input value={price} onChange={field.onChange} />
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <Label className="text-[12px] font-medium text-accent-foreground">
                    Contato
                  </Label>
                  <Input {...field} />
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col w-full mt-8 gap-[10px]">
              <div className="flex flex-col gap-1 w-full">
                <Button className="cursor-pointer w-full" type="submit" disabled={isPending}>
                  {isPending ? "Atualizando..." : "Atualizar"}
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer w-full"
                  >
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
