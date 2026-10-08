import { useState } from 'react'
import { useApp } from '../context/AppContext'
import TableCard from '../components/TableCard'

const filters = ['All', 'Available', 'Reserved', 'Occupied']

export default function Tables() {
  const { tables, setTableStatus } = useApp()
  const [filter, setFilter] = useState('All')

  const visible = tables.filter((t) => filter === 'All' || t.status === filter)
  const countOf = (status) => tables.filter((t) => t.status === status).length

  return (
    <>
      <div className="page__head">
        <div>
          <h2 className="page__title">Table management</h2>
          <p className="muted">
            {countOf('Available')} available &middot; {countOf('Reserved')} reserved &middot; {countOf('Occupied')} occupied
          </p>
        </div>
      </div>

      <div className="chips">
        {filters.map((name) => (
          <button
            key={name}
            className={'chip' + (filter === name ? ' chip--active' : '')}
            onClick={() => setFilter(name)}
          >
            {name} {name !== 'All' && '(' + countOf(name) + ')'}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty card">No {filter.toLowerCase()} tables right now.</p>
      ) : (
        <section className="table-grid">
          {visible.map((table) => (
            <TableCard key={table.id} table={table} onChange={setTableStatus} />
          ))}
        </section>
      )}
    </>
  )
}
