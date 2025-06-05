"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";


export type SessionType = {
   user: {
        id: string;
        name: string;
        email: string;
        role: string;
   }
}

export const useSession = () => {
    const [session, setSession] = useState<SessionType>();

    const getSession = async () => {
        const { data } = await api.get("/auth/session");
        setSession({
            user: data
        });
    };

    useEffect(() => {
      getSession()  
    },[]);

    return {
        user: session?.user
    }
}