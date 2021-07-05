export interface Configs {
    JWT_SECRET: string;
    APP_PORT: number;
    MYSQL_DATABASE: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_USERNAME: string;
    API_KEY: string;
    MYSQL_HOST: string;
}

export function loadConfigs (): Configs {
    function ifExist (name: string) {
        const res = process.env[name];

        if (!res) {
            throw new Error(`Environment variable ${name} is not set`);
        }

        return res;
    }

    return {
        JWT_SECRET: ifExist("JWT_SECRET"),
        APP_PORT: Number(process.env.APP_PORT) || 3000,
        MYSQL_DATABASE: ifExist("MYSQL_DATABASE"),
        MYSQL_ROOT_PASSWORD: ifExist("MYSQL_ROOT_PASSWORD"),
        MYSQL_USERNAME: ifExist("MYSQL_USERNAME"),
        API_KEY: ifExist("API_KEY"),
        MYSQL_HOST: process.env.MYSQL_HOST || "localhost"
    };
}
