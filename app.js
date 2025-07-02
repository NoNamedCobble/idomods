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
  const slides = wrapper.querySelectorAll(".swiper-slide");
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

class ProductService {
  apiUrl = "https://brandstestowy.smallhost.pl/api/random";
  gridContainer = document.querySelector(".product-listing-section__grid");
  pageSize = 14;
  totalPages = 1;
  currentPage = 0;
  isLoading = false;

  getProducts = async () => {
    const url = `${this.apiUrl}?pageNumber=${this.currentPage}&pageSize=${this.pageSize}`;
    this.isLoading = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      this.totalPages = data.totalPages;

      return data.data;
    } catch (error) {
      console.error("getProductsError:", error);
    } finally {
      this.isLoading = false;
    }
  };

  renderProducts = async (products) => {
    products.forEach(({ image, text, id }) => {
      const gridItem = document.createElement("button");
      gridItem.classList.add("product-listing-section__grid-item");

      const img = document.createElement("img");
      img.classList.add("product-listing__grid-item-img");
      img.src = image;
      img.alt = text;

      const span = document.createElement("span");
      span.textContent = `ID: ${id}`;
      span.classList.add("product-listing-section__grid-item-title");

      gridItem.appendChild(span);
      gridItem.appendChild(img);

      this.gridContainer.appendChild(gridItem);
    });
  };

  clearProducts = () => {
    const gridItems = this.gridContainer.querySelectorAll(".product-listing-section__grid-item");
    gridItems.forEach((item) => item.remove());
  };

  changePageSize = async (newPageSize) => {
    this.pageSize = newPageSize;
    this.currentPage = 0;
    this.clearProducts();
    this.loadNextPage();
  };

  loadNextPage = async () => {
    if (this.isLoading || this.currentPage >= this.totalPages) return;
    this.currentPage++;
    const products = await this.getProducts();
    this.renderProducts(products);
  };
}

const productService = new ProductService();

document
  .querySelector(".product-listing-section__select")
  .addEventListener("change", (e) => productService.changePageSize(e.target.value));

const trigger = document.querySelector(".product-listing-section__grid-scroll-trigger");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        productService.loadNextPage();
      }
    });
  },
  {
    root: null,
    rootMargin: "500px",
    threshold: 0.1,
  }
);
observer.observe(trigger);
