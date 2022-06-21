"use strict";

const themeToggler = document.querySelector(".toggle__switch");
const body = document.querySelector("body");
let currentTheme = document.querySelector("input[type='radio']:checked").value;

const changeTheme = function (e) {
  const newTheme = e.target.value;
  body.classList.replace(currentTheme, newTheme);
  currentTheme = newTheme;
};

themeToggler.addEventListener("change", changeTheme);
