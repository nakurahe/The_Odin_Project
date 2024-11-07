#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  username VARCHAR ( 255 ) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (message, username) VALUES ('Hi there!', 'Amando');
INSERT INTO messages (message, username) VALUES ('Hello World!', 'Charles');
INSERT INTO messages (message, username) VALUES ('*beep*', 'Joann');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main().catch(err => console.error(err));
