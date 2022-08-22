export interface Customer{
    id: number,
    first_name: string,
    last_name: string,
    phone:string,
    email:string
}

export interface CustomerToAdd{
    first_name: string,
    last_name: string,
    phone:string,
    email:string
}

export interface Login {
    email?: string | null;
    password?: string | null;
}

export interface User {
    token?: string;
    id: number;
    name: string;
    email: string;
}

export interface RegisterUser {
    name?: string | null;
    email?: string | null;
    password?: string | null;
}