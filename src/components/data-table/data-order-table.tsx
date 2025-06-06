"use client";

import { TypeOrder } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { BadgeStatus } from "../badge/badge-status";
import { MenuOrder } from "../menu/menu-order";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { FilterOrderForm } from "../forms/filter-order-form";
import { CreateOrderForm } from "../forms/create-order-form";

export interface DataOrderTableType {
  orders: TypeOrder[];
  total: number;
  pages: number;
  page: number;
  limit: number;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
}

export function DataOrderTable({
  orders,
  total,
  pages,
  page,
  limit,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
}: DataOrderTableType) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const allSelected =
    selectedOrders.length === orders.length && orders.length > 0;

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

  return (
    <div className="w-full shadow-none">
      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="outline"
            disabled={selectedOrders.length === 0}
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
          >
            <span>Excluir Selecionados</span>
            <Trash className="w-[16px] h-[16px]" />
          </Button>
          <CreateOrderForm />
        </div>
      </div>
      <section className="overflow-clip rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground bg-background">
              <TableHead>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>N° do contrato</TableHead>
              <TableHead>Localidade</TableHead>
              <TableHead>Data de agendamento</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="text-slate-600 bg-white border-b border-border">
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                <TableCell>{order.number}</TableCell>
                <TableCell>{order.local}</TableCell>
                <TableCell>{order.schedulingDate}</TableCell>
                <TableCell>{order.schedulingTime}</TableCell>
                <TableCell>
                  <BadgeStatus status={order.status} />
                </TableCell>
                <TableCell>{order.contact}</TableCell>
                <TableCell>R$ {order.price.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <MenuOrder data={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-full bg-background">
          <div className="flex w-full items-center justify-between p-4 font-semibold">
            <span className="text-[14px] text-accent-foreground">
              Total de {total} pedidos
            </span>
            <span className="text-[14px] text-accent-foreground">
              Exibindo {limit} pedidos por página
            </span>
            <div className="flex items-center justify-end">
              <span className="text-[14px] text-accent-foreground">
                Página {page} de {pages}
              </span>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant={"secondary"}
                  disabled={page === 1}
                  onClick={firstPage}
                  className="cursor-pointer"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={"secondary"}
                  disabled={page === 1}
                  onClick={prevPage}
                  className="cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={"secondary"}
                  disabled={page >= pages}
                  onClick={nextPage}
                  className="cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant={"secondary"}
                  disabled={page >= pages}
                  onClick={lastPage}
                  className="cursor-pointer"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
