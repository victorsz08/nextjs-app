"use client";

import { TypeStatusOrder } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { DateRangePicker } from "../date-picker/date-range";
import { endOfMonth, startOfMonth } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { BadgeStatus } from "../badge/badge-status";

const statusFilterOptions = [
  { value: TypeStatusOrder.ALL },
  { value: TypeStatusOrder.PENDING },
  { value: TypeStatusOrder.CONNECTED },
  { value: TypeStatusOrder.CANCELED },
];

const filterOrderFormSchema = z.object({
  schedulingDateFilter: z
    .object({
      in: z.coerce.date().optional(),
      out: z.coerce.date().optional(),
    })
    .optional(),
  status: z.nativeEnum(TypeStatusOrder).optional(),
  createdDateFilter: z
    .object({
      in: z.coerce.date().optional(),
      out: z.coerce.date().optional(),
    })
    .optional(),
});

export type FilterOrderFormProps = z.infer<typeof filterOrderFormSchema>;

export function FilterOrderForm() {
  const form = useForm<FilterOrderFormProps>({
    resolver: zodResolver(filterOrderFormSchema),
    defaultValues: {
      status: TypeStatusOrder.ALL,
      createdDateFilter: {
        in: startOfMonth(new Date()),
        out: endOfMonth(new Date()),
      },
      schedulingDateFilter: {
        in: startOfMonth(new Date()),
        out: endOfMonth(new Date()),
      },
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer bg-transparent border border-primary text-primary"
          >
            <span>Filtrar</span>
            <ListFilter className="w-[16px] h-[16px]" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-10 flex flex-col items-center">
          <DialogTitle>
            Filtar pedidos
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-[12px]">
            Filtre os pedidos por data de agendamento, data de criação e status.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="schedulingDateFilter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filtrar por data de agendamento</FormLabel>
                  <DateRangePicker
                    date={{ from: field.value?.in, to: field.value?.out }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createdDateFilter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Filtrar por data de criação</FormLabel>
                  <DateRangePicker
                    date={{ from: field.value?.in, to: field.value?.out }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 justify-center items-center">
                  <FormLabel>Filtrar por status</FormLabel>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-row justify-center gap-1"
                  >
                    {statusFilterOptions.map((option) => (
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
                          className={`${
                            field.value === option.value
                              ? "border-2 border-primary rounded-xl outline-2"
                              : "border-2 border-transparent"
                          } cursor-pointer p-1 transition-all`}
                        >
                          <BadgeStatus status={option.value} />
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col w-full mt-8 gap-[10px]">
              <div className="flex flex-col gap-1 w-full">
                <Button className="cursor-pointer w-full" type="submit">
                  Filtrar
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
