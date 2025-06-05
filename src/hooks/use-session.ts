"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";



type Session = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
};


export function useSession(): Session {
    const { data: session } = useQuery({
        queryFn: async () => {
            const res = await api.get("auth/session", { withCredentials: true });

            return res.data;
        },
        queryKey: ['session']
    });

    return session;
};