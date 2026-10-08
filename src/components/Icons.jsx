// Tiny inline SVG icons so the project needs no icon library.
// Every icon takes the current text colour.

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

export const IconDashboard = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
)

export const IconMenu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 3v8a3 3 0 0 0 6 0V3" />
    <path d="M7 11v10" />
    <path d="M17 3c-1.5 2-2 4-2 6.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5C19 7 18.5 5 17 3Z" />
    <path d="M17 12v9" />
  </svg>
)

export const IconTables = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7" />
    <path d="M8 21h8" />
  </svg>
)

export const IconOrders = (p) => (
  <svg {...base} {...p}>
    <path d="M6 2h12l1 5H5l1-5Z" />
    <path d="M5 7h14l-1 14H6L5 7Z" />
    <path d="M9 11v6M15 11v6" />
  </svg>
)

export const IconHistory = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
    <path d="M12 8v4l3 2" />
  </svg>
)

export const IconCustomers = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5.5a3.5 3.5 0 0 1 0 6.8" />
    <path d="M18 14.5a6 6 0 0 1 3.5 5.5" />
  </svg>
)

export const IconProfile = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0 1 16 0" />
  </svg>
)

export const IconLogout = (p) => (
  <svg {...base} {...p}>
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    <path d="M10 16l-4-4 4-4" />
    <path d="M6 12h10" />
  </svg>
)

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const IconBell = (p) => (
  <svg {...base} {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7Z" />
    <path d="M10.5 20a2 2 0 0 0 3 0" />
  </svg>
)

export const IconHamburger = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconPlus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const IconEye = (p) => (
  <svg {...base} {...p}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
)

export const IconEyeOff = (p) => (
  <svg {...base} {...p}>
    <path d="M3 3l18 18" />
    <path d="M10.6 10.6a2.5 2.5 0 0 0 3.4 3.4" />
    <path d="M6.6 6.8C4 8.4 2 12 2 12s3.5 6 10 6c1.8 0 3.3-.4 4.6-1.1" />
    <path d="M9.9 6.2A9.6 9.6 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-3 3.6" />
  </svg>
)

export const IconRupee = (p) => (
  <svg {...base} {...p}>
    <path d="M7 5h10M7 9h10" />
    <path d="M14 5c0 4-3 5-7 5l7 9" />
  </svg>
)
