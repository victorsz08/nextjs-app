import api from "@/lib/axios";



type T = any;
type CreateOrderInput = {
    number: number;
    local: string;
    contact: string;
    price: string;
    schedulingDate: Date;
    schedulingTime: string;
    userId: string;
};


export async function createOrder(input: CreateOrderInput): Promise<T> {
    const { number, local, contact, price, schedulingDate, schedulingTime, userId } = input;
    const priceFormated = Number(price.replace("R$", "").trim().replace(",", ".")) / 100;

    const response = await api.post(`orders/${userId}`, {
        number,
        local,
        contact,
        price: priceFormated,
        schedulingDate,
        schedulingTime,
    });

    return response;
};