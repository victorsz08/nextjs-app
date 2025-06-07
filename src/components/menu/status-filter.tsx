"use client";

import { TypeStatusOrder } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { BadgeStatus } from "../badge/badge-status";
import { Label } from "../ui/label";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface StatusFilterProps {
  status?: TypeStatusOrder;
  setFilter: (value: TypeStatusOrder) => void;
}

const options = [
  { value: TypeStatusOrder.PENDING, label: "Pendente" },
  { value: TypeStatusOrder.CONNECTED, label: "Conectado" },
  { value: TypeStatusOrder.CANCELED, label: "Cancelado" },
];

export function StatusFilter({ status, setFilter }: StatusFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="text-sm text-primary rounded-full"
        >
          <span className="text-xs font-medium">Status: </span>
          {status ? (
            <BadgeStatus status={status} />
          ) : (
            <p className="text-sm text-muted-foreground">Status</p>
          )}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full space-y-6">
        <div>
          <p className="text-foreground text-sm font-bold">Filtrar status:</p>
        </div>
        <RadioGroup
          defaultValue={status ?? TypeStatusOrder.ALL}
          onValueChange={setFilter}
          className="flex flex-row justify-center gap-1"
        >
          {options.map((option) => (
            <div key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only flex flex-col gap-3 items-center justify-center"
              />
              <Label
                htmlFor={option.value}
                className={`${
                  status === option.value
                    ? "border-2 border-primary rounded-xl outline-2"
                    : "border-2 border-transparent"
                } cursor-pointer p-1 transition-all`}
              >
                <BadgeStatus status={option.value} />
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setFilter(TypeStatusOrder.ALL);
              setOpen(false);
            }}
          >
            Limpar
          </Button>
          <Button type="button" onClick={() => setOpen(false)}>
            Filtrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
