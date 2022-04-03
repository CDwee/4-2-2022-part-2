// Started at 12:59 4-2-2022

const calcDisplaySummary = function(movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(desposit => (desposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1; 
    })
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`
};
calcDisplaySummary(account1.movements)

// Chaining methods
const euroToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDespositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUsd 
  })
  // .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDespositsUSD);

// Coding challenge #3
const calcAverageHumanAge2 = function(ages) {
  const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
  const adults = humanAges.filter(age => age >= 18)
  
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length, 0
    );

  return average
};

const calcAverageHumanAge = ages => 
  ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18).
  reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// The Find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // Prevent from from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance 
    calcDisplayBalance(currentAccount.movements);

    // Display summary
    calcDisplaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
      amount > 0 && 
      receiverAcc &&
      currentAccount.balance >= amount && 
      receiverAcc?.username !== currentAccount.username
      ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount)

        // Update UI
        updateUI(currentAccount)
      }
});

const updateUI = function (acc) {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcDisplayBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
};

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(
    inputCloseUsername.value === currentAccount.username &&
     Number(inputClosePin.value) === currentAccount.pin
     ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
        );
        console.log(index);
        // .indexOf(23)

      // Delete account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0;
      } ;

      inputCloseUsername.value = inputClosePin.value = '';
});

// Ended at 8:01 4-2-2022
