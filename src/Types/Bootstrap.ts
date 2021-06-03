import express from 'express';

interface Bootstrap {
  app: express.Application;

  listen: () => void;
  initializeConnection: () => Promise<void>;
  mountRepositories: () => void;
}

export default Bootstrap;
