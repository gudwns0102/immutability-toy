import {
  Command,
  SplicePayload
} from './index.d';
import isCommand from './lib/isCommand';
import trim from './lib/trim';

const update = (state: any, command: any): object => {
  const commandKey = isCommand(command);
  if (commandKey === '$set') {
    return trim(command);
  } else if (commandKey === '$push') {
    if (state && state.constructor === Array) {
      return [...state, ...trim(command)];
    }

    throw new Error('$push: Command is not valid for state');
  } else if (commandKey === '$unshift') {
    if (state && state.constructor === Array) {
      return [...trim(command), ...state];
    }

    throw new Error('$unshift: Command is not valid for state');
  } else if (commandKey === '$apply') {
    return (trim(command) as Function)(state);
  } else if (commandKey === '$merge') {
    if (state && state.constructor === Object) {
      return { ...state, ...trim(command) };
    }

    throw new Error('$merge: Command is not valid for state');
  } else if (commandKey === '$splice') {
    if (state && state.constructor === Array) {
      const trimResult: SplicePayload = trim(command);
      const copy = [...state];
      Array.prototype.splice.apply(copy, trimResult[0]);
      return [...copy];
    }
  } else { // Command is nested or have not existed. In latter case, the command is malformed
    if (command && command.constructor === Object) {
      const keys = Object.keys(command);
      const result: { [key: string]: any } = {};
      while (keys.length) {
        const key = keys.shift();
        if (key) {
          result[key] = update(state[key as string], command[key as string]);
        }
      }

      return { ...state, ...result };
    }
  }

  return (
    state.constructor === Object || state.constructor === Array
      ? { ...state }
      : state
  );
}

export = update;