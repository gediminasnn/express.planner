import express from 'express';

interface Bootstrap {
  app: express.Application;

  listen: () => void;
}

export default Bootstrap;
