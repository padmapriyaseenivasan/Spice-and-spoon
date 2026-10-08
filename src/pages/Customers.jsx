import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import { rupees } from '../utils/format'
import { IconPlus } from '../components/Icons'

export default function Customers() {
  const { customers, addCustomer } = useApp()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})

  const text = search.trim().toLowerCase()
  const visible = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(text) ||
      c.phone.includes(text) ||
      c.email.toLowerCase().includes(text)
  )

  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function handleSave() {
    const found = {}
    if (!form.name.trim()) found.name = 'Please enter the customer name.'
    if (!/^\d{10}$/.test(form.phone.trim())) found.phone = 'Phone number must be 10 digits.'
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email))
      found.email = 'Invalid email address.'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    addCustomer({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || '-'
    })
    setForm({ name: '', phone: '', email: '' })
    setShowForm(false)
  }

  return (
    <>
      <div className="page__head">
        <div>
          <h2 className="page__title">Customers</h2>
          <p className="muted">{customers.length} guests saved.</p>
        </div>
        <div className="page__head-actions">
          <input
            className="input-search"
            placeholder="Search name, phone or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn--primary" onClick={() => setShowForm(true)}>
            <IconPlus width={16} height={16} /> Add customer
          </button>
        </div>
      </div>

      <section className="card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total orders</th>
                <th>Total spent</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && (
                <tr><td colSpan="5" className="empty">No customer matched "{search}".</td></tr>
              )}
              {visible.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="avatar avatar--sm">{c.name.charAt(0).toUpperCase()}</span>
                    <strong>{c.name}</strong>
                  </td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td>{c.totalOrders}</td>
                  <td>{rupees(c.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <Modal
          title="Add customer"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn btn--ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn--primary" onClick={handleSave}>Save customer</button>
            </>
          }
        >
          <label className="field">
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Customer name" />
            {errors.name && <em className="field__error">{errors.name}</em>}
          </label>

          <label className="field">
            <span>Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit number" />
            {errors.phone && <em className="field__error">{errors.phone}</em>}
          </label>

          <label className="field">
            <span>Email (optional)</span>
            <input name="email" value={form.email} onChange={handleChange} placeholder="guest@example.com" />
            {errors.email && <em className="field__error">{errors.email}</em>}
          </label>
        </Modal>
      )}
    </>
  )
}
