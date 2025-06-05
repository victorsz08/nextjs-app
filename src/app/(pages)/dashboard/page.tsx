import { ChartBarDaily } from "@/components/charts/bar-chart";
import { ChartDataType, ChartPieDonut } from "@/components/charts/pie-chart";
import { NotFoundOrders } from "@/components/data-table/not-found-orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { StatusOrderType } from "@/types";
import { ChartColumnIncreasing, HandCoins, Handshake } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
};

const dataSales: ChartDataType = {
    data: [
    {
        status: "connected",
        quantity: 30,
        fill: "var(--chart-1)"
    },
    {
        status: "pending",
        quantity: 15,
        fill: "var(--chart-2)"
    },
    {
        status: "cancelled",
        quantity: 5,
        fill: "var(--chart-3)"
    }
]
};

const dataDailySales = [
    {
        day: "01/06",
        sales: 2
    },
    {
        day: "02/06",
        sales: 1
    },
    {
        day: "03/06",
        sales: 5
    },
    {
        day: "04/06",
        sales: 4
    },
    {
        day: "05/06",
        sales: 0
    },
];

const dataDailyOrders = {
    orders: [
        {
            id: "1",
            number: 12345,
            local: "São Paulo",
            schedulingDate: "2023-06-01",
            schedulingTime: "08h as 12h",
            contact: "John Doe",
            price: 119.90,
            userId: "user123",
            status: StatusOrderType.CONNECTED,
            createdAt: "2023-06-01T09:00:00Z",
            updatedAt: "2023-06-01T11:00:00Z"
        },
        {
            id: "2",
            number: 12346,
            local: "Rio de Janeiro",
            schedulingDate: "2023-06-02",
            schedulingTime: "12h as 15h",
            contact: "Jane Smith",
            price: 99.90,
            userId: "user123",
            status: StatusOrderType.PENDING,
            createdAt: "2023-06-01T10:00:00Z",
            updatedAt: "2023-06-01T12:00:00Z"
        }
    ],
    pages: 1,
    total: 2,
    limit: 10,
    page: 1
};

export default function Dashboard() {

    return (
        <section className="p-[24px]">
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
                            {formatCurrency(4184.80)}
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
                            42
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
                            {formatPercentage(0.80)}
                        </CardTitle>
                    </CardContent>
                </Card>
                </section>
                <section className="flex gap-[12px] w-full">
                    <ChartPieDonut data={dataSales.data}/>
                    <ChartBarDaily sales={dataDailySales}/>
                </section>
                <section>
                   
                </section>
            </section>
        </section>
    );
};