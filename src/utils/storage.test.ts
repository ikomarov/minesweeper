import { beforeEach, describe, expect, it } from 'vitest';
import { loadDifficulty, loadResults, saveDifficulty, saveResults } from './storage';

describe('storage helpers', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('persists difficulty selection', () => {
    expect(loadDifficulty()).toBeNull();
    saveDifficulty('medium');
    expect(loadDifficulty()).toBe('medium');
  });

  it('persists and reads recent results', () => {
    const sample = [
      {
        id: '1',
        difficultyId: 'easy' as const,
        outcome: 'win' as const,
        duration: 1500,
        finishedAt: 1700000000000,
      },
    ];
    expect(loadResults()).toEqual([]);
    saveResults(sample);
    expect(loadResults()).toEqual(sample);
  });
});
