import Link from 'next/link';

export const metadata = {
  title: 'Demostración en Vídeo — Adapto',
  description: 'Descubre en este tour guiado por AdapBot cómo funciona la adaptación de exámenes según las directrices DUA y LOMLOE.',
};

export default function TourPage() {
  return (
    <div className="min-h-screen bg-[#0d1614] text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-email.png" alt="Adapto" width={36} height={36} className="rounded-lg" />
          <span className="font-serif text-2xl tracking-tight">
            adap<span className="text-emerald-400">to</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/contacto?motivo=centros"
            className="text-xs md:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Solicitar Acceso Institucional
          </Link>
          <Link
            href="/auditor-dua"
            className="text-xs md:text-sm text-white/70 hover:text-white px-3 py-2 transition-colors hidden sm:inline-block"
          >
            Probar un examen &rarr;
          </Link>
        </div>
      </header>

      {/* Main Video Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="text-center mb-6">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Demostración Oficial · DUA 3.0 &amp; LOMLOE
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
            Tour Guiado por AdapBot
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
            Aprende en 4 minutos cómo Adapto reestructura exámenes, genera el mapa de calor cognitivo y emite el informe psicopedagógico DUA.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="w-full bg-black/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            poster="/tour-poster.jpg"
          >
            <source src="/tour-adapto.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción directa de este vídeo.
          </video>
        </div>

        {/* Action Buttons Below Video */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/auditor-dua"
            className="w-full sm:w-auto text-center bg-emerald-500 hover:bg-emerald-400 text-[#0d1614] font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
          >
            Probar un Examen de Muestra Gratis &rarr;
          </Link>
          <Link
            href="/contacto?motivo=centros"
            className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
          >
            Solicitar Acceso para mi Colegio / IES
          </Link>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-white text-sm mb-1">Adaptación en 3 segundos</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Sube fotos o PDFs. Adapto detecta consignas compuestas y aplica andamiaje sin rebajar el nivel curricular.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-white text-sm mb-1">Mapa de calor y Puntuación DUA</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Índice 0-100 y evaluación de barreras visuales y cognitivas según las pautas de CAST y la LOMLOE.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-semibold text-white text-sm mb-1">Informe oficial para CCP</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Exportación en PDF con hoja de apoyos de aula y fundamentación técnica para el expediente del alumno.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        Adapto.tech &middot; Herramienta de asistencia docente para la atención a la diversidad (DUA &amp; LOMLOE).
      </footer>
    </div>
  );
}
