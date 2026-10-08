# Spice & Spoon — Restaurant Management System

A frontend-only restaurant management app built with React + Vite.
No backend, no database, no TypeScript. All data is saved in the browser's LocalStorage.

Tagline: *Good Food. Great Moments.*

---

## 1. How to run

```bash
npm install
npm run dev
```

Open the URL Vite prints (http://localhost:3000).

To build for submission / hosting:

```bash
npm run build
npm run preview
```

## 2. Demo login

```
Email:    admin@restaurant.com
Password: admin123
```

Or press **Use demo account** on the login page. You can also register a new
account from the Register page and sign in with it.

---

## 3. Folder structure

```
spice-and-spoon/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── components/
    │   ├── DishImage.jsx        photo with emoji fallback
    │   ├── FoodCard.jsx
    │   ├── Icons.jsx            all SVG icons (no icon library)
    │   ├── Layout.jsx           sidebar + navbar frame
    │   ├── Modal.jsx
    │   ├── Navbar.jsx
    │   ├── OrderItem.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── Sidebar.jsx
    │   ├── StatCard.jsx
    │   ├── TableCard.jsx
    │   └── Toast.jsx
    ├── context/
    │   └── AppContext.jsx       all app state + LocalStorage saving
    ├── data/
    │   ├── menuData.js          12 dishes with photos
    │   └── seedData.js          starting tables, orders, customers, users
    ├── pages/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Dashboard.jsx
    │   ├── Menu.jsx
    │   ├── Tables.jsx
    │   ├── Orders.jsx
    │   ├── OrderHistory.jsx
    │   ├── Customers.jsx
    │   └── Profile.jsx
    ├── utils/
    │   ├── format.js            ₹ formatting and dates
    │   └── localStorage.js      get / save helpers
    ├── App.jsx                  all routes
    ├── main.jsx                 entry point
    └── index.css                one stylesheet for the whole app
```

## 4. How the project works (short version)

1. `main.jsx` renders `App.jsx`.
2. `App.jsx` wraps everything in `AppProvider` (the shared state) and sets up
   React Router.
3. `AppContext.jsx` holds users, the logged-in user, the cart, tables, orders
   and customers. Every piece of state is loaded from LocalStorage on startup
   and saved back with a `useEffect` whenever it changes. That is why a refresh
   keeps your data.
4. `ProtectedRoute` checks `user` in the context. If nobody is logged in, it
   redirects to `/login`.
5. Pages never touch LocalStorage directly — they call functions from the
   context (`addToCart`, `placeOrder`, `setTableStatus`, `addCustomer`, ...).
   That keeps every screen in sync: place an order and the dashboard totals,
   the customer's spending and the table status all update at once.

### Order maths

```
subtotal    = sum of (price × quantity)
tax         = subtotal × 5%
grand total = subtotal + tax − discount
```

Order IDs continue from the highest saved one: ORD-1001, ORD-1002, ORD-1003…

## 5. Major features

- Login, register, logout, "remember me", show/hide password
- Protected routes (dashboard pages redirect to login when signed out)
- Dashboard: 4 live stat cards, recent orders, popular dishes, 7-day CSS sales bars
- Menu: category filter, search, add to order, quantity shown on the card
- Tables: 12 tables, three statuses, filter buttons, instant status change
- Orders: menu on the left, live bill on the right, +/−/remove, discount input,
  customer and table selection, place order / clear order
- Order history: filter by status, search, details modal, mark completed, cancel
- Customers: list, search, add customer form, totals updated after each order
- Profile: view and edit your details
- Toast messages and inline validation instead of `alert()`
- Responsive: sidebar on desktop, slide-in hamburger menu on tablet and mobile

## 6. Food images

Dish photos are loaded from Unsplash CDN URLs stored in `src/data/menuData.js`.
If a URL is ever blocked or slow, `DishImage.jsx` automatically shows the dish
emoji instead, so the layout never breaks.

To use your own pictures:

1. Create a folder `public/images/`.
2. Put your files there, e.g. `public/images/biriyani.jpg`.
3. In `src/data/menuData.js`, change that dish to `image: '/images/biriyani.jpg'`.

## 7. Common errors and fixes

| Problem | Fix |
| --- | --- |
| `'vite' is not recognized` | You forgot `npm install`. Run it inside the project folder. |
| Blank white page | Open the browser console (F12). A red import error usually means a file was renamed. |
| Port 3000 already in use | Vite will offer another port, or change `port` in `vite.config.js`. |
| Old data keeps coming back | The app reads LocalStorage. In DevTools → Application → Local Storage, delete the `ss_` keys and refresh. |
| Images not showing | Check your internet connection, or use local images as described above. The emoji fallback is normal offline. |
| `Cannot read properties of null (reading 'name')` | You are on a dashboard page while logged out. Go to `/login` and sign in. |
| Node version error | Use Node 18 or newer (`node -v` to check). |

## 8. Resetting the demo data

Run this once in the browser console, then refresh:

```js
Object.keys(localStorage).filter(k => k.startsWith('ss_')).forEach(k => localStorage.removeItem(k))
```
