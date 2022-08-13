import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/ping', (req, res) => {
  res.send('pong');
});

export default apiRouter;
