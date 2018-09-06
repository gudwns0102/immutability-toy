import { hasNestedKey } from '../index';

describe('hasNestedKey', () => {
  it('Empty keys should return true', () => {
    const state = {};
    const emptyKeys: string[] = [];
    expect(hasNestedKey(state, emptyKeys)).toBe(true);
  });

  it('Simplest success case', () => {
    const state = { a: 1 };
    const keys = ['a'];
    expect(hasNestedKey(state, keys)).toBe(true);
  })

  it('Simpleest failure case', () => {
    const state = { a: 1 };
    const keys = ['b'];
    expect(hasNestedKey(state, keys)).toBe(false);
  })

  it('2 Depth success', () => {
    const state = { a: 1, b: { c: 2 } };
    const keys = ['b', 'c'];
    expect(hasNestedKey(state, keys)).toBe(true);
  })

  it('2 Depth failure', () => {
    const state = { a: 1, b: { c: 2 } };
    const keys = ['b', 'd'];
    expect(hasNestedKey(state, keys)).toBe(false);
  })
})