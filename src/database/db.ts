import { Pool } from 'pg';


export const pool = new Pool ({
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: +process.env.PORT!,
    database: process.env.DATABASE
});

export const queryFun = function (query: string, value: any = '' ) {
    return value ? pool.query(query, value) : pool.query(query);
}
