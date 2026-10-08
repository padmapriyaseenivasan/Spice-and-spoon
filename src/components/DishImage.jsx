import { useState } from 'react'

// Shows the dish photo. If the photo URL does not load
// (slow network, blocked image) we show the dish emoji instead,
// so the layout never breaks.
export default function DishImage({ item, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className={'dish-fallback ' + className}>{item.emoji}</span>
  }

  return (
    <img
      className={className}
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
