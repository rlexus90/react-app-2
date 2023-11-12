import { describe, it, expect, beforeEach } from 'vitest';
import { RespContext } from '../../context/RespContext';
import { respMock } from '../../common/Mocks/respMock';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('test main component', () => {
  beforeEach(() => {
    {
      render(
        <MemoryRouter>
          <RespContext.Provider
            value={{
              filmResp: respMock,
              respParam: {},
              setRespParam: () => null,
              setFilmResp: () => null,
              isFilmLoad: false,
              setIsFilmLoad: () => null,
            }}
          >
            <Main />
          </RespContext.Provider>
        </MemoryRouter>
      );
    }
  });

  it('test main component has render', () => {
    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
  });

  it('test count cart', () => {
    const catrs = screen.queryAllByTestId('cart');
    expect(catrs.length).toBe(10);
  });

  it('corect data render', () => {
    const catrs = screen.queryAllByTestId('cart');
    const cart = screen.queryByText('Avengers: Secret Wars');
    expect(cart).toBeInTheDocument();
    expect(cart).to.equal(catrs[0].childNodes[0].childNodes[1]);
    expect(cart).not.to.equal(catrs[1].childNodes[0].childNodes[1]);
  });
});

describe('message when no response data', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <RespContext.Provider
          value={{
            filmResp: {
              page: 1,
              next: '/titles/search/title/avengers?page=2&limit=10',
              entries: 10,
              results: [],
            },
            respParam: {},
            setRespParam: () => null,
            setFilmResp: () => null,
            isFilmLoad: false,
            setIsFilmLoad: () => null,
          }}
        >
          <Main />
        </RespContext.Provider>
      </MemoryRouter>
    );
  });

  it('Is message show>', () => {
    const el = screen.queryByText('Nothing found!');
    expect(el).toBeInTheDocument();
  });
});
