import { Sparkles } from 'lucide-react'

export function AiModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
          <Sparkles size={32} className="mx-auto mb-3 opacity-90" />
          <h2 className="text-xl font-bold mb-1">Asistente Inteligente</h2>
          <p className="text-indigo-100 text-sm">Armado automático optimizado</p>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4 text-center">
            Para utilizar el motor de Amazon Nova Micro, debes validar tu identidad.
            Tienes un límite de 5 intentos diarios.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Número de Expediente / Cédula
              </label>
              <input
                type="text"
                placeholder="Ej. 2025203387"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex items-center justify-center p-3 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-indigo-600 rounded"
                />
                <span className="text-sm text-slate-600 font-medium">
                  Soy un estudiante, no un bot
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-sm font-medium transition-colors">
              Validar y Generar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
