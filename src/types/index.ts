


export type StatusOrderType = "PENDENTE" | "CONECTADO" | "CANCELADO";

export const StatusOrderType = {
    PENDING: "PENDENTE" as const,
    CONNECTED: "CONECTADO" as const,
    CANCELED: "CANCELADO" as const,
} as const; 

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