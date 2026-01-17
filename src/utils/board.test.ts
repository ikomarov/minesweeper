import { describe, expect, it } from 'vitest';
import { createEmptyBoard, generateBoard, revealArea } from './board';

describe('board utils', () => {
  it('creates boards with the requested size', () => {
    const board = createEmptyBoard(2, 3);
    expect(board).toHaveLength(2);
    expect(board[0]).toHaveLength(3);
    expect(board.flat().every((cell) => cell.revealed === false && cell.flagged === false)).toBe(
      true,
    );
  });

  it('plants the right number of mines and keeps the safe spot clear', () => {
    const board = generateBoard(4, 4, 5, { row: 0, col: 0 });
    const mines = board.flat().filter((cell) => cell.hasMine).length;
    expect(mines).toBe(5);
    expect(board[0][0].hasMine).toBe(false);
  });

  it('revealArea opens contiguous empty cells', () => {
    const board = createEmptyBoard(3, 3);
    const opened = revealArea(board, { row: 1, col: 1 });
    expect(opened).toBe(9);
    expect(board.flat().every((cell) => cell.revealed)).toBe(true);
  });
});
