import { GraduationCap, Shield, Info } from 'lucide-react'

const ITEMS = [
  { id: 'student', label: 'Estudiante', icon: GraduationCap, match: (v) => v === 'student' },
  { id: 'admin', label: 'Admin', icon: Shield, match: (v) => v.startsWith('admin') },
  { id: 'about', label: 'Acerca de', icon: Info, match: () => false },
]

export function NavLinks({ currentView, onViewChange, onOpenAbout, theme = 'light' }) {
  const handle = (id) => {
    if (id === 'about') return onOpenAbout()
    if (id === 'student') return onViewChange('student')
    if (id === 'admin') return onViewChange('admin_login')
  }

  const base = theme === 'dark'
    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
  const active = theme === 'dark'
    ? 'text-white bg-slate-800'
    : 'text-indigo-700 bg-indigo-50'

  return (
    <nav className="flex items-center gap-1">
      {ITEMS.map(({ id, label, icon: Icon, match }) => (
        <button
          key={id}
          onClick={() => handle(id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            match(currentView) ? active : base
          }`}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </nav>
  )
}
