// handle toggle nav
const toggleNav = () => {
  const nav = document.querySelector(".header__sidebar");

  nav.classList.toggle("header__sidebar--active");
};

document
  .querySelectorAll(".header__mobile-nav-button, .header__mobile-nav-item")
  .forEach((button) => button.addEventListener("click", () => toggleNav()));
