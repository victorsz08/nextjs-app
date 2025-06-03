"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

export interface DatePickerProps {
  date?: DateRange;
  onChange?: (date?: DateRange) => void;
}

export function DateRangePicker({ date, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button
            type="button"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.to && date?.from ? (
              <span>
                {format(date?.to, "PPP", { locale: ptBR })} {" - "}
                {format(date?.to, "PPP", { locale: ptBR })}
              </span>
            ) : (
              <span>Selecionar data</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          locale={ptBR}
          selected={date}
          onSelect={(date) => {
            setOpen(false);
            onChange?.(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
