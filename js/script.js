"use strict";

class Calculator {
  constructor(prevDisplay, currentDisplay) {
    this.prevDisplay = prevDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();
  }

  clear() {
    this.currentValue = 0;
    this.prevValue = "";
    this.operator = undefined;
  }

  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  appendToDisplay(number) {
    if (number === "." && this.currentValue.includes(".")) return;
    this.currentValue = String(this.currentValue) + String(number);
  }

  chooseOperator(operator) {
    if (!this.currentValue) return;
    if (this.prevValue !== "") {
      this.compute();
    }
    this.operator = operator;
    this.prevValue = this.currentValue;
    this.currentValue = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.prevValue);
    const current = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "/":
        result = prev / current;
        break;
      case "x":
        result = prev * current;
        break;
      default:
        return;
    }

    this.currentValue = result;
    this.operator = undefined;
    this.prevValue = "";
  }

  getDisplayNumber(number) {
    const stringNumber = String(number);
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) integerDisplay = "";
    else
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });

    if (decimalDigits != null) return `${integerDisplay}.${decimalDigits}`;
    else return integerDisplay;
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.getDisplayNumber(this.currentValue);
    if (this.operator) {
      this.prevDisplay.innerText = `${this.getDisplayNumber(this.prevValue)} ${
        this.operator
      }`;
    } else {
      this.prevDisplay.innerText = "";
    }
  }
}

const themeToggler = document.querySelector(".toggle__switch");
const body = document.querySelector("body");
let currentTheme = document.querySelector("input[type='radio']:checked").value;
const numButtons = document.querySelectorAll("[data-type='num']");
const operatorButtons = document.querySelectorAll("[data-type='operator']");
const delButton = document.querySelector('[data-type="del"]');
const resetButton = document.querySelector('[data-type="reset"]');
const getResultButton = document.querySelector('[data-type="submit"]');
const prevDisplay = document.querySelector(".display__prev");
const currentDisplay = document.querySelector(".display__current");

const changeTheme = function (e) {
  const newTheme = e.target.value;
  body.classList.replace(currentTheme, newTheme);
  currentTheme = newTheme;
};

themeToggler.addEventListener("change", changeTheme);

const calculator = new Calculator(prevDisplay, currentDisplay);

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendToDisplay(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

resetButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

getResultButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
