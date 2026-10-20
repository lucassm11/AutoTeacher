import LegalPage from '@/app/components/LegalPage';

export const metadata = {
  title: 'Politica de Cookies — Adapto',
  description: 'Politica de cookies conforme a la Ley 34/2002 (LSSI-CE) y el RGPD.',
};

export default function PoliticaCookies() {
  return (
    <LegalPage title="Politica de Cookies" lastUpdated="20 de agosto de 2026">

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">1. Que son las cookies</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web. Permiten al sitio recordar las acciones y preferencias del usuario durante un periodo de tiempo.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">2. Cookies utilizadas</h2>
        <p>Este sitio web utiliza los siguientes tipos de cookies:</p>

        <div className="mt-4 space-y-4">
          <div className="bg-white rounded-xl border border-black/[0.04] p-5">
            <p className="text-sm font-semibold text-[#1a1a1a] mb-1">Cookies tecnicas (necesarias)</p>
            <p className="text-sm text-[#1a1a1a]/45">Imprescindibles para el funcionamiento del sitio. Permiten la autenticacion de usuario, el mantenimiento de la sesion y el control del trafico. <strong>No requieren consentimiento</strong> (Art. 29 LSSI-CE).</p>
            <p className="text-xs text-[#1a1a1a]/30 mt-2">Proveedor: Firebase Auth (Google LLC) | Duracion: Sesion</p>
          </div>
          <div className="bg-white rounded-xl border border-black/[0.04] p-5">
            <p className="text-sm font-semibold text-[#1a1a1a] mb-1">Cookies de funcionalidad</p>
            <p className="text-sm text-[#1a1a1a]/45">Permiten recordar preferencias del usuario (por ejemplo, tema o idioma) para ofrecer una experiencia personalizada.</p>
            <p className="text-xs text-[#1a1a1a]/30 mt-2">Duracion: 1 ano | Local storage del navegador</p>
          </div>
          <div className="bg-white rounded-xl border border-black/[0.04] p-5">
            <p className="text-sm font-semibold text-[#1a1a1a] mb-1">Cookies de consentimiento</p>
            <p className="text-sm text-[#1a1a1a]/45">Almacenan la decision del usuario sobre el uso de cookies en el sitio.</p>
            <p className="text-xs text-[#1a1a1a]/30 mt-2">Duracion: 1 ano</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">3. Cookies de terceros</h2>
        <p>Este sitio puede utilizar servicios de terceros que establecen sus propias cookies:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Google Firebase:</strong> Para autenticacion y base de datos. Consulte la politica de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1B3A32] hover:underline">policies.google.com/privacy</a>.</li>
          <li><strong>Google Analytics:</strong> (Si se activa en el futuro) Para analisis de trafico.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">4. Deshabilitar cookies</h2>
        <p>
          El usuario puede configurar su navegador para rechazar todas las cookies o para recibir un aviso cuando se envie una cookie. Los procedimientos para gestionar las cookies varian segun el navegador:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Chrome:</strong> Configuracion &gt; Privacidad y seguridad &gt; Cookies</li>
          <li><strong>Firefox:</strong> Opciones &gt; Privacidad y seguridad &gt; Cookies</li>
          <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies</li>
          <li><strong>Edge:</strong> Configuracion &gt; Privacidad &gt; Cookies</li>
        </ul>
        <p className="mt-2">
          La deshabilitacion de cookies tecnicas puede afectar al funcionamiento correcto del sitio web.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">5. Base legal</h2>
        <p>
          El uso de cookies tecnicas esta amparado en el interes legitimo del responsable del sitio (Art. 6.1.f RGPD) y no requiere consentimiento del usuario segun el Art. 29 de la LSSI-CE.
        </p>
        <p className="mt-2">
          Las cookies de funcionalidad y cualquier cookie no esencial requieren el consentimiento previo del usuario, conforme al Art. 22 de la LSSI-CE y el Art. 6.1.a RGPD.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">6. Cambios en la politica</h2>
        <p>
          Esta Politica de Cookies puede ser actualizada en cualquier momento. Se recomienda revisarla periodicamente.
        </p>
      </section>

    </LegalPage>
  );
}
