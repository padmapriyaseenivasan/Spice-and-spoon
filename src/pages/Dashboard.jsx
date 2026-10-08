import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { menuItems } from '../data/menuData'
import StatCard from '../components/StatCard'
import DishImage from '../components/DishImage'
import { rupees, formatDate, isToday } from '../utils/format'

export default function Dashboard() {
  const { orders, tables, customers, user } = useApp()
  const navigate = useNavigate()

  // ---- numbers for the four cards ----
  const totalOrders = orders.length
  const todaysRevenue = orders
    .filter((o) => isToday(o.date) && o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0)
  const availableTables = tables.filter((t) => t.status === 'Available').length
  const totalCustomers = customers.length

  // ---- most ordered dishes ----
  // Count how many times each dish id appears across all orders.
  const counts = {}
  orders.forEach((order) => {
    order.items.forEach((line) => {
      counts[line.id] = (counts[line.id] || 0) + line.quantity
    })
  })
  const popular = menuItems
    .map((dish) => ({ ...dish, sold: counts[dish.id] || 0 }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4)

  // ---- simple 7 day sales bars (plain CSS, no chart library) ----
  const days = []
  for (let i = 6; i >= 0; i--) {
    const day = new Date()
    day.setDate(day.getDate() - i)
    const revenue = orders
      .filter(
        (o) =>
          new Date(o.date).toDateString() === day.toDateString() &&
          o.status !== 'Cancelled'
      )
      .reduce((sum, o) => sum + o.total, 0)
    days.push({
      label: day.toLocaleDateString('en-IN', { weekday: 'short' }),
      revenue
    })
  }
  const highest = Math.max(...days.map((d) => d.revenue), 1)
  const weekTotal = days.reduce((sum, d) => sum + d.revenue, 0)

  const recent = orders.slice(0, 5)

  return (
    <>
      <div className="page__head">
        <div>
          <h2 className="page__title">Hello {user?.name?.split(' ')[0]}, here is today</h2>
          <p className="muted">A quick look at orders, tables and sales.</p>
        </div>
        <button className="btn btn--primary" onClick={() => navigate('/orders')}>
          Take new order
        </button>
      </div>

      <section className="stat-grid">
        <StatCard label="Total Orders" value={totalOrders} note="All time" icon="🧾" tone="orange" />
        <StatCard label="Today's Revenue" value={rupees(todaysRevenue)} note="Cancelled orders excluded" icon="💰" tone="green" />
        <StatCard label="Available Tables" value={availableTables + ' / ' + tables.length} note="Ready to seat guests" icon="🪑" tone="blue" />
        <StatCard label="Total Customers" value={totalCustomers} note="Saved in the system" icon="👥" tone="purple" />
      </section>

      <section className="card">
        <div className="card__head">
          <h3>Recent orders</h3>
          <button className="link" onClick={() => navigate('/order-history')}>View all</button>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Table</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr><td colSpan="6" className="empty">No orders yet. Take your first order.</td></tr>
              )}
              {recent.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong><br /><small className="muted">{formatDate(order.date)}</small></td>
                  <td>{order.customer}</td>
                  <td>{order.table}</td>
                  <td>{order.items.reduce((n, i) => n + i.quantity, 0)} items</td>
                  <td>{rupees(order.total)}</td>
                  <td><span className={'pill pill--' + order.status.toLowerCase()}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="two-col">
        <section className="card">
          <div className="card__head">
            <h3>Popular dishes</h3>
            <button className="link" onClick={() => navigate('/menu')}>Open menu</button>
          </div>

          <div className="popular-grid">
            {popular.map((dish) => (
              <div className="popular" key={dish.id}>
                <DishImage item={dish} className="popular__img" />
                <div>
                  <strong>{dish.name}</strong>
                  <p className="muted small">{rupees(dish.price)}</p>
                  <p className="popular__count">{dish.sold} ordered</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="card__head">
            <h3>Sales this week</h3>
            <span className="muted small">{rupees(weekTotal)} total</span>
          </div>

          {/* Each bar height is a percentage of the best day. Pure CSS. */}
          <div className="bars">
            {days.map((day, index) => (
              <div className="bars__col" key={index}>
                <span className="bars__value">{day.revenue > 0 ? rupees(day.revenue) : ''}</span>
                <div
                  className="bars__bar"
                  style={{ height: Math.max((day.revenue / highest) * 100, 4) + '%' }}
                />
                <span className="bars__label">{day.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
