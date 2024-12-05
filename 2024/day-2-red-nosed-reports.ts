if (import.meta.main) {
  const file = await Deno.readTextFile("./day-2.txt");

  const reports = file.split("\n").map((e) => e.split(" ").map(Number));

  let correct = 0;

  reports.forEach((report) => {
    let lastDif: null | number = null;

    let corr = true;

    for (let i = 0; i < report.length - 1; i++) {
      const curDiff = report[i + 1] - report[i];

      if (Math.abs(curDiff) < 1 || Math.abs(curDiff) > 3) {
        corr = false;
        break;
      }

      if (curDiff * (lastDif ?? 0) < 0) {
        corr = false;
        break;
      }

      lastDif = curDiff;
    }

    if (corr) {
      correct++;
    }
  });

  console.log("part1:", correct);

  // part 2
  correct = 0;

  const isCorrect = (report: number[]) => {
    let lastDif: null | number = null;

    for (let i = 0; i < report.length - 1; i++) {
      const curDiff = report[i + 1] - report[i];

      if (Math.abs(curDiff) < 1 || Math.abs(curDiff) > 3) {
        return false;
      }

      if (curDiff * (lastDif ?? 0) < 0) {
        return false;
      }

      lastDif = curDiff;
    }

    return true;
  };

  reports.forEach((report) => {
    if (isCorrect(report)) {
      correct++;
      return;
    }

    for (let i = 0; i < report.length; i++) {
      const temp = [...report];
      temp.splice(i, 1);

      if (isCorrect(temp)) {
        correct++;
        break;
      }
    }
  });

  console.log(correct);
}
