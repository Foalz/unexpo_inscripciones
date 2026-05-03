import { X } from 'lucide-react'
import { colorForCode } from '../../lib/colors'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const HOURS = Array.from({ length: 12 }, (_, i) => i + 7)

export function Calendar({ blocks, onRemoveComision }) {
  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8">
      <div className="min-w-[700px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <div className="w-20 shrink-0 border-r border-slate-200" />
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex-1 py-3 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider border-r border-slate-200 last:border-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex relative bg-[linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:100%_60px]">
          <div className="w-20 shrink-0 border-r border-slate-200 flex flex-col bg-white">
            {HOURS.map((hour) => (
              <div key={hour} className="h-[60px] relative">
                <span className="absolute -top-2.5 right-3 text-xs font-medium text-slate-400">
                  {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {DAYS.map((day) => (
            <div
              key={day}
              className="flex-1 border-r border-slate-200 last:border-0 relative min-h-[720px]"
            >
              {blocks
                .filter((b) => b.day === day)
                .map((b) => {
                  const top = (b.start - 7) * 60
                  const height = (b.end - b.start) * 60
                  return (
                    <div
                      key={b.id}
                      className={`absolute w-[calc(100%-8px)] left-1 rounded-lg border p-2 shadow-sm flex flex-col overflow-hidden transition-all group ${colorForCode(b.codigo)}`}
                      style={{ top: `${top + 2}px`, height: `${height - 4}px` }}
                    >
                      <span className="font-bold text-xs leading-tight mb-1">
                        {b.nombre}
                      </span>
                      <span className="text-[10px] opacity-80 font-mono">
                        {b.codigo} - S{b.seccion}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemoveComision(b.comisionId)
                        }}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/50 hover:bg-white text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
