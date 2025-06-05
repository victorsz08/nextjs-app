"use client";

import { StatusOrderType } from "@/types";
import { stat } from "fs";
import { CheckCircle, ClockAlert, LucideIcon, XCircle } from "lucide-react";



const statusLabel = {
    PENDENTE: "Pendente" as StatusOrderType,
    CONECTADO: "Conectado" as StatusOrderType,
    CANCELADO: "Cancelado" as StatusOrderType,
    ALL: "Todos" as StatusOrderType,
} as const;

export function BadgeStatus({ status } : { status: StatusOrderType }) {
    let statusClasses;
    let StatusIcon: LucideIcon = CheckCircle; // Default icon
    let statusLabelText: string = statusLabel[status];

    if(status === "CONECTADO") {
        StatusIcon = CheckCircle;
        statusClasses = "bg-green-100 text-green-800";
    }
    else if(status === "PENDENTE") {
        StatusIcon = ClockAlert;
        statusClasses = "bg-orange-100 text-orange-800";
    }
    else if(status === "CANCELADO") {
        StatusIcon = XCircle
        statusClasses = "bg-red-100 text-red-800";
    } else if(status === "ALL") {
        statusClasses = "bg-gray-100 text-gray-800";
        StatusIcon = CheckCircle;
        statusLabelText = "Todos";
    };

    return (
        <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${statusClasses}`}>
            <StatusIcon className="h-4 w-4" />
            <span>{statusLabelText}</span>
        </div>
    )
}