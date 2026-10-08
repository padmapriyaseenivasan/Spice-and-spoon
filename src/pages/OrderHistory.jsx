import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import { rupees, formatDate } from '../utils/format'

const filters = ['All', 'Preparing', 'Ready', 'Completed', 'Cancelled']

export default function OrderHistory() {
  const { orders, updateOrderStatus } = useApp()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null) // order shown in the modal

  const visible = orders
    .filter((o) => filter === 'All' || o.status === filter)
    .filter((o) => {
      const text = search.trim().toLowerCase()
      return (
        o.id.toLowerCase().includes(text) ||
        o.customer.toLowerCase().includes(text)
      )
    })

  const countOf = (status) => orders.filter((o) => o.status === status).length

  // Change status and keep the open modal in sync.
  function changeStatus(orderId, status) {
    updateOrderStatus(orderId, status)
    setSelected((current) =>
      current && current.id === orderId ? { ...current, status } : current
    )
  }

  return (
    <>
      <div className="page__head">
        <div>
          <h2 className="page__title">Order history</h2>
          <p className="muted">{orders.length} orders saved in this browser.</p>
        </div>
        <input
          className="input-search"
          placeholder="Search order ID or customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="chips">
        {filters.map((name) => (
          <button
            key={name}
            className={'chip' + (filter === name ? ' chip--active' : '')}
            onClick={() => setFilter(name)}
          >
            {name} {name !== 'All' && '(' + countOf(name) + ')'}
          </button>
        ))}
      </div>

      <section className="card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Table</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr><td colSpan="8" className="empty">No orders to show here yet.</td></tr>
              )}
              {visible.map((order) => (
                <tr key={order.id} className="row-clickable" onClick={() => setSelected(order)}>
                  <td><strong>{order.id}</strong></td>
                  <td>{formatDate(order.date)}</td>
                  <td>{order.customer}</td>
                  <td>{order.table}</td>
                  <td>{order.items.reduce((n, i) => n + i.quantity, 0)}</td>
                  <td>{rupees(order.total)}</td>
                  <td><span className={'pill pill--' + order.status.toLowerCase()}>{order.status}</span></td>
                  <td>
                    {/* stopPropagation so the row click does not also fire */}
                    <button
                      className="link"
                      onClick={(e) => { e.stopPropagation(); setSelected(order) }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <Modal
          title={'Order ' + selected.id}
          onClose={() => setSelected(null)}
          footer={
            <>
              <button
                className="btn btn--ghost"
                disabled={selected.status === 'Cancelled' || selected.status === 'Completed'}
                onClick={() => changeStatus(selected.id, 'Cancelled')}
              >
                Cancel order
              </button>
              <button
                className="btn btn--primary"
                disabled={selected.status === 'Completed'}
                onClick={() => changeStatus(selected.id, 'Completed')}
              >
                Mark as completed
              </button>
            </>
          }
        >
          <div className="detail-grid">
            <p><span className="muted">Customer</span><strong>{selected.customer}</strong></p>
            <p><span className="muted">Table</span><strong>{selected.table}</strong></p>
            <p><span className="muted">Placed on</span><strong>{formatDate(selected.date)}</strong></p>
            <p>
              <span className="muted">Status</span>
              <span className={'pill pill--' + selected.status.toLowerCase()}>{selected.status}</span>
            </p>
          </div>

          <table className="data-table data-table--plain">
            <thead>
              <tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th></tr>
            </thead>
            <tbody>
              {selected.items.map((line) => (
                <tr key={line.id}>
                  <td>{line.name}</td>
                  <td>{rupees(line.price)}</td>
                  <td>{line.quantity}</td>
                  <td>{rupees(line.price * line.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bill">
            <div className="bill__row"><span>Subtotal</span><span>{rupees(selected.subtotal)}</span></div>
            <div className="bill__row"><span>Tax (5%)</span><span>{rupees(selected.tax)}</span></div>
            <div className="bill__row"><span>Discount</span><span>- {rupees(selected.discount)}</span></div>
            <div className="bill__row bill__row--total"><span>Grand total</span><span>{rupees(selected.total)}</span></div>
          </div>
        </Modal>
      )}
    </>
  )
}
