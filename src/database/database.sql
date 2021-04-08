CREATE DATABASE testdb

CREATE TABLE user({
    usid SERIAL PRIMARY KEY,
    fname name,
    mname name,
    lname name,
    email varchar,
    phone bigint,
    "role" varchar,
    "address" varchar,
    editable boolean,
})