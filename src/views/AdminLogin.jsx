import { LayoutDashboard, User, CheckCircle } from 'lucide-react'
import { NavLinks } from '../components/NavLinks'

export function AdminLogin({ onLogin, currentView, onViewChange, onOpenAbout }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <NavLinks
          currentView={currentView}
          onViewChange={onViewChange}
          onOpenAbout={onOpenAbout}
          theme="dark"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="p-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Backoffice UNEXPO</h2>
          <p className="text-slate-500 text-sm mb-8">
            Acceso exclusivo para personal administrativo de Control de Estudios.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Correo Institucional
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="admin@unexpo.edu.ve"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            <button
              onClick={onLogin}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-md transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              Enviar OTP Seguro
            </button>
          </div>
        </div>
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <CheckCircle size={12} /> Powered by AWS Serverless
          </p>
        </div>
      </div>
    </div>
  )
}
