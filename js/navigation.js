// https://api.shrtco.de/v2/

// Open Navigation

const burgerBtn = document.querySelector("button");
const navigationMenu = document.getElementById("navigationMenu");

burgerBtn.addEventListener("click", (_) => {
  if (burgerBtn.getAttribute("aria-expanded") == "true") {
    burgerBtn.setAttribute("aria-expanded", "false");
  } else {
    burgerBtn.setAttribute("aria-expanded", "true");
  }
});
