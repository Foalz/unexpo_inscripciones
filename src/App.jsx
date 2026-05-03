import { useState } from 'react'
import { StudentPortal } from './views/StudentPortal'
import { AdminLogin } from './views/AdminLogin'
import { AdminDashboard } from './views/AdminDashboard'
import { AboutModal } from './components/AboutModal'

export default function App() {
  const [view, setView] = useState('student')
  const [aboutOpen, setAboutOpen] = useState(false)

  const navProps = {
    currentView: view,
    onViewChange: setView,
    onOpenAbout: () => setAboutOpen(true),
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {view === 'student' && <StudentPortal {...navProps} />}
      {view === 'admin_login' && (
        <AdminLogin {...navProps} onLogin={() => setView('admin_dashboard')} />
      )}
      {view === 'admin_dashboard' && (
        <AdminDashboard {...navProps} onLogout={() => setView('admin_login')} />
      )}
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
    </div>
  )
}
