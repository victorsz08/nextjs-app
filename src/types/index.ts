


export type StatusOrderType = "PENDENTE" | "CONECTADO" | "CANCELADO" | "ALL";

export const StatusOrderType = {
    PENDING: "PENDENTE" as const,
    CONNECTED: "CONECTADO" as const,
    CANCELED: "CANCELADO" as const,
    ALL: "ALL" as const,
} as const; 

export type DataOrderType = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schedulingTime: string;
    status: StatusOrderType;
    price: number;
    contact: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};



export type UserRoleType = "ADMIN" | "USER";

export const UserRoleType = {
    ADMIN: "ADMIN" as UserRoleType,
    USER: "USER" as UserRoleType,
} as const;