import update from '../';
import { ApplyCommand } from '../index.d';

describe('apply', () => {
  describe('primitive cases', () => {
    it('Simplest case', () => {
      const state = 1;
      const command: ApplyCommand = { $apply: (ip: number) => 2 * ip };
      const nextState = update(state, command);

      expect(nextState).toBe(2);
    });
  })
})