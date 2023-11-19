import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mock/api/server';
import { filmApi } from './controller/FilmAPI';
import { setupStore } from './store/store';
import '@testing-library/jest-dom';

const store = setupStore();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(filmApi.util.resetApiState());
});

afterAll(() => server.close());
