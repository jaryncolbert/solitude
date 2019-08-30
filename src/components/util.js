export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBool() {
  return !!getRandomInt(0, 1);
}

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/[\s\W]/g, "");
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function generatePowerSet(array) {
  var result = []; // Not including empty set

  for (var i = 1; i < 1 << array.length; i++) {
    var subset = [];
    for (var j = 0; j < array.length; j++)
      if (i & (1 << j)) subset.push(array[j]);

    result.push(subset);
  }

  /**
   * Sort subset arrays by length so that
   * smaller sets are first
   */
  result.sort((a, b) => a.length - b.length);
  return result;
}
