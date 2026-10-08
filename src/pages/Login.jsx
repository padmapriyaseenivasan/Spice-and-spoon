import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { IconEye, IconEyeOff } from '../components/Icons'

const DEMO_EMAIL = 'admin@restaurant.com'
const DEMO_PASSWORD = 'admin123'

export default function Login() {
  const { login, showToast } = useApp()
  const navigate = useNavigate()

  // "Remember me" simply pre-fills the email next time.
  const remembered = localStorage.getItem('ss_remember') || ''

  const [email, setEmail] = useState(remembered)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(Boolean(remembered))
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim()) return setError('Please enter your email.')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Invalid email address.')
    if (!password) return setError('Please enter your password.')

    const result = login(email, password)
    if (!result.ok) return setError(result.message)

    if (remember) localStorage.setItem('ss_remember', email)
    else localStorage.removeItem('ss_remember')

    showToast('Welcome back to Spice & Spoon.')
    navigate('/dashboard')
  }

  // One-click demo login for the college demo / interview.
  function fillDemo() {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setError('')
  }

  return (
    <div className="auth">
      <section className="auth__art">
        <span className="logo-mark logo-mark--lg">S&amp;S</span>
        <h1>Spice &amp; Spoon</h1>
        <p className="auth__tag">Good Food. Great Moments.</p>
        <ul className="auth__points">
          <li>Take orders and bill in one screen</li>
          <li>Track every table in real time</li>
          <li>Keep a history of every order you serve</li>
        </ul>
      </section>

      <section className="auth__form-wrap">
        <form className="auth__form card" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <p className="muted">Use your staff account to open the dashboard.</p>

          {error && <p className="alert alert--error">{error}</p>}

          <label className="field">
            <span>Email</span>
            <input
              type="text"
              value={email}
              placeholder="admin@restaurant.com"
              onChange={(e) => { setEmail(e.target.value); setError('') }}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="field__with-button">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Enter password"
                onChange={(e) => { setPassword(e.target.value); setError('') }}
              />
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me on this device</span>
          </label>

          <button className="btn btn--primary btn--block" type="submit">Sign in</button>
          <button className="btn btn--ghost btn--block" type="button" onClick={fillDemo}>
            Use demo account
          </button>

          <p className="muted small">
            Demo login &mdash; {DEMO_EMAIL} / {DEMO_PASSWORD}
          </p>

          <p className="auth__switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
