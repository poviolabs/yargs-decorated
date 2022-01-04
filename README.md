# Yargs Decorated

Provides a set of decorators to make Yargs DRY and hard-typed. Supports `class-validator`.

## Example Command with Class Validator

```typescript
import yargs from "yargs";
import {YargsCommand, YargsOption, getYargsCommand} from "yargs-decorated";
import {IsEmail, validateOrReject} from "class-validator";

@YargsCommand({
    command: "sample",
    describe: "A sample command",
})
class Command {
    @YargsOption({alias: "f"})
    foo: number;

    @YargsOption({alias: "e", demandOption: true})
    @IsEmail()
    email: string;
}

yargs(hideBin(process.argv)).command(
    getYargsCommand(Command, async (options: Command) => {
        await validateOrReject(options);
        // test with calling `index.js sample --email sample@ads.com --foo`
        console.log(options.email);
    })
);
```

## Example with only Options


```typescript
import yargs from "yargs";
import {
    YargsOption,
    getYargsOptions,
    parseYargsOptions,
} from "yargs-decorated";
import {IsEmail, validateSync} from "class-validator";

class Options {
    @YargsOption({alias: "f"})
    foo: boolean;
}

const options: Options = parseYargsOptions(Options, yargs(hideBin(process.argv))
    .options(getYargsOptions(Options))
    .parse());

console.log(options.foo)
```
