"use client";

import { useSession } from "@/hooks/use-session";
import { getDailyOrderService } from "@/services/orders/get-orders-daily";
import { useQuery } from "@tanstack/react-query";
import { startOfMonth, subDays } from "date-fns";
import { DataOrderTable } from "../data-table/data-order-table";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { NotFoundOrders } from "../data-table/not-found-orders";
import { ExternalLink } from "lucide-react";




const currentDate = subDays(new Date(), 1);
const dateIn = currentDate.toISOString();
const dateOut = currentDate.toISOString();

export function DataDailyOrder() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const session = useSession();
    const { data, isLoading } = useQuery({
        queryFn: () => getDailyOrderService({ 
            userId: session.id, 
            schedulingDateIn: dateIn, 
            schedulingDateOut: dateOut,
            page,
            limit 
        }),
        queryKey: ['orders'],
        enabled: !!session,
        
    });

    if(!data && isLoading) {
        return <p>Carregando...</p>
    };

    if(!data || data.total === 0) {
        return (
            <NotFoundOrders/>
        )
    }

    return (
        <Card className="w-full shadow-none gap-8">
            <CardHeader className="flex justify-between items-center">
                <div className="flex flex-col gap-0">
                    <CardTitle className="text-[18px] text-accent-foreground">Pedidos recentes</CardTitle>
                    <CardDescription className="text-muted-foreground text-[12px]">
                        Verifique seus pedidos agendados para hoje
                    </CardDescription>
                </div>
                <Link href="/contratos" className="flex flex-row items-center gap-1 text-[12px] text-primary hover:underline">
                    <span>Ver todos os pedidos</span>
                    <ExternalLink className="w-[12px] h-[12px]" />
                </Link>
            </CardHeader>
            <CardContent>
                    <DataOrderTable
                        orders={data.orders}
                        total={data.total}
                        pages={data.pages}
                        page={page}
                        limit={limit}
                        nextPage={() => setPage((prev) => prev + 1)}
                        prevPage={() => setPage((prev) => prev - 1)}
                        firstPage={() => setPage(1)}
                        lastPage={() => setPage(data.pages)}
                    />
            </CardContent>
        </Card>
    )
}