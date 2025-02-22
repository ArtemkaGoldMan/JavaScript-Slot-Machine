//1. deposit money
//2. number of lines to ber
//3. amoutn of money
//4. spin the machine
//5. check win
//6. give user money if win/ take money if lose
// play again

const prompt = require("prompt-sync")();

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount:");
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
      "Enter the number of lines(1-3) to bet on(!!! You can choose only one!!!):"
    );
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines! Please, TRY AGAIN.");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance) => {
    while(true){
        const bet = prompt("Enter amount of bet. Your max bet is " + balance + "$.");
        const numberOfBet = parseFloat(bet);

        if(isNaN(numberOfBet) || numberOfBet <=0 || numberOfBet > balance){
            console.log("Invalid amout of bet! Please, TRY AGAIN.")
        }
        else{
            return numberOfBet;
        }

    }

}

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet();

console.log(balance);
console.log(numberOfLines);
console.log(bet);
