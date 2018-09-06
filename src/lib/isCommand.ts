import {
  Command,
  SplicePayload
} from '../index.d';
import trim from './trim';

export default (command: any): Command | boolean => {
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