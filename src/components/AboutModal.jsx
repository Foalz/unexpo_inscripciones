import { Info, Mail, X } from 'lucide-react'

export function AboutModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
          <Info size={32} className="mx-auto mb-3 opacity-90" />
          <h2 className="text-xl font-bold mb-1">UNEXPO Scheduler</h2>
          <p className="text-indigo-100 text-sm">
            Plataforma de armado y exportación de horarios.
          </p>
        </div>

        <div className="p-6 space-y-5">
          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Desarrollado por
            </h3>
            <p className="text-slate-900 font-semibold">Pedro Contreras</p>
            <p className="text-slate-500 text-sm">@PedroCops</p>
            <a
              href="mailto:pedrocontreras@conceptualdynamic.com"
              className="mt-2 inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Mail size={14} />
              pedrocontreras@conceptualdynamic.com
            </a>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Stack técnico
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>
                <span className="font-medium text-slate-800">Frontend:</span>{' '}
                React + Vite + Tailwind CSS
              </li>
              <li>
                <span className="font-medium text-slate-800">Backend:</span>{' '}
                FastAPI + AWS Lambda (Mangum)
              </li>
              <li>
                <span className="font-medium text-slate-800">Datos:</span>{' '}
                Amazon DynamoDB · S3
              </li>
              <li>
                <span className="font-medium text-slate-800">IA:</span>{' '}
                Amazon Nova Micro (Bedrock)
              </li>
              <li>
                <span className="font-medium text-slate-800">Infra:</span>{' '}
                Terraform · GitHub Pages
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Datos académicos
            </h3>
            <p className="text-sm text-slate-600">
              Pensum oficial UNEXPO Vicerrectorado Luis Caballero Mejías,
              Resolución N° 200404002 (26/02/2004).
            </p>
          </section>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Versión Fase 1 · Frontend estático
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
