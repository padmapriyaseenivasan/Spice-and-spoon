import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// Shared frame for every logged-in page: top navbar + the page itself.
// Navigation now lives entirely in the top bar (no sidebar).
export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
