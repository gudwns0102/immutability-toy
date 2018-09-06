import update from '../';
import { SetCommand } from '../index.d';

describe('set', () => {
  describe('primitive cases', () => {
    it('Empty State && Empty Command', () => {
      const state = {};
      const command = {};
      const nextState = update(state, command);
      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({});
    })

    it('Empty Command', () => {
      const state = { a: 1, b: { c: 2 } };
      const command = {};
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual(state);
    });

    it('Simple command', () => {
      const state = { a: 1, b: { c: 2 } };
      const command: SetCommand = { $set: { x: 1 } };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ x: 1 });
    });
  })

  describe('recursive cases', () => {
    const state = { a: 1, b: { c: 2 } };
    const command = { a: { $set: 3 } };
    const nextState = update(state, command);
    expect(nextState).not.toBe(state);
    expect(nextState).toEqual({ a: 3, b: { c: 2 } });
    expect((nextState as any).b).toBe(state.b);
  })
})