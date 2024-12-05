import { arrayMoveMutable } from "npm:array-move";

if (import.meta.main) {
  const input = await Deno.readTextFile("./day5.txt");
  const [rulesRaw, messagesRaw] = input.split(/\n\s*\n/);

  const rules = rulesRaw.split("\n").map((rule) => rule.split("|").map(Number));
  const messages = messagesRaw
    .split("\n")
    .map((message) => message.split(",").map(Number));

  const isRuleApplicable = (
    message: number[],
    [first, second]: number[]
  ): boolean => message.indexOf(first) !== -1 && message.indexOf(second) !== -1;

  const isMessageValid = (message: number[]): boolean => {
    for (const [first, second] of rules) {
      if (!isRuleApplicable(message, [first, second])) {
        continue; // Rule cannot be applied
      }
      if (message.indexOf(first) >= message.indexOf(second)) {
        return false;
      }
    }

    return true;
  };

  const getSumOfMiddles = (messages: number[][]): number => {
    return messages
      .map((message) => message[(message.length - 1) / 2])
      .reduce((acc, curr) => acc + curr, 0);
  };

  const part1 = () => {
    const filtered = messages.filter(isMessageValid);

    console.log(getSumOfMiddles(filtered));
  };

  const part2 = () => {
    const wrongMessages = messages.filter(
      (message) => !isMessageValid(message)
    );

    for (const message of wrongMessages) {
      do {
        for (const rule of rules) {
          if (!isRuleApplicable(message, rule)) continue;

          const [first, second] = rule;

          const firstIndex = message.indexOf(first);
          const secondIndex = message.indexOf(second);

          if (firstIndex > secondIndex) {
            arrayMoveMutable(message, secondIndex, firstIndex);
          }
        }
      } while (!isMessageValid(message));
    }

    console.log(getSumOfMiddles(wrongMessages));
  };

  part1();
  part2();
}
