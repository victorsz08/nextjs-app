import api from "@/lib/axios";





export type LoginCredentialsType = {
    username: string;
    password: string;
};




export async function login(credentials: LoginCredentialsType) {
    const { username, password } = credentials;
    try {
        const response = await api.post("/auth/login", {
            username,
            password,
        });


        return response;
    } catch (error: any) {
        if(error.status === 400) {
            return error;
        };
    };
};