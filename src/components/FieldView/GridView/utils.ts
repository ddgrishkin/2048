export function getRowKey(rowIndex: number) {
  return `row-key-${rowIndex}`;
}

export function getCellKey(rowIndex: number, colIndex: number) {
  return `cell-key-${rowIndex}-${colIndex}`;
}
