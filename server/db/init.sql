CREATE TABLE puzzles (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  cols json,
  rows json,
  solution json
);

