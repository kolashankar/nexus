/**
 * Test setup configuration
 */
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

process.env.REACT_APP_BACKEND_URL = 'http://localhost:8001';

global.WebSocket = class WebSocket {
  constructor(url: string) {}
  close() {}
  send(data: any) {}
};