export type update = (state: object, modifier: object) => object;

export type Command = '$set' | '$push' | '$unshift' | '$apply' | '$merge' | '$splice';

export class SetCommand {
  $set: any;
}

export class PushCommand {
  $push: Array<any>;
}

export class UnshiftCommand {
  $unshift: Array<any>;
}

export class ApplyCommand {
  $apply: (...args: any[]) => any;
}

export class MergeCommand {
  $merge: object;
}

export class SpliceCommand {
  $splice: SplicePayload;
}

export type SplicePayload = {
  0: {
    [index: number]: any,
    0: number;
    1?: number;
  }
}