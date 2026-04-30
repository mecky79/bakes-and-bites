// script.js — Bakes and Bites Live Calculator

// 1. PRICE MAP — every menu value linked to its price in KSh
const priceMap = {
  // Fast Foods
  "classic-burger":  250,
  "cheese-burger":   300,
  "chicken-burger":  320,
  "hot-dog":         200,
  "fries-regular":   150,
  "fries-large":     250,
  "wings":           400,
  "samosa":          70,

  // Quick Bites
  "mini-pizza":      350,
  "sausage-roll":    120,
  "chicken-wrap":    300,
  "chapati-beans":   200,

  // Bakery
  "cupcakes":        100,
  "doughnuts":       80,
  "slice-cake":      150,
  "cookies":         100,
  "muffins":         120,

  // Special Orders
  "birthday-cake":   1500,
  "custom-cake":     null,   // null = price varies

  // Drinks
  "soda":            100,
  "juice":           150,
  "milkshake":       250,
  "tea-coffee":      80,

  // Combos
  "combo-1":         450,
  "combo-2":         300,
  "combo-3":         600
};

// 2. All category IDs in the form
const categories = [
  "fast-food",
  "quick-bites",
  "bakery",
  "special",
  "drinks",
  "combos"
];

// 3. The main calculator function
function calculateTotal() {
  let total = 0;
  let hasCustomCake = false;

  categories.forEach(function(category) {

    // Grab the dropdown and qty input for this category
    const select = document.getElementById(category);
    const qtyInput = document.querySelector('input[name="' + category + '-qty"]');
    const qty = parseInt(qtyInput.value) || 1;
    const selectedValue = select.value;

    // Only add to total if something is selected
    if (selectedValue !== "") {
      const price = priceMap[selectedValue];

      if (price === null) {
        // Custom cake — can't calculate
        hasCustomCake = true;
      } else if (price !== undefined) {
        total += price * qty;
      }
    }
  });

  // 4. Update what the user sees
  const display = document.getElementById("display");
  const note    = document.getElementById("total-note");

  if (total === 0 && !hasCustomCake) {
    display.value = "KSh 0";
    note.textContent = "Select items above to see your total";
  } else if (hasCustomCake) {
    display.value = "KSh " + total.toLocaleString() + "+";
    note.textContent = "Custom cake price will be confirmed by our team";
  } else {
    display.value = "KSh " + total.toLocaleString();
    note.textContent = "Delivery fee not included";
  }
}

// 5. Listen for changes on every dropdown and qty input
categories.forEach(function(category) {
  document.getElementById(category)
    .addEventListener("change", calculateTotal);

  document.querySelector('input[name="' + category + '-qty"]')
    .addEventListener("input", calculateTotal);
});

// 6. Run once on page load to set the starting state
calculateTotal();