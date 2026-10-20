import LegalPage from '@/app/components/LegalPage';

export const metadata = {
  title: 'Politica de Privacidad — Adapto',
  description: 'Politica de privacidad y proteccion de datos personales de Adapto, conforme al RGPD y la LOPDGDD.',
};

export default function PoliticaPrivacidad() {
  return (
    <LegalPage title="Politica de Privacidad" lastUpdated="20 de agosto de 2026">

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">1. Responsable del tratamiento</h2>
        <p>
          <strong>Denominacion social:</strong> Adapto (en adelante, el &quot;Responsable&quot;).<br />
          <strong>Actividad:</strong> Plataforma digital de adaptacion de examenes educativos basada en inteligencia artificial.<br />
          <strong>Email:</strong> hola@adapto.app<br />
          <strong>Sitio web:</strong> adapto.app
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">2. Finalidad del tratamiento</h2>
        <p>Los datos personales recogidos a traves de este sitio web seran tratados con las siguientes finalidades:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Gestionar la prestacion del servicio de adaptacion de examenes.</li>
          <li>Gestionar las cuentas de usuario y la autenticacion (a traves de Firebase Auth).</li>
          <li>Controlar el uso del servicio y aplicar limitaciones de uso (rate limiting).</li>
          <li>Enviar comunicaciones comerciales sobre el servicio (solo si se solicita expresamente).</li>
          <li>Responder a consultas y solicitudes de informacion enviadas a traves del formulario de contacto.</li>
          <li>Cumplir con obligaciones legales y fiscales.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">3. Base legitima del tratamiento</h2>
        <p>El tratamiento de sus datos se fundamenta en:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Ejecucion de un contrato</strong> (Art. 6.1.b RGPD): la prestacion del servicio solicitado por el usuario.</li>
          <li><strong>Consentimiento</strong> (Art. 6.1.a RGPD): para el envio de comunicaciones comerciales y el uso de cookies no esenciales.</li>
          <li><strong>Interes legittimo</strong> (Art. 6.1.f RGPD): para la mejora del servicio, prevencion de fraude y cumplimiento normativo.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">4. Categorias de datos</h2>
        <p>Se recogen las siguientes categorias de datos personales:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Datos de identificacion:</strong> nombre, direccion de correo electronico.</li>
          <li><strong>Datos de autenticacion:</strong> proporcionados a traves de Google OAuth o Firebase Auth.</li>
          <li><strong>Datos de uso:</strong> examenes subidos, resultados generados, historial de uso.</li>
          <li><strong>Datos de navegacion:</strong> direccion IP, tipo de navegador, sistema operativo.</li>
        </ul>
        <p className="mt-2">
          <strong>Datos especialmente protegidos:</strong> El servicio procesa examenes educativos que pueden contener informacion sobre necesidades especificas de apoyo educativo (NEAE). Estos datos se tratan con las garantias adicionales exigidas por la LOPDGDD (Art. 9 y 10). Los examenes procesados no se almacenan de forma permanente en nuestros servidores.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">5. Conservacion de los datos</h2>
        <p>Los datos personales se conservaran durante los siguientes plazos:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Datos de cuenta:</strong> mientras el usuario mantenga su cuenta activa.</li>
          <li><strong>Datos de uso (examenes):</strong> se procesan en tiempo real y no se almacenan permanentemente en nuestros servidores. Los resultados generados pueden almacenarse si el usuario tiene una cuenta activa.</li>
          <li><strong>Datos de contacto:</strong> hasta la resolucion de la consulta.</li>
          <li><strong>Datos de facturacion:</strong> durante el plazo legal exigido (4 anos en Espana para obligaciones fiscales).</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">6. Destinatarios de los datos</h2>
        <p>Los datos podran ser comunicados a los siguientes destinatarios:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Google LLC</strong> (Firebase): proveedor de servicios de autenticacion y base de datos. Con domicilio en EE.UU., bajo las garantias del Marco de Privacidad de Datos UE-EE.UU.</li>
          <li><strong>Google LLC</strong> (Gemini API): proveedor del servicio de inteligencia artificial para el procesamiento de examenes.</li>
          <li><strong>Resend Inc.</strong>: proveedor de servicios de envio de correos electronicos.</li>
          <li>Administraciones publicas, en cumplimiento de obligaciones legales.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">7. Transferencias internacionales</h2>
        <p>
          Algunos de nuestros proveedores de servicios se encuentran en Estados Unidos. Las transferencias internacionales de datos se realizan con las garantias adecuadas conforme al Capitulo V del RGPD, incluyendo el Marco de Privacidad de Datos UE-EE.UU. y las Clausulas Contractuales Tipo de la Comision Europea.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">8. Derechos de los usuarios</h2>
        <p>Conforme al RGPD y la LOPDGDD, los usuarios tienen derecho a:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Acceso:</strong> obtener confirmacion de si se tratan datos personales suyos y acceder a ellos.</li>
          <li><strong>Rectificacion:</strong> solicitar la correccion de datos inexactos.</li>
          <li><strong>Supresion:</strong> solicitar la eliminacion de los datos personales.</li>
          <li><strong>Limitacion:</strong> solicitar la limitacion del tratamiento.</li>
          <li><strong>Portabilidad:</strong> recibir los datos en formato estructurado y de uso comun.</li>
          <li><strong>Oposicion:</strong> oponerse al tratamiento de los datos personales.</li>
          <li><strong>Revocar el consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.</li>
        </ul>
        <p className="mt-2">
          Para ejercer estos derechos, envie un email a <strong>hola@adapto.app</strong> adjuntando copia de un documento que acredite su identidad.
        </p>
        <p className="mt-2">
          Si considera que el tratamiento no se ajusta a la normativa vigente, tiene derecho a presentar una reclamacion ante la{' '}
          <strong>Agencia Espanola de Proteccion de Datos (AEPD)</strong>:{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#1B3A32] hover:underline">www.aepd.es</a>.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">9. Seguridad de los datos</h2>
        <p>
          El Responsable ha adoptado las medidas tecnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteracion, perdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnica, la naturaleza de los datos y los riesgos a los que estan expuestos, conforme al Art. 32 del RGPD y el Art. 68 del Reglamento de desarrollo de la LOPDGDD.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">10. Menores de edad</h2>
        <p>
          El servicio esta dirigido a profesionales de la educacion. No se recogen datos personales directamente de menores de edad. El contenido educativo (examenes) es proporcionado por profesores y no contiene datos personales identificables de alumnos, sino perfiles anonimizados de necesidades educativas.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">11. Cambios en la politica</h2>
        <p>
          Este Politica de Privacidad puede ser actualizada en cualquier momento. Cualquier cambio sustancial sera notificado a traves del sitio web o por correo electronico a los usuarios registrados.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">12. Legislacion aplicable</h2>
        <p>
          Esta Politica de Privacidad se rige por la legislacion espanola, en particular por el{' '}
          <strong>Reglamento (UE) 2016/679</strong> (RGPD), la{' '}
          <strong>Ley Organica 3/2018</strong> (LOPDGDD) y la{' '}
          <strong>Ley 34/2002</strong> (LSSI-CE). Para la resolucion de cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del Responsable.
        </p>
      </section>

    </LegalPage>
  );
}
