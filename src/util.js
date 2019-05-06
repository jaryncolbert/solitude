export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBool() {
  return !!getRandomInt(0, 1);
}

export function centerSquare(canvasWidth, canvasHeight, squareSize) {
  let canvasMidX = canvasWidth / 2;
  let canvasMidY = canvasHeight / 2;

  let squareX = canvasMidX - squareSize / 2;
  let squareY = canvasMidY - squareSize / 2;

  return [squareX, squareY, squareSize, squareSize];
}

export function horizMidLine(lineX, lineY, lineLen) {
  return [lineX, lineY, lineX + lineLen, lineY];
}

export function risingDiagMidLine(canvasMidX, canvasMidY, lineLen) {
  let squareSizeFromDiag = lineLen / (2 * Math.sqrt(2));
  return [canvasMidX - squareSizeFromDiag, canvasMidY + squareSizeFromDiag,
      canvasMidX + squareSizeFromDiag, canvasMidY - squareSizeFromDiag];
}

export function fallingDiagMidLine(canvasMidX, canvasMidY, lineLen) {
  let squareSizeFromDiag = lineLen / (2 * Math.sqrt(2));
  return [canvasMidX - squareSizeFromDiag, canvasMidY - squareSizeFromDiag,
      canvasMidX + squareSizeFromDiag, canvasMidY + squareSizeFromDiag];
}

export function calcDiagLineMax(canvasWidth, canvasHeight, squareSize, canExtend) {
  // If line can extend beyond square, set its max to the
  // full canvas diagonal.
  // Otherwise, limit it to the size of the diagonal of the square
  const canvasDims = [canvasWidth, canvasHeight];
  const squareDims = [squareSize, squareSize];
  let dims = canExtend ? canvasDims : squareDims;
  let val = Math.floor(calcHypotenuse(...dims));
  console.log("Hypot value: " + val);
  return val;
}

export function calcHypotenuse(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
