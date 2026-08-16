// app/privacidad/page.js
import Link from 'next/link';

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <header className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/" className="font-display italic text-2xl text-[color:var(--color-pine)]">
          Auto<span className="text-[color:var(--color-red-pen)]">Teacher</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        <h1 className="font-display text-3xl text-[color:var(--color-pine)] mb-2">
          Política de privacidad
        </h1>
        <p className="text-sm text-[color:var(--color-ink)]/50 mb-10">
          Última actualización: agosto de 2026
        </p>

        <div className="space-y-6 text-[color:var(--color-ink)]/80 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              1. Qué datos recogemos
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Datos de tu cuenta: email y, si usas Google, tu nombre y foto de perfil públicos de Google.</li>
              <li>Las rúbricas de corrección que escribes y guardas.</li>
              <li>Los resultados de las correcciones que confirmas: nota y feedback generado.</li>
              <li>
                Las imágenes o PDFs de tareas/exámenes que subes: se envían a
                nuestro proveedor de IA para generar la corrección, pero{' '}
                <strong>no se almacenan de forma permanente</strong> en
                nuestros servidores una vez procesada la corrección.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              2. Cómo usamos un proveedor de IA externo
            </h2>
            <p>
              Para generar las correcciones, AutoTeacher envía el contenido
              de la tarea (imagen o PDF) y la rúbrica a la API de Gemini, de
              Google, que procesa esa información para devolver el feedback y
              la nota. Este envío es puntual, solo para procesar esa
              corrección concreta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              3. Datos de menores
            </h2>
            <p>
              AutoTeacher está diseñado para que lo use el profesorado, no
              directamente los alumnos. Si las tareas que subes pertenecen a
              alumnos menores de edad, es responsabilidad del centro
              educativo o del profesor contar con la base legal adecuada
              (autorización del centro y, si corresponde, de las familias)
              para tratar esos datos con esta herramienta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              4. Dónde se almacenan los datos
            </h2>
            <p>
              Los datos de tu cuenta, rúbricas y resultados de correcciones
              se almacenan en Firebase (Google Cloud). Puedes consultar las
              medidas de seguridad de Google Cloud en su propia
              documentación pública.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              5. Tus derechos
            </h2>
            <p>
              Puedes solicitar en cualquier momento acceder a tus datos,
              corregirlos o eliminarlos, incluyendo el borrado completo de tu
              cuenta y de las rúbricas/correcciones asociadas. Escríbenos a{' '}
              <span className="font-medium">[tu email de contacto aquí]</span>{' '}
              para ejercer estos derechos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              6. Cookies
            </h2>
            <p>
              AutoTeacher utiliza únicamente las cookies técnicas necesarias
              para mantener tu sesión iniciada. No utilizamos cookies de
              publicidad ni de seguimiento de terceros.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
