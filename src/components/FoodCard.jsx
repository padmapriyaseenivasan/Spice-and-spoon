import { rupees } from '../utils/format'
import DishImage from './DishImage'

// One dish. Used on the Menu page and on the Orders page.
export default function FoodCard({ item, onAdd, quantity = 0, compact = false }) {
  return (
    <article className={'food-card' + (compact ? ' food-card--compact' : '')}>
      <div className="food-card__media">
        <DishImage item={item} />
        <span className={'pill ' + (item.available ? 'pill--green' : 'pill--grey')}>
          {item.available ? 'Available' : 'Sold out'}
        </span>
      </div>

      <div className="food-card__body">
        <p className="food-card__category">{item.category}</p>
        <h3 className="food-card__name">{item.name}</h3>
        {!compact && <p className="food-card__desc">{item.description}</p>}

        <div className="food-card__footer">
          <span className="food-card__price">{rupees(item.price)}</span>
          <button
            className="btn btn--primary btn--sm"
            disabled={!item.available}
            onClick={() => onAdd(item)}
          >
            {quantity > 0 ? 'Added (' + quantity + ')' : 'Add to Order'}
          </button>
        </div>
      </div>
    </article>
  )
}
