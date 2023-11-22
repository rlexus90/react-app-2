import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderApp } from '../../mock/utils/testUtils';
import { server } from '../../mock/api/server';
import { HttpResponse, http } from 'msw';
import { emptyResp } from '../../mock/respMock';
import { setupServer } from 'msw/node';

describe('test main component', () => {
  beforeEach(() => {
    renderApp();
  });

  it('test main component has render', () => {
    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
  });

  it('Have Loader', async () => {
    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('test count card', async () => {
    const catrs = await screen.findAllByTestId('card');
    expect(catrs.length).toBe(10);
  });

  it('corect data render', async () => {
    const cards = await screen.findAllByTestId('card');
    const card = screen.queryByText('Avengers: Secret Wars');
    expect(card).toBeInTheDocument();
    expect(card).to.equal(cards[0].childNodes[0].childNodes[1]);
    expect(card).not.to.equal(cards[1].childNodes[0].childNodes[1]);
  });
});

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

describe('message when no response data', () => {
  it('Is message show>', async () => {
    server.close();
    const serv = setupServer();
    serv.listen();
    serv.use(
      http.get('https://moviesdatabase.p.rapidapi.com/titles', () =>
        HttpResponse.json(emptyResp)
      )
    );

    renderApp();
    const el = await screen.findByText('Nothing found!');
    expect(el).toBeInTheDocument();
    serv.close();
  });
});
