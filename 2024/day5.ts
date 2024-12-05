if (import.meta.main) {
  const input = await Deno.readTextFile("./day5.txt");
  const [rulesRaw, messagesRaw] = input.split(/\n\s*\n/);

  const rules = rulesRaw.split("\n").map((rule) => rule.split("|").map(Number));
  const messages = messagesRaw
    .split("\n")
    .map((message) => message.split(",").map(Number));

  const part1 = () => {
    const isMessageValid = (message: number[]): boolean => {
      for (const [first, second] of rules) {
        if (message.indexOf(first) === -1 || message.indexOf(second) === -1) {
          continue; // Rule cannot be applied
        }
        if (message.indexOf(first) >= message.indexOf(second)) {
          return false;
        }
      }

      return true;
    };

    const filtered = messages.filter(isMessageValid);

    const sumOfMiddles = filtered
      .map((message) => message[(message.length - 1) / 2])
      .reduce((acc, curr) => acc + curr, 0);

    console.log(sumOfMiddles);
  };

  part1();
}
