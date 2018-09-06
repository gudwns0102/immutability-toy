import update from '../index';
import { PushCommand } from '../index.d';

describe('push', () => {
  describe('primitive cases', () => {
    it('Simple Command', () => {
      const state = [1, 2, 3, 4];
      const command: PushCommand = { $push: [5] };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('recursive cases', () => {
    it('Update 1 nested key', () => {
      const state = { a: [1, 2, 3, 4] };
      const command = { a: { $push: [5] } };
      const nextState: any = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState.a).not.toBe(state.a);
      expect(nextState.a).toEqual([1, 2, 3, 4, 5]);
    });

    it('Update deeply nested key', () => {
      const state = { a: { b: { c: { d: [1, 2, 3, 4,] } } } };
      const command = { a: { b: { c: { d: { $push: [5] } } } } };
      const nextState: any = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState.a.b.c.d).toEqual([1, 2, 3, 4, 5]);
    })

    it('Update 1 nested key with messed up state', () => {
      const state = { a: { b: 6 }, c: 'x', d: [1, 2, 3, 4] };
      const command = { d: { $push: [5] } };
      const nextState: any = update(state, command);


      expect(nextState).not.toBe(state);
      expect(nextState.a).toBe(state.a);
      expect(nextState.d).toEqual([1, 2, 3, 4, 5]);
    })
  })
})