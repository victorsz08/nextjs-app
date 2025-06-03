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
import { ChevronLeft, ChevronRight, EllipsisVerticalIcon, ExternalLink, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { BadgeStatus } from "../badge/badge-status";
import { CreateOrderForm } from "../forms/create-order-form";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { MenuOrder } from "../menu/menu-order";
import Link from "next/link";



export interface DataDailyTableProps {
  data: {
    orders: DataOrderType[];
    pages: number;
    total: number;
    page: number;
    limit: number;
  };
};

export function DataDailyTable({ data } : DataDailyTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const allSelected = selectedOrders.length === data.total && data.total > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(data.orders.map((order) => order.id));
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
      <CardHeader className="flex items-center justify-between">
       <div className="flex flex-col gap-0">
         <CardTitle className="text-[18px] text-foreground font-bold">
          Pedidos Recentes
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          Pedidos com agendamentos para hoje.
        </CardDescription>
       </div>
       <Link href="/contratos" className="text-muted-foreground underline gap-1 flex items-center text-xs font-light hover:text-foreground">
          <span>Ver todos os pedidos</span>
          <ExternalLink className="w-[16px] h-[16px]"/>
       </Link>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center ${selectedOrders.length > 0 ? "justify-between" : "justify-end"} mb-4 gap-2`}>
            {selectedOrders.length > 0 && 
                <span className="text-muted-foreground text-sm font-light">
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
        <Table className="overflow-clip border border-muted-foreground rounded-md">
          <TableHeader>
            <TableRow className="bg-primary-foreground text-muted-foreground">
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
          <TableBody className="text-accent-foreground">
            {data.orders.map((order) => (
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
                  <MenuOrder order={order}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
        <Separator/>
        <CardFooter className="flex items-center justify-between mt-4">
            <p className="text-muted-foreground text-sm font-light">
                Total de {data.total} pedidos
            </p>
            <p className="text-muted-foreground text-sm font-light">
                Total de {data.pages} {data.pages === 1 ? "página" : "páginas"}
            </p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" disabled={data.pages === 1 ? true : false} className="text-muted-foreground cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="flex items-center justify-center w-[32px] h-[32px] rounded-sm font-semibold text-muted-foreground border border-muted-foreground">
                    {data.pages}
                </span>
                <Button variant="secondary" disabled={data.pages >= data.page ? true : false} className="text-muted-foreground cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </CardFooter>
    </Card>
  );
}
