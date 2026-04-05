'use client'

import { usePathname, useRouter } from 'next/navigation'

const tabs = [
  {
    key: 'library',
    label: 'Library',
    href: '/library',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke={active ? 'currentColor' : 'currentColor'} strokeWidth="2" fill={active ? 'currentColor' : 'none'} />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill={active ? 'currentColor' : 'none'} />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill={active ? 'currentColor' : 'none'} />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill={active ? 'currentColor' : 'none'} />
      </svg>
    ),
  },
  {
    key: 'discover',
    label: 'Discover',
    href: '/discover',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M16.5 16.5L21 21" />
      </svg>
    ),
  },
  {
    key: 'create',
    label: '',
    href: '/recipe/new',
    icon: () => null, // handled separately
  },
  {
    key: 'saved',
    label: 'Saved',
    href: '/saved',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    key: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" d="M5.5 21c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
      </svg>
    ),
  },
]

// Pages that show the bottom nav
const NAV_PAGES = ['/library', '/discover', '/saved', '/profile', '/recipe/new']

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Only show on main app pages
  const show = NAV_PAGES.some((p) => pathname.startsWith(p))
  if (!show) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-sm border-t border-border-primary">
      <div className="max-w-md mx-auto flex items-end justify-around px-2 pb-7 pt-2">
        {tabs.map((tab) => {
          const isActive =
            tab.key === 'create'
              ? false
              : pathname.startsWith(tab.href)

          // Center create button
          if (tab.key === 'create') {
            return (
              <button
                key={tab.key}
                onClick={() => router.push(tab.href)}
                className="relative -mt-5 flex items-center justify-center w-14 h-14 rounded-full bg-accent shadow-lg shadow-accent/30 active:scale-95 transition-transform"
                aria-label="Add recipe"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )
          }

          return (
            <button
              key={tab.key}
              onClick={() => router.push(tab.href)}
              className={`flex flex-col items-center gap-1 min-w-[56px] transition-colors ${
                isActive ? 'text-accent' : 'text-text-tertiary'
              }`}
            >
              {tab.icon(isActive)}
              <span className="font-mono text-[10px] tracking-wide">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
