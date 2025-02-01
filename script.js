// Проверка, запущено ли приложение в Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;

  // Настройка заголовка Web App
  tg.setHeaderColor("#333");
  tg.setBackgroundColor("#f4f4f4");

  // Получение данных о пользователе
  const user = tg.initDataUnsafe?.user;
  if (user) {
    console.log("Пользователь:", user);
  }
}

// Загрузка данных из JSON
let products = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts(products);
  })
  .catch(error => console.error('Ошибка загрузки данных:', error));

// Отображение товаров
function renderProducts(list) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Очистка предыдущих товаров

  list.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
    `;

    productList.appendChild(card);
  });
}

// Поиск товаров
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}
