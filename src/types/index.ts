


export type TypeStatusOrder = "PENDENTE" | "CONECTADO" | "CANCELADO" | "ALL";

export const TypeStatusOrder = {
    PENDING: "PENDENTE" as TypeStatusOrder,
    CONNECTED: "CONECTADO" as TypeStatusOrder,
    CANCELED: "CANCELADO" as TypeStatusOrder,
    ALL: "ALL" as TypeStatusOrder,
} as const; 

export type TypeOrder = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schedulingTime: string;
    status: TypeStatusOrder;
    price: number;
    contact: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

export type TypeInsight = {
    revenue: number;
    sales: number;
    completionRate: number;
    cancelledRate: number;
    connected: number;
    pending: number;
    cancelled: number;
}

export type UserRoleType = "ADMIN" | "USER";

export const UserRoleType = {
    ADMIN: "ADMIN" as UserRoleType,
    USER: "USER" as UserRoleType,
} as const;