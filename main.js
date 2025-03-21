var phones = [
    { id: 1, name: "iPhone 13", price: 799, description: "iPhone 13 - Apple'ning 2021-yilda chiqarilgan smartfoni. U A15 Bionic chipi, 6.1 dyuymli Super Retina XDR displeyi, 12 MP ikkita kamera tizimi va 3227 mAh batareyaga ega. iOS ekotizimida silliq ishlaydi va yaxshi quvvat tejash xususiyatiga ega." },
    { id: 2, name: "Samsung Galaxy S23", price: 699, description: "Samsung Galaxy S23 - 2023-yilda chiqarilgan flagman smartfon. U Snapdragon 8 Gen 2 chipi, 6.1 dyuymli Dynamic AMOLED 2X displey, 50 MP asosiy kamera va 3900 mAh batareyaga ega. Tez ishlaydi, mukammal kamera tizimi va uzoq quvvat saqlash imkoniyati bilan ajralib turadi." },
    { id: 3, name: "Xiaomi 14", price: 499, description: "Xiaomi 14 - 2023-yilda chiqarilgan flagman. Snapdragon 8 Gen 3 chipi, 6.36 AMOLED 120Hz displey, Leica kameralar (50 MP), va 4610 mAh batareya bilan tezkor ishlash va yaxshi surat sifati ta'minlanadi." },
    { id: 4, name: "Google Pixel 7", price: 599, description: "Google Pixel 7 - Google'ning 2022-yilgi smartfoni. Tensor G2 chipi, 6.3 OLED 90Hz displey, 50 MP kamera va toza Android tajribasi bilan mashhur. Sun'iy intellektli kamera tizimi va uzoq yangilanish" },
    { id: 5, name: "OnePlus 11", price: 649, description: "OnePlus 11 - Kuchli OnePlus flagmani. Snapdragon 8 Gen 2 chipi, 6.7 AMOLED 120Hz LTPO displey, 50 MP Hasselblad kamera va 5000 mAh batareya bilan yuqori tezlik va samaradorlikni ta'minlaydi." },
    { id: 6, name: "Huawei P50", price: 549, description: "Huawei P50 - Huawei'ning kuchli kamerali smartfoni. Snapdragon 888 4G chipi, 6.5 OLED 90Hz displey, Leica bilan ishlangan 50 MP kamera va HarmonyOS tizimi bilan ishlaydi. Google xizmati yo'q." },
    { id: 7, name: "Nokia G60", price: 299, description: "Nokia G60 - Byudjet segmentida mustahkam smartfon. Snapdragon 695 chipi, 6.58 120Hz IPS displey, 50 MP kamera va 4500 mAh batareyasi bilan uzoq ishlashni ta'minlaydi. Android yangilanishlari kafolatlangan." },
    { id: 8, name: "Oppo Reno 8", price: 449, description: " Oppo Reno 8 - O'rta segmentdagi kuchli smartfon. MediaTek Dimensity 1300 chipi, 6.4 AMOLED 90Hz displey, 50 MP kamera va 4500 mAh batareya bilan yaxshi ishlash va tez quvvat olish imkonini beradi." },
];
var cart = [];
var productsContainer = document.getElementById("products");
var cartMenu = document.getElementById("cart-menu");
var cartCount = document.getElementById("cart-count");
var cartButton = document.querySelector(".cart");
var mainPageContent = productsContainer.innerHTML; // Asosiy sahifani saqlash
function showDetails(phoneId) {
    var phone = phones.find(function (p) { return p.id === phoneId; });
    if (phone) {
        var details = document.createElement("div");
        details.classList.add("card");
        details.innerHTML = "\n            <img src=\"./images/".concat(phone.name.toLowerCase().replace(/\s+/g, ''), ".jpg\" alt=\"").concat(phone.name, "\">\n            <h3>").concat(phone.name, "</h3>\n            <p>").concat(phone.description, "</p>\n            <p>Narxi: $").concat(phone.price, "</p>\n            <button onclick=\"addToCart(").concat(phone.id, ")\">Savatga joylash</button>\n            <button onclick=\"showMainPage()\">Orqaga</button>\n        ");
        productsContainer.innerHTML = "";
        productsContainer.appendChild(details);
    }
}
function showMainPage() {
    productsContainer.innerHTML = mainPageContent;
}
function addToCart(phoneId) {
    var phone = phones.find(function (p) { return p.id === phoneId; });
    if (phone) {
        var existingItem = cart.find(function (item) { return item.phone.id === phoneId; });
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            cart.push({ phone: phone, quantity: 1 });
        }
        updateCart();
    }
}
function updateCart() {
    cartCount.textContent = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0).toString();
    cartMenu.innerHTML = "";
    cart.forEach(function (item) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = "\n            <span>".concat(item.phone.name, " ($").concat(item.phone.price, ")</span>\n            <div>\n                <button onclick=\"changeQuantity(").concat(item.phone.id, ", -1)\">-</button>\n                <span>").concat(item.quantity, "</span>\n                <button onclick=\"changeQuantity(").concat(item.phone.id, ", 1)\">+</button>\n            </div>\n        ");
        cartMenu.appendChild(cartItem);
    });
    cartMenu.innerHTML += "<button onclick=\"checkout()\">Zakaz qilish</button>";
}
function changeQuantity(phoneId, change) {
    var item = cart.find(function (item) { return item.phone.id === phoneId; });
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(function (i) { return i.phone.id !== phoneId; });
        }
        updateCart();
    }
}
function checkout() {
    alert("Zakazingiz qabul qilindi!");
    cart = [];
    updateCart();
    cartMenu.classList.add("hidden");
}
cartButton.addEventListener("click", function () {
    cartMenu.classList.toggle("hidden");
});
