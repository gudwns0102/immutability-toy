import update from '../index';

describe('update', () => {
  describe('$set', () => {
    it('Empty object and empty modifier should return empty object', () => {
      const input = {};
      expect(update({}, {})).toEqual({});
    });

    it('Empty modifier should return input itself', () => {
      expect(update({ a: 1, b: { c: 2, d: 3 } }, {})).toEqual({})
    })
  })
})