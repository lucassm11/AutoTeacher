import LegalPage from '@/app/components/LegalPage';

export const metadata = {
  title: 'Terminos y Condiciones — Adapto',
  description: 'Terminos y condiciones de uso del servicio Adapto.',
};

export default function TerminosCondiciones() {
  return (
    <LegalPage title="Terminos y Condiciones" lastUpdated="20 de agosto de 2026">

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">1. Aceptacion de los terminos</h2>
        <p>
          El acceso y uso de Adapto (en adelante, el &quot;Servicio&quot;) implica la aceptacion plena de estos Terminos y Condiciones. Si no esta de acuerdo con alguno de ellos, no deberia utilizar el Servicio.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">2. Descripcion del servicio</h2>
        <p>
          Adapto es una plataforma digital de asistencia tecnologica para el profesorado que utiliza inteligencia artificial para adaptar metodologicamente examenes educativos conforme a los principios del Diseno Universal para el Aprendizaje (DUA) y las directrices curriculares de la LOMLOE. El Servicio permite a profesores y orientadores subir examenes y obtener propuestas de adaptacion y documentacion tecnica de soporte.
        </p>
        <p className="mt-2">
          El Servicio incluye: analisis pedagogico de examenes, generacion de propuestas de examen adaptado, informe tecnico psicopedagogico orientativo, puntuacion DUA y generacion de documentos PDF de trabajo. Adapto no constituye una entidad certificadora publica ni emite homologaciones administrativas estatales.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">3. Cuenta de usuario</h2>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Para acceder a ciertas funcionalidades es necesario crear una cuenta a traves de Google OAuth o correo electronico y contrasena.</li>
          <li>El usuario es responsable de mantener la confidencialidad de sus credenciales.</li>
          <li>El usuario se compromete a proporcionar datos veraces y actualizados.</li>
          <li>Una persona puede mantener una unica cuenta.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">4. Uso aceptable</h2>
        <p>El usuario se compromete a:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Utilizar el Servicio exclusivamente para fines educativos y profesionales legitimos.</li>
          <li>No intentar eludir las limitaciones de uso ni manipular el sistema.</li>
          <li>No utilizar el Servicio para procesar datos personales identificables de alumnos sin la debida autorizacion.</li>
          <li>No compartir credenciales de acceso con terceros.</li>
          <li>No realizar ingenieria inversa, descompilar o intentar acceder al codigo fuente del Servicio.</li>
          <li>No utilizar el Servicio para generar contenido que infrinja derechos de terceros.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">5. Planes y precios</h2>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Plan Basico (Gratuito):</strong> Permite un numero limitado de adaptaciones con marca de agua en el PDF.</li>
          <li><strong>Plan Pro:</strong> Adaptaciones ilimitadas, PDF sin marca de agua, historico guardado y soporte prioritario.</li>
          <li><strong>Plan Centros:</strong> Tarifas personalizadas para centros educativos y academias.</li>
          <li>Los precios estan indicados en euros (EUR) e incluyen los impuestos aplicables salvo indicacion contraria.</li>
          <li>El Servicio se reserva el derecho de modificar los precios con un preaviso minimo de 30 dias.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">6. Propiedad intelectual</h2>
        <p>
          Todos los derechos de propiedad intelectual sobre el Servicio, incluyendo但不限 el codigo fuente, diseno, textos, graficos y marcas registradas, pertenecen al Responsable o a sus licenciantes. Los examenes subidos por los usuarios permanecen de su propiedad. El usuario concede al Responsable una licencia limitada para procesar dichos examenes exclusivamente con la finalidad de prestar el Servicio.
        </p>
        <p className="mt-2">
          Los resultados generados (examenes adaptados, dictamenes, PDFs) pueden ser utilizados libremente por el usuario en su actividad profesional docente.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">7. Limitacion de responsabilidad</h2>
        <p>
          Adapto es una herramienta auxiliar de soporte y asistencia metodologica al profesorado. <strong>No sustituye en ningun caso el criterio profesional, colegiado ni la potestad evaluadora del docente o del departamento de orientacion escolar.</strong> Las propuestas de adaptacion y los informes generados por IA tienen caracter orientativo y deben ser revisados, modificados si procede, y formalmente validados por los profesionales de la educacion antes de su implementacion en el aula.
        </p>
        <p className="mt-2">
          La validez juridica y formal de cualquier adaptacion ante la Comision de Coordinacion Pedagogica (CCP), el claustro o la Inspeccion Educativa compete exclusivamente al centro educativo y al equipo docente responsable.
        </p>
        <p className="mt-2">
          El Responsable no se hace responsable de:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Decisiones educativas tomadas exclusivamente basadas en los resultados del Servicio sin revision docente.</li>
          <li>Aprobacion, denegacion o valoracion emitida por organos de inspeccion educativa respecto a adaptaciones particulares de alumnos.</li>
          <li>Errores u omisiones en las adaptaciones generadas por la IA que no hayan sido detectados y corregidos por el usuario.</li>
          <li>Interrupciones temporales del Servicio por mantenimiento o causas de fuerza mayor.</li>
          <li>Danos indirectos, lucro cesante o perdida de datos derivados del uso del Servicio.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">8. Suspension y baja</h2>
        <p>
          El Responsable se reserva el derecho de suspender o eliminar cuentas que incumplan estos Terminos, previo aviso al usuario. El usuario puede darse de baja en cualquier momento solicitandolo a traves de hola@adapto.app.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">9. Modificaciones</h2>
        <p>
          El Responsable se reserva el derecho de modificar estos Terminos en cualquier momento. Los cambios seran publicados en esta pagina con la fecha de ultima actualizacion. El uso continuado del Servicio tras la publicacion de cambios implica su aceptacion.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">10. Legislacion aplicable y jurisdiccion</h2>
        <p>
          Estos Terminos se rigen por la legislacion espanola. Para la resolucion de cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid, Espana, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
        </p>
      </section>

    </LegalPage>
  );
}
