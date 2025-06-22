# Contributing to Minimal E-commerce

First off, thank you for considering contributing to this project. Whether you are the original author coming back after a break or a new developer joining the team, this document aims to provide all the necessary information to get you started.

The goal of this document is to establish a set of guidelines and describe the technical architecture to ensure the project remains high-quality, consistent, and easy to maintain.

## Core Philosophy

1.  **Simplicity Over Complexity:** The project prioritizes clean, readable, and straightforward solutions.
2.  **Pure CSS for Styling:** All styling is done with pure CSS, without any UI libraries like Bootstrap or CSS frameworks like Tailwind. This is a deliberate choice to keep the project lightweight and dependency-free.
3.  **Developer Experience:** The project should be easy to set up, run, and develop.

## Project Architecture & Folder Structure

The `src` directory is organized to separate concerns, making the codebase predictable and scalable.

-   `src/components/`: Contains reusable, "dumb" React components that are not tied to a specific page. Examples: `Navbar.tsx`, `ProductCard.tsx`, `Footer.tsx`. These components should receive data and functions as props.

-   `src/pages/`: Contains "smart" components that represent entire pages or routes. Examples: `Home.tsx`, `Cart.tsx`, `ProductDetail.tsx`. These components are responsible for fetching data (if necessary) and laying out the components from `src/components/`.

-   `src/slices/`: This is the heart of our state management. Each file represents a "slice" of the Redux state, managed by Redux Toolkit.
    -   `authSlice.ts`: Manages user authentication state (logged in/out, user info).
    -   `cartSlice.ts`: Manages the shopping cart's contents and logic.
    -   `favoritesSlice.ts`: Manages the user's list of favorite products.
    -   `productSlice.ts`: Manages the product list and search/filter state.

-   `src/data/`: Contains static or mock data used throughout the application, like the `products.ts` array.

-   `src/redux/`: Contains the Redux store configuration (`store.ts`).

-   `src/assets/`: This folder is currently unused but is reserved for static assets like images, fonts, etc., if needed in the future.

## State Management with Redux Toolkit

We use Redux Toolkit for efficient and predictable state management.

-   **Slices:** All state logic is encapsulated in slices. A slice includes the initial state, a set of reducers (functions that handle state changes), and generated action creators.
-   **Accessing State:** Use the `useSelector` hook in your components to read data from the store.
-   **Dispatching Actions:** Use the `useDispatch` hook to dispatch actions (e.g., `dispatch(addToCart(product))`).

## Styling Guide (Pure CSS)

Consistency in styling is key.

1.  **One File Per Component:** Each component has its own dedicated CSS file (e.g., `ProductCard.tsx` imports `ProductCard.css`). This encapsulates styles and makes them easy to locate.
2.  **BEM Naming Convention (Recommended):** To avoid class name collisions and maintain a clear structure, we use the Block-Element-Modifier (BEM) methodology.
    -   **Block:** The standalone component (`.product-card`, `.navbar`).
    -   **Element:** A part of the block (`.product-card__image`, `.navbar__link`).
    -   **Modifier:** A different state or version of a block/element (`.navbar__link--active`, `.product-card--featured`).
3.  **Use CSS Variables:** For common values like primary colors, font sizes, etc., define them as CSS variables in `index.css` to ensure consistency and easy theming.

## How to Add a New Feature (Example: Wishlist)

Here's a step-by-step guide to adding a new feature:

1.  **Create a New Slice:** Create `src/slices/wishlistSlice.ts`. Define its initial state and reducers (e.g., `addToWishlist`, `removeFromWishlist`).
2.  **Add Slice to Store:** Import the new slice's reducer into `src/redux/store.ts` and add it to the `reducer` object.
3.  **Create UI Components:**
    -   Create a new page component `src/pages/Wishlist.tsx`.
    -   Add a "Add to Wishlist" button in `ProductCard.tsx` and `ProductDetail.tsx`.
4.  **Implement Logic:** Use `useDispatch` to call the new actions (`addToWishlist`) from the buttons. Use `useSelector` in the `Wishlist.tsx` page to display the items.
5.  **Add Route:** Add a new route for `/wishlist` in `App.tsx`.
6.  **Add Link:** Add a link to the new wishlist page in the `Navbar.tsx`.

By following these guidelines, we can ensure the project remains a high-quality and professional portfolio piece. 