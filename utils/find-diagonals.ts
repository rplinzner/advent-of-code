export function getAllDiagonals<T>(matrix: T[][]): {
  primary: T[][];
  secondary: T[][];
} {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  const primaryDiagonals: T[][] = [];
  const secondaryDiagonals: T[][] = [];

  for (let d = 0; d < rows + cols - 1; d++) {
    const primaryDiagonal: T[] = [];
    for (let row = 0; row < rows; row++) {
      const col = d - row;
      if (col >= 0 && col < cols) {
        primaryDiagonal.push(matrix[row][col]);
      }
    }
    if (primaryDiagonal.length > 0) {
      primaryDiagonals.push(primaryDiagonal);
    }
  }

  for (let d = 0; d < rows + cols - 1; d++) {
    const secondaryDiagonal: T[] = [];
    for (let row = 0; row < rows; row++) {
      const col = d - (rows - 1 - row);
      if (col >= 0 && col < cols) {
        secondaryDiagonal.push(matrix[row][col]);
      }
    }
    if (secondaryDiagonal.length > 0) {
      secondaryDiagonals.push(secondaryDiagonal);
    }
  }

  return { primary: primaryDiagonals, secondary: secondaryDiagonals };
}
