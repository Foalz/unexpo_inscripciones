import { CheckCircle, AlertTriangle } from 'lucide-react'

export function Toast({ message, type }) {
  return (
    <div
      className={`fixed bottom-24 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-3 animate-in slide-in-from-bottom-5 ${
        type === 'error'
          ? 'bg-rose-50 border-rose-200 text-rose-800'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
      }`}
    >
      {type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
      {message}
    </div>
  )
}
