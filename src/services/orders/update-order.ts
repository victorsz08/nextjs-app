import api from "@/lib/axios";





type UpdateOrder = {
    id: string;
    number: number;
    local: string;
    contact: string;
    price: string;
};



export async function updateOrder(input: UpdateOrder) {
    const { id, number, local, contact, price } = input;
    const priceFormated = Number(price.replace("R$", "").trim().replace(",", ".")) / 100;

    try {
        const res = await api.put(`orders/${id}`, {
            number,
            local,
            contact,
            price: priceFormated,
        });

        if(res.status !== 204) {
            return res.data;
        };

        return;
    } catch (error) {
        return error;
    }
};