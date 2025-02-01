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
let cart = []; // Корзина для хранения товаров

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
      <button onclick="addToCart(${product.id})">Добавить в корзину</button>
    `;

    productList.appendChild(card);
  });
}

// Добавление товара в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Проверяем, есть ли товар уже в корзине
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1; // Увеличиваем количество
  } else {
    cart.push({ ...product, quantity: 1 }); // Добавляем новый товар
  }

  updateCart();
}

// Обновление корз
