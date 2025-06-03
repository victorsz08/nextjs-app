"use client";

import { DataOrderType } from "@/types";
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
import { CalendarCog } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { DatePicker } from "../date-picker/date-picker";
import { addDays } from "date-fns";
import { Button } from "../ui/button";

const timeOptions = [
  {
    value: "08h as 12h",
  },
  {
    value: "08h as 19h",
  },
  {
    value: "12h as 15h",
  },

  {
    value: "12h as 18h",
  },
  {
    value: "15h as 18h",
  },
];

const updateSchedulingSchema = z.object({
  schedulingDate: z.coerce.date().refine((date) => date >= new Date(), {
    message: "A data de agendamento deve ser no futuro",
  }),
  schedulingTime: z.string().min(1, "Horário de agendamento é obrigatório"),
});

export type UpdateSchedulingFormData = z.infer<typeof updateSchedulingSchema>;

export function UpdateSchedulingForm({ data }: { data: DataOrderType }) {
  const form = useForm<UpdateSchedulingFormData>({
    resolver: zodResolver(updateSchedulingSchema),
    defaultValues: {
      schedulingDate: addDays(new Date(data.schedulingDate), 1),
      schedulingTime: data.schedulingTime,
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-1 text-accent-foreground p-[10px] cursor-pointer hover:text-primary text-[12px] font-light">
          <CalendarCog className="w-[12px] h-[12px]" />
          <span>Atualizar agendamento</span>
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
          <form className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="schedulingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <Label className="text-[12px] font-medium text-accent-foreground">
                    Data de agendamento
                  </Label>
                  <DatePicker date={field.value} onChange={field.onChange} />
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schedulingTime"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-1">
                  <Label className="text-[12px] font-medium text-accent-foreground">
                    Horário
                  </Label>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-row gap-2"
                  >
                    {timeOptions.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem
                          className="peer sr-only"
                          value={option.value}
                          id={option.value}
                        />
                        <Label
                          htmlFor={option.value}
                          className={`cursor-pointer block px-[12px] py-[10px] text-[12px] w-full rounded border transition-colors ${
                            field.value === option.value
                              ? "bg-primary text-background border-primary"
                              : "bg-transparent text-accent-foreground border-border hover:bg-accent"
                          }`}
                        >
                          {option.value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col w-full mt-8 gap-[10px]">
              <div className="flex flex-col gap-1 w-full">
                <Button className="cursor-pointer w-full" type="submit">
                  Atualizar
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
