"use client";

import { DataOrderType } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { BadgeStatus } from "../badge/badge-status";
import { CreateOrderForm } from "../forms/create-order-form";


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
        updatedAt: "2023-09-30T12:00:00Z"
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
        updatedAt: "2023-09-30T12:00:00Z"
    }
]



export function DataDailyTable() {


    return (
        <Card className="w-full shadow-none">
            <CardHeader>
                <CardTitle className="text-[18px] text-foreground font-bold">Pedidos Recentes</CardTitle>
                <CardDescription
                    className="text-muted-foreground text-xs"    
                >Pedidos com agendamentos para hoje.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-end mb-4">
                    <CreateOrderForm/>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox/>
                            </TableHead>
                            <TableHead>N° do contrato</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Data de agendamento</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{order.number}</TableCell>
                                <TableCell>{order.local}</TableCell>
                                <TableCell>{order.schedulingDate}</TableCell>
                                <TableCell>{order.schedulingTime}</TableCell>
                                <TableCell>
                                    <BadgeStatus status={order.status}/>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="cursor-pointer">
                                        <EllipsisVerticalIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}