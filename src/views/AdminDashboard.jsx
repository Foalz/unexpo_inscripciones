import { FileText, Users, Settings, LogOut, Upload } from 'lucide-react'
import { NavLinks } from '../components/NavLinks'

export function AdminDashboard({ onLogout, currentView, onViewChange }) {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
          <h1 className="text-white font-bold tracking-wide">UNEXPO Admin</h1>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600/10 border border-indigo-500/20"
          >
            <FileText size={18} className="text-indigo-400" /> Procesar Horarios
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Users size={18} /> Cargar Expedientes
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Settings size={18} /> Configuración Sistema
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">
            Carga y Extracción de PDFs
          </h2>
          <NavLinks
            currentView={currentView}
            onViewChange={onViewChange}
          />
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-semibold text-slate-800">
                  Estado del Sistema:{' '}
                  <span className="text-emerald-600">En Espera</span>
                </h3>
                <p className="text-sm text-slate-500">
                  Extrae los datos, verifica y publica a S3.
                </p>
              </div>
              <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                <Upload size={16} /> Publicar a S3 (Snapshot)
              </button>
            </div>

            <div className="bg-white border-2 border-dashed border-indigo-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Arrastra el PDF de horarios aquí
              </h3>
              <p className="text-sm text-slate-500 max-w-md mb-6">
                El archivo será procesado por AWS Lambda (pdfplumber) y los datos
                estructurados aparecerán en la tabla inferior.
              </p>
              <button className="px-5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium shadow-sm group-hover:border-indigo-300 transition-colors">
                Examinar Archivos
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-800">
                  Previsualización de Extracción
                </h3>
                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  Revisión requerida en 1 fila
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Código</th>
                      <th className="px-6 py-3 font-semibold">Materia</th>
                      <th className="px-6 py-3 font-semibold">Sec.</th>
                      <th className="px-6 py-3 font-semibold">Día</th>
                      <th className="px-6 py-3 font-semibold">Horario</th>
                      <th className="px-6 py-3 font-semibold text-right">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-mono text-xs">MAT-301</td>
                      <td className="px-6 py-3 font-medium text-slate-800">
                        Cálculo III
                      </td>
                      <td className="px-6 py-3">01</td>
                      <td className="px-6 py-3">Lunes</td>
                      <td className="px-6 py-3">07:00 - 09:00</td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">
                          Editar
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-amber-50/50 hover:bg-amber-50 border-l-2 border-l-amber-400">
                      <td className="px-6 py-3 font-mono text-xs">FIS-201</td>
                      <td className="px-6 py-3 font-medium text-slate-800">
                        Física II
                      </td>
                      <td className="px-6 py-3">02</td>
                      <td
                        className="px-6 py-3 text-amber-600 font-semibold underline decoration-dashed decoration-amber-400 cursor-pointer"
                        title="Confianza OCR baja"
                      >
                        Miercolls
                      </td>
                      <td className="px-6 py-3">09:00 - 11:00</td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">
                          Corregir
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-mono text-xs">SIS-101</td>
                      <td className="px-6 py-3 font-medium text-slate-800">
                        Programación I
                      </td>
                      <td className="px-6 py-3">01</td>
                      <td className="px-6 py-3">Lunes</td>
                      <td className="px-6 py-3">08:00 - 10:00</td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">
                          Editar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
