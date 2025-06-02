"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export interface ChartBarDataType {
    sales: {
        day: string;
        sales: number;
    }[]
}

const chartConfig = {
  sales: {
    label: "Vendas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarDaily({ sales } : ChartBarDataType) {
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-[20px] font-bold text-foreground">Últimas vendas</CardTitle>
        <CardDescription>Vendas feitas nos últimos dias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={sales}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
