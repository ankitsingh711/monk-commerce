# Frontend Developer Assignment - Monk Commerce

## Overview
This project is an e-commerce store product management page built using React.js. It allows store owners to manage their product list by adding new products, modifying existing products, applying discounts, and reordering products or variants.

## Features
- **Product List**: Display and manage the list of products with options to add or remove products, apply discounts, and reorder products using drag and drop.
- **Product Picker**: A dialog box that allows the user to search for and select products to replace an existing product on the list.
- **Pagination**: Implements a scroll-based pagination in the product picker, loading 10 products at a time.
- **Add Product Button**: Adds a new empty product to the end of the list for customization.

## Requirements
- React.js for building the frontend components.
- An API for fetching product data.
- Ability to add, edit, reorder, and remove products from the list.
- Discount options (flat or percentage) on products and variants.

## Components
### 1. Product List
- Displays the list of products.
- Each product may have multiple variants.
- Users can:
  - Add a discount (flat or percentage) to a product or variant.
  - Rearrange the order of products using drag-and-drop.
  - Remove products by clicking the "x" icon (only visible when more than one product exists in the list).
  
### 2. Product Picker
- A dialog box for selecting products from the store.
- The picker is triggered by clicking the edit icon next to a product.
- The picker includes a search bar for finding products by name.
- Users can select multiple products and variants. The product being edited will be replaced by the selected products.
- Pagination: Displays 10 products at a time, with additional products loaded on scroll.

### 3. Add Product Button
- Adds an empty product to the list, which can then be customized by the user.

## Setup and Installation

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation Steps
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>


[
  {
    "id": 77,
    "title": "Fog Linen Chambray Towel - Beige Stripe",
    "variants": [
      { "id": 1, "product_id": 77, "title": "XS / Silver", "price": "49" },
      { "id": 2, "product_id": 77, "title": "S / Silver", "price": "49" },
      { "id": 3, "product_id": 77, "title": "M / Silver", "price": "49" }
    ],
    "image": { "id": 266, "product_id": 77, "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1" }
  },
  {
    "id": 80,
    "title": "Orbit Terrarium - Large",
    "variants": [
      { "id": 64, "product_id": 80, "title": "Default Title", "price": "109" }
    ],
    "image": { "id": 272, "product_id": 80, "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1" }
  }
]


/src
  /components
    /ProductList
    /ProductPicker
    /ProductItem
    /AddProductButton
  /api
    api.js
  /styles
    styles.css
  App.js
  index.js




This README file provides clear instructions and outlines the structure of your application, along with a detailed explanation of each component and its functionality. It includes necessary setup instructions, API documentation, and details on how to run the project.
