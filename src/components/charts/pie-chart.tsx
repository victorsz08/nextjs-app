"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  sales: {
    label: "Vendas",
  },
  connected: {
    label: "Conectados",
    color: "var(--chart-1)",
  },
  pending: {
    label: "Pendentes",
    color: "var(--chart-2)",
  },
  cancelled: {
    label: "Cancelados",
    color: "var(--chart-3)",
  }
} satisfies ChartConfig;

export type StatusChart = "connected" | "pending" | "cancelled" | "sales"

export interface ChartDataType {
    data: {
        status: StatusChart;
        quantity: number;
        fill: string;
    }[];
}

export function ChartPieDonut({ data } : ChartDataType) {
  const totalSales = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.quantity, 0)
  }, [data]);

  return (
    <Card className="flex flex-col w-[450px] shadow-none">
      <CardHeader className="items-center text-center pb-0">
        <CardTitle className="text-[20px] font-bold text-foreground">Vendas</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="quantity"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalSales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Vendas
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row justify-center items-center gap-2">
            {data.map((item, index) => (
                <div className="flex flex-col gap-0 items-center" key={index}>
                    <div className="flex items-center justify-center gap-1">
                        <span className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: item.fill }}></span>
                        <span className="text-[12px] font-medium text-foreground">{item.quantity}</span>
                    </div>
                    <span className="text-[12px] font-light text-accent-foreground">{chartConfig[item.status].label}</span>
                </div>
            ))}
      </CardFooter>
    </Card>
  )
}
