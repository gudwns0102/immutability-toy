import isCommand from '../src/lib/isCommand';

describe('isCommand', () => {
  it('$set command', () => {
    expect(isCommand({ $set: 1 })).toBe('$set');
    expect(isCommand({ $set: null })).toBe('$set');
    expect(isCommand({ $set: undefined })).toBe('$set');
    expect(isCommand({ $set: {} })).toBe('$set');
    expect(isCommand({ $set: { a: 1 } })).toBe('$set');
    expect(isCommand({ $set: Symbol('test') })).toBe('$set');
    expect(isCommand({ $set: [1, 2, 3] })).toBe('$set');
  });

  it('$push command', () => {
    expect(isCommand({ $push: [] })).toBe('$push');
    expect(isCommand({ $push: [1, 2, 3] })).toBe('$push');

    expect(() => isCommand({ $push: 1 })).toThrow(Error);
    expect(() => isCommand({ $push: false })).toThrow(Error);
    expect(() => isCommand({ $push: {} })).toThrow(Error);
    expect(() => isCommand({ $push: Symbol('test') })).toThrow(Error);
  });

  it('$unshift command', () => {
    expect(isCommand({ $unshift: [] })).toBe('$unshift');
    expect(isCommand({ $unshift: [1, 2, 3] })).toBe('$unshift');

    expect(() => isCommand({ $unshift: 1 })).toThrow(Error);
    expect(() => isCommand({ $unshift: false })).toThrow(Error);
    expect(() => isCommand({ $unshift: {} })).toThrow(Error);
    expect(() => isCommand({ $unshift: Symbol('test') })).toThrow(Error);
  });

  it('undefined or null should return false', () => {
    expect(isCommand(undefined)).toBe(false);
    expect(isCommand(null)).toBe(false);
  })

  it('primitive should return false', () => {
    expect(isCommand(1)).toBe(false);
    expect(isCommand(true)).toBe(false);
    expect(isCommand('test')).toBe(false);
  })
})