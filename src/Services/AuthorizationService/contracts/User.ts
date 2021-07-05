export enum UserRole {
    PREMIUM = "premium",
    BASICS = "basics"
}

export interface User {
    id: number;
    role: UserRole;
    name: string;
    username: string;
    password: string;
}
