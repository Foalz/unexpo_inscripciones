import { useState } from 'react'
import { StudentPortal } from './views/StudentPortal'
import { AdminLogin } from './views/AdminLogin'
import { AdminDashboard } from './views/AdminDashboard'
import { About } from './views/About'

export default function App() {
  const [view, setView] = useState('student')

  const navProps = { currentView: view, onViewChange: setView }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {view === 'student' && <StudentPortal {...navProps} />}
      {view === 'admin_login' && (
        <AdminLogin {...navProps} onLogin={() => setView('admin_dashboard')} />
      )}
      {view === 'admin_dashboard' && (
        <AdminDashboard {...navProps} onLogout={() => setView('admin_login')} />
      )}
      {view === 'about' && <About {...navProps} />}
    </div>
  )
}
