import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Register() {
  const { register, showToast } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: ''
  })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  // One handler for every input, using the input's name attribute.
  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  // Returns an object of error messages. Empty object = form is valid.
  function validate() {
    const found = {}
    if (!form.name.trim()) found.name = 'Please enter your full name.'
    if (!form.email.trim()) found.email = 'Please enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Invalid email address.'
    if (!form.phone.trim()) found.phone = 'Please enter your phone number.'
    else if (!/^\d{10}$/.test(form.phone.trim())) found.phone = 'Phone number must be 10 digits.'
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.'
    if (form.confirm !== form.password) found.confirm = 'Passwords do not match.'
    return found
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const result = register({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password
    })

    if (!result.ok) return setErrors({ email: result.message })

    setDone(true)
    showToast('Account created. Please sign in.')
    // Give the user a moment to read the message, then go to Login.
    setTimeout(() => navigate('/login'), 1500)
  }

  return (
    <div className="auth">
      <section className="auth__art">
        <span className="logo-mark logo-mark--lg">S&amp;S</span>
        <h1>Join the team</h1>
        <p className="auth__tag">Good Food. Great Moments.</p>
        <ul className="auth__points">
          <li>Create a staff account in seconds</li>
          <li>Start taking orders right away</li>
          <li>Your data stays in this browser</li>
        </ul>
      </section>

      <section className="auth__form-wrap">
        <form className="auth__form card" onSubmit={handleSubmit}>
          <h2>Create account</h2>
          <p className="muted">All fields are required.</p>

          {done && <p className="alert alert--success">Registered successfully. Taking you to sign in...</p>}

          <label className="field">
            <span>Full name</span>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            {errors.name && <em className="field__error">{errors.name}</em>}
          </label>

          <label className="field">
            <span>Email</span>
            <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            {errors.email && <em className="field__error">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit number" />
            {errors.phone && <em className="field__error">{errors.phone}</em>}
          </label>

          <div className="grid-2">
            <label className="field">
              <span>Password</span>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" />
              {errors.password && <em className="field__error">{errors.password}</em>}
            </label>

            <label className="field">
              <span>Confirm password</span>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Repeat password" />
              {errors.confirm && <em className="field__error">{errors.confirm}</em>}
            </label>
          </div>

          <button className="btn btn--primary btn--block" type="submit">Create account</button>

          <p className="auth__switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
