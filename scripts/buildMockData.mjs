// Generador de mockData.json a partir de los pensums extraídos
// de los PDFs oficiales del Vicerrectorado Luis Caballero Mejías (UNEXPO).
//
// Pensum: real (códigos, nombres, T/P/L/UC, requisitos).
// Comisiones/horarios: sintetizados deterministicamente por hash del código —
// son MOCKUPS; los horarios reales los va a poblar el admin desde el backoffice.
//
// Uso: node scripts/buildMockData.mjs

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// =====================================================================
// MATERIAS — fuente de verdad deduplicada por código
// Formato: [codigo, nombre, T, P, L, UC, requisitos]
// =====================================================================

const MATERIAS_RAW = [
  // --- Ciclo básico (sem 1-2, comunes a las 3 carreras) ---
  ['11015', 'Matemática I', 4, 2, 0, 5, []],
  ['14012', 'Dibujo I', 1, 3, 0, 2, []],
  ['21012', 'Inglés I', 1, 0, 3, 2, []],
  ['13013', 'Química', 2, 3, 0, 3, []],
  ['22012', 'Lenguaje y Comunicación I', 2, 1, 0, 2, []],
  ['11052', 'Lógica', 2, 1, 0, 2, []],
  ['26211', 'Educación Física de Base', 0, 2, 0, 1, []],
  ['11025', 'Matemática II', 4, 2, 0, 5, ['11015']],
  ['12014', 'Física I', 3, 3, 0, 4, ['11015']],
  ['12031', 'Laboratorio de Física I', 0, 0, 3, 1, ['P(12014)']],
  ['13021', 'Laboratorio de Química', 0, 0, 3, 1, ['13013']],
  ['51012', 'Tecnología de Materiales', 2, 1, 0, 2, ['13013', 'P(12014)']],
  ['21022', 'Inglés II', 1, 0, 3, 2, ['21012']],
  ['14022', 'Dibujo II', 1, 3, 0, 2, ['14012']],
  ['22022', 'Lenguaje y Comunicación II', 2, 0, 0, 2, ['22012']],
  ['DEP-I', 'Deportes I', 0, 2, 0, 1, ['26211']],

  // --- Materias compartidas en sem 3+ ---
  ['11034', 'Matemática III', 3, 3, 0, 4, ['11025']],
  ['12024', 'Física II', 3, 3, 0, 4, ['12014', '12031', '11025']],
  ['12041', 'Laboratorio de Física II', 0, 0, 3, 1, ['P(12024)']],
  ['11044', 'Matemática IV', 3, 3, 0, 4, ['11034']],
  ['46513', 'Programación Digital', 2, 3, 0, 3, ['11034', '11052']],
  ['33103', 'Estadísticas y Probabilidades', 2, 3, 0, 3, ['11025']],
  ['33013', 'Inferencia Estadística I', 2, 2, 0, 3, ['11034']],
  ['23022', 'Metodología de la Investigación', 2, 1, 0, 2, ['33103']],
  ['32012', 'Informes Industriales', 2, 1, 0, 2, ['57 UCA', '22022']],
  ['41144', 'Electrotecnia', 3, 2, 0, 4, ['12024', '11034']],
  ['41151', 'Laboratorio de Electrotecnia', 0, 0, 3, 1, ['P(41144)']],
  ['52233', 'Mecánica de Fluidos', 3, 1, 0, 3, ['53014', '11044']],
  ['53014', 'Mecánica Racional', 3, 3, 0, 4, ['12014', 'P(11034)']],
  ['54011', 'Laboratorio de Materiales', 0, 0, 3, 1, ['51012']],
  ['24022', 'Problemática del Desarrollo Social y Económico', 2, 0, 0, 2, ['22022', '96 UCA']],
  ['24032', 'Problemática Contemporánea de la Ciencia y la Tecnología', 2, 0, 0, 2, ['24022']],
  ['24012', 'Estudio y Comprensión del Hombre', 2, 0, 0, 2, ['24032']],
  ['32152', 'Derecho para Ingenieros', 2, 0, 0, 2, ['150 UCA']],
  ['DEP-II', 'Deportes II', 0, 2, 0, 1, ['DEP-I']],

  // --- Industrial ---
  ['51202', 'Tecnología', 2, 1, 0, 2, ['14022', '51012']],
  ['54202', 'Laboratorio de Tecnología', 0, 0, 4, 2, ['P(51202)']],
  ['52203', 'Termodinámica', 3, 1, 0, 3, ['P(11034)', '13021']],
  ['53094', 'Mecánica de los Sólidos', 3, 2, 0, 4, ['53014', 'P(11044)']],
  ['31254', 'Físico-Química', 2, 2, 3, 4, ['13021', '52203']],
  ['33023', 'Inferencia Estadística II', 2, 2, 0, 3, ['33013']],
  ['34013', 'Economía I', 3, 1, 0, 3, ['33013', '11044']],
  ['31034', 'Ingeniería Química', 3, 1, 2, 4, ['31254', '32012']],
  ['34034', 'Control de Costos', 3, 2, 0, 4, ['P(34013)']],
  ['32032', 'Contaminación Ambiental', 2, 1, 0, 2, ['P(31034)']],
  ['33033', 'Investigación Operativa I', 3, 1, 0, 3, ['33023']],
  ['53203', 'Diseño de Máquinas', 2, 2, 0, 3, ['53094', '51202']],
  ['34023', 'Economía II', 3, 1, 0, 3, ['34013', '34034']],
  ['31023', 'Mantenimiento Industrial', 2, 1, 3, 3, ['54202', '54011', '33013', '32012']],
  ['32023', 'Higiene y Seguridad Industrial', 2, 1, 3, 3, ['32032', '54202', '12024']],
  ['33043', 'Investigación Operativa II', 3, 1, 0, 3, ['33033']],
  ['52212', 'Conversión de Energía', 2, 1, 0, 2, ['31034', '52233']],
  ['52221', 'Laboratorio de Conversión de Energía', 0, 0, 3, 1, ['P(52212)']],
  ['32082', 'Sistemas y Procedimientos', 2, 1, 0, 2, ['100 UCA']],
  ['32073', 'Administración de Personal', 3, 0, 0, 3, ['100 UCA', '32023']],
  ['33063', 'Control de Calidad', 3, 1, 0, 3, ['33023', '31023']],
  ['34043', 'Mercadotecnia', 3, 1, 0, 3, ['34023']],
  ['21232', 'Inglés III (Industrial)', 2, 2, 0, 2, ['21022', '99 UCA']],
  ['31054', 'Ingeniería de Métodos', 3, 1, 2, 4, ['33043', '34023', '32012']],
  ['31064', 'Ingeniería de Producción', 3, 3, 0, 4, ['33043']],
  ['31074', 'Plantas Industriales', 3, 3, 0, 4, ['P(31192)']],
  ['32102', 'Gerencia Empresarial', 2, 1, 0, 2, ['34043', '32082', '32073', '34023']],
  ['51212', 'Instrumentación', 2, 1, 0, 2, ['52212', '52221']],
  ['31192', 'Diseño de Instalaciones Industriales', 1, 3, 0, 2, ['52233']],

  // --- Mecánica ---
  ['53403', 'Mecánica I', 2, 2, 0, 3, ['12014', 'P(11034)']],
  ['53302', 'Diseño I', 1, 3, 0, 2, ['14022']],
  ['51022', 'Tecnología de Producción I', 2, 1, 0, 2, ['51012', 'P(53302)']],
  ['53064', 'Mecánica de Sólidos I', 3, 3, 0, 4, ['53403', 'P(11044)']],
  ['51032', 'Tecnología de Producción II', 2, 1, 0, 2, ['51022', '53302']],
  ['54022', 'Laboratorio de Tecnología Mecánica I', 0, 0, 4, 2, ['51022', 'P(51032)']],
  ['53413', 'Mecánica II', 2, 2, 0, 3, ['11034', '53403']],
  ['53114', 'Mecánica de Sólidos II', 3, 2, 0, 4, ['53064', '11044']],
  ['51042', 'Tecnología de Producción III', 2, 1, 0, 2, ['53064', '51032']],
  ['52013', 'Termodinámica I', 2, 3, 0, 3, ['11044', '13021']],
  ['52123', 'Matemática Aplicada', 2, 3, 0, 3, ['11044']],
  ['54032', 'Laboratorio de Tecnología Mecánica II', 0, 0, 4, 2, ['54022', '51032']],
  ['53313', 'Dinámica de Máquinas I', 2, 3, 0, 3, ['53413', '53302']],
  ['53124', 'Diseño II', 3, 2, 0, 4, ['53114', '53302']],
  ['52043', 'Máquinas Hidráulicas', 2, 3, 0, 3, ['52233', '52013']],
  ['52033', 'Termodinámica II', 2, 3, 0, 3, ['52013']],
  ['53323', 'Dinámica de Máquinas II', 2, 3, 0, 3, ['53313', '52123']],
  ['52501', 'Laboratorio de Termodinámica', 0, 0, 2, 1, ['P(52033)']],
  ['52251', 'Laboratorio de Mecánica de Fluidos', 0, 0, 2, 1, ['52233']],
  ['52054', 'Transferencia de Calor I', 3, 2, 0, 4, ['52033', '52123', '52501']],
  ['31263', 'Elementos de Producción I', 3, 1, 0, 3, ['33103', '51042']],
  ['21132', 'Inglés III (Mecánica)', 2, 2, 0, 2, ['21022', '97 UCA']],
  ['53133', 'Diseño III', 2, 3, 0, 3, ['53124']],
  ['51053', 'Instrumentación', 3, 1, 0, 3, ['52233', '52033', '41144']],
  ['51061', 'Laboratorio de Instrumentación', 0, 0, 3, 1, ['P(51053)']],
  ['53281', 'Laboratorio de Dinámica de Máquinas', 0, 0, 2, 1, ['53323']],
  ['52133', 'Instalaciones Térmicas', 2, 2, 0, 3, ['P(52063)']],
  ['31273', 'Elementos de Producción II', 3, 1, 0, 3, ['31263']],
  ['52063', 'Transferencia de Calor II', 2, 2, 0, 3, ['52054']],
  ['52083', 'Máquinas de Desplazamiento', 2, 2, 0, 3, ['52054', '52043']],
  ['51183', 'Controles Automáticos', 3, 1, 0, 3, ['51053', '52123']],
  ['52161', 'Laboratorio de Instalaciones Térmicas', 0, 0, 3, 1, ['P(52133)']],
  ['51171', 'Laboratorio de Controles Automáticos', 0, 0, 3, 1, ['P(51183)']],
  ['52171', 'Laboratorio de Máquinas de Desplazamiento', 0, 0, 3, 1, ['P(52083)']],
  ['52111', 'Laboratorio de Transferencia de Calor', 0, 0, 3, 1, ['P(52063)']],

  // --- Sistemas ---
  ['41514', 'Sistemas Eléctricos I', 3, 2, 0, 4, ['P(12041)', 'P(12024)', '34 UCA']],
  ['41521', 'Laboratorio de Sistemas Eléctricos I', 0, 0, 3, 1, ['P(41514)', '34 UCA']],
  ['41534', 'Sistemas Eléctricos II', 3, 2, 0, 4, ['11034', '41514', '41521', '12024']],
  ['41541', 'Laboratorio de Sistemas Eléctricos II', 0, 0, 3, 1, ['P(41534)']],
  ['45514', 'Sistemas Electrónicos I', 3, 2, 0, 4, ['41514', '41521']],
  ['45521', 'Laboratorio de Sistemas Electrónicos I', 0, 0, 3, 1, ['P(45514)']],
  ['42513', 'Sistemas Digitales I', 3, 1, 0, 3, ['P(45534)', '46513']],
  ['42521', 'Laboratorio de Sistemas Digitales I', 0, 0, 3, 1, ['P(42513)', '46513']],
  ['52243', 'Fluidos', 3, 1, 0, 3, ['53014', '13021']],
  ['43514', 'Sistemas de Control I', 3, 2, 0, 4, ['11044', '41534', '41541']],
  ['41553', 'Convertidores Eléctricos', 3, 1, 0, 3, ['11044', '41534', '41541']],
  ['41561', 'Laboratorio de Convertidores Eléctricos', 0, 0, 3, 1, ['P(41553)']],
  ['45534', 'Sistemas Electrónicos II', 4, 1, 0, 4, ['11044', '45514', '45521']],
  ['45541', 'Laboratorio de Sistemas Electrónicos II', 0, 0, 3, 1, ['P(45534)']],
  ['42533', 'Sistemas Digitales II', 3, 1, 0, 3, ['42513', '42521', '45534']],
  ['42541', 'Laboratorio de Sistemas Digitales II', 0, 0, 3, 1, ['P(42533)']],
  ['43523', 'Instrumentación Industrial', 3, 1, 0, 3, ['52243', '43514']],
  ['43531', 'Laboratorio de Instrumentación Industrial', 0, 0, 3, 1, ['P(43523)']],
  ['43545', 'Modelaje y Simulación Digital', 4, 2, 0, 5, ['43514', '46513']],
  ['45553', 'Electrónica Industrial', 3, 1, 0, 3, ['45534', '45541', '42513', '41553', '41561']],
  ['45561', 'Laboratorio de Electrónica Industrial', 0, 0, 3, 1, ['P(45553)']],
  ['42553', 'Sistemas Digitales III', 3, 1, 0, 3, ['42533', '42541']],
  ['42561', 'Laboratorio de Sistemas Digitales III', 0, 0, 3, 1, ['P(42553)']],
  ['46523', 'Procesamiento de Datos', 3, 1, 0, 3, ['96 UCA', '46513', '43545']],
  ['43554', 'Sistemas de Control II', 3, 2, 0, 4, ['43523', '43531', '43545', '45534']],
  ['43561', 'Laboratorio de Sistemas de Control II', 0, 0, 3, 1, ['P(43554)']],
  ['44513', 'Sistemas de Señales', 3, 1, 0, 3, ['11044', '96 UCA']],
  ['34052', 'Elementos de Economía', 2, 1, 0, 2, ['100 UCA']],
  ['21032', 'Inglés III (Sistemas)', 2, 2, 0, 2, ['97 UCA', '21022']],
  ['43573', 'Sistemas de Control III', 3, 1, 0, 3, ['43554', '43561', '42533']],
  ['43581', 'Laboratorio Sistemas de Control III', 0, 0, 3, 1, ['P(43573)']],
  ['44023', 'Sistemas de Comunicaciones', 3, 1, 0, 3, ['44513']],
  ['44031', 'Laboratorio de Sistemas de Comunicaciones', 0, 0, 3, 1, ['P(44023)']],
  ['33113', 'Investigación de Operaciones', 2, 3, 0, 3, ['33103', '34052', '43545']],
  ['31113', 'Producción', 2, 2, 0, 3, ['33113']],
  ['44043', 'Transmisión de Datos', 3, 1, 0, 3, ['44023', '44031']],
  ['43592', 'Proyectos Industriales', 1, 0, 3, 2, ['42553', '43573', '44023', '45553']],
]

