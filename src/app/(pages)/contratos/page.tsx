"use client";

import { BadgeStatus } from "@/components/badge/badge-status";
import { CreateOrderForm } from "@/components/forms/create-order-form";
import { MenuOrder } from "@/components/menu/menu-order";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataOrderType } from "@/types";
import { ChevronLeft, ChevronRight, ListFilter, Trash } from "lucide-react";

const orders: DataOrderType[] = [];

const data = {
  pages: 1,
  total: 0,
  page: 1,
  limit: 10,
};

export default function Orders() {
  return (
    <section>
      <section className="p-[24px]">
        <h1 className="text-foreground text-[24px] font-bold mb-4">Pedidos</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Gerencie os pedidos e agendamentos.
        </p>
        <Card className="w-full shadow-none">
          <CardHeader className="flex items-center justify-between">
            <Button
              variant="outline"
              className="cursor-pointer bg-transparent border border-primary text-primary"
            >
              <span>Filtrar</span>
              <ListFilter className="w-[16px] h-[16px]" />
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                <span>Excluir Selecionados</span>
                <Trash className="w-[16px] h-[16px]" />
              </Button>
              <CreateOrderForm />
            </div>
          </CardHeader>
          <CardContent>
            <Table className="overflow-clip border border-muted-foreground rounded-md">
              <TableHeader>
                <TableRow className="bg-primary-foreground text-muted-foreground">
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead>N° do contrato</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Data de agendamento</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Criado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px] text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-accent-foreground">
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{order.number}</TableCell>
                    <TableCell>{order.local}</TableCell>
                    <TableCell>{order.schedulingDate}</TableCell>
                    <TableCell>{order.schedulingTime}</TableCell>
                    <TableCell>{order.contact}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>
                      <BadgeStatus status={order.status} />
                    </TableCell>
                    <TableCell className="w-[70px] text-center">
                      <MenuOrder order={order} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between mt-4">
            <p className="text-muted-foreground text-sm font-light">
              Total de {data.total} pedidos
            </p>
            <p className="text-muted-foreground text-sm font-light">
              Total de {data.pages} {data.pages === 1 ? "página" : "páginas"}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                disabled={data.pages === 1 ? true : false}
                className="text-muted-foreground cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="flex items-center justify-center w-[32px] h-[32px] rounded-sm font-semibold text-muted-foreground border border-muted-foreground">
                {data.pages}
              </span>
              <Button
                variant="secondary"
                disabled={data.pages >= data.page ? true : false}
                className="text-muted-foreground cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </section>
  );
}
