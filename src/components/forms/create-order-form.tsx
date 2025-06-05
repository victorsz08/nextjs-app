"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Combobox } from "../combobox/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DatePicker } from "../date-picker/date-picker";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const citiesOptions = [
  { value: "sao-paulo", label: "São Paulo" },
  { value: "rio de janeiro", label: "Rio de Janeiro" },
  { value: "belo-horizonte", label: "Belo Horizonte" },
  { value: "curitiba", label: "Curitiba" },
];

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

const createOrderSchema = z.object({
  number: z.coerce.number().min(1, "Número do contrato é obrigatório"),
  local: z.string().min(1, "Cidade é obrigatória").trim(),
  schedulingDate: z.coerce.date().refine((date) => date >= new Date(), {
    message: "Data de agendamento deve ser hoje ou futura",
  }),
  schedulingTime: z.string().min(1, "Horário é obrigatório"),
  contact: z.string().min(1, "Contato é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
});

type CreateOrderFormData = z.infer<typeof createOrderSchema>;

export function CreateOrderForm() {
  const form = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      number: 0,
      local: "",
      schedulingDate: new Date(),
      schedulingTime: "",
      contact: "",
      price: "",
    },
  });

  async function onSubmit(data: CreateOrderFormData) {
    console.log("Form submitted with data:", data);
  }

  const formatPrice = (value: string) => {
    const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsedValue / 100);
  };

  const price = form.watch("price") ? formatPrice(form.watch("price")) : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="cursor-pointer">
            <span>Novo pedido</span>
            <Plus />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col justify-center items-center gap-0 mb-4">
          <DialogTitle className="text-[18px] font-bold">
            Novo Pedido
          </DialogTitle>
          <DialogDescription className="text-[12px] text-primary font-light">
            Preencha todas as informações do pedido
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <section className="grid grid-cols-2 space-x-4 gap-[10px] items-center">
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
            </section>
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
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <div>
                  <Button variant="outline" className="cursor-pointer">
                    Cancelar
                  </Button>
                </div>
              </DialogClose>
              <Button className="cursor-pointer" type="submit">
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
