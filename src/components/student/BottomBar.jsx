import { Trash2, Sparkles, Download } from 'lucide-react'

export function BottomBar({ onClear, onOpenAi, onExport }) {
  return (
    <div className="bg-white border-t border-slate-200 p-4 shrink-0 flex flex-wrap gap-3 items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
      >
        <Trash2 size={16} />
        <span className="hidden sm:inline">Limpiar Todo</span>
      </button>

      <div className="flex gap-3 w-full sm:w-auto">
        <button
          onClick={onOpenAi}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-medium rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          <Sparkles size={16} />
          Armar con IA
        </button>
        <button
          onClick={onExport}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Descargar PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
    </div>
  )
}
