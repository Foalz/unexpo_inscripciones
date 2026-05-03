import { useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'

export function Sidebar({
  comisiones,
  semesters,
  search,
  setSearch,
  semester,
  setSemester,
  onAdd,
  isOpen,
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return comisiones.filter((c) => {
      const matchesSearch =
        !q || c.nombre.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q)
      const matchesSemester = !semester || String(c.semestre) === semester
      return matchesSearch && matchesSemester
    })
  }, [comisiones, search, semester])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const c of filtered) {
      if (!map.has(c.semestre)) map.set(c.semestre, [])
      map.get(c.semestre).push(c)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [filtered])

  return (
    <aside
      className={`absolute lg:relative z-10 w-full sm:w-80 h-full bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-4 border-b border-slate-100 shrink-0">
        <div className="relative mb-3">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar materia o código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los semestres</option>
            {semesters.map((s) => (
              <option key={s} value={s}>
                Semestre {s}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {grouped.map(([sem, items]) => (
          <section key={sem}>
            <header className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-white/95 backdrop-blur-sm border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {sem === 99 ? 'Electivas' : `Semestre ${sem}`}
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {items.length}
              </span>
            </header>
            <div className="space-y-2 pt-2">
              {items.map((c) => (
                <SubjectCard key={c.id} comision={c} onAdd={() => onAdd(c)} />
              ))}
            </div>
          </section>
        ))}
        {grouped.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-8">
            No se encontraron materias.
          </div>
        )}
      </div>
    </aside>
  )
}

function SubjectCard({ comision, onAdd }) {
  const summary = comision.horarios
    .map((h) => `${h.day.slice(0, 3)} ${h.startStr}-${h.endStr}`)
    .join(' · ')

  return (
    <div
      onClick={onAdd}
      className="bg-white border border-slate-200 rounded-xl p-3 hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-1 gap-2">
        <h3 className="font-semibold text-slate-800 text-sm flex-1">{comision.nombre}</h3>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            {comision.codigo}
          </span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
            {comision.uc} UC
          </span>
        </div>
      </div>
      <div className="text-xs text-slate-500 flex flex-col gap-1">
        <span>
          Sec: {comision.seccion} | {comision.profesor}
        </span>
        <span className="font-medium text-indigo-600 bg-indigo-50 inline-block w-fit px-2 py-0.5 rounded-sm">
          {summary}
        </span>
      </div>
    </div>
  )
}
