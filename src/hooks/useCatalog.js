import { useEffect, useState } from 'react'
import { loadCatalog } from '../lib/catalog'

export function useCatalog() {
  const [catalog, setCatalog] = useState(null)
  const [source, setSource] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    loadCatalog({
      onUpdate: (fresh) => {
        if (!cancelled) {
          setCatalog(fresh)
          setSource('network')
        }
      },
    })
      .then(({ catalog, source }) => {
        if (!cancelled) {
          setCatalog(catalog)
          setSource(source)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { catalog, source, error, loading: !catalog && !error }
}
