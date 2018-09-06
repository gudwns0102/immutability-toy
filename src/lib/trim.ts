export default (command: any) => {
  return command[Object.keys(command)[0]];
}
