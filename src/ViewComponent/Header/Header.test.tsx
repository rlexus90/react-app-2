import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderApp } from '../../mock/utils/testUtils';
import { server } from '../../mock/api/server';
import userEvent from '@testing-library/user-event';

let url = '';

server.events.on('request:start', ({ request }) => {
  // console.log('MSW intercepted:', request.method, request.url);
  url = request.url;
});

describe('Header component test', () => {
  it('Test components', async () => {
    renderApp();
    const input = screen.getByTestId('search-input');
    const button = screen.getByRole('button');
    const select = screen.getByTestId('select');
    const bugBtn = screen.getByTestId('bug-icon');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();

    await userEvent.type(input, 'qw');

    expect(url.includes('qw')).toBe(true);

    //  this work, but log Error from ErrorBoundary

    // await userEvent.click(bugBtn);

    // const errorMsg= await screen.findByText('Something went wrong.');
    // const btn= await screen.findByRole('button');

    // expect(errorMsg).toBeInTheDocument();
    // expect(btn).toBeInTheDocument();
    // expect(btn).toHaveTextContent('Clear Error');

    // const main = screen.queryByTestId('main');
    // expect(main).toBe(null);

    // await userEvent.click(btn);

    // const main2 = screen.queryByTestId('main');
    // expect(main2).toBeInTheDocument();
  });
});
