import { Mail, Cloud, Database, Cpu, Shield, FileText } from 'lucide-react'
import { NavLinks } from '../components/NavLinks'

export function About({ currentView, onViewChange }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            U
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
            UNEXPO Scheduler
          </h1>
        </div>
        <NavLinks currentView={currentView} onViewChange={onViewChange} />
      </header>

      <main className="flex-1 overflow-auto">
        <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
            <p className="text-indigo-200 text-sm font-medium tracking-wider uppercase mb-3">
              UNEXPO · Vicerrectorado Luis Caballero Mejías
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Sistema de Inscripción y Armado de Horarios
            </h1>
            <p className="text-lg lg:text-xl text-indigo-100 leading-relaxed">
              Plataforma serverless que permite a los estudiantes armar visualmente
              su horario, detectar choques en tiempo real y exportar el comprobante
              de inscripción — sin servidor relacional y a costo cero.
            </p>
            <div className="mt-8 flex gap-2 flex-wrap">
              {['React + Vite', 'FastAPI · Lambda', 'DynamoDB', 'Bedrock Nova Micro', '$0/mes'].map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16 space-y-14">
          <Section title="Propósito" id="proposito">
            <p>
              Resolver el cuello de botella operativo de las inscripciones académicas
              de UNEXPO. Cada cuatrimestre, alrededor de <strong>1100 estudiantes</strong>{' '}
              deben armar manualmente su horario cruzando un PDF de oferta con el
              pensum de su carrera, validando choques a ojo y entregando un
              comprobante en papel. El proceso es lento, propenso a errores, y
              colapsa los servidores en las ventanas de inscripción.
            </p>
            <p>
              Esta plataforma traslada todo el cómputo al navegador del estudiante:
              el catálogo se sirve como snapshot estático desde S3, los choques
              se detectan en tiempo real con JavaScript puro, y el comprobante se
              genera localmente con <code>jsPDF</code>. El servidor solo interviene
              para validar el opcional asistente de IA, protegido por cuotas en
              DynamoDB.
            </p>
          </Section>

          <Section title="Características" id="caracteristicas">
            <h3 className="font-semibold text-slate-900 mb-2">Módulo del Estudiante</h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>Catálogo del pensum cacheado en IndexedDB con revalidación en background</li>
              <li>Selección de carrera persistente (Industrial, Mecánica, Sistemas)</li>
              <li>Buscador y filtro por semestre con materias agrupadas</li>
              <li>Calendario interactivo (CSS Grid, lunes a viernes)</li>
              <li>Detección de choques de horario con feedback inmediato (toast)</li>
              <li>Exportación del comprobante a PDF en el cliente</li>
              <li>Asistente IA opcional (Amazon Nova Micro vía Bedrock)</li>
              <li>Vista responsive (desktop y móvil)</li>
            </ul>

            <h3 className="font-semibold text-slate-900 mb-2">Módulo Administrativo</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Autenticación segura para personal de Control de Estudios</li>
              <li>Dropzone para PDFs de oferta y CSV de expedientes autorizados</li>
              <li>Extracción asistida con previsualización editable (correción OCR)</li>
              <li>Publicación del snapshot estático a S3 con un click</li>
            </ul>
          </Section>

          <Section title="Arquitectura" id="arquitectura">
            <p className="mb-4">
              El sistema sigue el patrón <strong>Static Snapshot</strong>: el
              frontend nunca consulta una base de datos relacional para leer el
              catálogo de materias. Consume un archivo JSON estático que el admin
              regenera y publica cada cuatrimestre.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <ArchCard icon={Cloud} title="Frontend">
                React + Vite + Tailwind v4. Hosteado en GitHub Pages. Caché local
                con IndexedDB. PDF generado en el navegador con jsPDF.
              </ArchCard>
              <ArchCard icon={Cpu} title="Backend">
                FastAPI envuelto con Mangum sobre AWS Lambda. Solo se invoca para
                el endpoint de IA y el flujo administrativo.
              </ArchCard>
              <ArchCard icon={Database} title="Datos">
                Amazon DynamoDB (capa gratuita) para cuotas y expedientes.
                Amazon S3 para el snapshot estático del catálogo.
              </ArchCard>
              <ArchCard icon={Shield} title="IA y seguridad">
                Amazon Nova Micro vía Bedrock, protegido por Cloudflare Turnstile,
                cuotas por expediente, IP, y un cap global con circuit breaker.
              </ArchCard>
            </div>
          </Section>

          <Section title="Reglas estrictas de ingeniería" id="reglas">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Static Snapshot:</strong> el frontend consume{' '}
                <code>horarios_historico.json</code> desde S3 / GitHub Pages. Sin
                consultas relacionales en tiempo real.
              </li>
              <li>
                <strong>Cero cómputo de PDFs en el servidor:</strong> los
                comprobantes se generan exclusivamente en el navegador del
                estudiante.
              </li>
              <li>
                <strong>Rate limiting duro:</strong> cualquier endpoint de IA
                consulta DynamoDB y rechaza al sexto intento por expediente.
                Cap por IP y cap global como capas adicionales.
              </li>
              <li>
                <strong>Seguridad absoluta:</strong> ninguna llave o string de
                conexión en el código. Todo se inyecta vía variables de entorno.
              </li>
              <li>
                <strong>Aislamiento local:</strong> Docker y mocks para no
                generar gastos en AWS durante el desarrollo.
              </li>
            </ol>
          </Section>

          <Section title="Datos académicos" id="datos">
            <p>
              El pensum embebido proviene del documento oficial del{' '}
              <strong>Vicerrectorado Luis Caballero Mejías de UNEXPO</strong>,
              aprobado mediante <strong>Resolución N° 200404002</strong> de fecha
              26/02/2004, e incluye las tres carreras del vicerrectorado:
              Ingeniería Industrial, Ingeniería Mecánica e Ingeniería de Sistemas
              (10 semestres cada una, ~136 materias únicas con sus requisitos,
              T/P/L y unidades de crédito).
            </p>
            <p className="text-sm text-slate-500 mt-3">
              Los horarios mostrados durante esta fase son mockups generados
              determinísticamente. Los horarios reales se ingestan vía el
              módulo administrativo a partir del PDF de oferta de cada cuatrimestre.
            </p>
          </Section>

          <Section title="Documentación" id="documentacion">
            <p className="mb-3">Documentación técnica disponible:</p>
            <ul className="space-y-2">
              <DocLink href="#" label="Setup local (Docker, WSL, mocks)" />
              <DocLink href="#" label="Estructura del catálogo (horarios_historico.json)" />
              <DocLink href="#" label="Despliegue con Terraform" />
              <DocLink href="#" label="Manual de operaciones para Control de Estudios" />
              <DocLink href="#" label="Guía de usuario para estudiantes" />
              <DocLink href="#" label="Threat model y estrategia de rate limiting" />
            </ul>
            <p className="text-sm text-slate-500 mt-4">
              Esta sección es un placeholder — completar con enlaces reales
              cuando la documentación esté publicada.
            </p>
          </Section>

          <Section title="Desarrollador" id="desarrollador">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                P
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Pedro Contreras</h3>
                <p className="text-sm text-slate-500 mb-3">@PedroCops</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="mailto:pedrocontreras@conceptualdynamic.com"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Mail size={14} /> pedrocontreras@conceptualdynamic.com
                  </a>
                </div>
              </div>
            </div>
          </Section>

          <footer className="border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
            <p>
              UNEXPO Scheduler · Fase 1 (frontend estático) · Mayo 2026
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}

function Section({ title, id, children }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
        {title}
      </h2>
      <div className="text-slate-600 leading-relaxed space-y-4">{children}</div>
    </section>
  )
}

function ArchCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-indigo-600" />
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{children}</p>
    </div>
  )
}

function DocLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 hover:underline text-sm"
      >
        <FileText size={14} /> {label}
      </a>
    </li>
  )
}
