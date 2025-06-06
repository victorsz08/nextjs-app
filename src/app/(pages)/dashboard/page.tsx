import { ChartDataType, ChartPieDonut } from "@/components/charts/pie-chart";
import { DataDailyOrder } from "@/components/insights/data-daily-order";
import { InsightCurrentMonth } from "@/components/insights/insights-month";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function Dashboard() {

    return (
        <section className="p-[24px] space-y-5">
            <InsightCurrentMonth/>
            <DataDailyOrder/>
        </section>
    );
};