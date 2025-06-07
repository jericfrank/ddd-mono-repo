import 'reflect-metadata';
import * as core from '@app/core';
import express from 'express';
import { type Server } from 'http';

import routes from './routes';

async function start(): Promise<Server> {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use('/api', routes);

  app.get('/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server listening at http://localhost:${PORT}`);
  });

  await core.init();

  return server;
}

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
