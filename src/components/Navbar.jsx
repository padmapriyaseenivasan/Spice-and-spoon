import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { menuItems } from '../data/menuData'
import {
  IconDashboard, IconMenu, IconTables, IconOrders, IconHistory,
  IconCustomers, IconProfile, IconLogout, IconSearch, IconBell,
  IconHamburger, IconClose
} from './Icons'

// The list of links. Adding a page later = adding one line here.
const links = [
  { to: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { to: '/menu', label: 'Menu', Icon: IconMenu },
  { to: '/tables', label: 'Tables', Icon: IconTables },
  { to: '/orders', label: 'Orders', Icon: IconOrders },
  { to: '/order-history', label: 'History', Icon: IconHistory },
  { to: '/customers', label: 'Customers', Icon: IconCustomers },
  { to: '/profile', label: 'Profile', Icon: IconProfile }
]

// Top navigation bar: logo, page links, search, notifications and user.
// Replaces the old left sidebar - everything lives in one bar now.
export default function Navbar() {
  const { user, cart, orders, customers, logout } = useApp()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showAlerts, setShowAlerts] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const text = query.trim().toLowerCase()

  // Search looks through dishes, customers and orders at the same time.
  const results = text
    ? [
        ...menuItems
          .filter((m) => m.name.toLowerCase().includes(text))
          .map((m) => ({ label: m.name, hint: 'Dish', to: '/menu' })),
        ...customers
          .filter((c) => c.name.toLowerCase().includes(text))
          .map((c) => ({ label: c.name, hint: 'Customer', to: '/customers' })),
        ...orders
          .filter((o) => o.id.toLowerCase().includes(text))
          .map((o) => ({ label: o.id, hint: o.customer, to: '/order-history' }))
      ].slice(0, 6)
    : []

  // Orders still in the kitchen become the notification list.
  const pending = orders.filter((o) => o.status === 'Preparing' || o.status === 'Ready')

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar__row">
        <div className="navbar__brand">
          <span className="logo-mark">S&amp;S</span>
          <span>
            <strong className="logo-name">Spice &amp; Spoon</strong>
            <small className="logo-tag">Good Food. Great Moments.</small>
          </span>
        </div>

        {/* full link row on desktop, hidden on small screens */}
        <nav className="navbar__links">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
            >
              <Icon width={17} height={17} />
              <span>{label}</span>
              {to === '/orders' && cart.length > 0 && (
                <span className="nav-badge">{cart.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__search">
          <IconSearch width={18} height={18} />
          <input
            type="text"
            placeholder="Search dishes, orders, customers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {text && (
            <ul className="search-results">
              {results.length === 0 && <li className="search-empty">Nothing matched "{query}"</li>}
              {results.map((r, i) => (
                <li key={i}>
                  <button onClick={() => { navigate(r.to); setQuery('') }}>
                    <span>{r.label}</span>
                    <small>{r.hint}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="navbar__actions">
          <button
            className="icon-btn bell"
            onClick={() => setShowAlerts(!showAlerts)}
            aria-label="Notifications"
          >
            <IconBell />
            {pending.length > 0 && <span className="bell__dot">{pending.length}</span>}
          </button>

          {showAlerts && (
            <div className="alerts" onMouseLeave={() => setShowAlerts(false)}>
              <p className="alerts__title">Kitchen updates</p>
              {pending.length === 0 && <p className="alerts__empty">No orders in the kitchen.</p>}
              {pending.map((o) => (
                <div key={o.id} className="alerts__row">
                  <strong>{o.id}</strong>
                  <span>Table {o.table} &middot; {o.status}</span>
                </div>
              ))}
            </div>
          )}

          <button className="navbar__user" onClick={() => navigate('/profile')}>
            <span className="avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
            <span className="navbar__user-text">
              <strong>{user?.name}</strong>
              <small>{user?.role}</small>
            </span>
          </button>

          <button className="icon-btn" onClick={handleLogout} aria-label="Logout" title="Logout">
            <IconLogout />
          </button>

          {/* hamburger only shows on small screens, toggles the link dropdown below */}
          <button
            className="icon-btn navbar__burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconClose /> : <IconHamburger />}
          </button>
        </div>
      </div>

      {/* link list becomes a dropdown under the bar on mobile */}
      {mobileOpen && (
        <nav className="navbar__mobile-links">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
            >
              <Icon width={17} height={17} />
              <span>{label}</span>
              {to === '/orders' && cart.length > 0 && (
                <span className="nav-badge">{cart.length}</span>
              )}
            </NavLink>
          ))}
          <button className="nav-link nav-link--logout" onClick={handleLogout}>
            <IconLogout width={17} height={17} />
            <span>Logout</span>
          </button>
        </nav>
      )}
    </header>
  )
}
