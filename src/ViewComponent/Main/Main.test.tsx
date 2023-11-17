import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe.skip('test main component', () => {
  beforeEach(() => {
    {
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      );
    }
  });

  it('test main component has render', () => {
    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
  });

  it('test count card', () => {
    const catrs = screen.queryAllByTestId('card');
    expect(catrs.length).toBe(10);
  });

  it('corect data render', () => {
    const cards = screen.queryAllByTestId('card');
    const card = screen.queryByText('Avengers: Secret Wars');
    expect(card).toBeInTheDocument();
    expect(card).to.equal(cards[0].childNodes[0].childNodes[1]);
    expect(card).not.to.equal(cards[1].childNodes[0].childNodes[1]);
  });
});

describe.skip('message when no response data', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
  });

  it('Is message show>', () => {
    const el = screen.queryByText('Nothing found!');
    expect(el).toBeInTheDocument();
  });
});
