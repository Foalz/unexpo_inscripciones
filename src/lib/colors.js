const PALETTES = [
  'bg-blue-100 border-blue-300 text-blue-800',
  'bg-emerald-100 border-emerald-300 text-emerald-800',
  'bg-indigo-100 border-indigo-300 text-indigo-800',
  'bg-orange-100 border-orange-300 text-orange-800',
  'bg-purple-100 border-purple-300 text-purple-800',
  'bg-yellow-100 border-yellow-300 text-yellow-800',
  'bg-rose-100 border-rose-300 text-rose-800',
  'bg-teal-100 border-teal-300 text-teal-800',
]

export function colorForCode(code) {
  let hash = 0
  for (const c of code) hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0
  return PALETTES[Math.abs(hash) % PALETTES.length]
}
