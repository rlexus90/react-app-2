// import { describe, it, expect, beforeEach } from 'vitest';
// import { screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { renderApp } from '../../utils/testUtils';

// describe('Test Nav Panel block', () => {
//   beforeEach(() => {
//     renderApp();
//   });

//   it('Element renders', async () => {
//     const prewBtn = await screen.findByText('prew');
//     const nextBtn = await screen.findByText('next');
//     expect(nextBtn).toBeInTheDocument();
//     expect(prewBtn).toBeInTheDocument();
//   });

//   it('test navigate btn', async () => {
//     const nextBtn = await screen.findByText('next');
//     const page1 = new URL(document.URL).searchParams.get('page');

//     expect(page1).toBe('1');

//     await userEvent.click(nextBtn);
//     const page2 = new URL(document.URL).searchParams.get('page');

//     expect(page2).toBe('2');

//     const prewBtn = screen.getByText('prew');
//     await userEvent.click(prewBtn);
//     const page3 = new URL(document.URL).searchParams.get('page');
//     expect(page3).toBe('1');

//     await userEvent.click(prewBtn);
//     const page4 = new URL(document.URL).searchParams.get('page');
//     expect(page4).toBe('1');
//   });
// });
