import { createContext, useContext, useEffect, useState } from 'react'
import { KEYS, getData, saveData } from '../utils/localStorage'
import {
  defaultTables,
  defaultOrders,
  defaultCustomers,
  defaultUsers
} from '../data/seedData'

// One place that holds all app data. Every page reads/writes through this file,
// so the whole application always shows the same numbers.
const AppContext = createContext(null)

// Short hook so pages can write: const { cart, addToCart } = useApp()
export function useApp() {
  return useContext(AppContext)
}

export const TAX_RATE = 0.05 // 5% tax

export function AppProvider({ children }) {
  // Each piece of state starts from LocalStorage, or from the seed data.
  const [users, setUsers] = useState(() => getData(KEYS.users, defaultUsers))
  const [user, setUser] = useState(() => getData(KEYS.user, null))
  const [cart, setCart] = useState(() => getData(KEYS.cart, []))
  const [tables, setTables] = useState(() => getData(KEYS.tables, defaultTables))
  const [orders, setOrders] = useState(() => getData(KEYS.orders, defaultOrders))
  const [customers, setCustomers] = useState(() =>
    getData(KEYS.customers, defaultCustomers)
  )
  const [toast, setToast] = useState(null)

  // Save to LocalStorage whenever something changes.
  useEffect(() => saveData(KEYS.users, users), [users])
  useEffect(() => saveData(KEYS.user, user), [user])
  useEffect(() => saveData(KEYS.cart, cart), [cart])
  useEffect(() => saveData(KEYS.tables, tables), [tables])
  useEffect(() => saveData(KEYS.orders, orders), [orders])
  useEffect(() => saveData(KEYS.customers, customers), [customers])

  // ---------- messages ----------
  function showToast(message, type = 'success') {
    setToast({ message, type, id: Date.now() })
  }
  function hideToast() {
    setToast(null)
  }

  // ---------- authentication ----------
  // Returns { ok: true } or { ok: false, message: '...' }
  function login(email, password) {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    )
    if (!found) return { ok: false, message: 'No account found with that email.' }
    if (found.password !== password)
      return { ok: false, message: 'Incorrect password. Please try again.' }

    // Never keep the password in the "logged in user" object.
    const { password: _hidden, ...safeUser } = found
    setUser(safeUser)
    return { ok: true }
  }

  function register(newUser) {
    const exists = users.some(
      (u) => u.email.toLowerCase() === newUser.email.trim().toLowerCase()
    )
    if (exists) return { ok: false, message: 'That email is already registered.' }
    setUsers([...users, { ...newUser, role: 'Staff' }])
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  function updateProfile(updated) {
    setUser(updated)
    // keep the same change in the users list so the next login is correct
    setUsers(
      users.map((u) =>
        u.email.toLowerCase() === updated.email.toLowerCase()
          ? { ...u, name: updated.name, phone: updated.phone, role: updated.role }
          : u
      )
    )
  }

  // ---------- cart / current order ----------
  function addToCart(item) {
    const existing = cart.find((line) => line.id === item.id)
    if (existing) {
      setCart(
        cart.map((line) =>
          line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line
        )
      )
    } else {
      setCart([
        ...cart,
        { id: item.id, name: item.name, price: item.price, quantity: 1 }
      ])
    }
    showToast(item.name + ' added to the order.')
  }

  function increaseQty(id) {
    setCart(
      cart.map((line) =>
        line.id === id ? { ...line, quantity: line.quantity + 1 } : line
      )
    )
  }

  // Going below 1 removes the line completely.
  function decreaseQty(id) {
    setCart(
      cart
        .map((line) =>
          line.id === id ? { ...line, quantity: line.quantity - 1 } : line
        )
        .filter((line) => line.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setCart(cart.filter((line) => line.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  // ---------- orders ----------
  // Order IDs continue from the highest existing one: ORD-1001, ORD-1002...
  function nextOrderId() {
    const numbers = orders.map((o) => Number(o.id.replace('ORD-', '')) || 0)
    const highest = numbers.length ? Math.max(...numbers) : 1000
    return 'ORD-' + (highest + 1)
  }

  function placeOrder({ customer, table, discount }) {
    if (cart.length === 0)
      return { ok: false, message: 'Please add at least one item to the order.' }

    const subtotal = cart.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0
    )
    const tax = subtotal * TAX_RATE
    const safeDiscount = Math.min(Number(discount) || 0, subtotal + tax)
    const total = subtotal + tax - safeDiscount

    const order = {
      id: nextOrderId(),
      date: new Date().toISOString(),
      customer: customer?.trim() || 'Walk-in Guest',
      table: table ? Number(table) : '-',
      items: cart,
      subtotal,
      tax,
      discount: safeDiscount,
      total,
      status: 'Preparing'
    }

    setOrders([order, ...orders])

    // The chosen table is now busy.
    if (table) {
      setTables(
        tables.map((t) =>
          t.id === Number(table) ? { ...t, status: 'Occupied' } : t
        )
      )
    }

    // Update the customer's totals, or create the customer if they are new.
    const name = order.customer
    const existingCustomer = customers.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    )
    if (existingCustomer) {
      setCustomers(
        customers.map((c) =>
          c.id === existingCustomer.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + total
              }
            : c
        )
      )
    } else {
      setCustomers([
        ...customers,
        {
          id: 'C' + Date.now(),
          name,
          phone: '-',
          email: '-',
          totalOrders: 1,
          totalSpent: total
        }
      ])
    }

    clearCart()
    return { ok: true, order }
  }

  function updateOrderStatus(orderId, status) {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
    showToast('Order ' + orderId + ' marked as ' + status + '.')
  }

  // ---------- tables ----------
  function setTableStatus(tableId, status) {
    setTables(tables.map((t) => (t.id === tableId ? { ...t, status } : t)))
    showToast('Table ' + tableId + ' is now ' + status + '.')
  }

  // ---------- customers ----------
  function addCustomer(customer) {
    setCustomers([
      ...customers,
      { ...customer, id: 'C' + Date.now(), totalOrders: 0, totalSpent: 0 }
    ])
    showToast(customer.name + ' added to customers.')
  }

  const value = {
    users, user, cart, tables, orders, customers, toast,
    showToast, hideToast,
    login, register, logout, updateProfile,
    addToCart, increaseQty, decreaseQty, removeFromCart, clearCart,
    placeOrder, updateOrderStatus,
    setTableStatus,
    addCustomer
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
