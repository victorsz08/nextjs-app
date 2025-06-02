import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { ChartColumnIncreasing, HandCoins, Handshake } from "lucide-react";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Dashboard"
}


export default function Dashboard() {

    return (
        <section className="p-[24px]">
            <section className="flex flex-col space-x-[18px] space-y-[18px]">
                <p className="text-[20px] font-semibold text-accent-foreground">Dashboard</p>
                <section className="flex flex-row gap-[18px]">
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
            </section>
        </section>
    );
};