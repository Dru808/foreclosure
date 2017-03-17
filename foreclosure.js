'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {
  var _account = {
    _borrowed : 550000,
    _balance : 286000,
    _monthlyPayment : 1700,
    _defaulted : 0,
    _defaultsToForeclosure : 5,
    _foreclosed : false
  };

  function missPayment() {
    _account._defaulted++;
    if (_account._defaulted === _account._defaultsToForeclosure) {
      _account._foreclosed = true;
    }
  }

  function getBalance() {
    return _account._balance;
  }

  function receivePayment(amount) {
    if (amount < _account._monthlyPayment) {
      missPayment();
    }
    _account._balance -= amount;
  }

  function getMonthlyPayment() {
    return _account._monthlyPayment;
  }

  function isForeclosed() {
    return _account._foreclosed;
  }

  return {

    getBalance : getBalance,
    receivePayment : receivePayment,
    getMonthlyPayment : getMonthlyPayment,
    isForeclosed : isForeclosed
  };
}

function borrower(loan) {
  var _account = {
    _monthlyIncome : 1350,
    _funds : 2800,
    _loan : loan
  };

  function getFunds() {
    return _account._funds;
  }

  function makePayment() {
      if (_account._funds > loan.getMonthlyPayment()) {
        _account._funds -= loan.getMonthlyPayment();
        loan.receivePayment(loan.getMonthlyPayment());
      } else {
        loan.receivePayment(_account._funds);
        _account._funds = 0;

      }
  }

  function payDay() {
    _account._funds += _account._monthlyIncome;
  }

  return {

    getFunds : getFunds,
    makePayment : makePayment,
    payDay : payDay
  };
}

stevesLoan = loan();
steve = borrower(stevesLoan);

while (stevesLoan.isForeclosed() === false) {
  steve.payDay();
  steve.makePayment();
  month++;
  console.log(month);

}
monthsUntilEvicted = month;