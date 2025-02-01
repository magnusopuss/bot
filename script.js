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
      <button onclick="addToCart(${product.id})">+</button>
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

// Обновление корзины
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalPriceElement = document.getElementById('totalPrice');
  const cartCountElement = document.getElementById('cartCount');

  // Очищаем текущие товары в корзине
  cartItemsContainer.innerHTML = '';

  // Рассчитываем общую сумму
  let total = 0;

  cart.forEach(item => {
    const price = parseInt(item.price.replace(' руб.', '')); // Убираем "руб." и преобразуем в число
    const itemTotal = price * item.quantity;
    total += itemTotal;

    // Создаем элемент для товара в корзине
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} (${item.quantity} шт.)</span>
      <span>${itemTotal} руб.</span>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Обновляем общую сумму и счетчик товаров
  totalPriceElement.textContent = `${total} руб.`;
  cartCountElement.textContent = cart.length > 0 ? cart.length : '';
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

// Переключение страницы корзины
document.getElementById('cartIcon').addEventListener('click', () => {
  document.getElementById('cartPage').classList.remove('hidden');
});

document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('cartPage').classList.add('hidden');
});

// Кнопка "Оплатить"
document.getElementById('checkoutButton').addEventListener('click', () => {
  alert('Переход к оплате...');
  // Здесь можно добавить интеграцию с платежной системой
});
