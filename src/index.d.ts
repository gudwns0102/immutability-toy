export type update = (state: object, modifier: object) => object;

export type Command = '$set' | '$push' | '$unshift' | '$apply';

export type SetCommand = {
  $set: any;
}

export type PushCommand = {
  $push: Array<any>;
}

export class UnshiftCommand {
  $unshift: Array<any>;
}

export class ApplyCommand {
  $apply: (...args: any[]) => any;
}
