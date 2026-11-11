CREATE TABLE puzzles (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  cols json,
  rows json,
  solution json
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  pseudo varchar(20) NOT NULL,
  role varchar(20) NOT NULL DEFAULT 'ROLE_PLAYER' CHECK (role IN ('ROLE_ADMIN', 'ROLE_PLAYER')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_pseudo_lower_idx ON users (lower(pseudo));

CREATE TABLE completions (
  user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  puzzle_id integer NOT NULL REFERENCES puzzles (id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, puzzle_id)
);
