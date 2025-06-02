

export type StatusOrderType = "PENDENTE" | "CONECTADO" | "CANCELADO";

export type DataOrderType = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schedulingTime: string;
    status: StatusOrderType;
    contact: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};