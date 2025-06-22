# Minimal E-commerce

A modern, responsive e-commerce front-end application built from scratch with React, TypeScript, Redux, Supabase, and Stripe. This project serves as a portfolio piece demonstrating core front-end development skills, state management, backend integration, and a feature-rich user experience with pure CSS for styling.

## 🚀 Live Demo

[https://sargin-minimal-store.netlify.app/](https://sargin-minimal-store.netlify.app/)

## Features

- **Modern & Clean UI:** Responsive, intuitive, and mobile-friendly design.
- **Product Catalog:** Browse all products, with search and category filtering.
- **Product Details Page:** View detailed information for each product.
- **Shopping Cart:** Add, remove, and update quantities of products in the cart.
- **Favorites:** Mark products as favorites for easy access later.
- **User Authentication:** Supabase-based login/register functionality.
- **Account Page:** View profile and order history.
- **Checkout Flow:** Stripe Checkout integration for secure payments.
- **Order Management:** Orders are saved to Supabase after successful payment.
- **Toast Notifications:** User-friendly feedback for actions like adding to cart, favorites, etc., using `react-hot-toast`.
- **Loading Skeletons:** Improved perceived performance with skeleton screens while product data is being fetched.
- **No Image Fallback:** Displays a placeholder for products without a valid image.

## Tech Stack

- **Frontend:** React 18, TypeScript
- **State Management:** Redux Toolkit
- **Backend:** Supabase (PostgreSQL, Auth)
- **Payments:** Stripe Checkout
- **Routing:** React Router DOM
- **Styling:** Pure CSS (Flexbox & Grid)
- **Notifications:** `react-hot-toast`
- **Loading UI:** `react-loading-skeleton`
- **Build Tool:** Vite
- **Deployment:** Netlify

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later)
- npm (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/adilahmetsargin/minimal-ecommerce.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd minimal-ecommerce
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Stripe Test Payments
- Use the following test card to simulate payments:
  - Card Number: `4242 4242 4242 4242`
  - Expiry: Any future date
  - CVC: Any 3 digits

## Deployment

- The project is automatically deployed to Netlify on every push to the `main` branch.
- Live site: [https://sargin-minimal-store.netlify.app/](https://sargin-minimal-store.netlify.app/)

## Contact

Ahmet Sargin - [adilahmetsargin@gmail.com](mailto:adilahmetsargin@gmail.com)

Project Link: [https://github.com/adilahmetsargin/minimal-ecommerce](https://github.com/adilahmetsargin/minimal-ecommerce)

## 🖼️ Screenshots

### Home (Desktop)
![Home Desktop](public/screenshots/home-desktop.jpeg)

### Home (Mobile)
![Home Mobile](public/screenshots/home-mobile.jpeg)

### All Products
![All Products](public/screenshots/products-desktop.png)

### Cart
![Cart](public/screenshots/cart-desktop.png)

### Favorites
![Favorites](public/screenshots/favorites-desktop.png)

### Product Detail
![Product Detail](public/screenshots/product-detail.png)

### Register
![Register](public/screenshots/register.png)

### Login
![Login](public/screenshots/login.png)
