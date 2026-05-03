import { useEffect, useState } from 'react'

const KEY = 'horarios:carrera'

export function useCarrera() {
  const [carrera, setCarreraState] = useState(() => {
    try {
      return localStorage.getItem(KEY)
    } catch {
      return null
    }
  })

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setCarreraState(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setCarrera = (id) => {
    try {
      if (id) localStorage.setItem(KEY, id)
      else localStorage.removeItem(KEY)
    } catch {}
    setCarreraState(id)
  }

  return [carrera, setCarrera]
}
