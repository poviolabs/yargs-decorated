import "reflect-metadata";

import { Options, PositionalOptionsType } from "yargs";

const optionsKey = Symbol("yargs_decorated_option");

const OptionTypeTranslation: Record<string, PositionalOptionsType> = {
  Boolean: "boolean",
  Number: "number",
  String: "string",
};

export function YargsOption(properties: Options = {}) {
  return (target: object, propertyKey: string) => {
    if (properties !== undefined && properties !== null) {
      const newMetadata = {
        ...(Reflect.getMetadata(optionsKey, target) || {}),
        [propertyKey]: {
          ...properties,
          // infer type with TypeScript
          type:
            properties.type ||
            OptionTypeTranslation[
              Reflect.getMetadata("design:type", target, propertyKey).name
            ],
        },
      };
      Reflect.defineMetadata(optionsKey, newMetadata, target);
    }
  };
}

export function getYargsOptions<T>(target: any): Record<keyof T, Options> {
  const options = Reflect.getMetadata(optionsKey, target.prototype);
  if (!options) {
    throw new Error(`Options for ${(target as any).name} were not defined`);
  }
  return options;
}

export function parseYargsOptions<T>(cst: new () => T, values: any): T {
  const o = new cst();
  for (const [name, {}] of Object.entries(getYargsOptions(cst))) {
    o[name] = values[name];
  }
  return o;
}
