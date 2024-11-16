#! /usr/bin/env node

const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS nyanya_activities (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  energy_level INTEGER NOT NULL,
  provider VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL DEFAULT 'General'
);

INSERT INTO nyanya_activities (name, description, energy_level, provider, genre) 
VALUES
  ('Huggy', 'A sweet sweet hug', 0, 'Gary Nya | Joann Nya', 'Physical'),
  ('Kissy', 'A sweet sweet kiss', 0, 'Gary Nya | Joann Nya', 'Physical'),
  ('Joann Nya Assignments Checky', '', 2, 'Gary Nya', 'Mental'),
  ('Gary Nya''s sole trip', 'GO WITHOUT JOANN NYA', 2, 'Gary Nya', 'Physical | Mental'),
  ('Yummy cooking', 'Gary and Joann Nya''s Cookingy', 1, 'Gary Nya | Joann Nya', 'General');
`;

async function main() {
  console.log("seeding...");
  try {
    await pool.query(SQL);
    console.log("done");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main().catch(err => console.error(err));
