
export const initialQuery = `

	DO $$
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
		CREATE TYPE role_type AS ENUM ('HR', 'IT', 'Apps', 'Finance', 'QA');
		END IF;
	END
	$$;
 
	CREATE TABLE IF NOT EXISTS userr (
		u_id serial PRIMARY KEY,
		fname VARCHAR ( 50 ) NOT NULL,
		mname VARCHAR ( 50 ) NOT NULL,
		lname VARCHAR ( 50 ) NOT NULL,
		role role_type,
		address VARCHAR ( 255 ) NOT NULL,
		email VARCHAR UNIQUE NOT NULL,
		phone VARCHAR UNIQUE NOT NULL
	);

	CREATE TABLE IF NOT EXISTS customer (
		c_id serial PRIMARY KEY,
		name VARCHAR ( 50 ) UNIQUE NOT NULL,
		website VARCHAR ( 50 ) NOT NULL,
		address VARCHAR ( 255 ) UNIQUE NOT NULL,
		created_on TIMESTAMP NOT NULL,
		updated_on TIMESTAMP NOT NULL
	);

	CREATE TABLE IF NOT EXISTS roles (
		r_id serial PRIMARY KEY,
		c_id INT NOT NULL,
		name VARCHAR ( 50 ) UNIQUE NOT NULL,
		description VARCHAR ( 255 ) UNIQUE NOT NULL,
		created_on TIMESTAMP NOT NULL,
		updated_on TIMESTAMP NOT NULL,
		CONSTRAINT "role_key" FOREIGN KEY(c_id) REFERENCES customer(c_id)
	);

`

// CREATE DATABASE IF NOT EXISTS test_database
