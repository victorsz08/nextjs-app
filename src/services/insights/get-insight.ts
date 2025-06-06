import api from "@/lib/axios";
import { TypeInsight, TypeOrder } from "@/types";





export interface GetInsightInput {
    userId: string;
    dateIn: string;
    dateOut: string;
};

type Insights = {
    revenue: number;
    sales: number;
    completionRate: number;
    cancelledRate: number;
    connected: number;
    pending: number;
    cancelled: number;
};


type SalesPerDay = {
    sales: {
        day: string;
        quantity: number;
    }[]
}

export async function getInsight(input: GetInsightInput) {
    const { 
        userId, 
        dateIn,
        dateOut
    } = input;
        const response = await api.get(`insights?userId=${userId}&dateIn=${dateIn}&dateOut=${dateOut}`);

        const data: Insights = response.data;
        return data;
};


export async function getSalesPerDay(input: GetInsightInput) {
    const { 
        userId, 
        dateIn,
        dateOut
    } = input;

    const response =  await api.get(`insights/sales-per-day?userId=${userId}&dateIn=${dateIn}&dateOut=${dateOut}`);

    const data: SalesPerDay = response.data;
    return data;
}