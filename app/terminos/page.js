// app/terminos/page.js
import Link from 'next/link';

export default function Terminos() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <header className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/" className="font-display italic text-2xl text-[color:var(--color-pine)]">
          Auto<span className="text-[color:var(--color-red-pen)]">Gradely</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20 prose-custom">
        <h1 className="font-display text-3xl text-[color:var(--color-pine)] mb-2">
          Términos y condiciones
        </h1>
        <p className="text-sm text-[color:var(--color-ink)]/50 mb-10">
          Última actualización: agosto de 2026
        </p>

        <div className="space-y-6 text-[color:var(--color-ink)]/80 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              1. Qué es AutoGradely
            </h2>
            <p>
              AutoGradely es una herramienta que ayuda a profesores a corregir
              tareas y exámenes utilizando inteligencia artificial. La IA
              propone una nota y un feedback a partir de la rúbrica que tú
              defines; en ningún caso la corrección se considera definitiva
              hasta que el profesor la revisa y confirma manualmente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              2. Quién puede usar el servicio
            </h2>
            <p>
              AutoGradely está dirigido a docentes, academias y centros
              educativos mayores de edad. Al crear una cuenta, confirmas que
              actúas en tu capacidad profesional como educador o
              representante de un centro educativo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              3. Responsabilidad sobre las correcciones
            </h2>
            <p>
              La IA es una herramienta de apoyo, no un sustituto del criterio
              del profesor. Eres tú quien decide si una nota y un feedback
              generados se envían o no a tus alumnos. AutoGradely no se hace
              responsable de notas o comentarios que el profesor confirme sin
              revisar adecuadamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              4. Datos de alumnos que subes al servicio
            </h2>
            <p>
              Al subir la foto o el PDF de una tarea, declaras que cuentas
              con la autorización necesaria (de tu centro educativo y, en su
              caso, de las familias) para tratar esos datos con una
              herramienta de corrección asistida por IA, conforme a la
              normativa de protección de datos aplicable. Consulta nuestra{' '}
              <Link href="/privacidad" className="text-[color:var(--color-indigo)] underline">
                Política de privacidad
              </Link>{' '}
              para saber cómo tratamos esa información.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              5. Planes y pagos
            </h2>
            <p>
              Durante la fase de acceso anticipado, el acceso puede ofrecerse
              de forma gratuita o con condiciones especiales que se
              comunicarán directamente. Cuando el servicio de pago esté
              activo, los términos específicos de facturación se detallarán
              en el momento de la contratación.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              6. Cambios en el servicio
            </h2>
            <p>
              AutoGradely está en desarrollo activo y puede cambiar,
              mejorar o interrumpir funcionalidades sin previo aviso durante
              esta fase inicial. Avisaremos con antelación razonable de
              cualquier cambio que afecte de forma significativa a cuentas ya
              activas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[color:var(--color-pine)] mb-2">
              7. Contacto
            </h2>
            <p>
              Para cualquier duda sobre estos términos, puedes escribirnos a{' '}
              <span className="font-medium">[tu email de contacto aquí]</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
