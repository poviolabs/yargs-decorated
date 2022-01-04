import yargs from "yargs";
import { YargsCommand, YargsOption, getYargsCommand } from "../src";

@YargsCommand({
  command: "jim",
  describe: "A sample command",
})
class Test1Command {
  @YargsOption()
  foo: boolean;

  @YargsOption()
  bar: number;

  get fooBar() {
    return `${this.foo} ${this.bar}`;
  }
}

test("Define Command and Run Handler", async () => {
  const test1Handler = (options: Test1Command) => {
    expect(options.foo).toEqual(true);
    expect(options.bar).toEqual(12);
    expect(options.fooBar).toEqual("true 12");
  };

  yargs([])
    .command(getYargsCommand(Test1Command, test1Handler))
    .parse("jim --foo --bar 12");
});
