import api from "@/lib/axios";
import { TypeOrder } from "@/types";




type ListOrderInput = {
    userId: string;
    page: number;
    limit: number;
    schedulingDateIn?: string;
    schedulingDateOut?: string;
    status?: string;
    createdDateIn?: string;
    createdDateOut?: string;
};

type ListOrderResponse = {
    orders: TypeOrder[];
    total: number;
    pages: number;
    limit: number;
};


export async function getOrders(input: ListOrderInput): Promise<ListOrderResponse> {
    const {
        userId,
        page,
        limit,
        schedulingDateIn,
        schedulingDateOut,
        status,
        createdDateIn,
        createdDateOut
    } = input;

    const searchParams = new URLSearchParams({
        userId: userId.toString(),
        page: page.toString(),
        limit: limit.toString()
    });

    if(schedulingDateIn && schedulingDateOut) {
        searchParams.append("schedulingDateIn", schedulingDateIn);
        searchParams.append("schedulingDateOut", schedulingDateOut);
    };

    if(status) {
        searchParams.append("status", status);
    };

    if(createdDateIn && createdDateOut) {
        searchParams.append("createdDateIn", createdDateIn);
        searchParams.append("createdDateOut", createdDateOut);
    };

    const response = await api.get(`/orders?${searchParams.toString()}`);

    const data: ListOrderResponse = response.data;
    return data;
};