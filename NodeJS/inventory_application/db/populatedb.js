#! /usr/bin/env node

const pool = require("./pool");

const SQL = `
SELECT * FROM nyanya_activities;
`;

(async function main() {
  console.log("seeding...");
  try {
    const output = await pool.query(SQL);
    console.log("done", output.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
})();