const MATERIAS = MATERIAS_RAW.map(([codigo, nombre, T, P, L, UC, requisitos]) => ({
  codigo, nombre, T, P, L, UC, requisitos,
}))

// =====================================================================
// CARRERAS — pensum de cada carrera (semestres 1-9; sem 10 = entrenamiento)
// =====================================================================

const CARRERAS = [
  {
    id: 'industrial',
    nombre: 'Ingeniería Industrial',
    pensum: [
      { semestre: 1, totalUC: 17, codigos: ['11015', '14012', '21012', '13013', '22012', '11052', '26211'] },
      { semestre: 2, totalUC: 20, codigos: ['11025', '12014', '12031', '13021', '51012', '21022', '14022', '22022', 'DEP-I'] },
      { semestre: 3, totalUC: 21, codigos: ['11034', '12024', '12041', '53014', '51202', '54202', '54011', '52203'] },
      { semestre: 4, totalUC: 20, codigos: ['11044', '53094', '46513', '31254', '33013', '32012'] },
      { semestre: 5, totalUC: 21, codigos: ['33023', '41144', '41151', '34013', '31034', '34034', '32032'] },
      { semestre: 6, totalUC: 20, codigos: ['33033', '53203', '34023', '31023', '32023', '52233', '23022'] },
      { semestre: 7, totalUC: 21, codigos: ['33043', '52212', '52221', '32082', '32073', '33063', '34043', '24022', '21232'] },
      { semestre: 8, totalUC: 20, codigos: ['31054', '31064', '31074', '32102', '51212', '31192', '24032'] },
      { semestre: 9, totalUC: 21, codigos: ['32152', '24012', 'DEP-II'] },
    ],
  },
  {
    id: 'mecanica',
    nombre: 'Ingeniería Mecánica',
    pensum: [
      { semestre: 1, totalUC: 17, codigos: ['11015', '14012', '21012', '13013', '22012', '11052', '26211'] },
      { semestre: 2, totalUC: 20, codigos: ['11025', '12014', '12031', '13021', '51012', '21022', '14022', '22022', 'DEP-I'] },
      { semestre: 3, totalUC: 20, codigos: ['11034', '12024', '12041', '53403', '53302', '51022', '54011', '33103'] },
      { semestre: 4, totalUC: 20, codigos: ['11044', '53064', '46513', '51032', '54022', '53413', '23022'] },
      { semestre: 5, totalUC: 20, codigos: ['53114', '51042', '52013', '52123', '54032', '53313', '52233'] },
      { semestre: 6, totalUC: 20, codigos: ['53124', '52043', '52033', '53323', '41144', '52501', '41151', '52251'] },
      { semestre: 7, totalUC: 21, codigos: ['52054', '31263', '32012', '21132', '53133', '51053', '51061', '53281', '24022'] },
      { semestre: 8, totalUC: 21, codigos: ['52133', '31273', '52063', '52083', '51183', '52161', '51171', '52171', '52111', '24032'] },
      { semestre: 9, totalUC: 21, codigos: ['24012', '32152', 'DEP-II'] },
    ],
  },
  {
    id: 'sistemas',
    nombre: 'Ingeniería de Sistemas',
    pensum: [
      { semestre: 1, totalUC: 17, codigos: ['11015', '14012', '21012', '13013', '22012', '11052', '26211'] },
      { semestre: 2, totalUC: 20, codigos: ['11025', '12014', '12031', '13021', '51012', '21022', '14022', '22022', 'DEP-I'] },
      { semestre: 3, totalUC: 20, codigos: ['11034', '12024', '12041', '41514', '41521', '46513', '33103'] },
      { semestre: 4, totalUC: 20, codigos: ['11044', '53014', '41534', '41541', '45514', '45521', '32012'] },
      { semestre: 5, totalUC: 20, codigos: ['42513', '42521', '52243', '43514', '41553', '41561', '45534', '45541'] },
      { semestre: 6, totalUC: 19, codigos: ['42533', '42541', '43523', '43531', '43545', '45553', '45561', '23022'] },
      { semestre: 7, totalUC: 21, codigos: ['42553', '42561', '46523', '43554', '43561', '44513', '34052', '21032', '24022'] },
      { semestre: 8, totalUC: 20, codigos: ['43573', '43581', '44023', '44031', '33113', '24032', 'DEP-II'] },
      { semestre: 9, totalUC: 21, codigos: ['31113', '44043', '43592', '24012', '32152'] },
    ],
  },
]

