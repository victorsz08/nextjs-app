"use client";

import { ChartColumnIncreasing, HandCoins, Handshake } from "lucide-react";
import { ChartBarDaily, ChartBarDataType } from "../charts/bar-chart";
import { ChartDataType, ChartPieDonut } from "../charts/pie-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getInsight, getSalesPerDay } from "@/services/insights/get-insight";
import { format, startOfMonth } from "date-fns";
import { useSession } from "@/hooks/use-session";




const currentDate = new Date();
const dateIn = startOfMonth(currentDate).toISOString();
const dateOut = currentDate.toISOString();


export function InsightCurrentMonth() {
    const session = useSession();
    const { data: salesPerDay, isLoading: salesLoading } = useQuery({
        queryFn: () => getSalesPerDay({ userId: session.id, dateIn, dateOut }),
        queryKey: ['orders', dateIn, dateOut],
        enabled: !!session
    });

    const { data, isLoading } = useQuery({
        queryFn: () => getInsight({ userId: session.id, dateIn, dateOut }),
        queryKey: ['orders-month', dateIn, dateOut],
        enabled: !!session
    });

    if(!data && isLoading && !salesPerDay && salesLoading) {
        return <p>Carregando...</p>
    };

    const chartBarData: ChartDataType = {
        data: [
            {
                status: "connected",
                quantity: data?.connected ?? 0,
                fill: "var(--chart-1)"
            },
            {
                status: "pending",
                quantity: data?.pending ?? 0,
                fill: "var(--chart-2)"
            },
            {
                status: "cancelled",
                quantity: data?.cancelled ?? 0,
                fill: "var(--chart-3)"
            },
        ]
    };

    const chartBarDailyData: ChartBarDataType = {
        sales: salesPerDay?.sales.map((sale) => {
            return {
                day: sale.day,
                sales: sale.quantity
            }
        }) ?? []
    };


    return (
         <section className="flex flex-col space-x-[18px] space-y-[18px]">
                <p className="text-[20px] font-semibold text-accent-foreground">Dashboard</p>
                <section className="flex flex-row gap-[18px] w-full">
                    <Card className="w-full gap-5 shadow-none">
                    <CardHeader className="flex items-center justify-between">
                        <CardDescription className="text-accent-foreground font-light">Faturamento</CardDescription>
                        <span className="p-2 rounded-sm bg-orange-100 text-orange-600">
                            <HandCoins className="w-[14px] h-[14px]"/>
                        </span>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-[24px] font-bold text-foreground">
                            {data && formatCurrency(data.revenue)}
                        </CardTitle>
                    </CardContent>
                </Card>
                <Card className="w-full gap-5 shadow-none">
                    <CardHeader className="flex items-center justify-between">
                        <CardDescription className="text-accent-foreground font-light">Vendas</CardDescription>
                        <span className="p-2 rounded-sm bg-blue-100 text-blue-600">
                            <Handshake className="w-[14px] h-[14px]"/>
                        </span>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-[24px] font-bold text-foreground">
                            {data && data.sales}
                        </CardTitle>
                    </CardContent>
                </Card>
                <Card className="w-full gap-5 shadow-none">
                    <CardHeader className="flex items-center justify-between">
                        <CardDescription className="text-accent-foreground font-light">Percentual de instalação</CardDescription>
                        <span className="p-2 rounded-sm bg-green-100 text-green-600">
                            <ChartColumnIncreasing className="w-[14px] h-[14px]"/>
                        </span>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-[24px] font-bold text-foreground">
                            {data && formatPercentage(data.completionRate)}
                        </CardTitle>
                    </CardContent>
                </Card>
                </section>
                <section className="flex flex-row gap-[14px]">
                    <ChartPieDonut data={chartBarData.data} />
                    <ChartBarDaily sales={chartBarDailyData.sales} />
                </section>
            </section>
    )
}