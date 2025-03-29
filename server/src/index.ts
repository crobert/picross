import express, { type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import { query } from './db';

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
        const result = await query('SELECT id, name, cols, rows FROM puzzles');
        res.json(result.rows);
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    });

    // Catch all requests that don't match any route
    this.app.get('*', (_req: Request, res: Response) => {
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