// =====================================================================
// SINTETIZADOR DE COMISIONES (mockup determinístico)
// =====================================================================

const DAY_PAIRS = [
  ['lunes', 'miercoles'],
  ['martes', 'jueves'],
  ['lunes', 'jueves'],
  ['martes', 'viernes'],
  ['miercoles', 'viernes'],
]
const SINGLE_DAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']

const PROFESORES = [
  'Pérez', 'Gómez', 'Ruiz', 'García', 'López', 'Fernández', 'Martínez',
  'Sánchez', 'Torres', 'Vargas', 'Rodríguez', 'Salas', 'Díaz', 'Silva',
  'Hernández', 'Romero', 'Castillo', 'Mendoza', 'Acosta', 'Marín',
]
const TITULOS = ['Dr.', 'Dra.', 'Ing.', 'Mg.', 'Lic.', 'Prof.']

const AULAS_TEORIA = Array.from({ length: 14 }, (_, i) => `Aula ${100 + i * 11}`)
const LABS = [
  'Lab Física 1', 'Lab Física 2', 'Lab Química',
  'Lab Materiales', 'Lab Tecnología 1', 'Lab Tecnología 2',
  'Lab Info 1', 'Lab Info 2', 'Lab Info 3', 'Lab Info 4',
  'Lab Electrotecnia', 'Lab Electrónica', 'Lab Termodinámica', 'Lab Fluidos',
]

