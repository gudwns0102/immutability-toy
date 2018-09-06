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
      const command: SetCommand = { $set: 1 };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual(1);
    });

    it('Simple command with object', () => {
      const state = { a: 1, b: { c: 2 } };
      const command: SetCommand = { $set: { x: 1 } };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ x: 1 });
    });

    it('Update several fields at the same time', () => {
      const state = { a: 1, b: 2, c: 3, d: [4], e: 'a', f: { g: 1 } };
      const command = { a: { $set: 2 }, b: { $set: 'b' }, c: { $set: [] }, f: { h: 2 } };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ a: 2, b: 'b', c: [], d: [4], e: 'a', f: { g: 1 } });
    })
  })

  describe('recursive cases', () => {
    it('Update 1 nested key', () => {
      const state = { a: 1, b: { c: 2 } }
      const command = { a: { $set: 3 } };
      const nextState = update(state, command);
      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ a: 3, b: { c: 2 } });
      expect((nextState as any).b).toBe(state.b);
    });

    it('Update n nested key', () => {
      const state = { a: { b: { c: { d: { e: [1, 2, 3] } } } } };
      const command = { a: { b: { c: { d: { e: { $set: [1, 2, 3, 4] } } } } } };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ a: { b: { c: { d: { e: [1, 2, 3, 4] } } } } });
    });
  });

  describe.only('invalid commands', () => {
    it('malformed command 1', () => {
      const state = { a: 1 };
      const command = 1;
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ a: 1 });
    });

    it('malformed command 1', () => {
      const state = { a: 1 };
      const command = { a: 2 };
      const nextState = update(state, command);

      expect(nextState).not.toBe(state);
      expect(nextState).toEqual({ a: 1 });
    })

    it('malformed command 3', () => {
      const state = 1;
      const command = 2;
      const nextState = update(state, command);

      expect(nextState).toBe(1);
    })
  })

  describe('requirements', () => {
    it('You MUST pass this case', () => {
      const state: any = { name: "Alice", todos: [] };
      const nextState: any = update(state, {
        name: { $set: "Bob" }
      });

      expect(nextState.name).toBe("Bob"); // true
      expect(state.todos).toBe(nextState.todos); // true
    })
  })
})