import { openDB } from 'idb'

const DB_NAME = 'horarios'
const DB_VERSION = 1
const STORE = 'catalog'
const CACHE_KEY = 'current'
const CATALOG_URL = `${import.meta.env.BASE_URL}mockData.json`

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      db.createObjectStore(STORE)
    }
  },
})

async function readCache() {
  const db = await dbPromise
  return db.get(STORE, CACHE_KEY)
}

async function writeCache(catalog) {
  const db = await dbPromise
  await db.put(STORE, catalog, CACHE_KEY)
}

async function fetchCatalog() {
  const res = await fetch(CATALOG_URL, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`No se pudo descargar el catálogo (HTTP ${res.status})`)
  return res.json()
}

export async function loadCatalog({ onUpdate } = {}) {
  const cached = await readCache()
  if (cached) {
    revalidateInBackground(cached.version, onUpdate)
    return { catalog: cached, source: 'cache' }
  }
  const fresh = await fetchCatalog()
  await writeCache(fresh)
  return { catalog: fresh, source: 'network' }
}

async function revalidateInBackground(currentVersion, onUpdate) {
  try {
    const fresh = await fetchCatalog()
    if (fresh.version !== currentVersion) {
      await writeCache(fresh)
      onUpdate?.(fresh)
    }
  } catch {
    // offline o red caída: nos quedamos con el caché
  }
}

export async function clearCatalogCache() {
  const db = await dbPromise
  await db.delete(STORE, CACHE_KEY)
}
