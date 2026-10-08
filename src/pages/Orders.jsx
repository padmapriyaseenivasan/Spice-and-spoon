import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, TAX_RATE } from '../context/AppContext'
import { menuItems, categories } from '../data/menuData'
import FoodCard from '../components/FoodCard'
import OrderItem from '../components/OrderItem'
import { rupees } from '../utils/format'

export default function Orders() {
  const {
    cart, tables, customers,
    addToCart, increaseQty, decreaseQty, removeFromCart, clearCart,
    placeOrder, showToast
  } = useApp()
  const navigate = useNavigate()

  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [customer, setCustomer] = useState('')
  const [table, setTable] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')

  const visible = menuItems
    .filter((item) => category === 'All' || item.category === category)
    .filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()))

  // Bill maths. Recalculated on every render, so it is always correct.
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const tax = subtotal * TAX_RATE
  const discountValue = Math.min(Number(discount) || 0, subtotal + tax)
  const grandTotal = subtotal + tax - discountValue

  const freeTables = tables.filter((t) => t.status !== 'Occupied')
  const qtyOf = (id) => cart.find((line) => line.id === id)?.quantity || 0

  function handlePlaceOrder() {
    const result = placeOrder({ customer, table, discount: discountValue })
    if (!result.ok) {
      setMessage(result.message)
      return
    }
    setMessage('')
    setCustomer('')
    setTable('')
    setDiscount(0)
    showToast('Order ' + result.order.id + ' placed successfully.')
    navigate('/order-history')
  }

  function handleClear() {
    clearCart()
    setDiscount(0)
    setMessage('')
    showToast('Order cleared.', 'info')
  }

  return (
    <div>
      <div className="page__head">
        <div>
          <h2 className="page__title">New order</h2>
          <p className="muted">Pick dishes on the left, review the bill on the right.</p>
        </div>
      </div>

      <div className="order-layout">
      {/* LEFT: dishes to pick from */}
      <section className="order-layout__menu">
        <div className="toolbar">
          <div className="chips">
            {categories.map((name) => (
              <button
                key={name}
                className={'chip' + (category === name ? ' chip--active' : '')}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <input
            className="input-search"
            placeholder="Search a dish"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="food-grid food-grid--tight">
          {visible.map((item) => (
            <FoodCard key={item.id} item={item} onAdd={addToCart} quantity={qtyOf(item.id)} compact />
          ))}
        </div>
      </section>

      {/* RIGHT: the bill */}
      <aside className="order-layout__bill card">
        <h3>Current order</h3>

        <div className="grid-2">
          <label className="field">
            <span>Customer</span>
            <input
              list="customer-names"
              value={customer}
              placeholder="Walk-in Guest"
              onChange={(e) => setCustomer(e.target.value)}
            />
            {/* suggestions from saved customers */}
            <datalist id="customer-names">
              {customers.map((c) => <option key={c.id} value={c.name} />)}
            </datalist>
          </label>

          <label className="field">
            <span>Table</span>
            <select value={table} onChange={(e) => setTable(e.target.value)}>
              <option value="">Not assigned</option>
              {freeTables.map((t) => (
                <option key={t.id} value={t.id}>
                  Table {t.id} ({t.status}, {t.capacity} seats)
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="order-lines">
          {cart.length === 0 && (
            <p className="empty">Pick a dish from the left to start the bill.</p>
          )}
          {cart.map((line) => (
            <OrderItem
              key={line.id}
              line={line}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="bill">
          <div className="bill__row">
            <span>Subtotal</span><span>{rupees(subtotal)}</span>
          </div>
          <div className="bill__row">
            <span>Tax (5%)</span><span>{rupees(tax)}</span>
          </div>
          <div className="bill__row">
            <span>Discount</span>
            <input
              type="number"
              min="0"
              className="bill__discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="bill__row bill__row--total">
            <span>Grand total</span><span>{rupees(grandTotal)}</span>
          </div>
        </div>

        {message && <p className="alert alert--error">{message}</p>}

        <button className="btn btn--primary btn--block" onClick={handlePlaceOrder}>
          Place order
        </button>
        <button className="btn btn--ghost btn--block" onClick={handleClear}>
          Clear order
        </button>
      </aside>
      </div>
    </div>
  )
}
