import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/pages/details/[id]';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackRender } from '@/component/ErrorBoundary/FallbackRender';
import { filmApi } from '@/controler/FilmAPI';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => import('next-router-mock'));

describe('test main component', () => {
  beforeEach(async () => {
    const filmsAns = await filmApi.getFilmsPage({});
    const film = await filmApi.getFilm('tt21361444');
    render(
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Home filmsAns={filmsAns} film={film} />
      </ErrorBoundary>
    );
  });

  it('corect data render', async () => {
    const moreInfo = await screen.findByTestId('more-info');
    expect(moreInfo).toBeInTheDocument();
    const url1 = mockRouter.asPath;
    const link = await screen.findAllByRole('link');
    await userEvent.click(link[0]);
    const url2 = mockRouter.asPath;
    expect(url1).not.equal(url2);
    await userEvent.click(moreInfo);
    const url3 = mockRouter.asPath;
    expect(url2).not.equal(url3);
    expect(url1).equal(url3);
  });
});
