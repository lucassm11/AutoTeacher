import LegalPage from '@/app/components/LegalPage';

export const metadata = {
  title: 'Aviso Legal — Adapto',
  description: 'Aviso legal conforme al Art. 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informacion y de Comercio Electronico.',
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso Legal" lastUpdated="20 de agosto de 2026">

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Informacion del titular</h2>
        <p>
          Conforme al Art. 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informacion y de Comercio Electronico (LSSI-CE), se informa a los usuarios de las siguientes condiciones:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Denominacion social:</strong> Adapto</li>
          <li><strong>Actividad:</strong> Prestacion de servicios digitales de adaptacion de examenes educativos mediante inteligencia artificial.</li>
          <li><strong>Email:</strong> hola@adapto.app</li>
          <li><strong>Sitio web:</strong> adapto.app</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Condiciones de uso</h2>
        <p>
          El acceso a este sitio web implica la aceptacion de las condiciones de uso aqui establecidas. Si no esta de acuerdo, debera abstenerse de utilizar el sitio.
        </p>
        <p className="mt-2">
          La informacion facilitada en este sitio tiene caracter meramente informativo y no constituye en ningun caso referencia ni garantia sobre los servicios ofrecidos.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenios del sitio web, incluyendo但不限 textos, fotografias, graficos, imagenes, iconos, tecnologia, software, enlaces y demas contenidos audiovisuales o sonoros, asi como su diseno grafico y codigos fuente, son propiedad intelectual de Adapto o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotacion reconocidos por la normativa vigente sobre propiedad intelectual.
        </p>
        <p className="mt-2">
          Las marcas, nombres comerciales o signos distintivos son titularidad de Adapto o terceros, sin que el acceso al sitio web pueda atribuir ningun derecho sobre los mismos.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Responsabilidad sobre contenidos</h2>
        <p>
          Adapto no se hace responsable, en ningun caso, de los danos y perjuicios que pudieran ocasionar, a titulo enunciativo: por errores u omisiones en los contenidos, por falta de disponibilidad del sitio o por la transmision de virus o programas malevolos en los contenidos, a pesar de haber adoptado todas las medidas tecnologicas necesarias para evitarlo.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Naturaleza metodológica del servicio</h2>
        <p>
          Las funcionalidades de evaluacion de accesibilidad, dictamen psicopedagogico e informes tecnicos generados por Adapto estan fundamentadas en las pautas del Diseno Universal para el Aprendizaje (DUA) y en la normativa curricular espanola (LOMLOE). Dichos materiales tienen caracter de documento de trabajo y orientacion tecnica de aula, no constituyendo certificados administrativos oficiales ni homologaciones estatales. La validez legal y formal de cualquier adaptacion corresponde en exclusiva al equipo docente y al centro educativo.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Enlaces a terceros</h2>
        <p>
          El sitio web puede contener enlaces a sitios de terceros. Adapto no asume ninguna responsabilidad sobre el contenido, politicas o practicas de dichos sitios. El acceso a estos sitios es responsabilidad exclusiva del usuario.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Proteccion de datos</h2>
        <p>
          Para informacion sobre el tratamiento de datos personales, consulte nuestra{' '}
          <a href="/politica-privacidad" className="text-[#1B3A32] hover:underline">Politica de Privacidad</a>.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl text-[#1a1a1a] mb-3">Legislacion aplicable</h2>
        <p>
          El presente Aviso Legal se rige en su totalidad por la legislacion espanola. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular.
        </p>
      </section>

    </LegalPage>
  );
}
