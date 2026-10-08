import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Blocks the dashboard pages when nobody is logged in.
export default function ProtectedRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return children
}
