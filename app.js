// handle toggle nav
const toggleNav = () => {
  const nav = document.querySelector(".header__sidebar");

  nav.classList.toggle("header__sidebar--active");
};

document
  .querySelectorAll(".header__mobile-nav-button, .header__mobile-nav-item")
  .forEach((button) => button.addEventListener("click", () => toggleNav()));

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".swiper-wrapper");

  // duplicate existing slides
  const slides = Array.from(wrapper.querySelectorAll(".swiper-slide"));
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    wrapper.appendChild(clone);
  });

  const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    scrollbar: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper__button--next",
    },
    breakpoints: {
      1200: {
        spaceBetween: 24,
      },
    },
  });
});
