// Small helpers so we never repeat JSON.parse / JSON.stringify everywhere.

export const KEYS = {
  users: 'ss_users',
  user: 'ss_current_user',
  cart: 'ss_cart',
  tables: 'ss_tables',
  orders: 'ss_orders',
  customers: 'ss_customers',
  counter: 'ss_order_counter'
}

// Read a value. If the key does not exist yet, return the fallback.
export function getData(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch (error) {
    console.error('Could not read', key, error)
    return fallback
  }
}

// Save any value (object, array, string, number).
export function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Could not save', key, error)
  }
}

export function removeData(key) {
  localStorage.removeItem(key)
}
