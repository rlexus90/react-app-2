import { describe, it, expect } from 'vitest';
import Header from './Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header component test', () => {
  render(<Header />);

  it('Test components', () => {
    const input = screen.getByTestId('search-input');
    const button = screen.getByRole('button');
    const select = screen.getByTestId('select');
    const bugBtn = screen.getByTestId('bug-icon');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
  });
});
