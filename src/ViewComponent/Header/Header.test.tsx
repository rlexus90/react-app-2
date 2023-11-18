import { describe, it, expect } from 'vitest';
import Header from './Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackRender } from '../../component/ErrorBoundary/FallbackRender';

describe('Header component test', () => {
  render(
    <Provider store={store}>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Header />
      </ErrorBoundary>
    </Provider>
  );

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