const TURNO_BASES = [7, 8, 9, 10, 13, 14, 15, 16, 18, 19] // saltea 11-13 (almuerzo)

function hash(str) {
  let h = 0
  for (const c of str) h = ((h << 5) - h + c.charCodeAt(0)) | 0
  return Math.abs(h)
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function buildHorarios(materia) {
  const total = materia.T + materia.P + materia.L
  if (total === 0) return []

  const h = hash(materia.codigo)
  const isLab = materia.L >= materia.T && materia.L > 0
  const aula = (isLab ? LABS : AULAS_TEORIA)[h % (isLab ? LABS.length : AULAS_TEORIA.length)]

  // Distribución: si total <= 4, una sesión; si no, dos
  let sessions
  if (total <= 4) {
    sessions = [{ days: [SINGLE_DAYS[h % SINGLE_DAYS.length]], hours: total }]
  } else {
    const half = Math.ceil(total / 2)
    sessions = [{ days: DAY_PAIRS[h % DAY_PAIRS.length], hours: half }]
  }

  // Hora de inicio: hash → uno de TURNO_BASES, evitando que se pase de 22:00
  let baseIdx = h % TURNO_BASES.length
  let baseHour = TURNO_BASES[baseIdx]
  while (baseHour + sessions[0].hours > 22) {
    baseIdx = (baseIdx + 1) % TURNO_BASES.length
    baseHour = TURNO_BASES[baseIdx]
  }

  const horarios = []
  for (const s of sessions) {
    for (const dia of s.days) {
      horarios.push({
        dia,
        hora_inicio: `${pad(baseHour)}:00`,
        hora_fin: `${pad(baseHour + s.hours)}:00`,
        aula,
      })
    }
  }
  return horarios
}

function buildProfesor(materia) {
  const h = hash(materia.codigo)
  const titulo = TITULOS[h % TITULOS.length]
  const apellido = PROFESORES[(h >> 4) % PROFESORES.length]
  return `${titulo} ${apellido}`
}

function buildCupo(materia) {
  return 25 + (hash(materia.codigo) % 21) // 25-45
}

// =====================================================================
// BUILD
// =====================================================================

const oferta = []
for (const m of MATERIAS) {
  const horarios = buildHorarios(m)
  if (horarios.length === 0) continue
  oferta.push({
    codigo: m.codigo,
    id: `${m.codigo}-01`,
    numero: '01',
    profesor: buildProfesor(m),
    cupo: buildCupo(m),
    horarios,
  })
}

const materias = Object.fromEntries(
  MATERIAS.map((m) => [
    m.codigo,
    {
      codigo: m.codigo,
      nombre: m.nombre,
      T: m.T, P: m.P, L: m.L, UC: m.UC,
      HT: m.T + m.P + m.L,
      requisitos: m.requisitos,
    },
  ])
)

const output = {
  version: '2026-2',
  actualizado: new Date().toISOString().slice(0, 10),
  fuente: 'UNEXPO Vicerrectorado Luis Caballero Mejías - Resolución 200404002 (26/02/2004)',
  carreras: CARRERAS,
  materias,
  oferta,
}

const outPath = join(__dirname, '../public/mockData.json')
writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n')

console.log(`✓ ${outPath}`)
console.log(`  carreras: ${CARRERAS.length}`)
console.log(`  materias únicas: ${MATERIAS.length}`)
console.log(`  comisiones generadas: ${oferta.length}`)
