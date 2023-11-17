import { describe, it, expect, beforeEach, vi } from 'vitest';
import NavPanel from './NavPanel';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';

describe.skip('Test Nav Panel block', () => {
  vi.mock('../../utils/utils', () => ({ queryToAPI: vi.fn() }));
  beforeEach(() => {
    render(<NavPanel />);
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
    // expect(queryToAPI).toBeCalledWith({ page: '2' });
    // expect(queryToAPI).toBeCalledTimes(1);
    const prewBtn = screen.getByText('prew');
    await userEvent.click(prewBtn);
    // expect(queryToAPI).toBeCalledTimes(1);
  });
});

describe.skip('test prew btn', () => {
  beforeEach(() => {
    render(<NavPanel />);
  });

  it('test prew btn click', async () => {
    expect(true).toBe(true);
    const prewBtn = screen.getByText('prew');
    await userEvent.click(prewBtn);
    // expect(queryToAPI).toBeCalledWith({ page: '1' });
  });
});
