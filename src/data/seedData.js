// Starting data used the very first time the app runs.
// After that everything is read from (and saved to) LocalStorage.

// 12 tables with a mix of statuses so the page looks realistic.
export const defaultTables = [
  { id: 1, capacity: 4, status: 'Available' },
  { id: 2, capacity: 2, status: 'Occupied' },
  { id: 3, capacity: 6, status: 'Available' },
  { id: 4, capacity: 4, status: 'Reserved' },
  { id: 5, capacity: 2, status: 'Available' },
  { id: 6, capacity: 8, status: 'Occupied' },
  { id: 7, capacity: 4, status: 'Available' },
  { id: 8, capacity: 4, status: 'Available' },
  { id: 9, capacity: 2, status: 'Reserved' },
  { id: 10, capacity: 6, status: 'Available' },
  { id: 11, capacity: 4, status: 'Available' },
  { id: 12, capacity: 10, status: 'Available' }
]

export const defaultCustomers = [
  { id: 'C1', name: 'Arun Kumar', phone: '9840012345', email: 'arun@gmail.com', totalOrders: 12, totalSpent: 4820 },
  { id: 'C2', name: 'Divya Ramesh', phone: '9884456712', email: 'divya.r@gmail.com', totalOrders: 7, totalSpent: 2310 },
  { id: 'C3', name: 'Mohammed Irfan', phone: '9790023344', email: 'irfan@outlook.com', totalOrders: 19, totalSpent: 7640 },
  { id: 'C4', name: 'Sneha Prakash', phone: '9600112233', email: 'sneha.p@gmail.com', totalOrders: 4, totalSpent: 980 },
  { id: 'C5', name: 'Walk-in Guest', phone: '-', email: '-', totalOrders: 44, totalSpent: 15290 }
]

// Helper that builds an ISO date string "n" days before today.
const daysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export const defaultOrders = [
  {
    id: 'ORD-1001',
    date: daysAgo(0),
    customer: 'Arun Kumar',
    table: 2,
    items: [
      { id: 1, name: 'Chicken Biriyani', price: 180, quantity: 2 },
      { id: 10, name: 'Fresh Lime Soda', price: 50, quantity: 2 }
    ],
    subtotal: 460, tax: 23, discount: 0, total: 483, status: 'Preparing'
  },
  {
    id: 'ORD-1002',
    date: daysAgo(0),
    customer: 'Divya Ramesh',
    table: 6,
    items: [
      { id: 2, name: 'Paneer Butter Masala', price: 160, quantity: 1 },
      { id: 4, name: 'Masala Dosa', price: 80, quantity: 2 }
    ],
    subtotal: 320, tax: 16, discount: 20, total: 316, status: 'Ready'
  },
  {
    id: 'ORD-1003',
    date: daysAgo(0),
    customer: 'Walk-in Guest',
    table: 5,
    items: [
      { id: 3, name: 'Chicken 65', price: 140, quantity: 1 },
      { id: 7, name: 'French Fries', price: 90, quantity: 1 },
      { id: 12, name: 'Coffee', price: 40, quantity: 2 }
    ],
    subtotal: 310, tax: 15.5, discount: 0, total: 325.5, status: 'Completed'
  },
  {
    id: 'ORD-1004',
    date: daysAgo(1),
    customer: 'Mohammed Irfan',
    table: 9,
    items: [
      { id: 1, name: 'Chicken Biriyani', price: 180, quantity: 3 },
      { id: 8, name: 'Gulab Jamun', price: 60, quantity: 3 }
    ],
    subtotal: 720, tax: 36, discount: 50, total: 706, status: 'Completed'
  },
  {
    id: 'ORD-1005',
    date: daysAgo(2),
    customer: 'Sneha Prakash',
    table: 11,
    items: [
      { id: 5, name: 'Veg Fried Rice', price: 120, quantity: 1 },
      { id: 11, name: 'Fresh Juice', price: 70, quantity: 1 }
    ],
    subtotal: 190, tax: 9.5, discount: 0, total: 199.5, status: 'Cancelled'
  },
  {
    id: 'ORD-1006',
    date: daysAgo(3),
    customer: 'Arun Kumar',
    table: 3,
    items: [
      { id: 6, name: 'Chicken Fried Rice', price: 150, quantity: 2 },
      { id: 9, name: 'Ice Cream', price: 80, quantity: 2 }
    ],
    subtotal: 460, tax: 23, discount: 0, total: 483, status: 'Completed'
  }
]

// The demo account asked for in the brief.
export const defaultUsers = [
  {
    name: 'Admin',
    email: 'admin@restaurant.com',
    phone: '9876543210',
    password: 'admin123',
    role: 'Manager'
  }
]
