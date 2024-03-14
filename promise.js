const apiUrl = 'https://fakestoreapi.com/products?limit=10';
const PRODUCTS_PER_LOAD = 5;
let currentPage = 1;
let totalProducts = 0;
let displayedProducts = 0;

const productsContainer = document.getElementById("products-container");
const loadProductsBtn = document.getElementById("load-products-btn");
const loadMoreBtn = document.getElementById("load-more-btn");

// Hiển thị số lượng sản phẩm đầu tiên
loadProductsBtn.addEventListener("click", async () => {
    loadProductsBtn.style.display = "none";
    const products = await fetchProducts(currentPage);
    totalProducts = products.length;
    displayedProducts = PRODUCTS_PER_LOAD;
    renderProducts(products.slice(0, PRODUCTS_PER_LOAD));
    if (totalProducts > PRODUCTS_PER_LOAD) {
        loadMoreBtn.style.display = "block";
    }
});

// Hiển thị thêm sản phẩm khi nhấn nút "Tải thêm"
loadMoreBtn.addEventListener("click", async () => {
    currentPage++;
    const products = await fetchProducts(currentPage);
    renderMoreProducts(products.slice(displayedProducts, displayedProducts + PRODUCTS_PER_LOAD));
    displayedProducts += PRODUCTS_PER_LOAD;
    if (displayedProducts >= totalProducts) {
        loadMoreBtn.style.display = "none";
    }
});

async function fetchProducts(page) {
    const response = await fetch(`${apiUrl}&page=${page}`);
    const data = await response.json();
    return data;
}

function renderProducts(products) {
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

function renderMoreProducts(products) {
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

function createProductElement(product) {
    const { image, title, price, rating } = product;

    const element = document.createElement("div");
    element.classList.add("product");
    element.innerHTML = `
        <img src="${image}" alt="${title}" />
        <h3>${title}</h3>
        <p class="price">$${price}</p>
        <p class="rating">Rating: ${rating.rate} (${rating.count} reviews)</p>
    `;
    return element;
}