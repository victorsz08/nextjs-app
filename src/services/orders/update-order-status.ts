import api from "@/lib/axios";



type UpdateOrderStatus = {
    id: string;
    status: string;
};



export async function updateOrderStatus(input: UpdateOrderStatus) {
    const { id, status } = input;

    try {
        await api.put(`/orders/status/${id}`, { status });
        return;
    } catch (error: any) {
        if(error.status === 400) {
            throw error;
        };
    }
};