import express from 'express';

interface Bootstrap {
  app: express.Application;
  initializeConnection: () => void;
  listen: () => void;
}

export default Bootstrap;
