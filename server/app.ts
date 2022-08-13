import next from 'next';
import MainServer from './MainServer';

import 'dotenv/config';

export const isDevelopment = process.env.NODE_ENV !== 'production';
export const serverHostname = isDevelopment ? 'http://localhost:3000' : 'https://libibkk.ooo';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev: isDevelopment, hostname, port });

app
  .prepare()
  .then(() => {
    const mainServer = new MainServer(app);

    mainServer.listenServer(hostname, port);
  })
  .catch((err) => {
    console.error(err);
  });
