import {
  Command,
  SetCommand,
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
  } else {
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

  return {
    ...state,
  }
}

export const isCommand = (command: any): Command | boolean => {
  const commands: Command[] = ['$set', '$push', '$unshift'];
  if (command && command.constructor === Object) {
    const keys: string[] = Object.keys(command);
    const commandKey: string | undefined = keys.find((key: string) => commands.includes(key as any));
    if (commandKey && keys.length !== 1) {
      throw new Error('Command has invalid form!');
    } else if (commandKey && keys.length === 1) {
      return commandKey as Command;
    }
  }

  return false;
}

export const trim = (command: any) => {
  return command[Object.keys(command)[0]];
}

export const hasNestedKey = (state: { [key: string]: any }, keys: string[]) => {
  let walker = state;
  while (keys.length) {
    const key = keys.shift();
    if (!key || !walker[key]) {
      return false;
    }

    walker = walker[key];
  }

  return true;
}

export default update;