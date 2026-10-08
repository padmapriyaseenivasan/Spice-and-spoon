import { rupees } from '../utils/format'

// One line inside the current order (right side of the Orders page).
export default function OrderItem({ line, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="order-line">
      <div className="order-line__info">
        <strong>{line.name}</strong>
        <small>{rupees(line.price)} each</small>
      </div>

      <div className="qty">
        <button onClick={() => onDecrease(line.id)} aria-label="Decrease quantity">-</button>
        <span>{line.quantity}</span>
        <button onClick={() => onIncrease(line.id)} aria-label="Increase quantity">+</button>
      </div>

      <span className="order-line__total">{rupees(line.price * line.quantity)}</span>

      <button className="link-danger" onClick={() => onRemove(line.id)}>
        Remove
      </button>
    </div>
  )
}
