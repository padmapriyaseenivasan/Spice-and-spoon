// Small card used four times on the dashboard.
export default function StatCard({ label, value, note, icon, tone = 'orange' }) {
  return (
    <article className={'stat-card stat-card--' + tone}>
      <span className="stat-card__icon">{icon}</span>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {note && <p className="stat-card__note">{note}</p>}
    </article>
  )
}
