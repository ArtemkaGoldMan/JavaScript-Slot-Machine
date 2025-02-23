//1. deposit money
//2. number of lines to ber
//3. amoutn of money
//4. spin the machine
//5. check win
//6. give user money if win/ take money if lose
// play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SUMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount:  ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount! Please, TRY AGAIN.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt(
      "Enter the number of lines(1-3) to bet on(!!! You can choose only one!!!):  "
    );
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines! Please, TRY AGAIN.");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt(
      "Enter amount of bet. Your max bet is " + balance + "$:  "
    );
    const numberOfBet = parseFloat(bet);

    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > balance / lines
    ) {
      console.log("Invalid amout of bet! Please, TRY AGAIN.");
    } else {
      return numberOfBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; i++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.slice(randomIndex, 1);
    }
  }
  return reels;
};

spin();

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);

console.log(balance);
console.log(numberOfLines);
console.log(bet);
