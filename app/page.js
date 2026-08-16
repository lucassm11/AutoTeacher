// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      {/* Nav */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="font-display italic text-2xl text-[color:var(--color-pine)]">
          Auto<span className="text-[color:var(--color-red-pen)]">Teacher</span>
        </span>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-ink)] px-3 py-2"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] text-white rounded-lg px-4 py-2 transition shadow-sm"
          >
            Crear cuenta gratis
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="notebook-lines">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[color:var(--color-red-pen-dark)] bg-red-50 border border-red-200 rounded-full px-3 py-1 mb-5">
              Acceso anticipado para los primeros profesores
            </span>
            <h1 className="font-display text-5xl leading-tight text-[color:var(--color-pine)] mb-6">
              Corrige en minutos,
              <br />
              no en fines de semana.
            </h1>
            <p className="text-lg text-[color:var(--color-ink)]/75 mb-8 max-w-md">
              Sube la foto o el PDF de una tarea, define tu rúbrica, y deja que
              la IA prepare la nota y el feedback pregunta por pregunta.
              Tú lo revisas y confirmas en un clic — nunca se envía nada sin
              tu aprobación.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] text-white font-medium rounded-lg px-6 py-3 transition shadow-sm"
              >
                Empieza gratis
              </Link>
              <a
                href="#planes"
                className="border border-black/15 hover:border-black/30 font-medium rounded-lg px-6 py-3 transition"
              >
                Ver planes
              </a>
            </div>
          </div>

          {/* Visual: el sello, protagonista también aquí */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 p-6 w-full max-w-sm relative">
              <p className="text-xs font-medium text-[color:var(--color-ink)]/50 mb-3">
                Pregunta 3 · Área del triángulo
              </p>
              <p className="text-sm text-[color:var(--color-ink)]/75 leading-relaxed mb-4">
                Aplica la fórmula correcta, muestra el desarrollo paso a paso
                y obtiene el resultado exacto (20).
              </p>
              <div className="grade-stamp absolute -top-5 -right-4 rounded-full w-24 h-24 flex flex-col items-center justify-center bg-white">
                <span className="font-mono-score text-2xl font-semibold leading-none">
                  9.5
                </span>
                <span className="font-mono-score text-xs opacity-70">/ 10</span>
              </div>
              <div className="border-t border-black/5 pt-4 mt-4">
                <p className="font-display italic text-sm text-[color:var(--color-ink)]/70">
                  &ldquo;Procedimiento claro y resultado correcto en los tres
                  ejercicios.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl text-[color:var(--color-pine)] mb-2">
          Tan simple como corregir en papel
        </h2>
        <p className="text-[color:var(--color-ink)]/70 mb-12 max-w-xl">
          Sin curva de aprendizaje: si ya sabes hacer una rúbrica, ya sabes
          usar AutoTeacher.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              paso: 'Define tu rúbrica',
              texto:
                'Escribe los criterios de corrección como ya lo harías en papel: preguntas, puntos y qué consideras correcto.',
            },
            {
              paso: 'Sube la tarea',
              texto:
                'Haz una foto con el móvil o sube un PDF. AutoTeacher lee la letra y las respuestas por ti.',
            },
            {
              paso: 'Revisa y confirma',
              texto:
                'Ves la nota y el feedback de cada pregunta. Ajusta si algo no encaja, y confirma con un clic.',
            },
          ].map((item, i) => (
            <div key={item.paso} className="bg-white rounded-2xl border border-black/5 p-6">
              <span className="font-mono-score text-sm text-[color:var(--color-red-pen)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl text-[color:var(--color-pine)] mt-2 mb-2">
                {item.paso}
              </h3>
              <p className="text-sm text-[color:var(--color-ink)]/70 leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-[color:var(--color-pine)] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="font-display text-3xl mb-12">
            Pensado para el día a día del profesorado
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                titulo: 'Recupera tus fines de semana',
                texto:
                  'Lo que antes eran horas corrigiendo pilas de exámenes, ahora son minutos revisando lo que la IA ya preparó.',
              },
              {
                titulo: 'Feedback siempre detallado',
                texto:
                  'Cada alumno recibe una explicación concreta de por qué se restaron puntos, no solo un número.',
              },
              {
                titulo: 'Tú tienes la última palabra',
                texto:
                  'Ninguna nota se envía sin que la revises. La IA propone, tú decides.',
              },
              {
                titulo: 'Tu rúbrica, tus criterios',
                texto:
                  'No es un corrector genérico: se ajusta exactamente a cómo tú evalúas cada pregunta.',
              },
            ].map((item) => (
              <div key={item.titulo}>
                <h3 className="font-display text-xl mb-2 text-[color:var(--color-gold)]">
                  {item.titulo}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl text-[color:var(--color-pine)] mb-2">
          Planes para cada forma de enseñar
        </h2>
        <p className="text-[color:var(--color-ink)]/70 mb-12 max-w-xl">
          Empieza gratis. Cambia de plan cuando lo necesites.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Básico */}
          <div className="bg-white rounded-2xl border border-black/5 p-8 flex flex-col">
            <h3 className="font-display text-xl text-[color:var(--color-pine)]">Básico</h3>
            <p className="text-sm text-[color:var(--color-ink)]/60 mt-1 mb-6">
              Para probar sin compromiso
            </p>
            <p className="font-mono-score text-3xl mb-1">15€<span className="text-base font-normal text-[color:var(--color-ink)]/50">/mes</span></p>
            <ul className="text-sm text-[color:var(--color-ink)]/75 space-y-2 mt-6 mb-8 flex-1">
              <li>· Correcciones limitadas al mes</li>
              <li>· 1 rúbrica activa</li>
              <li>· Feedback detallado por pregunta</li>
            </ul>
            <Link
              href="/login"
              className="text-center border border-[color:var(--color-indigo)] text-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo)] hover:text-white font-medium rounded-lg px-4 py-2.5 transition"
            >
              Empezar
            </Link>
          </div>

          {/* Pro (destacado) */}
          <div className="bg-[color:var(--color-indigo)] text-white rounded-2xl p-8 flex flex-col relative shadow-xl">
            <span className="absolute -top-3 left-8 bg-[color:var(--color-gold)] text-[color:var(--color-ink)] text-xs font-semibold px-3 py-1 rounded-full">
              Más elegido
            </span>
            <h3 className="font-display text-xl">Pro</h3>
            <p className="text-sm text-white/70 mt-1 mb-6">Para uso semanal real</p>
            <p className="font-mono-score text-3xl mb-1">35€<span className="text-base font-normal text-white/60">/mes</span></p>
            <ul className="text-sm text-white/85 space-y-2 mt-6 mb-8 flex-1">
              <li>· Correcciones ampliadas al mes</li>
              <li>· Rúbricas ilimitadas</li>
              <li>· Exportar notas</li>
              <li>· Corrección en lote</li>
            </ul>
            <Link
              href="/login"
              className="text-center bg-white text-[color:var(--color-indigo)] hover:bg-white/90 font-medium rounded-lg px-4 py-2.5 transition"
            >
              Empezar
            </Link>
          </div>

          {/* Academia */}
          <div className="bg-white rounded-2xl border border-black/5 p-8 flex flex-col">
            <h3 className="font-display text-xl text-[color:var(--color-pine)]">Academia</h3>
            <p className="text-sm text-[color:var(--color-ink)]/60 mt-1 mb-6">
              Para varios profesores
            </p>
            <p className="font-mono-score text-3xl mb-1">A medida</p>
            <ul className="text-sm text-[color:var(--color-ink)]/75 space-y-2 mt-6 mb-8 flex-1">
              <li>· Precio por asiento con descuento</li>
              <li>· Panel para el centro</li>
              <li>· Soporte prioritario</li>
            </ul>
            <Link
              href="/login"
              className="text-center border border-[color:var(--color-indigo)] text-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo)] hover:text-white font-medium rounded-lg px-4 py-2.5 transition"
            >
              Hablemos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="notebook-lines rounded-2xl border border-black/5 px-8 py-14 text-center">
          <h2 className="font-display text-3xl text-[color:var(--color-pine)] mb-4">
            Sé de los primeros en probarlo
          </h2>
          <p className="text-[color:var(--color-ink)]/70 mb-8 max-w-md mx-auto">
            Estamos dando acceso anticipado a un número reducido de
            profesores. Crea tu cuenta gratis y corrige tu primera tarea hoy
            mismo.
          </p>
          <Link
            href="/login"
            className="inline-block bg-[color:var(--color-indigo)] hover:bg-[color:var(--color-indigo-light)] text-white font-medium rounded-lg px-8 py-3 transition shadow-sm"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[color:var(--color-ink)]/50">
          <span>© {new Date().getFullYear()} AutoTeacher</span>
          <div className="flex gap-5">
            <Link href="/terminos" className="hover:text-[color:var(--color-ink)]">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-[color:var(--color-ink)]">
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
