"use client";

import { TypeStatusOrder } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { BadgeStatus } from "../badge/badge-status";
import { Label } from "../ui/label";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface StatusFilterProps {
  schedulingDateFilter?: DateRange;
  setFilter: (value?: DateRange) => void;
}

export function SchedulingDateFilter({ schedulingDateFilter, setFilter }: StatusFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover defaultOpen={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="text-sm text-primary rounded-full"
        >
          <span className="text-xs font-medium">Data de Agendamento: </span>
          {schedulingDateFilter?.to && schedulingDateFilter?.from ? 
            <>
                {format(schedulingDateFilter.from!, "dd/MM/yyyy")} {" "}
                {format(schedulingDateFilter.to, "dd/MM/yyyy") }
            </>
            :
            <p className="text-sm text-muted-foreground">Selecione uma data</p>
          }
          <ChevronDown className="h-3 w-3"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full space-y-6">
        <div>
          <p className="text-foreground text-sm font-bold">Filtrar por data de agendamento:</p>
        </div>
        <Calendar
            mode="range"
            locale={ptBR}
            selected={schedulingDateFilter}
            onSelect={setFilter}
            initialFocus
        />
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
                setFilter({ 
                    to: undefined,
                    from: undefined,
                });
                setOpen(false);
            }}
          >
            Limpar
          </Button>
          <Button type="button" onClick={() => setOpen(false)}>Filtrar</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
