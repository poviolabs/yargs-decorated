import yargs from "yargs";
import {
  YargsOption,
  getYargsOptions,
  parseYargsOptions,
} from "../src";

class Test1Options {
  @YargsOption({alias: 'f'})
  foo: boolean;

  @YargsOption()
  bar: number;

  get fooBar() {
    return `${this.foo} ${this.bar}`;
  }
}

test("Get and Parse Options", async () => {
  const options = parseYargsOptions(
    Test1Options,
    yargs([])
      .options(getYargsOptions(Test1Options))
      .fail((msg) => {
        console.log(msg);
      })
      .parse("--foo --bar 12")
  );
  expect(options.foo).toEqual(true);
  expect(options.bar).toEqual(12);
  expect(options.fooBar).toEqual("true 12");
});
