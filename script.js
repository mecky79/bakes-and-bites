// script.js — Bakes and Bites Live Calculator + Cart

// 1. PRICE MAP
const priceMap = {
  "classic-burger":  250,
  "cheese-burger":   300,
  "chicken-burger":  320,
  "hot-dog":         200,
  "fries-regular":   150,
  "fries-large":     250,
  "wings":           400,
  "samosa":          70,
  "mini-pizza":      350,
  "sausage-roll":    120,
  "chicken-wrap":    300,
  "chapati-beans":   200,
  "cupcakes":        100,
  "doughnuts":       80,
  "slice-cake":      150,
  "cookies":         100,
  "muffins":         120,
  "birthday-cake":   1500,
  "custom-cake":     null,
  "soda":            100,
  "juice":           150,
  "milkshake":       250,
  "tea-coffee":      80,
  "combo-1":         450,
  "combo-2":         300,
  "combo-3":         600
};

// 2. CATEGORY IDs
const categories = [
  "fast-food",
  "quick-bites",
  "bakery",
  "special",
  "drinks",
  "combos"
];

// 3. MAIN FUNCTION
function calculateTotal() {
  let total = 0;
  let hasCustomCake = false;
  const cartItems = [];   // will hold one object per selected item

  categories.forEach(function(category) {
    const select   = document.getElementById(category);
    const qtyInput = document.querySelector('input[name="' + category + '-qty"]');
    const qty      = parseInt(qtyInput.value) || 1;
    const selectedValue = select.value;

    if (selectedValue !== "") {
      // Get the readable name from the option text, strip the price part
      const optionText = select.options[select.selectedIndex].text;
      const itemName   = optionText.split("—")[0].trim();
      const price      = priceMap[selectedValue];

      if (price === null) {
        hasCustomCake = true;
        cartItems.push({
          name:   itemName,
          qty:    qty,
          price:  null    // custom — no fixed price
        });
      } else {
        const subtotal = price * qty;
        total += subtotal;
        cartItems.push({
          name:     itemName,
          qty:      qty,
          price:    price,
          subtotal: subtotal
        });
      }
    }
  });

  // 4. RENDER THE CART
  renderCart(cartItems);

  // 5. UPDATE TOTAL DISPLAY
  const display = document.getElementById("display");
  const note    = document.getElementById("total-note");

  if (cartItems.length === 0) {
    display.value    = "KSh 0";
    note.textContent = "Select items above to see your total";
  } else if (hasCustomCake) {
    display.value    = "KSh " + total.toLocaleString() + "+";
    note.textContent = "Custom cake price will be confirmed by our team";
  } else {
    display.value    = "KSh " + total.toLocaleString();
    note.textContent = "Delivery fee not included";
  }
}

// 6. CART RENDERER — builds the HTML for each cart row
function renderCart(cartItems) {
  const cartList = document.getElementById("cart-list");

  // If nothing selected, show the empty message
  if (cartItems.length === 0) {
    cartList.innerHTML = '<p class="cart-empty">No items selected yet. Start picking above!</p>';
    return;
  }

  // Otherwise build a row for each item
  let html = "";

  cartItems.forEach(function(item) {
    const priceDisplay = item.price === null
      ? '<span class="cart-item-custom">Price on request</span>'
      : '<span class="cart-item-price">KSh ' + item.subtotal.toLocaleString() + '</span>';

    html += '<div class="cart-item">'
          +   '<span class="cart-item-name">'  + item.name + '</span>'
          +   '<span class="cart-item-qty">x'  + item.qty  + '</span>'
          +   priceDisplay
          + '</div>';
  });

  cartList.innerHTML = html;
}

// 7. ATTACH EVENT LISTENERS
categories.forEach(function(category) {
  document.getElementById(category)
    .addEventListener("change", calculateTotal);

  document.querySelector('input[name="' + category + '-qty"]')
    .addEventListener("input", calculateTotal);
});

// 8. RUN ONCE ON LOAD
calculateTotal();

// 9.SLIDER
