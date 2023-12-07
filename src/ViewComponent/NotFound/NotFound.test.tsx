import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '@/pages/404';

vi.mock('next/router', () => import('next-router-mock'));

it('Test not found page', async () => {
  const { rerender } = render(<NotFoundPage />);

  const text = await screen.findByText('Sorry... Page not found');
  expect(text).toBeInTheDocument();
});
