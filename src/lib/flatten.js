const DAY_DISPLAY = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
}

function toHour(time) {
  const [h, m] = time.split(':').map(Number)
  return h + m / 60
}

export function expandCatalog(catalog, carreraId) {
  if (!catalog || !carreraId) return []
  const carrera = catalog.carreras.find((c) => c.id === carreraId)
  if (!carrera) return []

  const codigoToSemestre = new Map()
  for (const sem of carrera.pensum) {
    for (const cod of sem.codigos) codigoToSemestre.set(cod, sem.semestre)
  }

  const rows = []
  for (const c of catalog.oferta) {
    const semestre = codigoToSemestre.get(c.codigo)
    if (semestre === undefined) continue
    const materia = catalog.materias[c.codigo]
    if (!materia) continue
    rows.push({
      id: c.id,
      codigo: c.codigo,
      nombre: materia.nombre,
      seccion: c.numero,
      profesor: c.profesor,
      cupo: c.cupo,
      semestre,
      uc: materia.UC,
      horarios: c.horarios.map((h) => ({
        day: DAY_DISPLAY[h.dia] ?? h.dia,
        start: toHour(h.hora_inicio),
        end: toHour(h.hora_fin),
        startStr: h.hora_inicio,
        endStr: h.hora_fin,
        aula: h.aula,
      })),
    })
  }
  return rows
}

export function comisionToBlocks(row) {
  return row.horarios.map((h, i) => ({
    id: `${row.id}__${i}`,
    comisionId: row.id,
    codigo: row.codigo,
    nombre: row.nombre,
    seccion: row.seccion,
    profesor: row.profesor,
    aula: h.aula,
    day: h.day,
    start: h.start,
    end: h.end,
  }))
}
