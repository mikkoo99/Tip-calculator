const inputBillValue = document.querySelector(".bill-value");
const inputNumberOfPeople = document.querySelector(".number-of-people");
const amountTipResult = document.querySelector(".tip-amount-result");
const totalTipResult = document.querySelector(".total-tip-result");
const btnsTip = document.querySelectorAll(".btn-tip");
const btnCheck = document.querySelector(".btn-check");
const btnReset = document.querySelector(".btn-reset");
let inputValue;
let numberOfPeopleValue;
let tipValue;

const changePercentageToNumber = function (number) {
  if (number.length === 2) {
    return number.slice(0, 1) * 0.01;
  } else {
    return number.slice(0, 2) * 0.01;
  }
};
inputBillValue.addEventListener("input", function (e) {
  inputValue = Number(e.target.value);
});
inputNumberOfPeople.addEventListener("input", function (e) {
  numberOfPeopleValue = Number(e.target.value);
});

btnsTip.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (btn.textContent !== "Custom") {
      tipValue = changePercentageToNumber(btn.textContent);
    } else {
      btn.hide;
    }
  });
});
btnCheck.addEventListener("click", function () {
  amountTipResult.textContent = inputValue * tipValue;
  totalTipResult.textContent = (inputValue * tipValue) / numberOfPeopleValue;
});
btnReset.addEventListener("click", function () {
  inputBillValue.value = "";
  inputNumberOfPeople.value = "";
  amountTipResult.textContent = "0.00$";
  totalTipResult.textContent = "0.00$";
});
