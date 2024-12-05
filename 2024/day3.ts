if (import.meta.main) {
  const file = await Deno.readTextFile("./day3.txt");

  const part1 = () => {
    const regex = /mul\((\d+),(\d+)\)/g;
    const result = file
      .match(regex)!
      .map((e) => e.match(/\d+/g))
      .map((e) => Number(e![0]) * Number(e![1]))
      .reduce((acc, e) => acc + e, 0);

    console.log(result);
  };

  const part2 = () => {
    const regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
    const transformed = file.match(regex)!;

    let turnedOn = true;
    let result = 0;

    for (const match of transformed) {
      if (match.includes("do()")) {
        turnedOn = true;
        continue;
      }

      if (match.includes("don't")) {
        turnedOn = false;
        continue;
      }

      if (turnedOn) {
        const [a, b] = match.match(/\d+/g)!;
        result += Number(a) * Number(b);
      }
    }

    console.log(result);
  };

  part1();
  part2();
}
