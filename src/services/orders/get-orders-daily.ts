import api from "@/lib/axios";
import { TypeOrder } from "@/types";


type GetDailyOrderInput = {
    page: number;
    limit: number;
    userId: string;
    schedulingDateIn: string;
    schedulingDateOut: string;
};

type DailyOrder = {
    orders: TypeOrder[];
    total: number;
    pages: number;
    limit: number;
};

export async function getDailyOrderService(input: GetDailyOrderInput): Promise<DailyOrder> {
    const { page, limit, userId, schedulingDateIn, schedulingDateOut } = input;

    const response = await api.get(
        `orders?userId=${userId}&schedulingDateIn=${schedulingDateIn}&schedulingDateOut=${schedulingDateOut}&page=${page}&limit=${limit}`
    );

    const data: DailyOrder = response.data;
    return data;
};