import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { rupees } from '../utils/format'

export default function Profile() {
  const { user, updateProfile, showToast, orders, customers } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'Staff'
  })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  function handleSave() {
    const found = {}
    if (!form.name.trim()) found.name = 'Please enter your name.'
    if (!/^\d{10}$/.test(form.phone.trim())) found.phone = 'Phone number must be 10 digits.'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    updateProfile({ ...user, name: form.name.trim(), phone: form.phone.trim(), role: form.role })
    setEditing(false)
    showToast('Profile updated.')
  }

  const revenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0)

  return (
    <>
      <div className="page__head">
        <div>
          <h2 className="page__title">My profile</h2>
          <p className="muted">Your account details are stored in this browser.</p>
        </div>
      </div>

      <div className="two-col">
        <section className="card profile-card">
          <span className="avatar avatar--lg">{user?.name?.charAt(0).toUpperCase()}</span>
          <h3>{user?.name}</h3>
          <p className="muted">{user?.role} at Spice &amp; Spoon</p>

          <div className="profile-stats">
            <div><strong>{orders.length}</strong><span>Orders</span></div>
            <div><strong>{customers.length}</strong><span>Customers</span></div>
            <div><strong>{rupees(revenue)}</strong><span>Revenue</span></div>
          </div>
        </section>

        <section className="card">
          <div className="card__head">
            <h3>Account details</h3>
            {!editing && (
              <button className="btn btn--ghost btn--sm" onClick={() => setEditing(true)}>Edit</button>
            )}
          </div>

          <label className="field">
            <span>Full name</span>
            <input name="name" value={form.name} onChange={handleChange} disabled={!editing} />
            {errors.name && <em className="field__error">{errors.name}</em>}
          </label>

          <label className="field">
            <span>Email (cannot be changed)</span>
            <input value={form.email} disabled />
          </label>

          <label className="field">
            <span>Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} disabled={!editing} />
            {errors.phone && <em className="field__error">{errors.phone}</em>}
          </label>

          <label className="field">
            <span>Role</span>
            <select name="role" value={form.role} onChange={handleChange} disabled={!editing}>
              <option>Manager</option>
              <option>Cashier</option>
              <option>Waiter</option>
              <option>Staff</option>
            </select>
          </label>

          {editing && (
            <div className="form-actions">
              <button className="btn btn--ghost" onClick={() => { setEditing(false); setErrors({}) }}>
                Cancel
              </button>
              <button className="btn btn--primary" onClick={handleSave}>Save changes</button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
