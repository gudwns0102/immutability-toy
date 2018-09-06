export type update = (state: object, modifier: object) => object;

export type Command = '$set';

export type SetCommand = {
  $set: any;
}

