import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { menuItems, categories } from '../data/menuData'
import FoodCard from '../components/FoodCard'

export default function Menu() {
  const { cart, addToCart } = useApp()
  const navigate = useNavigate()
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  // Filter by category first, then by the search box.
  const visible = menuItems
    .filter((item) => category === 'All' || item.category === category)
    .filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()))

  // How many of this dish are already in the current order.
  const qtyOf = (id) => cart.find((line) => line.id === id)?.quantity || 0
  const itemsInCart = cart.reduce((n, line) => n + line.quantity, 0)

  return (
    <>
      <div className="page__head">
        <div>
          <h2 className="page__title">Our menu</h2>
          <p className="muted">{menuItems.length} dishes across {categories.length - 1} categories.</p>
        </div>
        <button className="btn btn--primary" onClick={() => navigate('/orders')}>
          Current order ({itemsInCart})
        </button>
      </div>

      <div className="toolbar">
        <div className="chips">
          {categories.map((name) => (
            <button
              key={name}
              className={'chip' + (category === name ? ' chip--active' : '')}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <input
          className="input-search"
          placeholder="Search a dish"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <p className="empty card">No dish matched your search. Try another name.</p>
      ) : (
        <section className="food-grid">
          {visible.map((item) => (
            <FoodCard key={item.id} item={item} onAdd={addToCart} quantity={qtyOf(item.id)} />
          ))}
        </section>
      )}
    </>
  )
}
