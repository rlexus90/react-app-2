import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from '../../mock/api/server';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackRender } from '@/component/ErrorBoundary/FallbackRender';
import Home from '@/pages';
import { filmApi } from '@/controler/FilmAPI';
import mockRouter from 'next-router-mock';

let url = '';
server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
  url = request.url;
});

vi.mock('next/router', () => import('next-router-mock'));

describe('Header component test', () => {
  it('Test components', async () => {
    const filmsAns = await filmApi.getFilmsPage({});
    render(
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Home {...filmsAns} />
      </ErrorBoundary>
    );

    const input = await screen.findByTestId('search-input');
    const button = await screen.findByRole('button');
    const select = await screen.findByTestId('select');
    const bugBtn = await screen.findByTestId('bug-icon');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();

    await userEvent.type(input, 'qw');
    await userEvent.click(button);

    expect(mockRouter.asPath.includes('qw')).toBe(true);
  });
});
