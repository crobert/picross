import express, { type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import { isGridShaped, isGridValid } from './clues';
import { query } from './db';
import { normalizePseudo, type User } from './users';

type PuzzleClues = {
  rows: number[][];
  cols: number[][];
};

class Server {
  app: any;
  port: number;
  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    // Pick up React index.html file
    this.app.use(express.static(path.join(__dirname, '../../front/dist')));
  }

  // Bind controllers to routes
  routes() {
    this.app.get('/api', (_req: Request, res: Response) => {
      res.status(200).json({ data: 'Api is running' });
    });

    this.app.get('/api/puzzles', async (_req: Request, res: Response) => {
      try {
        const result = await query(
          'SELECT id, name, cols, rows FROM puzzles ORDER BY id',
        );
        res.json(result.rows);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post(
      '/api/puzzles/:id/validate',
      async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
          res.status(400).json({ error: 'Invalid puzzle id' });
          return;
        }
        const userId = req.body?.userId;
        if (!Number.isInteger(userId)) {
          res.status(400).json({ error: 'Invalid user id' });
          return;
        }
        try {
          const result = await query<PuzzleClues>(
            'SELECT cols, rows FROM puzzles WHERE id = $1',
            [id],
          );
          const puzzle = result.rows[0];
          if (!puzzle) {
            res.status(404).json({ error: 'Puzzle not found' });
            return;
          }
          const users = await query('SELECT 1 FROM users WHERE id = $1', [
            userId,
          ]);
          if (users.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
          const grid = req.body?.grid;
          if (!isGridShaped(grid, puzzle.rows.length, puzzle.cols.length)) {
            res.status(400).json({ error: 'Invalid grid' });
            return;
          }
          const valid = isGridValid(grid, puzzle.rows, puzzle.cols);
          if (valid) {
            await query(
              'INSERT INTO completions (user_id, puzzle_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              [userId, id],
            );
          }
          res.json({ valid });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      },
    );

    this.app.post('/api/users/login', async (req: Request, res: Response) => {
      const pseudo = normalizePseudo(req.body?.pseudo);
      if (!pseudo) {
        res.status(400).json({ error: 'Invalid pseudo' });
        return;
      }
      try {
        const created = await query<User>(
          'INSERT INTO users (pseudo) VALUES ($1) ON CONFLICT ((lower(pseudo))) DO NOTHING RETURNING id, pseudo',
          [pseudo],
        );
        if (created.rows[0]) {
          res.status(201).json(created.rows[0]);
          return;
        }
        const existing = await query<User>(
          'SELECT id, pseudo FROM users WHERE lower(pseudo) = lower($1)',
          [pseudo],
        );
        if (!existing.rows[0]) {
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(existing.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    // Catch all requests that don't match any route
    this.app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../front/dist/index.html'));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port);
    });
  }
}

const server = new Server();
server.listen();
