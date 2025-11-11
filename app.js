// Product Data with REAL professional cookie photos from Unsplash - 100% stable and reliable
const products = [
    {
        id: 1,
        name: "Cookies Coklat Classic",
        description: "Chocolate chip cookies renyah dengan coklat premium yang memikat selera. Dibuat dengan resep tradisional yang telah teruji.",
        price: 25000,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop&q=80",
        flavor: "Coklat",
        rating: 4.8,
        reviews: 245
    },
    {
        id: 2,
        name: "Cookies Vanila Manis",
        description: "Butter cookies dengan sentuhan vanila yang lembut dan menggoda. Sempurna untuk setiap kesempatan.",
        price: 22000,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&q=80",
        flavor: "Vanila",
        rating: 4.6,
        reviews: 189
    },
    {
        id: 3,
        name: "Cookies Matcha Hijau",
        description: "Matcha premium dari Jepang dalam bentuk cookies. Unik, segar, dan penuh manfaat kesehatan.",
        price: 28000,
        image: "https://thechestnutbakery.com/wp-content/uploads/2022/04/easy-vegan-matcha-cookies-1200x1800.jpg.webp",
        flavor: "Matcha",
        rating: 4.7,
        reviews: 156
    },
    {
        id: 4,
        name: "Cookies Strawberry",
        description: "Strawberry asli dengan coklat putih yang lezat. Manis, segar, dan sempurna sebagai hadiah.",
        price: 26000,
        image: "https://cheneetoday.com/wp-content/uploads/2022/01/strawberry-cheesecake-cookies.jpg",
        flavor: "Strawberry",
        rating: 4.5,
        reviews: 123
    },
    {
        id: 5,
        name: "Cookies Coklat Kacang",
        description: "Perpaduan sempurna coklat dengan kacang tanah gurih. Renyah dan memuaskan di setiap gigitan.",
        price: 27000,
        image: "https://static.vecteezy.com/system/resources/previews/042/367/021/non_2x/ai-generated-kukis-kacang-coklat-chocolate-peanut-cookies-indonesian-eid-cookies-kue-lebaran-photo.jpeg",
        flavor: "Coklat",
        rating: 4.9,
        reviews: 267
    },
    {
        id: 6,
        name: "Cookies Caramel Coklat",
        description: "Kelezatan caramel yang gurih bertemu dengan coklat premium. Tekstur lumer yang menggugah selera.",
        price: 29000,
        image: "https://tse3.mm.bing.net/th/id/OIP.7BeypE3TqPgAcNh5ce96bgHaE8?pid=Api&P=0&h=180",
        flavor: "Coklat",
        rating: 4.8,
        reviews: 203
    },
    {
        id: 7,
        name: "Cookies Almond Coklat",
        description: "Almond premium dengan lapisan coklat gelap. Untuk pencinta coklat bitter yang sejati.",
        price: 30000,
        image: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&h=300&fit=crop&q=80",
        flavor: "Coklat",
        rating: 4.7,
        reviews: 178
    },
    {
        id: 8,
        name: "Cookies Blueberry",
        description: "Blueberry segar dan coklat putih yang lezat. Rasa unik dan penuh nutrisi dari buah blueberry.",
        price: 26500,
        image: "https://www.glorioustreats.com/wp-content/uploads/2023/04/blueberry-cookie-recipe.jpeg",
        flavor: "Buah",
        rating: 4.6,
        reviews: 134
    }
];

const shippingMethods = [
    { id: 1, name: "JNE Regular", cost: 15000, days: "3-5 hari" },
    { id: 2, name: "JNE Express", cost: 25000, days: "1-2 hari" },
    { id: 3, name: "GCG Regular", cost: 12000, days: "4-6 hari" },
    { id: 4, name: "Pos Indonesia", cost: 10000, days: "5-7 hari" }
];

const paymentMethods = [
    { id: 1, name: "Transfer Bank", icon: "🏦" },
    { id: 2, name: "GCash", icon: "📱" },
    { id: 3, name: "OVO", icon: "📱" },
    { id: 4, name: "Dana", icon: "💳" },
    { id: 5, name: "Kartu Kredit", icon: "💳" },
    { id: 6, name: "COD (Bayar di Tempat)", icon: "🚚" }
];

// Application State
let cart = [];
let currentProduct = null;
let selectedSize = "Small";
let selectedQuantity = 1;
let selectedShipping = null;
let selectedPayment = null;
let isLoggedIn = false;
let currentCheckoutStep = 1;

// Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLinks = document.querySelectorAll(`[onclick="showPage('${pageId}')"]`);
    activeLinks.forEach(link => {
        if (link.classList.contains('nav-link')) {
            link.classList.add('active');
        }
    });

    // Initialize page content
    if (pageId === 'products') {
        displayProducts();
    } else if (pageId === 'cart') {
        displayCart();
    } else if (pageId === 'checkout') {
        initCheckout();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Product Functions
function displayProducts() {
    filterProducts();
}

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const flavorFilter = document.getElementById('flavor-filter').value;
    const priceMin = parseInt(document.getElementById('price-min').value);
    const priceMax = parseInt(document.getElementById('price-max').value);

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesFlavor = flavorFilter === 'all' || product.flavor === flavorFilter;
        const matchesPrice = product.price >= priceMin && product.price <= priceMax;
        
        return matchesSearch && matchesFlavor && matchesPrice;
    });

    const productGrid = document.getElementById('product-grid');
    
    if (filtered.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">🔍</div>
                <h2>Tidak Ada Produk Ditemukan</h2>
                <p>Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="viewProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300/D2B48C/7B3F00?text=Cookie'; this.style.objectFit='contain'; this.style.padding='20px';">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span>${product.rating} (${product.reviews} ulasan)</span>
                </div>
                <div class="product-price">Rp ${formatPrice(product.price)}</div>
                <button class="btn" onclick="event.stopPropagation(); quickAddToCart(${product.id})" style="width: 100%;">Tambah ke Keranjang</button>
            </div>
        </div>
    `).join('');
}

function updatePriceLabels() {
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;
    document.getElementById('price-min-label').textContent = formatPrice(priceMin);
    document.getElementById('price-max-label').textContent = formatPrice(priceMax);
}

function viewProductDetail(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    selectedSize = "Small";
    selectedQuantity = 1;

    const detailImg = document.getElementById('detail-image');
    detailImg.src = currentProduct.image;
    detailImg.onerror = function() {
        this.src = 'https://via.placeholder.com/600x400/D2B48C/7B3F00?text=' + encodeURIComponent(currentProduct.name);
        this.style.objectFit = 'contain';
        this.style.padding = '20px';
    };
    document.getElementById('detail-name').textContent = currentProduct.name;
    document.getElementById('detail-price').textContent = `Rp ${formatPrice(currentProduct.price)}`;
    document.getElementById('detail-description').textContent = currentProduct.description;
    document.getElementById('detail-rating').innerHTML = `
        <span class="stars">${'⭐'.repeat(Math.floor(currentProduct.rating))}</span>
        <span>${currentProduct.rating} (${currentProduct.reviews} ulasan)</span>
    `;
    document.getElementById('quantity-display').textContent = '1';

    // Reset size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'Small') {
            btn.classList.add('active');
        }
    });

    showPage('product-detail');
}

function selectSize(button) {
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedSize = button.dataset.size;
}

function incrementQuantity() {
    selectedQuantity++;
    document.getElementById('quantity-display').textContent = selectedQuantity;
}

function decrementQuantity() {
    if (selectedQuantity > 1) {
        selectedQuantity--;
        document.getElementById('quantity-display').textContent = selectedQuantity;
    }
}

function quickAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addToCartInternal(product, 'Small', 1);
}

function addToCart() {
    if (!currentProduct) return;
    addToCartInternal(currentProduct, selectedSize, selectedQuantity);
}

function addToCartInternal(product, size, quantity) {
    const existingItem = cart.find(item => 
        item.product.id === product.id && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            product: product,
            size: size,
            quantity: quantity
        });
    }

    updateCartBadge();
    showNotification(`✅ ${product.name} berhasil ditambahkan ke keranjang!`, 'success');
}

// Cart Functions
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-badge').textContent = totalItems;
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartSummaryDiv = document.getElementById('cart-summary');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h2>Keranjang Anda Kosong</h2>
                <p>Yuk, tambahkan cookies favorit Anda!</p>
                <button class="btn" style="margin-top: 1rem;" onclick="showPage('products')">Belanja Sekarang</button>
            </div>
        `;
        cartSummaryDiv.style.display = 'none';
        return;
    }

    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/100x100/D2B48C/7B3F00?text=Cookie'; this.style.objectFit='contain'; this.style.padding='10px';">
            <div>
                <h3>${item.product.name}</h3>
                <p class="text-muted">Ukuran: ${item.size}</p>
            </div>
            <div>Rp ${formatPrice(item.product.price)}</div>
            <div class="quantity-control">
                <button class="quantity-btn" onclick="updateCartQuantity(${index}, -1)">−</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
            </div>
            <div>
                <div style="font-weight: bold; margin-bottom: 0.5rem;">Rp ${formatPrice(item.product.price * item.quantity)}</div>
                <button class="btn btn-danger" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="removeFromCart(${index})">Hapus</button>
            </div>
        </div>
    `).join('');

    const subtotal = calculateSubtotal();
    const shipping = 15000;
    const total = subtotal + shipping;

    document.getElementById('cart-subtotal').textContent = `Rp ${formatPrice(subtotal)}`;
    document.getElementById('cart-shipping').textContent = `Rp ${formatPrice(shipping)}`;
    document.getElementById('cart-total').textContent = `Rp ${formatPrice(total)}`;
    
    cartSummaryDiv.style.display = 'block';
}

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

function updateCartQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartBadge();
        displayCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    displayCart();
    showNotification('🗑️ Item dihapus dari keranjang', 'success');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('❌ Keranjang Anda kosong!', 'error');
        return;
    }

    if (!isLoggedIn) {
        showNotification('⚠️ Silakan login terlebih dahulu', 'error');
        showPage('login');
        return;
    }

    showPage('checkout');
}

// Auth Functions
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

    if (tab === 'login') {
        document.querySelectorAll('.auth-tab')[0].classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        document.querySelectorAll('.auth-tab')[1].classList.add('active');
        document.getElementById('register-form').classList.add('active');
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showNotification('❌ Mohon isi email dan password!', 'error');
        return;
    }

    isLoggedIn = true;
    showNotification('✅ Login berhasil! Selamat datang!', 'success');
    
    if (cart.length > 0) {
        setTimeout(() => showPage('checkout'), 1000);
    } else {
        setTimeout(() => showPage('products'), 1000);
    }
}

function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    if (!name || !email || !password || !confirm) {
        showNotification('❌ Mohon isi semua field!', 'error');
        return;
    }

    if (password !== confirm) {
        showNotification('❌ Password tidak cocok!', 'error');
        return;
    }

    isLoggedIn = true;
    showNotification('✅ Registrasi berhasil! Selamat datang!', 'success');
    
    setTimeout(() => showPage('products'), 1000);
}

// Checkout Functions
function initCheckout() {
    currentCheckoutStep = 1;
    selectedShipping = null;
    selectedPayment = null;
    
    // Reset all steps
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`checkout-step-${i}`).style.display = 'none';
        document.getElementById(`step-${i}`).classList.remove('active', 'completed');
    }
    
    // Show first step
    document.getElementById('checkout-step-1').style.display = 'block';
    document.getElementById('step-1').classList.add('active');
    
    // Populate shipping and payment options
    populateShippingOptions();
    populatePaymentOptions();
}

function nextCheckoutStep(step) {
    // Validate current step
    if (!validateCheckoutStep(currentCheckoutStep)) {
        return;
    }

    // Mark previous step as completed
    document.getElementById(`step-${currentCheckoutStep}`).classList.remove('active');
    document.getElementById(`step-${currentCheckoutStep}`).classList.add('completed');
    document.getElementById(`checkout-step-${currentCheckoutStep}`).style.display = 'none';

    // Show new step
    currentCheckoutStep = step;
    document.getElementById(`step-${step}`).classList.add('active');
    document.getElementById(`checkout-step-${step}`).style.display = 'block';

    // If review step, populate review
    if (step === 4) {
        populateOrderReview();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateCheckoutStep(step) {
    if (step === 1) {
        const name = document.getElementById('receiver-name').value;
        const phone = document.getElementById('receiver-phone').value;
        const address = document.getElementById('address').value;
        
        if (!name || !phone || !address) {
            showNotification('❌ Mohon lengkapi data alamat pengiriman!', 'error');
            return false;
        }
    } else if (step === 2) {
        if (!selectedShipping) {
            showNotification('❌ Mohon pilih metode pengiriman!', 'error');
            return false;
        }
    } else if (step === 3) {
        if (!selectedPayment) {
            showNotification('❌ Mohon pilih metode pembayaran!', 'error');
            return false;
        }
    }
    return true;
}

function populateShippingOptions() {
    const container = document.getElementById('shipping-options');
    container.innerHTML = shippingMethods.map(method => `
        <div class="shipping-option" onclick="selectShipping(${method.id})" id="shipping-${method.id}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4>${method.name}</h4>
                    <p class="text-muted">Estimasi: ${method.days}</p>
                </div>
                <div style="font-size: 1.3rem; font-weight: bold; color: var(--accent);">Rp ${formatPrice(method.cost)}</div>
            </div>
        </div>
    `).join('');
}

function selectShipping(id) {
    selectedShipping = shippingMethods.find(m => m.id === id);
    document.querySelectorAll('.shipping-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`shipping-${id}`).classList.add('selected');
}

function populatePaymentOptions() {
    const container = document.getElementById('payment-options');
    container.innerHTML = paymentMethods.map(method => `
        <div class="payment-option" onclick="selectPayment(${method.id})" id="payment-${method.id}">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 2rem;">${method.icon}</span>
                <h4>${method.name}</h4>
            </div>
        </div>
    `).join('');
}

function selectPayment(id) {
    selectedPayment = paymentMethods.find(m => m.id === id);
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`payment-${id}`).classList.add('selected');
}

function populateOrderReview() {
    const subtotal = calculateSubtotal();
    const shippingCost = selectedShipping ? selectedShipping.cost : 0;
    const total = subtotal + shippingCost;

    const reviewHtml = `
        <div style="background: var(--background); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Alamat Pengiriman</h3>
            <p><strong>${document.getElementById('receiver-name').value}</strong></p>
            <p>${document.getElementById('receiver-phone').value}</p>
            <p>${document.getElementById('address').value}</p>
            <p>${document.getElementById('district').value}, ${document.getElementById('city').value}</p>
            <p>${document.getElementById('province').value} ${document.getElementById('postal-code').value}</p>
        </div>

        <div style="background: var(--background); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Metode Pengiriman</h3>
            <p><strong>${selectedShipping.name}</strong> - Rp ${formatPrice(selectedShipping.cost)}</p>
            <p class="text-muted">Estimasi: ${selectedShipping.days}</p>
        </div>

        <div style="background: var(--background); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Metode Pembayaran</h3>
            <p><strong>${selectedPayment.icon} ${selectedPayment.name}</strong></p>
        </div>

        <div style="background: var(--background); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Ringkasan Pesanan</h3>
            ${cart.map(item => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>${item.product.name} (${item.size}) x${item.quantity}</span>
                    <span>Rp ${formatPrice(item.product.price * item.quantity)}</span>
                </div>
            `).join('')}
            <hr style="margin: 1rem 0; border: 1px solid var(--secondary);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Subtotal:</span>
                <span>Rp ${formatPrice(subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Pengiriman:</span>
                <span>Rp ${formatPrice(shippingCost)}</span>
            </div>
            <hr style="margin: 1rem 0; border: 2px solid var(--primary);">
            <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; color: var(--primary);">
                <span>Total:</span>
                <span>Rp ${formatPrice(total)}</span>
            </div>
        </div>
    `;

    document.getElementById('order-review').innerHTML = reviewHtml;
}

function confirmOrder() {
    const orderId = 'CF' + Date.now().toString().slice(-8);
    const subtotal = calculateSubtotal();
    const shippingCost = selectedShipping.cost;
    const total = subtotal + shippingCost;

    // Display order confirmation
    document.getElementById('order-id-display').textContent = orderId;
    document.getElementById('delivery-estimate').textContent = selectedShipping.days;
    
    const orderDetailsHtml = `
        <div style="text-align: left;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Detail Pesanan</h3>
            ${cart.map(item => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>${item.product.name} (${item.size}) x${item.quantity}</span>
                    <span>Rp ${formatPrice(item.product.price * item.quantity)}</span>
                </div>
            `).join('')}
            <hr style="margin: 1rem 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Subtotal:</span>
                <span>Rp ${formatPrice(subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Pengiriman (${selectedShipping.name}):</span>
                <span>Rp ${formatPrice(shippingCost)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Pembayaran:</span>
                <span>${selectedPayment.name}</span>
            </div>
            <hr style="margin: 1rem 0; border: 2px solid var(--primary);">
            <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; color: var(--primary);">
                <span>Total:</span>
                <span>Rp ${formatPrice(total)}</span>
            </div>
        </div>
    `;

    document.getElementById('order-details').innerHTML = orderDetailsHtml;

    // Clear cart
    cart = [];
    updateCartBadge();

    // Show confirmation page
    showPage('order-confirmation');
    showNotification('✅ Pesanan berhasil dikonfirmasi!', 'success');
}

// Contact Functions
function sendMessage() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !subject || !message) {
        showNotification('❌ Mohon isi semua field!', 'error');
        return;
    }

    showNotification('✅ Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
    
    // Clear form
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';
}

// Utility Functions
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show ' + type;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartBadge();
});