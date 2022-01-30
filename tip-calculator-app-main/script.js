// Selected DOM elements
const inputBillValue = document.querySelector(".bill-value");
const inputNumberOfPeople = document.querySelector(".number-of-people");
const amountTipResult = document.querySelector(".tip-amount-result");
const totalTipResult = document.querySelector(".total-tip-result");
const inputCustom = document.querySelector(".input-custom");
const btnsTip = document.querySelectorAll(".btn-tip");
const btnCheck = document.querySelector(".btn-check");
const btnReset = document.querySelector(".btn-reset");
const errorMsg = document.querySelector(".error-msg");

// Data objects
const billData = {
  billValue: 0,
  isSelected: false,
};
const numberOfPeopleData = {
  numberOfPeopleValue: 0,
  isSelected: false,
};
const tipData = {
  tipValue: 0,
  isSelected: false,
};
const customTipData = {
  customTipValue: 0,
  isSelected: false,
};

// FUNCTION that takes string (15%, 5% etc) as argument and return decimal number (0.15, 0.05 etc)
//method to slice takes string and slice string from beginning to ending set index without ending index
const changePercentageToNumber = function (number) {
  if (number.length === 2) {
    return number.slice(0, 1) * 0.01;
  } else {
    return number.slice(0, 2) * 0.01;
  }
};

// FUNCTION that removes class active from tip buttons
const removeActiveClass = function () {
  for (let i = 0; i < btnsTip.length; i++) {
    if (btnsTip[i].classList.contains("active"))
      btnsTip[i].classList.remove("active");
    else continue;
  }
};

// Buttons tip logic
btnsTip.forEach(function (btn) {
  btn.addEventListener("click", function () {
    inputCustom.value = "";
    tipData.isSelected = false;
    tipData.tipValue = changePercentageToNumber(btn.textContent);
    removeActiveClass();
    this.classList.add("active");
    if (btn.classList.contains("active")) {
      tipData.isSelected = true;
    }
  });
});

// Input bill value
inputBillValue.addEventListener("input", function (e, value, billValueChanged) {
  value = e.target.value;
  if (value.includes(",")) {
    billValueChanged = value.replace(",", ".");
    billData.billValue = Number(billValueChanged).toFixed(2);
    billData.isSelected = true;
  } else {
    billData.billValue = Number(value).toFixed(2);
    billData.isSelected = true;
  }
});
// Input number of people
inputNumberOfPeople.addEventListener("input", function (e, inputValue) {
  inputValue = Number(e.target.value);
  if (inputValue !== 0) {
    errorMsg.classList.add("active-error");
    inputNumberOfPeople.classList.add("input-error-border");
  } else {
    errorMsg.classList.remove("active-error");
    inputNumberOfPeople.classList.remove("input-error-border");
  }
  numberOfPeopleData.numberOfPeopleValue = inputValue;
  numberOfPeopleData.isSelected = true;
});

// Input Custom Value
inputCustom.addEventListener("input", function (e) {
  removeActiveClass();
  if (tipData.isSelected) tipData.isSelected = false;
  customTipData.isSelected = true;
  // If user inputs value is for ex. 42%
  if (e.target.value.includes("%")) {
    customTipData.customTipValue = changePercentageToNumber(e.target.value);
  } else customTipData.customTipValue = Number(e.target.value);
});

// Button check logic
btnCheck.addEventListener("click", function (tipResult, totalResult) {
  if (
    billData.isSelected &&
    numberOfPeopleData.isSelected &&
    (tipData.isSelected || customTipData.isSelected)
  ) {
    if (tipData.isSelected) {
      tipResult = billData.billValue * tipData.tipValue;
      totalResult = tipResult / numberOfPeopleData.numberOfPeopleValue;
      amountTipResult.textContent = `${tipResult.toFixed(2)}$`;
      totalTipResult.textContent = `${totalResult.toFixed(2)}$`;
    } else {
      tipResult = billData.billValue * customTipData.customTipValue;
      totalResult = tipResult / numberOfPeopleData.numberOfPeopleValue;
      amountTipResult.textContent = `${tipResult.toFixed(2)}$`;
      totalTipResult.textContent = `${totalResult.toFixed(2)}$`;
    }
  }
});
// Button reset
btnReset.addEventListener("click", function () {
  inputBillValue.value = "";
  inputNumberOfPeople.value = "";
  inputCustom.value = "";
  tipData.isSelected = false;
  billData.isSelected = false;
  customTipData.isSelected = false;
  numberOfPeopleData.isSelected = false;
  amountTipResult.textContent = "0.00$";
  totalTipResult.textContent = "0.00$";
  removeActiveClass();
});
