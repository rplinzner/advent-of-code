import { getAllDiagonals } from "../utils/find-diagonals.ts";

const regex = /XMAS/g;

if (import.meta.main) {
  const file = await Deno.readTextFile("./day4.txt");

  const matrix = file.split("\n").map((e) => e.split(""));

  const part1 = () => {
    let counter = 0;

    // rows both ways
    for (const row of matrix) {
      const copy = [...row];
      const curr = row.join("");

      counter += curr.match(regex)?.length ?? 0;
      counter += copy.reverse().join("").match(regex)?.length ?? 0;
    }

    for (let i = 0; i < matrix[0].length; i++) {
      let col = "";

      for (let j = 0; j < matrix.length; j++) {
        col += matrix[j][i];
      }

      const copy = [...col];
      const curr = col;

      counter += curr.match(regex)?.length ?? 0;
      counter += copy.reverse().join("").match(regex)?.length ?? 0;
    }

    const { primary, secondary } = getAllDiagonals(matrix);

    for (const diagonal of [primary, secondary]) {
      for (const diag of diagonal) {
        const copy = [...diag];
        const curr = diag.join("");

        counter += curr.match(regex)?.length ?? 0;
        counter += copy.reverse().join("").match(regex)?.length ?? 0;
      }
    }

    console.log(counter);
  };

  const part2 = () => {
    // rotate template clockwise 3 times
    const templates = [
      [
        ["M", null, "M"],
        [null, "A", null],
        ["S", null, "S"],
      ],

      [
        ["S", null, "M"],
        [null, "A", null],
        ["S", null, "M"],
      ],
      [
        ["S", null, "S"],
        [null, "A", null],
        ["M", null, "M"],
      ],
      [
        ["M", null, "S"],
        [null, "A", null],
        ["M", null, "S"],
      ],
    ];

    const extractProbe = (x: number, y: number) => {
      const probe = [];

      for (let i = x; i < x + 3; i++) {
        const row = [];

        for (let j = y; j <= y + 2; j++) {
          row.push(matrix[i][j]);
        }

        probe.push(row);
      }

      return probe;
    };

    const compareSampleToTemplate = (
      template: (typeof templates)[0],
      sample: string[][]
    ) => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (template[i][j] === null) {
            continue;
          }

          if (template[i][j] !== sample[i][j]) {
            return false;
          }
        }
      }

      return true;
    };

    let counter = 0;

    for (let i = 0; i < matrix.length - 2; i++) {
      for (let j = 0; j < matrix[i].length - 2; j++) {
        const sample = extractProbe(i, j);

        if (
          templates.some((template) =>
            compareSampleToTemplate(template, sample)
          )
        ) {
          counter++;
        }
      }
    }

    console.log(counter);
  };

  part1();

  part2();
}
