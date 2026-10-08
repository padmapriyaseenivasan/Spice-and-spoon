import { useEffect } from 'react'
import { useApp } from '../context/AppContext'

// Floating message in the corner. Replaces alert().
export default function Toast() {
  const { toast, hideToast } = useApp()

  // Hide the message automatically after 2.5 seconds.
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(hideToast, 2500)
    return () => clearTimeout(timer)
    // toast.id changes every time a new message is shown
  }, [toast?.id])

  if (!toast) return null

  return (
    <div className={'toast toast--' + toast.type} role="status">
      {toast.message}
    </div>
  )
}
