import {
  Command,
  SplicePayload
} from './index.d';

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

export const isCommand = (command: any): Command | boolean => {
  const commands: Command[] = ['$set', '$push', '$unshift', '$apply', '$merge', '$splice'];
  if (command && command.constructor === Object) {
    const keys: string[] = Object.keys(command);
    const commandKey = keys.find((key: string) => commands.includes(key as any)) as Command | undefined;
    if (commandKey && keys.length !== 1) {
      throw new Error('Command has invalid form!');
    } else if (commandKey && keys.length === 1) {
      const payload = trim(command);
      const typeChecker: { [key in Command]: ($payload: any) => boolean } = {
        $set: ($payload: any) => true,
        $push: ($payload: any) => $payload && $payload.constructor === Array,
        $unshift: ($payload: any) => $payload && $payload.constructor === Array,
        $apply: ($payload: any) => $payload && $payload.constructor === Function,
        $merge: ($payload: any) => $payload && $payload.constructor === Object,
        $splice: ($payload: any) =>
          $payload &&
          $payload.constructor === Array &&
          $payload[0].constructor === Array &&
          typeof $payload[0][0] === 'number',
      }

      const typeValid = typeChecker[commandKey](payload);

      if (!typeValid) {
        throw new TypeError('Command has invalid payload');
      }

      return commandKey;
    }
  }

  return false;
}

export const trim = (command: any) => {
  return command[Object.keys(command)[0]];
}

export default update;