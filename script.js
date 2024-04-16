fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    handleData(data);
  });

let cartItemCount = 0;

const productElements = [];

// Get DOM elements
const productsContainer = document.querySelector("#products-container");
const searchInput = document.querySelector("#search");
const cartCount = document.querySelector("#cart-count");
const filterContainer = document.querySelector("#filter-container");
const checkboxes = document.querySelectorAll(".check");

function handleData(products) {
  products.forEach((product) => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
    productElements.push(productElement);
  });
}

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.innerHTML = `
        <div class="item bg-gray-100 flex justify-center relative border rounded-xl overflow-hidden cursor-pointer group"
            data-category = "${product.category}"
            data-name = "${product.name}"
        >
            <img src="${product.url}" alt="product" class="w-full h-full object-cover">
            <button class="status bg-black absolute bottom-0 left-0 right-0 py-2 translate-y-full group-hover:translate-y-0 transition">
                Ajouter au favoris
            </button>
        </div>
        <p class="text-xl">${product.name}</p>
        <strong>${product.price}$</strong> 
    `;
  productElement.querySelector(".status").addEventListener("click", updateCart);
  return productElement;
}

function updateCart(e) {
  const btn = e.target;
  if (btn.classList.contains("added")) {
    btn.classList.remove("added");
    btn.classList.add("bg-gray-800");
    btn.classList.remove("bg-red-600");
    btn.innerText = "ajouter au  Favoris ";
    cartItemCount--;
  } else {
    btn.classList.add("added");
    btn.classList.remove("bg-gray-800");
    btn.classList.add("bg-red-600");
    btn.innerText = "supprimer des favoris";
    cartItemCount++;
  }
  cartCount.innerText = cartItemCount;
}

filterContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

function filterProducts() {
  const searchTerm = searchInput.value;
  const selectedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  productElements.forEach((el) => {
    const category = el.firstElementChild.dataset.category;
    const categoryFilter =
      selectedCategories.length === 0 || selectedCategories.includes(category);

    const isSearchTerm = el.firstElementChild.dataset.name.includes(searchTerm);

    console.log(isSearchTerm);

    if (isSearchTerm && categoryFilter) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
}
