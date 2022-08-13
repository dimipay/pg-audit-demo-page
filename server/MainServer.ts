import express from 'express';
import { NextServer, RequestHandler as NextRequestHandler } from 'next/dist/server/next';
import apiRouter from './routes/ApiRouter';

class MainServer {
  private _app: express.Express;
  private _nextHandle: NextRequestHandler;

  constructor(nextApp: NextServer) {
    this._app = express();
    this._nextHandle = nextApp.getRequestHandler();

    this._app.use('/api', apiRouter);

    this._app.get('*', async (req, res) => {
      return await this._nextHandle(req, res);
    });
  }

  public listenServer(hostname: string, port: number) {
    this._app
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      })
      .on('error', (err) => {
        console.log(err);
      });
  }
}

export default MainServer;
