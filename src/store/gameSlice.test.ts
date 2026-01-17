import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { generateBoardMock } = vi.hoisted(() => ({
  generateBoardMock: vi.fn(),
}));

vi.mock('../utils/board', async () => {
  const actual = await vi.importActual<typeof import('../utils/board')>('../utils/board');
  generateBoardMock.mockImplementation((rows: number, cols: number) => {
    const board = actual.createEmptyBoard(rows, cols);
    if (rows > 0 && cols > 1) {
      board[0][1].hasMine = true;
      board[0][0].adjacentMines = 1;
    }
    return board;
  });
  return {
    ...actual,
    generateBoard: generateBoardMock,
  };
});

import { gameSlice, revealCell, startGame, toggleFlag } from './gameSlice';

const createStore = () => configureStore({ reducer: { game: gameSlice.reducer } });

describe('gameSlice reducers', () => {
  beforeEach(() => {
    generateBoardMock.mockClear();
    vi.useRealTimers();
  });

  it('resets the board on startGame', () => {
    const store = createStore();

    store.dispatch(startGame('medium'));

    const state = store.getState().game;

    expect(state.difficultyId).toBe('medium');
    expect(state.flagsLeft).toBe(state.config.mines);
    expect(state.boardReady).toBe(false);
  });

  it('toggles flags and keeps counters in sync', () => {
    const store = createStore();

    store.dispatch(toggleFlag({ row: 0, col: 0 }));

    let state = store.getState().game;

    expect(state.board[0][0].flagged).toBe(true);
    expect(state.flagsLeft).toBe(state.config.mines - 1);

    store.dispatch(toggleFlag({ row: 0, col: 0 }));
    state = store.getState().game;

    expect(state.board[0][0].flagged).toBe(false);
    expect(state.flagsLeft).toBe(state.config.mines);
  });

  it('reveals a safe cell and starts the timer on the first click', () => {
    const store = createStore();

    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

    store.dispatch(revealCell({ row: 0, col: 0 }));

    const state = store.getState().game;

    expect(generateBoardMock).toHaveBeenCalledOnce();
    expect(state.boardReady).toBe(true);
    expect(state.status).toBe('running');
    expect(state.board[0][0].revealed).toBe(true);
    expect(state.startTime).toBeGreaterThan(0);
  });
});
