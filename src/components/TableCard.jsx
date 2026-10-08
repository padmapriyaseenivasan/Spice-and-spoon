// One table on the Tables page, with the three status buttons.
export default function TableCard({ table, onChange }) {
  const tone = table.status.toLowerCase() // available / reserved / occupied

  return (
    <article className={'table-card table-card--' + tone}>
      <div className="table-card__head">
        <h3>Table {table.id}</h3>
        <span className={'pill pill--' + tone}>{table.status}</span>
      </div>

      <p className="table-card__capacity">Seats {table.capacity} guests</p>

      <div className="table-card__actions">
        <button
          className="btn btn--ghost btn--sm"
          disabled={table.status === 'Available'}
          onClick={() => onChange(table.id, 'Available')}
        >
          Free
        </button>
        <button
          className="btn btn--ghost btn--sm"
          disabled={table.status === 'Reserved'}
          onClick={() => onChange(table.id, 'Reserved')}
        >
          Reserve
        </button>
        <button
          className="btn btn--ghost btn--sm"
          disabled={table.status === 'Occupied'}
          onClick={() => onChange(table.id, 'Occupied')}
        >
          Occupy
        </button>
      </div>
    </article>
  )
}
