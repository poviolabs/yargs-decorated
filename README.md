# Yargs Decorated

Provides a set of decorators to hard-type and DRY Yargs options and commands


## Example Command

Instead of this



```typescript
import yargs from "yargs";

interface Options {
    foo: number
}

yargs
    .command( {
        command: "sample",
        describe: "A sample command",
        options: {
            foo: { 
                type: "number",
                demandOption: true
            }
        },
        handler: (args: Options) =>{
            console.log(options.foo);
        }
    }).parse();
```

do this

```typescript
import yargs from "yargs";
import { YargsCommand, YargsOption, getYargsCommand } from "yargs-decorated";

@YargsCommand({
  command: "sample",
  describe: "A sample command",
})
class Command {
  @YargsOption({ alias: "f", demandOption: true })
  foo: number;
}

yargs(hideBin(process.argv)).command(
  getYargsCommand(Command, (options: Command) => {
      // run when calling with `sample --foo`
    console.log(options.foo);
  })
);
```

## Example Options

Instead of this
```typescript
import yargs from "yargs";

interface Options {
    foo: boolean;
    bar: number;
}

const argv: Options = yargs
    .options({
        foo: {
            alias: "f",
            type: "boolean"
        },
        bar: {
            type: "number"
        }
    }).parse();

console.log(argv.foo);
```

do this:

```typescript
import yargs from "yargs";
import {
  YargsOption,
  getYargsOptions,
  parseYargsOptions,
} from "yargs-decorated";

class Options {
  @YargsOption({ alias: "f" })
  foo: boolean;

  @YargsOption()
  bar: number;
}

const options: Options = parseYargsOptions(Options, yargs(hideBin(process.argv))
    .options(getYargsOptions(Options))
    .parse());

console.log(options.foo)
```
