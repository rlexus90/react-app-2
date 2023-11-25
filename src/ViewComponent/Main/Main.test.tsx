import { describe, it, expect, beforeEach, vi } from 'vitest';
import { findByRole, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from '../../mock/api/server';
import Home from '@/pages/index';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackRender } from '@/component/ErrorBoundary/FallbackRender';
import { filmApi } from '@/controler/FilmAPI';

vi.mock('next/router', () => import('next-router-mock'));

describe('test main component', () => {
  beforeEach(async () => {
    const filmsAns = await filmApi.getFilmsPage({});
    render(
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Home {...filmsAns} />
      </ErrorBoundary>
    );
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

describe('message when no response data', () => {
  it('Is message show>', async () => {
    render(
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Home page={0} entries={0} results={[]} />
      </ErrorBoundary>
    );
    const el = await screen.findByText('Nothing found!');
    expect(el).toBeInTheDocument();
  });
});

describe('Snapshot testing', () => {
  it('Test', async () => {
    const filmsAns = await filmApi.getFilmsPage({});
    const div = document.createElement('div');
    const { container } = render(
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Home {...filmsAns} />
      </ErrorBoundary>,
      {
        container: document.body.appendChild(div),
      }
    );

    expect(container).toMatchSnapshot();
  });
});
