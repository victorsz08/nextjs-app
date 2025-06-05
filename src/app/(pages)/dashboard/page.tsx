import { ChartDataType, ChartPieDonut } from "@/components/charts/pie-chart";
import { InsightCurrentMonth } from "@/components/insights/insights-month";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function Dashboard() {

    return (
        <section className="p-[24px]">
            <InsightCurrentMonth/>
        </section>
    );
};