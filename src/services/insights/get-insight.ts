import api from "@/lib/axios";
import { TypeInsight } from "@/types";





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