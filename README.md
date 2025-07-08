# Blushy Cheeks

**Blushy Cheeks** is an aesthetic e-commerce website for cute, handmade accessories and gifts. Customers can explore new arrivals, shop by category or price, and enjoy a seamless shopping cart experience—all with a playful, modern, and mobile-friendly design.

---

## ✨ Features

- **New Arrivals**: Highlighted latest products to catch your attention.
- **Shop by Category**: Browse through categories like Crochet, Keychains, Rings, Cute Decor, Gifts, and Accessories.
- **Shop by Price**: Filter products by price ranges for budget-friendly or premium finds.
- **All Products**: View the entire product catalog with a convenient "view more" load system.
- **Cart & Checkout**: Add items to your cart and checkout via Instagram DM with a single click.
- **Responsive Design**: Fully mobile-friendly and optimized for all devices.
- **Accessible UI**: Keyboard navigation, focus styles, and ARIA labels for an inclusive experience.

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/blushy-cheeks.git
cd blushy-cheeks
```

### 2. **Folder Structure**

```
blushy-cheeks/
├── images/             # All product and banner images
├── index.html          # Main website file
├── style.css           # Stylesheet
├── script.js           # Main JavaScript logic
└── README.md           # This file
```

### 3. **Add Your Images**

- Place all product images in the `images/` folder.
- Update product image paths in `script.js` under the `productData` object.

### 4. **Open in Browser**

Simply open `index.html` in your favorite web browser.

---

## 🛠️ Customization

### **Add a New Product**

Edit the `productData` object in `script.js`:

```js
'NA015': {
    name: 'Kawaii Bunny Plushie',
    price: 499,
    images: ['images/bunny.png'],
    colors: ['white', 'pink'],
    description: 'Super soft, super cute bunny!',
    category: 'cute-decor'
},
```

### **Add a New Category**

1. Update the `categoryMap` in `script.js`.
2. Add a new `.category-card` in the "Shop by Category" section in `index.html`.
3. Use the new category key in your product’s `category` field.

### **Update Price Ranges**

Edit the `populatePriceOptions` and `filterAllProductsByPrice` functions in `script.js` to customize price filtering.

---

## 📱 Responsive & Accessible

- Optimized for mobile, tablet, and desktop.
- Keyboard accessible navigation and modal dialogs.
- ARIA labels for improved screen reader support.

---

## 🤝 Connect

- [Instagram](https://www.instagram.com/anushka.this.sidee/)
- [Pinterest](#)

---

## 📄 License

This project is for educational and personal portfolio use. For commercial use, please contact the owner.

---

## 🙏 Credits

- [FontAwesome](https://fontawesome.com/) for icons.
- [Google Fonts](https://fonts.google.com/) for typography.
- [Unsplash](https://unsplash.com/) and your own images for product visuals.

---

**Made with 💕 for aesthetic lovers.**
