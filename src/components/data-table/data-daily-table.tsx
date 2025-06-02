"use client";

import { DataOrderType } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronLeft, ChevronRight, EllipsisVerticalIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { BadgeStatus } from "../badge/badge-status";
import { CreateOrderForm } from "../forms/create-order-form";
import { useState } from "react";
import { Separator } from "../ui/separator";

const data: DataOrderType[] = [
  {
    id: "1",
    number: 12345,
    local: "São Paulo",
    schedulingDate: "2023-10-01",
    schedulingTime: "10:00",
    status: "PENDENTE",
    contact: "John Doe",
    userId: "user123",
    createdAt: "2023-09-30T12:00:00Z",
    updatedAt: "2023-09-30T12:00:00Z",
  },
  {
    id: "2",
    number: 12346,
    local: "Rio de Janeiro",
    schedulingDate: "2023-10-01",
    schedulingTime: "11:00",
    status: "CONECTADO",
    contact: "Jane Smith",
    userId: "user456",
    createdAt: "2023-09-30T12:00:00Z",
    updatedAt: "2023-09-30T12:00:00Z",
  },
];

export function DataDailyTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const allSelected = selectedOrders.length === data.length && data.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(data.map((order) => order.id));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    alert(`Excluir pedidos: ${selectedOrders.join(", ")}`);

    setSelectedOrders([]);
  };

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-[18px] text-foreground font-bold">
          Pedidos Recentes
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          Pedidos com agendamentos para hoje.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center ${selectedOrders.length > 0 ? "justify-between" : "justify-end"} mb-4 gap-2`}>
            {selectedOrders.length > 0 && 
                <span className="text-muted-foreground text-xs">
                {selectedOrders.length} {selectedOrders.length > 1 ? "itens selecionados" : "item selecionado"}
                </span>
            }
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={selectedOrders.length === 0}
              onClick={handleDeleteSelected}
              className="border-red-500 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white pl-[10px] pr-[8px]"
            >
              <p>Excluir Selecionados</p>
              <Trash />
            </Button>
            <CreateOrderForm />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted text-muted-foreground">
              <TableHead>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>N° do contrato</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Data de agendamento</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px] text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => handleSelectOne(order.id)}
                  />
                </TableCell>
                <TableCell>{order.number}</TableCell>
                <TableCell>{order.local}</TableCell>
                <TableCell>{order.schedulingDate}</TableCell>
                <TableCell>{order.schedulingTime}</TableCell>
                <TableCell>
                  <BadgeStatus status={order.status} />
                </TableCell>
                <TableCell className="w-[70px] text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <EllipsisVerticalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator/>
        <CardFooter className="flex items-center justify-between mt-4">
            <p className="text-muted-foreground text-sm font-light">
                Total de {data.length} pedidos
            </p>
            <div className="flex items-center gap-2">
                <Button variant="ghost" className="text-muted-foreground cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="text-muted-foreground font-semibold" disabled>
                    1
                </Button>
                <Button variant="ghost" className="text-muted-foreground cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
