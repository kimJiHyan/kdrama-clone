#!/usr/bin/env node
import('./server/_core/index.ts').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
