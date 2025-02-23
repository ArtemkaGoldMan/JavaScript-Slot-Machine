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

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);

    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (let i = 0; i < row.length; i++) {
      rowString += row[i];
      if (i !== row.length - 1) {
        rowString += "|";
      }
    }
    console.log(rowString);
  }
};

const getWin = (rows, bet, lines) => {
  let win = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      win += bet * SUMBOL_VALUES[symbols[0]];
    }
  }
  return win;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("Your balance is " + balance + "$");
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWin(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money(");
      break;
    }

    const playAgain = prompt(
      "Do you want to play again (Gambling is bad) Y/N? "
    );
    if (playAgain != "Y") break;
  }
};


game();