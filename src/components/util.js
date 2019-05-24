export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBool() {
  return !!getRandomInt(0, 1);
}

export function Point(x, y) {
  this.x = x;
  this.y = y;
  return this;
}

export function getMidpoint(x0, y0, xSideLen, ySideLen) {
  let midX = Math.round(xSideLen / 2);
  let midY = Math.round(ySideLen / 2);

  return new Point(x0 + midX, y0 + midY);
}

export function centerSquare(canvasWidth, canvasHeight, squareSize) {
  let canvasMidX = canvasWidth / 2;
  let canvasMidY = canvasHeight / 2;

  let squareX = canvasMidX - squareSize / 2;
  let squareY = canvasMidY - squareSize / 2;

  return [squareX, squareY, squareSize, squareSize];
}

export function horizMidLineFrom(lineX, lineY, lineLen) {
  return [lineX, lineY, lineX + lineLen, lineY];
}

export function risingDiagMidLine(canvasMidX, canvasMidY, lineLen) {
  // Use half of lineLen as hypotenuse so line can extend from midpoint
  let squareSizeFromDiag = calcSquareSideFromHypotenuse(lineLen / 2);
  return [canvasMidX - squareSizeFromDiag, canvasMidY + squareSizeFromDiag,
      canvasMidX + squareSizeFromDiag, canvasMidY - squareSizeFromDiag];
}

export function risingDiagMidLineFrom(lineX, lineY, lineLen) {
  let squareSizeFromDiag = calcSquareSideFromHypotenuse(lineLen);
  return [lineX, lineY, lineX + squareSizeFromDiag, lineY - squareSizeFromDiag];
}

export function fallingDiagMidLine(canvasMidX, canvasMidY, lineLen) {
  // Use half of lineLen as hypotenuse so line can extend from midpoint
  let squareSizeFromDiag = calcSquareSideFromHypotenuse(lineLen / 2);
  return [canvasMidX - squareSizeFromDiag, canvasMidY - squareSizeFromDiag,
      canvasMidX + squareSizeFromDiag, canvasMidY + squareSizeFromDiag];
}

export function fallingDiagMidLineFrom(lineX, lineY, lineLen) {
  let squareSizeFromDiag = calcSquareSideFromHypotenuse(lineLen);
  return [lineX, lineY, lineX - squareSizeFromDiag, lineY - squareSizeFromDiag];
}

export function calcDiagLineMax(canvasWidth, canvasHeight, squareSize, canExtend) {
  // If line can extend beyond square, set its max to the
  // full canvas diagonal.
  // Otherwise, limit it to the size of the diagonal of the square
  const canvasDims = [canvasWidth, canvasHeight];
  const squareDims = [squareSize, squareSize];
  let dims = canExtend ? canvasDims : squareDims;
  return calcHypotenuse(...dims);
}

export function calcHypotenuse(sideA, sideB) {
  return Math.round(Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2)));
}

function calcSquareSideFromHypotenuse(hypotenuse) {
  return Math.round(hypotenuse / Math.sqrt(2));
}
