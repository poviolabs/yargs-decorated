# Yargs Decorated

Provides a set of decorators to hard-type and DRY Yargs options and commands


## Example Command

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

```typescript
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

  get fooBar() {
    return `${this.foo} ${this.bar}`;
  }
}

const argv = yargs(hideBin(process.argv))
  .options(getYargsOptions(Test1Options))
  .parse();

const options: Options = parseYargsOptions(argv);
```
