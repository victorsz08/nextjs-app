import api from "@/lib/axios";
import { UserRoleType } from "@/types";





export type SessionResponseType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: UserRoleType;
    ixp: number;
    exp: number;
};

