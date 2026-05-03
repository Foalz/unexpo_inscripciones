import { GraduationCap } from 'lucide-react'

export function CarreraSelector({ carreras, currentId, onSelect, onClose, blocking }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
          <GraduationCap size={32} className="mx-auto mb-3 opacity-90" />
          <h2 className="text-xl font-bold mb-1">Seleccioná tu carrera</h2>
          <p className="text-indigo-100 text-sm">
            Filtramos las materias del pensum según la carrera elegida.
          </p>
        </div>
        <div className="p-6 space-y-2">
          {carreras.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                currentId === c.id
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-800'
              }`}
            >
              <div className="font-semibold">{c.nombre}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {c.pensum.length} semestres
              </div>
            </button>
          ))}
          {!blocking && (
            <button
              onClick={onClose}
              className="w-full mt-3 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
