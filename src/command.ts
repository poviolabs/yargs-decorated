import "reflect-metadata";

import { CommandModule } from "yargs";
import { getYargsOptions, parseYargsOptions } from "./options";

const commandKey = Symbol("yargs_decorated_command");

export function YargsCommand<T>(options: Omit<CommandModule, "handler">) {
  return function constructor<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    Reflect.defineMetadata(commandKey, options, constructor);
  };
}

export function getYargsCommand<T>(
  target: { new (): T },
  handler?: (a: T) => void | Promise<void>
): CommandModule {
  const options = Reflect.getMetadata(commandKey, target);
  return {
    builder: (y) => y.options(getYargsOptions(target)),
    ...options,
    handler: (args) => handler(parseYargsOptions(target, args)),
  };
}
