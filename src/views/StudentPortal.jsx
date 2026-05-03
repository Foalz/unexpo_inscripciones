import { useMemo, useState } from 'react'
import { Menu, GraduationCap } from 'lucide-react'
import { useCatalog } from '../hooks/useCatalog'
import { useCarrera } from '../hooks/useCarrera'
import { expandCatalog, comisionToBlocks } from '../lib/flatten'
import { hasClashAgainst } from '../lib/schedule'
import { Sidebar } from '../components/student/Sidebar'
import { Calendar } from '../components/student/Calendar'
import { BottomBar } from '../components/student/BottomBar'
import { AiModal } from '../components/student/AiModal'
import { Toast } from '../components/student/Toast'
import { CarreraSelector } from '../components/student/CarreraSelector'
import { NavLinks } from '../components/NavLinks'

export function StudentPortal({ currentView, onViewChange }) {
  const { catalog, loading, error } = useCatalog()
  const [carreraId, setCarreraId] = useCarrera()
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [semester, setSemester] = useState('')
  const [toast, setToast] = useState(null)
  const [aiOpen, setAiOpen] = useState(false)
  const [carreraModalOpen, setCarreraModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const carrera = catalog?.carreras.find((c) => c.id === carreraId)
  const showCarreraModal = catalog && (!carreraId || carreraModalOpen)

  const comisiones = useMemo(
    () => expandCatalog(catalog, carreraId),
    [catalog, carreraId]
  )
  const semesters = useMemo(() => {
    const s = new Set(comisiones.map((c) => c.semestre))
    return [...s].sort((a, b) => a - b)
  }, [comisiones])

  const blocks = useMemo(() => selected.flatMap(comisionToBlocks), [selected])
  const totalUC = useMemo(
    () => selected.reduce((sum, c) => sum + (c.uc ?? 0), 0),
    [selected]
  )

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = (com) => {
    if (selected.some((s) => s.id === com.id)) return
    const candidate = comisionToBlocks(com)
    if (hasClashAgainst(blocks, candidate)) {
      showToast(
        `⚠️ Choque detectado: ${com.nombre} se cruza con otra materia.`,
        'error'
      )
      return
    }
    setSelected([...selected, com])
    setSidebarOpen(false)
    showToast(`✅ ${com.nombre} añadida correctamente.`, 'success')
  }

  const handleRemove = (comisionId) => {
    setSelected(selected.filter((s) => s.id !== comisionId))
  }

  const handleSelectCarrera = (id) => {
    if (id !== carreraId) setSelected([])
    setCarreraId(id)
    setCarreraModalOpen(false)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-slate-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            U
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
            UNEXPO Scheduler
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <NavLinks
            currentView={currentView}
            onViewChange={onViewChange}
          />
          {carrera && (
            <button
              onClick={() => setCarreraModalOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              <GraduationCap size={16} />
              <span className="hidden lg:inline">{carrera.nombre}</span>
              <span className="lg:hidden capitalize">{carrera.id}</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {error ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-red-700 bg-red-50 border border-red-200 rounded p-3">
              Error: {error.message}
            </p>
          </div>
        ) : (
          <>
            <Sidebar
              comisiones={comisiones}
              semesters={semesters}
              search={search}
              setSearch={setSearch}
              semester={semester}
              setSemester={setSemester}
              onAdd={handleAdd}
              isOpen={sidebarOpen}
            />

            <main className="flex-1 flex flex-col bg-slate-50 relative h-full">
              {loading ? (
                <div className="flex-1 flex items-center justify-center text-slate-500">
                  Cargando catálogo…
                </div>
              ) : !carreraId ? (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                  Seleccioná tu carrera para ver el calendario.
                </div>
              ) : (
                <Calendar blocks={blocks} onRemoveComision={handleRemove} />
              )}
              <BottomBar
                onClear={() => setSelected([])}
                onOpenAi={() => setAiOpen(true)}
                onExport={() =>
                  showToast('Iniciando exportación PDF...', 'success')
                }
                totalUC={totalUC}
                totalMaterias={selected.length}
              />
            </main>
          </>
        )}
      </div>

      {toast && <Toast {...toast} />}
      {aiOpen && <AiModal onClose={() => setAiOpen(false)} />}
      {showCarreraModal && (
        <CarreraSelector
          carreras={catalog.carreras}
          currentId={carreraId}
          onSelect={handleSelectCarrera}
          onClose={() => setCarreraModalOpen(false)}
          blocking={!carreraId}
        />
      )}
    </div>
  )
}
