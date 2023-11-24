import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { filmApi } from '@/controler/FilmAPI';
import Home from '@/pages';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => import('next-router-mock'));
vi.mock('react-error-boundary', async () => {
  const actual: Object = await vi.importActual('react-error-boundary');
  return {
    ...actual,
    useErrorBoundary: () => {
      return { showBoundary: vi.fn() };
    },
  };
});

describe('Test Nav Panel block', () => {
  it('Element renders', async () => {
    const filmsAns = await filmApi.getFilmsPage({});
    render(<Home {...filmsAns} />);

    const prewBtn = await screen.findByText('prew');
    const nextBtn = await screen.findByText('next');
    expect(nextBtn).toBeInTheDocument();
    expect(prewBtn).toBeInTheDocument();
  });

  it('test navigate btn', async () => {
    const filmsAns = await filmApi.getFilmsPage({});
    const { rerender } = render(<Home {...filmsAns} />);

    const nextBtn = await screen.findByText('next');

    await userEvent.click(nextBtn);
    const page2 = mockRouter.query.page;
    expect(page2).toBe('2');

    await rerender(<Home {...filmsAns} page={2} />);

    const prewBtn = screen.getByText('prew');
    await userEvent.click(prewBtn);
    const page3 = mockRouter.query.page;
    expect(page3).toBe('1');

    await userEvent.click(prewBtn);
    const page4 = mockRouter.query.page;

    expect(page4).toBe('1');
  });
});
