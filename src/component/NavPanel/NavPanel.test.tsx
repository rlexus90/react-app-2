import { describe, it, expect, beforeEach, vi } from 'vitest';
import NavPanel from './NavPanel';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RespContext } from '../../context/RespContext';
import { respMock } from '../../common/Mocks/respMock';
import userEvent from '@testing-library/user-event';
import { queryToAPI } from '../../utils/utils';

describe('Test Nav Panel block', () => {
  vi.mock('../../utils/utils', () => ({ queryToAPI: vi.fn() }));
  beforeEach(() => {
    render(
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
        <NavPanel />
      </RespContext.Provider>
    );
  });

  it('Element renders', () => {
    const prewBtn = screen.getByText('prew');
    const nextBtn = screen.getByText('next');
    expect(nextBtn).toBeInTheDocument();
    expect(prewBtn).toBeInTheDocument();
  });

  it('test navigate btn', async () => {
    const nextBtn = screen.getByText('next');
    await userEvent.click(nextBtn);
    expect(queryToAPI).toBeCalledWith({ page: '2' });
    expect(queryToAPI).toBeCalledTimes(1);
    const prewBtn = screen.getByText('prew');
    await userEvent.click(prewBtn);
    expect(queryToAPI).toBeCalledTimes(1);
  });
});

describe('test prew btn', () => {
  beforeEach(() => {
    render(
      <RespContext.Provider
        value={{
          filmResp: {
            page: 2,
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
        <NavPanel />
      </RespContext.Provider>
    );
  });

  it('test prew btn click', async () => {
    expect(true).toBe(true);
    const prewBtn = screen.getByText('prew');
    await userEvent.click(prewBtn);
    expect(queryToAPI).toBeCalledWith({ page: '1' });
  });
});
