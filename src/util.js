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

export function diagMidLine(canvasMidX, canvasMidY, lineLen) {
  let squareSizeFromDiag = lineLen / (2 * Math.sqrt(2));
  return [canvasMidX - squareSizeFromDiag, canvasMidY + squareSizeFromDiag,
      canvasMidX + squareSizeFromDiag, canvasMidY - squareSizeFromDiag];
}
