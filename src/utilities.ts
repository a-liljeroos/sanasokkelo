function randomNumberByRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomLetterString(outPutLength: number): string {
  let outPutString = "";
  const letters = "aefhijklmnoprstuvyäö";
  for (let i = 0; i < outPutLength; i++) {
    outPutString += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return outPutString;
}

function generateFillRows(amount: number, width: number): string[] {
  let rows = [];
  for (let i = 0; i < amount; i++) {
    rows.push(generateRandomLetterString(width));
  }
  return rows;
}

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const defaultWords = [
  "Luovuus",
  "Uteliaisuus",
  "Arviointikyky",
  "Näkökulmanottokyky",
  "Rohkeus",
  "Sinnikkyys",
  "Rehellisyys",
  "Innostus",
  "Ystävällisyys",
  "Rakkaus",
  "Kiinnostava",
  "Vitsikäs",
  "Puhelias",
  "Inspiroiva",

  "Rohkea",
  "Omalaatuinen",
  "Pirteä",
  "Mieletön",
  "Huikea",
  "Unohtumaton",
  "Loistava",
  "Huumorintajuinen",
  "Rehti",
  "Reipas",
  "Sydämellinen",
  "Lystikäs",
];

export function getRandomWords(n: number) {
  const arr = defaultWords;
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function generateMaze(words: string[], size: number[]): string[] {
  const width = size[0];
  const height = size[1];
  let filledWords = [];

  //fill the words to the length of width
  for (let i = 0; i < words.length; i++) {
    let currentWord = words[i];
    const wordLength = currentWord.length;
    if (wordLength < width) {
      const lastPossibleWordStartpoint = width - wordLength + 1;
      const startPoint = randomNumberByRange(0, lastPossibleWordStartpoint);
      const endPoint = startPoint + wordLength;
      const firstFill = generateRandomLetterString(startPoint);
      const secondFill = generateRandomLetterString(width - endPoint + 1);
      if (startPoint > 0) {
        currentWord = firstFill + currentWord + secondFill;
      } else {
        currentWord = currentWord + secondFill;
      }
    }
    filledWords.push(currentWord);
  }

  // add rows if needed

  if (height > words.length) {
    const rowsNeeded = height - words.length;
    filledWords = generateFillRows(rowsNeeded, width + 1).concat(filledWords);
  }

  // randomize array order
  filledWords = shuffle(filledWords);

  return filledWords;
}
