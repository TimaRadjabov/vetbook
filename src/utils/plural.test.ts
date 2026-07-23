import { describe, expect, it } from 'vitest';
import { plural } from './plural';

const YEARS: [string, string, string] = ['год', 'года', 'лет'];

describe('plural', () => {
  it('склоняет русские существительные по числу', () => {
    expect(plural(1, YEARS)).toBe('год');
    expect(plural(2, YEARS)).toBe('года');
    expect(plural(4, YEARS)).toBe('года');
    expect(plural(5, YEARS)).toBe('лет');
    expect(plural(11, YEARS)).toBe('лет');
    expect(plural(12, YEARS)).toBe('лет');
    expect(plural(21, YEARS)).toBe('год');
    expect(plural(102, YEARS)).toBe('года');
    expect(plural(0, YEARS)).toBe('лет');
  });
});
