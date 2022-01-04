import yargs from "yargs";
import { YargsCommand, YargsOption, getYargsCommand } from "../src";
import { IsEmail, validateOrReject } from "class-validator";

@YargsCommand({
  command: "email",
  describe: "A sample command",
})
class Test1Validation {
  @YargsOption()
  @IsEmail()
  email: string;
}

test("ClassValidate Options", async () => {
  await yargs([])
    .command(getYargsCommand(Test1Validation, async (options: Test1Validation) => {
        await validateOrReject(options);
        expect(options.email).toEqual("email@sample.com");
    }))
    .parseAsync("email --email email@sample.com");
});
