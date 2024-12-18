if (import.meta.main) {
  const file = await Deno.readTextFile("./day-1-historian-hysteria.txt");

  const split = file.match(/\d+/g) as string[];

  const listA: number[] = [];
  const listB: number[] = [];

  for (let i = 0; i < split.length; i++) {
    if (i % 2 === 0) {
      listA.push(parseInt(split[i]));
    } else {
      listB.push(parseInt(split[i]));
    }
  }

  listA.sort();
  listB.sort();

  let sum = 0;

  const part1 = () => {
    for (let i = 0; i < listA.length; i++) {
      sum += Math.abs(listA[i] - listB[i]);
    }

    console.log(sum);
  };

  const part2 = () => {
    const occurrences = new Map<number, number>();

    for (const num of listB) {
      const curr = occurrences.get(num);
      if (curr) {
        occurrences.set(num, curr + 1);
      } else {
        occurrences.set(num, 1);
      }
    }

    const similarity = listA.reduce((acc, num) => {
      const multiplier = occurrences.get(num) ?? 0;

      return acc + num * multiplier;
    }, 0);

    console.log(similarity);
  };

  part1();
  part2();
}
