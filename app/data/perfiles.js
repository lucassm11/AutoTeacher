export const PERFILES_DATA = {
  'tdah-atencion': {
    slug: 'tdah-atencion',
    name: 'TDAH con déficit de atención sostenida y fatiga cognitiva',
    group: 'Trastornos del Neurodesarrollo',
    icon: '🎯',
    color: 'bg-[#1B3A32]',
    accentColor: '#1B3A32',
    prevalence: '5–7% de la población escolar (aproximadamente 2 alumnos por aula)',
    shortDescription:
      'Trastorno del neurodesarrollo que dificulta mantener la atención de forma sostenida, provoca distractibilidad y agota rápidamente los recursos cognitivos durante tareas exigentes.',
    fullDescription:
      'El TDAH de presentación inatenta es un trastorno del neurodesarrollo de origen neurobiológico que afecta a la capacidad de sostener la atención, organizar la información y resistir la distracción. A diferencia del perfil hiperactivo, estos alumnos no suelen molestar en clase: su dificultad es invisible. Presentan errores por descuido, parecen no escuchar cuando se les habla directamente, pierden material con frecuencia y abandonan tareas antes de terminarlas, especialmente si requieren un esfuerzo mental prolongado. La característica distintiva de este perfil es la fatiga cognitiva: tras pocos minutos de trabajo sostenido, el rendimiento cae en picado y el alumno necesita un esfuerzo desproporcionado para continuar.\n\nLa investigación neurobiológica muestra que el TDAH tiene una fuerte base genética, con heredabilidad estimada entre el 70% y el 80%, y se asocia a diferencias en la maduración y el funcionamiento de la corteza prefrontal y sus conexiones con las redes atencionales posteriores. Los neurotransmisores dopamina y noradrenalina, fundamentales para regular la atención y la motivación, funcionan de forma menos eficiente. Los estudios de neuroimagen muestran un patrón de maduración cortical retrasado entre dos y tres años en algunas regiones prefrontales, lo que significa que estos alumnos tienen una "edad atencional" menor que la de sus compañeros de aula.\n\nEn el aula, este perfil se manifiesta con un rendimiento muy irregular, "de picos y valles": un día resuelve con brillantez y al siguiente parece no haber estudiado. Suelen ser alumnos silenciosos que pasan desapercibidos, especialmente niñas, y que reciben etiquetas injustas de despistados, vagos o desinteresados. Con frecuencia desarrollan un autoconcepto académico dañado por años de resultados inferiores a su capacidad real, lo que hace imprescindible detectar el perfil a tiempo y ajustar la evaluación a sus necesidades reales.',
    impactInExams:
      'En un examen estándar, este alumno compite con una desventaja estructural: el tiempo. Su ritmo de procesamiento es más lento y su atención se agota antes, por lo que rara vez termina la prueba aunque domine el contenido. Es habitual que responda correctamente las primeras preguntas y falle o deje en blanco las últimas, no por desconocimiento sino por agotamiento atencional. Además, comete errores de descuido: se salta una pregunta, lee mal un enunciado, marca la casilla equivocada o no responde exactamente a lo que se le pregunta.\n\nLas preguntas largas, dobles o con negaciones le exigen un esfuerzo de descodificación que consume recursos atencionales necesarios para recuperar el contenido estudiado. La fatiga cognitiva suele aparecer hacia los quince o veinte minutos, momento en el que el rendimiento se desploma. El resultado es una nota que no refleja el conocimiento real del alumno, lo que genera frustración, ansiedad anticipatoria ante futuros exámenes y, con el tiempo, la conclusión equivocada de que "no sirve estudiar".',
    adaptationsWeSeek: [
      'Tiempo adicional del 25–50% o examen segmentado en bloques cortos con descansos',
      'Instrucciones concisas, presentadas por escrito y verificadas oralmente',
      'Formato limpio: pocas preguntas por página, espacios amplios y elementos clave destacados',
      'No penalizar errores de descuido cuando el contenido de la respuesta es correcto',
      'Posibilidad de realizar la prueba en un lugar con mínimas distracciones',
      'Revisión guiada final con lista de verificación antes de entregar',
    ],
    examRedFlags: [
      'Límite de tiempo estándar en pruebas largas',
      'Más de 20–25 preguntas consecutivas sin pausa ni cambio de tipo de tarea',
      'Enunciados largos, dobles negaciones o varias tareas dentro de la misma pregunta',
      'Penalización automática de faltas de ortografía o errores de transcripción',
      'Instrucciones dadas solo de forma oral mientras se reparten los folios',
    ],
    studies: [
      {
        title: 'Behavioral inhibition, sustained attention, and executive functions: Constructing a unifying theory of ADHD',
        authors: 'Russell A. Barkley',
        year: 1997,
        journal: 'Psychological Bulletin',
        url: 'https://doi.org/10.1037/0033-2909.121.1.65',
        finding: 'El déficit de inhibición conductual explica las alteraciones de las funciones ejecutivas y de la atención sostenida en el TDAH.',
      },
      {
        title: 'Annual research review: A meta-analysis of the worldwide prevalence of mental disorders in children and adolescents',
        authors: 'Guilherme V. Polanczyk, Giovanni A. Salum, Luisa S. Sugaya, Arthur Caye, Luis Augusto Rohde',
        year: 2015,
        journal: 'Journal of Child Psychology and Psychiatry',
        url: 'https://doi.org/10.1111/jcpp.12321',
        finding: 'La prevalencia mundial agregada del TDAH en menores se sitúa en torno al 5%, confirmando su carácter transdiagnóstico y transcultural.',
      },
      {
        title: 'The World Federation of ADHD International Consensus Statement: 208 evidence-based conclusions',
        authors: 'Stephen V. Faraone y cols.',
        year: 2021,
        journal: 'Neuroscience & Biobehavioral Reviews',
        url: 'https://doi.org/10.1016/j.neubiorev.2021.01.022',
        finding: 'Un consenso internacional certifica, con 208 conclusiones basadas en evidencia, que el TDAH es un trastorno neurobiológico real y bien establecido.',
      },
    ],
    resources: [
      {
        name: 'FEAADAH',
        url: 'https://feaadah.org',
        description: 'Federación Española de Asociaciones de Ayuda al TDAH: información, familias y defensa de derechos.',
      },
      {
        name: 'Guía de Práctica Clínica sobre el TDAH',
        url: 'https://portal.guiasalud.es',
        description: 'Guía oficial del Sistema Nacional de Salud para el TDAH en niños y adolescentes.',
      },
      {
        name: 'DISFAM',
        url: 'https://disfam.org',
        description: 'Organización hispanohablante de apoyo a familias con dislexia, TDAH y otras dificultades de aprendizaje.',
      },
    ],
  },

  'tdah-hiperactivo': {
    slug: 'tdah-hiperactivo',
    name: 'TDAH predominantemente hiperactivo-impulsivo',
    group: 'Trastornos del Neurodesarrollo',
    icon: '⚡',
    color: 'bg-[#B45309]',
    accentColor: '#B45309',
    prevalence: 'Forma parte del 5–7% de TDAH escolar; es la presentación más frecuente en etapa infantil y en varones',
    shortDescription:
      'Presentación del TDAH dominada por la inquietud motora, la impulsividad y la dificultad para esperar turnos, que lleva a responder antes de pensar y a actuar sin planificar.',
    fullDescription:
      'El TDAH predominantemente hiperactivo-impulsivo se caracteriza por seis o más síntomas de hiperactividad e impulsividad según el DSM-5: mover manos o pies incesantemente, levantarse cuando debe permanecer sentado, correr o trepar en situaciones inapropiadas, incapacidad para jugar o trabajar en silencio, actuar "como si llevara un motor", hablar en exceso, responder antes de que termine la pregunta, dificultad para esperar el turno e interrumpir a los demás. Es la presentación más típica de la etapa preescolar y de los primeros cursos de Primaria, y es más frecuente en varones.\n\nDesde el punto de vista neurobiológico, además de las alteraciones atencionales compartidas con otras presentaciones, este perfil implica una desregulación de los circuitos de recompensa y motivación. El modelo de vías múltiples de Sonuga-Barke propone que, junto a la vía del déficit ejecutivo, existe una vía motivacional asociada a la aversión a la demora: estos alumnos valoran de forma exagerada la recompensa inmediata y les resulta insoportable esperar, lo que explica gran parte de su impulsividad. La base es fuertemente genética y afecta a los sistemas dopaminérgicos de la corteza prefrontal y los ganglios basales.\n\nEn el entorno escolar, este perfil genera el mayor número de amonestaciones, conflictos con compañeros y sanciones disciplinarias, no por mala voluntad sino por autorregulación deficitaria. La impulsividad compromete la precisión: responden rápido pero sin verificar. Sin apoyos adecuados, el alumno acumula castigos, deteriora su reputación escolar y su autoestima, y aumenta el riesgo de accidentes y de problemas conductuales secundarios que enmascaran el trastorno de base.',
    impactInExams:
      'Durante un examen, la impulsividad se traduce en respuestas precipitadas: comienza a contestar antes de leer el enunciado completo, omite renglones enteros, deja preguntas sin darse cuenta o marca opciones al azar cuando quiere terminar cuanto antes. La inmovilidad exigida en el aula aumenta su tensión interna, y el silencio prolongado resulta especialmente costoso: necesita moverse para autorregularse.\n\nSu percepción del tiempo está distorsionada: siente que no le dará tiempo aunque disponga de él, se acelera y la calidad de las respuestas cae. Es muy frecuente que reciba penalizaciones por "no leer las preguntas" cuando en realidad la barrera es la autorregulación de la respuesta. Con pausas permitidas, supervisión amable que redirija y exámenes segmentados, el rendimiento de estos alumnos mejora de forma notable y pasa a reflejar lo que realmente saben.\n\nAdemás, la prueba única de larga duración amplifica el problema: la tensión acumulada por permanecer sentado y en silencio se traduce en movimientos, ruidos y llamadas de atención que interrumpen también al grupo. Un formato segmentado, con entregas parciales y movimiento permitido entre bloques, elimina casi por completo estas conductas y convierte la evaluación en una medida fiable del aprendizaje real.',
    adaptationsWeSeek: [
      'Tiempo adicional y examen dividido en partes entregadas secuencialmente',
      'Pausas activas permitidas o posibilidad de levantarse brevemente',
      'Responder en hoja aparte con espacio amplio entre preguntas',
      'Supervisión discreta que redirija la atención sin exponer al alumno ante el grupo',
      'Instrucciones presentadas paso a paso, una cada vez',
      'No penalizar tachones ni respuestas reformuladas durante la prueba',
    ],
    examRedFlags: [
      'Exámenes largos sin ninguna pausa ni cambio de actividad',
      'Prohibición absoluta de moverse o levantarse durante toda la prueba',
      'Bloques continuos de lectura extensa sin segmentar',
      'Penalización por tachones, letra sucia o respuestas corregidas',
      'Entrega única al final sin posibilidad de revisión parcial',
    ],
    studies: [
      {
        title: 'Causal models of attention-deficit/hyperactivity disorder: from common simple deficits to multiple developmental pathways',
        authors: 'Edmund J. S. Sonuga-Barke',
        year: 2005,
        journal: 'Biological Psychiatry',
        url: 'https://doi.org/10.1016/j.biopsych.2004.09.008',
        finding: 'Propone el modelo de vías duales: un déficit ejecutivo y una desregulación motivacional (aversión a la demora) explican conjuntamente el TDAH.',
      },
      {
        title: 'Diagnostic and Statistical Manual of Mental Disorders (5ª ed.)',
        authors: 'American Psychiatric Association',
        year: 2013,
        journal: 'APA',
        url: 'https://doi.org/10.1176/appi.books.9780890425596',
        finding: 'Establece los criterios diagnósticos actuales del TDAH y sus tres presentaciones: inatenta, hiperactiva-impulsiva y combinada.',
      },
      {
        title: 'ADHD and academic performance: why does ADHD impact on academic performance and what can be done to support ADHD children in the classroom?',
        authors: 'Dave Daley, Jayne Birchwood',
        year: 2010,
        journal: 'Child: Care, Health and Development',
        url: 'https://doi.org/10.1111/j.1365-2214.2009.01046.x',
        finding: 'El TDAH deteriora el rendimiento académico principalmente por síntomas inatentos e impulsivos, y los ajustes escolares específicos mejoran los resultados.',
      },
    ],
    resources: [
      {
        name: 'FEAADAH',
        url: 'https://feaadah.org',
        description: 'Federación Española de Asociaciones de Ayuda al TDAH: formación, familias y recursos escolares.',
      },
      {
        name: 'Fundación CADAH',
        url: 'https://fundacioncadah.org',
        description: 'Recursos prácticos en español sobre TDAH para familias y profesorado.',
      },
      {
        name: 'Portal Guiasalud',
        url: 'https://portal.guiasalud.es',
        description: 'Guías de práctica clínica oficiales del Sistema Nacional de Salud, incluida la del TDAH.',
      },
    ],
  },

  'tdah-combinado': {
    slug: 'tdah-combinado',
    name: 'TDAH combinado (atención + hiperactividad)',
    group: 'Trastornos del Neurodesarrollo',
    icon: '🌪️',
    color: 'bg-[#9A3412]',
    accentColor: '#9A3412',
    prevalence: 'Es la presentación más frecuente del TDAH (más de la mitad de los casos del 5–7% escolar)',
    shortDescription:
      'Perfil que combina déficit de atención sostenida con hiperactividad e impulsividad: la presentación más frecuente del TDAH y la de mayor impacto académico.',
    fullDescription:
      'La presentación combinada del TDAH cumple criterios clínicos simultáneamente en el dominio atencional y en el dominio hiperactivo-impulsivo. Estos alumnos concentran las dificultades de ambos perfiles: se distraen y fatigan con tareas sostenidas, y al mismo tiempo se mueven, interrumpen y actúan sin pensar. La intensidad de cada síntoma fluctúa según el contexto, el grado de interés de la tarea y las demandas del momento, lo que hace que su comportamiento resulte imprevisible incluso para quienes los conocen bien.\n\nLa evidencia neurobiológica indica que esta presentación implica múltiples vías alteradas: el metaanálisis de Willcutt confirma la implicación de las funciones ejecutivas, y el modelo de vías múltiples añade la desregulación motivacional. Además, es la presentación con mayor tasa de comorbilidad: dislexia, trastorno negativista desafiante, trastornos de ansiedad y dificultades del sueño aparecen con frecuencia asociadas, por lo que la evaluación debe ser siempre integral y no limitarse a la conducta visible.\n\nEn el ámbito escolar es el perfil de mayor riesgo académico: los estudios de Loe y Feldman muestran peores calificaciones, más repetición de curso y mayor abandono escolar respecto a compañeros sin TDAH. Necesitan simultáneamente apoyos atencionales (estructura, segmentación, tiempo) y conductuales (anticipación, refuerzo positivo, reglas claras). Cuando el entorno responde solo con medidas disciplinarias, el resultado habitual es escalada de conflicto, expulsiones y fracaso escolar evitable.',
    impactInExams:
      'Este perfil suma los dos impactos: no termina la prueba por fatiga atencional y lentitud de procesamiento, y al mismo tiempo comete errores impulsivos que arruinan respuestas que sabía. Suele empezar con energía, resolver deprisa las primeras preguntas, atascarse en una difícil, frustrarse y abandonar el esfuerzo o contestar el resto al azar para acabar.\n\nLa gestión del tiempo es deficiente: invierte demasiado en lo fácil o se bloquea en lo complicado sin saltar a lo siguiente, y rara vez reserva minutos para revisar. Sus notas oscilan enormemente entre exámenes, lo que desconcierta al profesorado. Cuando la evaluación no contempla estas barreras, el alumno acaba etiquetado de indisciplinado o poco trabajador, cuando en realidad el problema es un desajuste entre el formato de la prueba y su forma de procesar la información.\n\nLa comorbilidad agrava el cuadro: si coexiste dislexia o ansiedad, cada barrera se multiplica con las demás. La buena noticia es que las adaptaciones son sencillas de implementar —segmentación, sala tranquila, supervisión neutral, tiempo extra— y su efecto es inmediato: la variabilidad entre exámenes desaparece y las notas pasan a ser estables y representativas del nivel real de dominio curricular.',
    adaptationsWeSeek: [
      'Tiempo extra combinado con segmentación del examen en bloques',
      'Realización de la prueba en sala con pocas distracciones y grupo reducido',
      'Pausas breves permitidas entre bloques',
      'Instrucciones claras, escritas y presentadas paso a paso',
      'No penalizar errores de descuido ni tachones cuando el contenido es correcto',
      'Supervisión neutral que ayude a redistribuir el tiempo sin presionar',
    ],
    examRedFlags: [
      'Tiempo estándar en pruebas largas y densas',
      'Exámenes únicos de gran peso que deciden casi toda la nota',
      'Preguntas abiertas extensas sin estructura ni guía de extensión',
      'Penalización conductual: bajar la nota por actitud o comportamiento',
      'Ausencia de estructura visual: todo junto, sin separación clara entre bloques',
    ],
    studies: [
      {
        title: 'Validity of the executive function theory of ADHD: a meta-analytic review',
        authors: 'Erik G. Willcutt, Alysa E. Doyle, Joel T. Nigg, Stephen V. Faraone, Bruce F. Pennington',
        year: 2005,
        journal: 'Biological Psychiatry',
        url: 'https://doi.org/10.1016/j.biopsych.2005.02.006',
        finding: 'Confirma la implicación de las funciones ejecutivas en el TDAH, aunque con efecto moderado, apoyando modelos multicausales.',
      },
      {
        title: 'Academic and educational outcomes of children with ADHD',
        authors: 'Irene M. Loe, Heidi M. Feldman',
        year: 2007,
        journal: 'Ambulatory Pediatrics',
        url: 'https://doi.org/10.1016/j.ambp.2006.05.007',
        finding: 'Los niños con TDAH obtienen peores calificaciones, suspenden más asignaturas, repiten curso y abandonan antes los estudios.',
      },
      {
        title: 'Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment (4ª ed.)',
        authors: 'Russell A. Barkley',
        year: 2015,
        journal: 'Guilford Press',
        url: 'https://scholar.google.es/scholar?q=Barkley+Attention-Deficit+Hyperactivity+Disorder+Handbook+Diagnosis+Treatment+4th',
        finding: 'Manual de referencia clínica que integra diagnóstico, evaluación neuropsicológica e intervenciones escolares basadas en evidencia.',
      },
    ],
    resources: [
      {
        name: 'FEAADAH',
        url: 'https://feaadah.org',
        description: 'Federación Española de Asociaciones de Ayuda al TDAH.',
      },
      {
        name: 'DISFAM',
        url: 'https://disfam.org',
        description: 'Apoyo a familias hispanohablantes con TDAH, dislexia y otras dificultades de aprendizaje.',
      },
      {
        name: 'Portal Guiasalud',
        url: 'https://portal.guiasalud.es',
        description: 'Guía de práctica clínica del TDAH del Sistema Nacional de Salud.',
      },
    ],
  },

  'dislexia': {
    slug: 'dislexia',
    name: 'Dislexia evolutiva con baja velocidad lectora',
    group: 'Trastornos del Neurodesarrollo',
    icon: '📖',
    color: 'bg-[#1D4ED8]',
    accentColor: '#1D4ED8',
    prevalence: '7,5–15% de la población escolar según criterios diagnósticos (5–10% en la estimación más habitual)',
    shortDescription:
      'Trastorno específico del aprendizaje de origen neurobiológico que afecta a la fluidez y precisión lectora, con especial impacto en la velocidad de decodificación y la ortografía.',
    fullDescription:
      'La dislexia evolutiva es una dificultad específica de aprendizaje de base neurobiológica que se caracteriza por problemas en la decodificación precisa y fluida de palabras y en las habilidades de ortografía y codificación. Estas dificultades aparecen típicamente como consecuencia de un déficit del componente fonológico del lenguaje, son inesperadas en relación con la inteligencia y la instrucción recibida, y persisten a lo largo del desarrollo aunque pueden compensarse con apoyos adecuados. No es un problema de vista, de oído, de pereza ni de capacidad intelectual.\n\nLa investigación neurobiológica ha identificado una hipofunción de los circuitos temporoparietal y occipitotemporal izquierdos durante la lectura, junto con alteraciones en el procesamiento fonológico. Revisiones en población hispanohablante, como las de Manuel Soriano-Ferrer, confirman estos hallazgos y señalan además subtipos con componente visual-atencional. En lenguas transparentes como el español, la dislexia suele manifestarse menos en la precisión (los errores son menores) y más en la velocidad: el alumno acaba leyendo correctamente, pero a un ritmo muy inferior al de sus compañeros, y esa lentitud es precisamente la barrera principal.\n\nEn la escuela, el alumno disléxico lee de forma lenta y laboriosa, evita leer en voz alta, comete errores al decodificar palabras nuevas y presenta una ortografía errática e inconsistente. Su comprensión cae cuando el texto es largo porque la decodificación consume tantos recursos cognitivos que queda poca capacidad para entender. Con inteligencia intacta y esfuerzo constante, el resultado escolar depende críticamente de que el entorno elimine las barreras: sin adaptaciones, el riesgo de fracaso escolar y de daño en la autoestima es muy alto.',
    impactInExams:
      'El examen escrito es la situación más adversa para un alumno disléxico: leer los enunciados le cuesta dos o tres veces más tiempo que a sus compañeros, por lo que rara vez termina la prueba aunque conozca todas las respuestas. Además, la comprensión de las preguntas falla por sobrecarga, no por desconocimiento: al leer tan despacio, pierde el hilo de enunciados largos, salta líneas o palabras y responde a algo distinto de lo preguntado.\n\nLas preguntas abiertas quedan penalizadas por la ortografía, copiar enunciados o datos agota su reserva de tiempo y la fatiga lectora acumulada degrada el rendimiento conforme avanza la prueba. El resultado es sistemático: sabe más de lo que la nota muestra. Esta discrepancia sostenida genera ansiedad ante la lectura, evitación y una identidad académica negativa que una evaluación bien adaptada podría evitar por completo.\n\nConviene subrayar que el problema se concentra en el acceso, no en el contenido: cuando los mismos ítems se presentan leídos en voz alta, con tipografía accesible y tiempo ampliado, la mayoría de estos alumnos supera la prueba sin dificultad. El examen estándar mide su velocidad de decodificación; el examen adaptado mide lo que realmente se pretendía evaluar.',
    adaptationsWeSeek: [
      'Tiempo adicional del 25–50% en pruebas escritas',
      'Lectura de enunciados en voz alta por un adulto o mediante sintetizador de voz',
      'Tipografía accesible: tamaño 12–14, fuente sans serif, buen interlineado y márgenes',
      'No penalizar la ortografía en materias no lingüísticas',
      'Formatos alternativos de acceso: audios, preguntas orales o grabadas',
      'Permiso de uso de diccionario y de herramientas digitales de apoyo',
    ],
    examRedFlags: [
      'Exámenes cronometrados con texto denso y enunciados largos',
      'Restar puntos por faltas de ortografía en cualquier materia',
      'Obligación de copiar enunciados, datos o preguntas',
      'Preguntas de comprensión lectora usadas para evaluar contenidos de otras materias',
      'Tipografía pequeña, justificada y con interlineado mínimo',
    ],
    studies: [
      {
        title: 'A definition of dyslexia',
        authors: 'G. Reid Lyon, Sally E. Shaywitz, Bennett A. Shaywitz',
        year: 2003,
        journal: 'Annals of Dyslexia',
        url: 'https://doi.org/10.1007/s11881-003-0001-9',
        finding: 'Definición de referencia de la dislexia como dificultad específica de origen neurobiológico en la decodificación precisa y fluida, secundaria al déficit fonológico.',
      },
      {
        title: 'The nature and classification of reading disorders',
        authors: 'Margaret J. Snowling, Charles Hulme',
        year: 2012,
        journal: 'Journal of Child Psychology and Psychiatry',
        url: 'https://doi.org/10.1111/j.1469-7610.2012.02561.x',
        finding: 'Los trastornos de lectura forman un continuo que va de la dislexia a la comprensión lectora pobre, con bases lingüísticas compartidas.',
      },
      {
        title: 'Neurobiología de la dislexia evolutiva',
        authors: 'Manuel Soriano-Ferrer, Erika Piedra-Martínez',
        year: 2016,
        journal: 'Revista de Neurología',
        url: 'https://scholar.google.es/scholar?q=Soriano-Ferrer+Neurobiologia+de+la+dislexia+evolutiva',
        finding: 'Revisión en español de las bases neurobiológicas de la dislexia: hipofunción de circuitos temporoparietales y occipitotemporales izquierdos y déficit fonológico.',
      },
    ],
    resources: [
      {
        name: 'DISFAM',
        url: 'https://disfam.org',
        description: 'Organización hispanohablante especializada en dislexia: orientación familiar, formación docente e incidencia política.',
      },
      {
        name: 'AEDA',
        url: 'https://aedadislexia.org',
        description: 'Asociación Española de Dislexia y otras Dificultades de Aprendizaje.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Documentos y guías de atención a la diversidad publicados por el Ministerio.',
      },
    ],
  },

  'disgrafia': {
    slug: 'disgrafia',
    name: 'Disgrafía y dificultades en la escritura',
    group: 'Trastornos del Neurodesarrollo',
    icon: '✍️',
    color: 'bg-[#0E7490]',
    accentColor: '#0E7490',
    prevalence: 'Entre el 5% y el 20% del alumnado según criterios; los problemas de escritura manuscrita afectan al 10–30%',
    shortDescription:
      'Trastorno de la escritura que afecta a la legibilidad, la velocidad y la automatización del gesto gráfico, convirtiendo escribir en una tarea costosa, lenta y fatigosa.',
    fullDescription:
      'La disgrafía es un trastorno de la expresión escrita que afecta al componente grafo-motor: la caligrafía resulta ilegible, lenta y desorganizada, con tamaños irregulares, mala distribución espacial en la página, presión inadecuada y frecuentes quejas de dolor o fatiga en la mano. Se distingue de las dificultades puramente ortográficas o composicionales, aunque pueden coexistir. Existen dos grandes formas: la disgrafía motriz o evolutiva, ligada a la coordinación fina, y la disgrafía de base perceptiva, asociada a alteraciones en la integración visoespacial.\n\nSu base neurofuncional involucra la planificación motora fina, la integración visuomotora y la construcción de la memoria motora del trazado. Cuando la escritura no se automatiza, el alumno debe seguir dedicando atención consciente a cómo formar las letras en lugar de concentrarla en qué escribir, lo que degrada tanto la calidad como la cantidad de lo producido. Las revisiones clásicas de Graham y Weintraub y los estudios longitudinales europeos sitúan los problemas de escritura manuscrita entre el 10% y el 30% del alumnado, con mayor incidencia en los primeros cursos de Primaria.\n\nEn el aula, el alumno con disgrafía presenta cuadernos desordenados pese a esforzarse, no termina las copias, escribe respuestas notablemente más breves de lo que sabe y evita sistemáticamente las tareas de escritura extensa. Con frecuencia se interpreta erróneamente como desinterés o descuido. El coste emocional es significativo: recibir continuas correcciones de presentación sin que nadie reconozca la barrera subyacente erosiona la motivación y la autoestima académica.',
    impactInExams:
      'La velocidad gráfica limita directamente cuánto puede demostrar este alumno en un examen: conoce la respuesta completa pero la escribe abreviada, esquematizada o directamente no llega a escribirla. La fatiga manual aparece pronto y empeora progresivamente la legibilidad, lo que a menudo conlleva penalizaciones adicionales por presentación o por respuestas "incompletas" que en realidad nunca pudieron escribirse a tiempo.\n\nLos exámenes de desarrollo largo son los más adversos, porque exigen máxima producción manuscrita sostenida. Copiar enunciados, datos o gráficos consume una parte enorme del tiempo disponible, y el esfuerzo motor continuo roba recursos atencionales a la planificación del contenido. El resultado es una evaluación que mide la resistencia de su mano y no sus conocimientos, con notas sistemáticamente inferiores a su competencia real en la materia.\n\nEl efecto acumulativo a lo largo del curso es demoledor: multiplicados por todas las asignaturas, estos minutos perdidos y respuestas truncadas se traducen en un expediente que no se corresponde con su capacidad. Permitir teclado, reducir extensión y eliminar penalizaciones de presentación invierte la situación sin exigir ningún cambio en los contenidos evaluados.',
    adaptationsWeSeek: [
      'Tiempo adicional proporcional a la longitud de la prueba',
      'Permitir responder con ordenador, tableta o teclado',
      'Priorizar formatos de respuesta cortos, tipo test o esquemas frente al desarrollo extenso',
      'No evaluar caligrafía ni presentación cuando el contenido sea legible',
      'Proporcionar el material ya impreso para evitar copiado de enunciados y datos',
      'Reducir la extensión exigida manteniendo los mismos objetivos de aprendizaje',
    ],
    examRedFlags: [
      'Exámenes de desarrollo extenso que deben escribirse a mano',
      'Penalización por presentación, limpieza o caligrafía',
      'Copiado obligatorio de enunciados o diagramas',
      'Tiempo estándar en pruebas de mucha producción escrita',
      'Exigencia de "pasar a limpio" o reescribir respuestas',
    ],
    studies: [
      {
        title: 'A longitudinal study on dysgraphic handwriting in primary school',
        authors: 'Liesbeth Hamstra-Bletz, Anneloes W. Blöte',
        year: 1993,
        journal: 'Journal of Learning Disabilities',
        url: 'https://doi.org/10.1177/002221949302601007',
        finding: 'Seguimiento longitudinal que muestra que la escritura disgráfica tiende a mejorar con la edad pero persiste en una proporción relevante de alumnos.',
      },
      {
        title: 'Problems in developing functional handwriting',
        authors: 'Ragnar Karlsdottir, Thórhallur Stefánsson',
        year: 2002,
        journal: 'Perceptual and Motor Skills',
        url: 'https://doi.org/10.2466/pms.2002.94.3.923',
        finding: 'Revisión exhaustiva sobre el desarrollo de la escritura funcional y los factores que producen disgrafía evolutiva.',
      },
      {
        title: 'A review of handwriting research: Progress and prospects from 1980 to 1994',
        authors: 'Steve Graham, Naomi Weintraub',
        year: 1996,
        journal: 'Educational Psychology Review',
        url: 'https://doi.org/10.1007/BF01761831',
        finding: 'Sintetiza décadas de investigación sobre escritura manuscrita: entre el 10% y el 30% del alumnado presenta problemas de legibilidad o velocidad.',
      },
    ],
    resources: [
      {
        name: 'DISFAM',
        url: 'https://disfam.org',
        description: 'Apoyo y orientación sobre dislexia, disgrafía y otras dificultades específicas de aprendizaje.',
      },
      {
        name: 'AEDA',
        url: 'https://aedadislexia.org',
        description: 'Asociación Española de Dislexia y otras Dificultades de Aprendizaje, con recursos sobre escritura.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Publicaciones oficiales sobre atención a la diversidad y adaptaciones de acceso.',
      },
    ],
  },

  'discalculia': {
    slug: 'discalculia',
    name: 'Discalculia y dificultades en el razonamiento lógico',
    group: 'Trastornos del Neurodesarrollo',
    icon: '🔢',
    color: 'bg-[#7C3AED]',
    accentColor: '#7C3AED',
    prevalence: '3–6% de la población escolar',
    shortDescription:
      'Trastorno específico del aprendizaje de las matemáticas que afecta al sentido del número, el cálculo y la manipulación de cantidades, magnitudes y relaciones lógicas.',
    fullDescription:
      'La discalculia es un trastorno específico del aprendizaje que afecta al procesamiento numérico y al cálculo. Se manifiesta con dificultad para comprender cantidades y comparar números, conteo con dedos persistente más allá de la edad esperada, errores recurrentes en las tablas de multiplicar pese a practicar, confusión de símbolos operativos, fallos al alinear cifras y problemas tanto procedimentales como de recuperación de hechos aritméticos almacenados. No es simple "mala suerte con las mates": es un trastorno del neurodesarrollo con entidad propia.\n\nLa investigación de Brian Butterworth y Stanislas Dehaene lo vincula a un funcionamiento atípico del surco intraparietal, región clave del sentido numérico aproximado. David Geary ha descrito tres núcleos deficitarios: procedimental, de recuperación semántica (hechos aritméticos) y visoespacial. Los estudios de seguimiento de Ruth Shalev muestran que, sin intervención, la discalculia es persistente durante toda la escolaridad. Es frecuente la comorbilidad con dislexia y TDAH, lo que complica el diagnóstico diferencial.\n\nEn el aula, el alumno con discalculia necesita manipulativos, representaciones múltiples y más tiempo para automatizar hechos numéricos. Suele desarrollar ansiedad matemática secundaria: anticipa el fracaso, evita la materia y se bloquea ante cualquier operación. Etiquetas como "es de letras" ocultan un problema específico y tratable. Con apoyos como calculadora, tablas de referencia y descomposición de problemas, estos alumnos pueden acceder a todo el currículo matemático conceptual, porque su dificultad está en la automatización del cálculo, no en el razonamiento.',
    impactInExams:
      'La lentitud del cálculo es la primera barrera: no termina el examen aunque entienda los conceptos, porque cada operación requiere un esfuerzo manual y consciente que otros hacen automáticamente. Comete errores de procedimiento y de transcripción (copiar mal una cifra, perder un signo), y las tablas no automatizadas consumen la memoria de trabajo que debería dedicarse al razonamiento del problema.\n\nLos problemas verbales suponen una doble carga: primero descifrar el enunciado (con posible comorbilidad lectora) y después seleccionar y ejecutar las operaciones. La gestión del tiempo colapsa: se atasca en un ejercicio y no llega al resto. El resultado es una nota que infravalora gravemente su comprensión conceptual y refuerza la ansiedad matemática, iniciando un círculo de evitación que solo se rompe cuando la evaluación incorpora apoyos como calculadora, formulario y tiempo ampliado.\n\nEs importante distinguir qué se quiere evaluar: si el objetivo es el razonamiento matemático, permitir calculadora y tablas no resta rigor, porque la carga cognitiva se traslada del cálculo mecánico a la estrategia. Si el objetivo es la fluidez de cálculo, puede evaluarse aparte y con formato breve, sin contaminar la medición del razonamiento conceptual.',
    adaptationsWeSeek: [
      'Uso permitido de calculadora en los ejercicios que evalúan razonamiento',
      'Tabla pitagórica, formulario o regletas disponibles durante la prueba',
      'Tiempo adicional del 25–50%',
      'Problemas con menos pasos y datos claramente organizados',
      'Espacio suficiente en el papel para operar y alinear cifras',
      'No penalizar errores de transcripción numérica cuando el método aplicado es correcto',
    ],
    examRedFlags: [
      'Prohibición total de calculadora y tablas de apoyo',
      'Pruebas contra reloj de tablas de multiplicar u operaciones básicas',
      'Problemas con enunciados largos y datos irrelevantes mezclados',
      'Espacio insuficiente en el papel para realizar las operaciones',
      'Doble penalización: error de método y error de transcripción por separado',
    ],
    studies: [
      {
        title: 'Foundational numerical capacities and the origins of dyscalculia',
        authors: 'Brian Butterworth',
        year: 2010,
        journal: 'Trends in Cognitive Sciences',
        url: 'https://doi.org/10.1016/j.tics.2010.09.007',
        finding: 'La discalculia se origina en un déficit del sentido numérico básico asentado en el surco intraparietal, con impacto duradero en la vida adulta.',
      },
      {
        title: 'Mathematics and learning disabilities',
        authors: 'David C. Geary',
        year: 2004,
        journal: 'Journal of Learning Disabilities',
        url: 'https://doi.org/10.1177/00222194040370010201',
        finding: 'Describe los tres subtipos de discalculia (procedimental, semántico-memoria y visoespacial) y su relación con los trastornos de aprendizaje.',
      },
      {
        title: 'Developmental dyscalculia: a prospective six-year follow-up',
        authors: 'Ruth S. Shalev, Orly Manor, Vardiella Gross-Tsur',
        year: 2005,
        journal: 'Developmental Medicine & Child Neurology',
        url: 'https://doi.org/10.1017/S0012162205000216',
        finding: 'Seguimiento de seis años que demuestra la persistencia de la discalculia: casi la mitad mantiene dificultades graves años después del diagnóstico.',
      },
    ],
    resources: [
      {
        name: 'DISFAM',
        url: 'https://disfam.org',
        description: 'Orientación sobre discalculia y otras dificultades específicas de aprendizaje.',
      },
      {
        name: 'AEDA',
        url: 'https://aedadislexia.org',
        description: 'Asociación Española de Dislexia y otras Dificultades de Aprendizaje, incluida la discalculia.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Recursos oficiales de atención a la diversidad y evaluación adaptada.',
      },
    ],
  },

  'tdl': {
    slug: 'tdl',
    name: 'Trastorno del Desarrollo del Lenguaje (TDL/TEL)',
    group: 'Trastornos del Neurodesarrollo',
    icon: '💬',
    color: 'bg-[#BE185D]',
    accentColor: '#BE185D',
    prevalence: '≈7% del alumnado de Educación Infantil y Primaria',
    shortDescription:
      'Trastorno del desarrollo del lenguaje que dificulta la comprensión y/o expresión del lenguaje oral de forma persistente, sin causa aparente como sordera o discapacidad intelectual.',
    fullDescription:
      'El Trastorno del Desarrollo del Lenguaje (TDL), históricamente llamado TEL (Trastorno Específico del Lenguaje) y conocido internacionalmente como DLD tras el consenso CATALISE coordinado por Dorothy Bishop, afecta a la adquisición y el uso del lenguaje oral de forma persistente, sin que pueda explicarse por sordera, discapacidad intelectual, lesión neurológica evidente o trastorno del espectro autista. Puede ser fundamentalmente expresivo (vocabulario pobre, frases cortas, errores gramaticales persistentes), receptivo (dificultad para comprender lo que se le dice) o mixto.\n\nCon una prevalencia cercana al 7% según los estudios epidemiológicos de Tomblin y colaboradores, es uno de los trastornos del neurodesarrollo más frecuentes y a la vez menos conocidos. Su base es fuertemente genética e involucra redes frontotemporales implicadas en el procesamiento lingüístico. Sin apoyos, el TDL tiende a persistir y compromete la posterior adquisición de la lectoescritura, el aprendizaje de vocabulario académico y el acceso a los contenidos de todas las materias, porque el lenguaje es el vehículo principal de la enseñanza.\n\nEn el aula, estos alumnos siguen explicaciones orales largas solo parcialmente, pierden instrucciones de varios pasos, interpretan el lenguaje de forma literal y producen narrativas desorganizadas. Sus respuestas son escuetas incluso cuando conocen la respuesta, porque formular frases complejas les cuesta un gran esfuerzo. Con frecuencia se confunde con TDAH, desinterés o baja capacidad, y el impacto socioemocional —malentendidos, burlas, aislamiento— acompaña frecuentemente al cuadro.',
    impactInExams:
      'Los enunciados largos o sintácticamente complejos no llegan a comprenderse aunque el contenido se domine: el alumno responde a una parte de la pregunta o a algo distinto de lo preguntado. Las instrucciones dadas solo de forma oral se retienen de manera parcial, y las preguntas abiertas exigen un esfuerzo de búsqueda léxica y estructuración sintáctica que ralentiza enormemente la producción escrita.\n\nLos exámenes muy verbales infrautilizan lo que el alumno realmente sabe: interpreta literalmente preguntas indirectas, no capta matices ni dobles sentidos y agota el tiempo formulando respuestas breves. Cuando el examen emplea lenguaje sencillo, frases cortas, apoyo visual y permite reformulación oral por parte del docente, el rendimiento se aproxima mucho a su nivel real de competencia en la materia.\n\nEl riesgo más frecuente es el falso negativo: un alumno que parece no saber porque no comprende la pregunta o no logra formular la respuesta, y que recibe refuerzos y repeticiones de contenidos que en realidad ya domina. Verificar siempre la comprensión del enunciado antes de valorar la respuesta evita este error diagnóstico tan costoso.',
    adaptationsWeSeek: [
      'Enunciados breves, sintácticamente simples y con vocabulario conocido',
      'Apoyo visual de las instrucciones: imágenes, esquemas o pictogramas',
      'Posibilidad de pedir reformulación oral de cualquier pregunta',
      'Tiempo adicional para comprender y producir respuestas',
      'Formatos de respuesta alternativos: señalar, emparejar, completar esquemas',
      'Verificación de comprensión de instrucciones antes de iniciar la prueba',
    ],
    examRedFlags: [
      'Enunciados largos con subordinadas y estructura compleja',
      'Instrucciones transmitidas únicamente de forma oral',
      'Preguntas indirectas, irónicas o con dobles sentidos',
      'Exámenes basados exclusivamente en desarrollo extenso',
      'Tiempo estándar sin considerar la lentitud de procesamiento lingüístico',
    ],
    studies: [
      {
        title: 'Phase 2 of CATALISE: a multinational and multidisciplinary Delphi consensus study of problems with language development: Terminology',
        authors: 'Dorothy V. M. Bishop, Margaret J. Snowling, Paul A. Thompson, Trisha Greenhalgh y consorcio CATALISE',
        year: 2017,
        journal: 'Journal of Child Psychology and Psychiatry',
        url: 'https://doi.org/10.1111/jcpp.12721',
        finding: 'Consenso internacional que establece el término "trastorno del desarrollo del lenguaje" (DLD/TDL) en sustitución de denominaciones previas como TEL o SLI.',
      },
      {
        title: 'Prevalence of specific language impairment in kindergarten children',
        authors: 'J. Bruce Tomblin y cols.',
        year: 1997,
        journal: 'Journal of Speech, Language, and Hearing Research',
        url: 'https://doi.org/10.1044/jslhr.4006.1245',
        finding: 'Estudio epidemiológico de referencia: alrededor del 7% de los niños presenta trastorno específico del lenguaje sin otra causa asociada.',
      },
      {
        title: 'Children with Specific Language Impairment (2ª ed.)',
        authors: 'Laurence B. Leonard',
        year: 2014,
        journal: 'MIT Press',
        url: 'https://scholar.google.es/scholar?q=Leonard+Children+with+Specific+Language+Impairment+second+edition',
        finding: 'Obra de referencia que sistematiza las manifestaciones lingüísticas, cognitivas y neurobiológicas del TEL/TDL.',
      },
    ],
    resources: [
      {
        name: 'AELFA-IFO',
        url: 'https://aelfaifo.com',
        description: 'Asociación Española de Logopedia, Foniatría y Audiología: recursos profesionales sobre trastornos del lenguaje.',
      },
      {
        name: 'Plena Inclusión',
        url: 'https://plenainclusion.org',
        description: 'Confederación española de apoyo a personas con discapacidad intelectual o del desarrollo y sus familias.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Guías oficiales de atención al alumnado con necesidades específicas de apoyo educativo.',
      },
    ],
  },

  'dcd': {
    slug: 'dcd',
    name: 'Trastorno de la Coordinación Motriz (DCD)',
    group: 'Trastornos del Neurodesarrollo',
    icon: '🤸',
    color: 'bg-[#15803D]',
    accentColor: '#15803D',
    prevalence: '5–6% de niños en edad escolar',
    shortDescription:
      'Trastorno del neurodesarrollo que afecta a la coordinación motriz y a la planificación de movimientos, provocando torpeza, lentitud gráfica y dificultades manipulativas.',
    fullDescription:
      'El Trastorno del Desarrollo de la Coordinación (DCD), históricamente llamado dispraxia, se define en el DSM-5 como la adquisición y ejecución de habilidades motoras coordinadas sustancialmente por debajo de lo esperado para la edad, que interfiere significativamente en las actividades diarias y el rendimiento académico. Afecta tanto a la motricidad fina (letra, tijeras, abotonarse) como a la gruesa (correr, saltar, ir en bicicleta), y no se explica por una condición neurológica conocida ni por discapacidad intelectual.\n\nSu base neurofuncional involucra alteraciones en la planificación y automatización motora: redes parietales y cerebelosas que permiten anticipar, secuenciar y ejecutar movimientos de forma fluida. Las recomendaciones internacionales de práctica clínica coordinadas por Rainer Blank (2019) recogen una prevalencia del 5–6% y subrayan la elevada comorbilidad con TDAH, dislexia y TDL. El esfuerzo motor constante que estos niños realizan para lograr lo que otros hacen sin pensar genera fatiga acumulada y evitación de actividades físicas y manuales.\n\nEn la escuela, el alumno con DCD escribe lento e ilegible, tarda en manipular instrumentos, dibuja con dificultad y suele evitar Educación Física, donde las burlas son frecuentes. El impacto emocional es notable: baja autoestima, ansiedad anticipatoria ante tareas motoras visibles y etiquetas de torpeza. Con ajustes razonables —teclado, tiempo extra, plantillas impresas— su rendimiento académico deja de depender de su destreza manual.',
    impactInExams:
      'La velocidad gráfica reducida hace que este alumno no termine los exámenes escritos: cada palabra exige un control motor consciente. La letra empeora conforme avanza la prueba por fatiga muscular, y las respuestas correctas pueden quedar penalizadas por ilegibilidad o por presentación desordenada. Manipular regla, compás o plantillas para gráficos consume minutos valiosos que otros alumnos dedican a pensar.\n\nEl sobreesfuerzo motor continuo roba recursos atencionales al contenido: mientras concentra la energía en formar letras legibles, pierde el hilo del razonamiento. El resultado es una evaluación que mide resistencia física y no conocimiento. Cuando se permite teclado, se reducen ítems de producción gráfica y no se penaliza la caligrafía, estos alumnos demuestran un nivel académico plenamente acorde a su capacidad intelectual.\n\nHay que considerar además el componente emocional: años de correcciones por letra ilegible generan anticipación negativa ante cualquier tarea escrita, que añade ansiedad a la fatiga motora. Reconocer explícitamente que la caligrafía no forma parte de la evaluación reduce esa tensión y mejora de inmediato tanto la velocidad como la calidad del contenido producido.',
    adaptationsWeSeek: [
      'Tiempo adicional proporcional a la demanda motora de la prueba',
      'Permitir responder con ordenador, tableta o teclado',
      'No evaluar caligrafía, presentación ni limpieza cuando el contenido sea comprensible',
      'Plantillas, figuras y gráficos ya impresos para evitar dibujo manual',
      'Instrumentos adaptados: lapiceros ergonómicos, reglas antideslizantes',
      'Reducir el número de ítems de producción gráfica manteniendo los objetivos',
    ],
    examRedFlags: [
      'Exámenes largos que deben completarse íntegramente a mano',
      'Penalización por letra ilegible o presentación desordenada',
      'Dibujos, esquemas o gráficos obligatorios sin alternativa impresa',
      'Tiempo estándar en pruebas con alta demanda de escritura',
      'Copiado obligatorio de enunciados, tablas o diagramas',
    ],
    studies: [
      {
        title: 'International clinical practice recommendations on the definition, diagnosis, assessment, intervention, and psychosocial aspects of developmental coordination disorder',
        authors: 'Rainer Blank y cols. (EACD)',
        year: 2019,
        journal: 'Developmental Medicine & Child Neurology',
        url: 'https://doi.org/10.1111/dmcn.14132',
        finding: 'Recomendaciones internacionales de referencia sobre el DCD: definición, diagnóstico, prevalencia del 5–6% e intervenciones basadas en evidencia.',
      },
      {
        title: 'Developmental coordination disorder: a review of the current status',
        authors: 'Jill G. Zwicker, Cheryl Missiuna, Susan R. Harris, Lara A. Boyd',
        year: 2012,
        journal: 'Research in Developmental Disabilities',
        url: 'https://doi.org/10.1016/j.ridd.2011.11.006',
        finding: 'Revisión actualizada sobre bases neurales, curso evolutivo e impacto funcional del trastorno de coordinación del desarrollo.',
      },
      {
        title: 'Children with developmental coordination disorders',
        authors: 'Amanda Kirby, David A. Sugden',
        year: 2007,
        journal: 'Journal of the Royal Society of Medicine',
        url: 'https://doi.org/10.1177/014107680710000414',
        finding: 'Describe el impacto escolar y psicosocial del DCD y la necesidad de adaptaciones en el aula y en la evaluación.',
      },
    ],
    resources: [
      {
        name: 'EACD',
        url: 'https://www.eacd.org',
        description: 'Academia Europea de Discapacidad Infantil: recomendaciones clínicas internacionales sobre el DCD.',
      },
      {
        name: 'Plena Inclusión',
        url: 'https://plenainclusion.org',
        description: 'Recursos de apoyo educativo para alumnado con necesidades específicas.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Orientaciones oficiales sobre accesibilidad y adaptaciones de acceso al currículo.',
      },
    ],
  },

  'dificultades-aprendizaje': {
    slug: 'dificultades-aprendizaje',
    name: 'Dificultades de aprendizaje (Lectura facilitada y apoyos visuales)',
    group: 'Dificultades de Aprendizaje',
    icon: '🧩',
    color: 'bg-[#4D7C0F]',
    accentColor: '#4D7C0F',
    prevalence: 'En torno al 5% del alumnado recibe apoyo por dificultades específicas de aprendizaje',
    shortDescription:
      'Alumnado con rendimiento inferior al esperado pese a capacidad normal, que requiere lectura facilitada, apoyos visuales y formatos accesibles para mostrar lo que sabe.',
    fullDescription:
      'Las dificultades de aprendizaje constituyen un término paraguas que agrupa a alumnos cuyo rendimiento académico es sustancialmente inferior al esperado para su edad, escolarización e inteligencia, especialmente en lectoescritura, cálculo y comprensión. No implican baja capacidad intelectual ni falta de esfuerzo: existe una brecha entre el potencial del alumno y sus resultados, que solo se cierra cuando la enseñanza y la evaluación se ajustan a su forma de aprender.\n\nLa investigación de Fletcher, Lyon, Fuchs y Barnes muestra que estas dificultades tienen bases multifactoriales —fonológicas, atencionales, mnésicas y lingüísticas— y responden bien a metodologías explícitas, estructuradas y multisensoriales. Los trabajos de Swanson confirman que la combinación de instrucción directa, estrategias metacognitivas y apoyos visuales produce mejoras significativas. La clave metodológica es el diseño universal: lectura facilitada (frases cortas, vocabulario claro, estructura predecible), pictogramas, mapas conceptuales y redundancia entre canales verbales y visuales.\n\nEn el aula, estos alumnos necesitan más tiempo, más repetición y materiales organizados jerárquicamente. Cuando reciben exámenes densos, ambiguos o poco estructurados, su rendimiento cae de forma desproporcionada respecto a lo aprendido. Una evaluación bien diseñada mantiene los mismos objetivos de aprendizaje pero modifica el formato de acceso y de respuesta, garantizando así que la nota refleje el nivel real de dominio curricular y no la barrera del formato.',
    impactInExams:
      'Los exámenes densos y poco estructurados generan sobrecarga cognitiva inmediata: el alumno no identifica qué se le pide, se pierde en el formato y confunde instrucciones, antes incluso de llegar al contenido. La falta de apoyos visuales dificulta la organización mental de la información, y el vocabulario técnico sin definir añade una capa de dificultad ajena a la materia evaluada.\n\nSin ajustes, el tiempo estándar resulta insuficiente porque procesa la información más lentamente, y el formato cambiante entre exámenes le obliga a gastar recursos en descifrar la estructura en lugar de recuperar contenidos. El resultado es una infravaloración sistemática de su aprendizaje real. Con lectura facilitada, apoyos visuales, estructura predecible y tiempo ampliado, estos alumnos demuestran competencias notablemente superiores a las que muestran los exámenes convencionales.\n\nLa clave está en la consistencia: cuando todos los exámenes de la materia comparten estructura, tipografía y tipo de instrucciones, el alumno automatiza el acceso al formato y dedica toda su energía al contenido. La imprevisibilidad, no la dificultad, es con frecuencia el mayor obstáculo para este perfil en la evaluación.',
    adaptationsWeSeek: [
      'Lectura facilitada de enunciados: frases cortas, vocabulario claro y estructura predecible',
      'Apoyos visuales: esquemas, imágenes, colores y jerarquías tipográficas claras',
      'Tiempo adicional del 25–50%',
      'Estructura estable y predecible entre todos los exámenes de la materia',
      'Vocabulario técnico definido o glosario disponible durante la prueba',
      'Posibilidad de responder mediante formatos variados (esquema, oral, gráfico)',
    ],
    examRedFlags: [
      'Texto denso sin jerarquía visual ni separación clara de bloques',
      'Instrucciones múltiples agrupadas en un único párrafo',
      'Vocabulario técnico sin definir ni glosario',
      'Tiempo estándar sin considerar el ritmo de procesamiento',
      'Formato cambiante entre exámenes de la misma asignatura',
    ],
    studies: [
      {
        title: 'Learning Disabilities: From Identification to Intervention (2ª ed.)',
        authors: 'Jack M. Fletcher, G. Reid Lyon, Lynn S. Fuchs, Marcia A. Barnes',
        year: 2019,
        journal: 'Guilford Press',
        url: 'https://scholar.google.es/scholar?q=Fletcher+Lyon+Fuchs+Barnes+Learning+Disabilities+Identification+Intervention',
        finding: 'Obra de referencia sobre identificación e intervención en dificultades de aprendizaje desde el modelo de respuesta a la intervención.',
      },
      {
        title: 'What definitions of learning disability say and don\'t say: A critical analysis',
        authors: 'Kenneth A. Kavale, Steven R. Forness',
        year: 2000,
        journal: 'Journal of Learning Disabilities',
        url: 'https://doi.org/10.1177/002221940003300303',
        finding: 'Análisis crítico de las definiciones de dificultades de aprendizaje y sus implicaciones para la identificación y la evaluación.',
      },
      {
        title: 'Interventions for students with learning disabilities: A meta-analysis of treatment outcomes',
        authors: 'H. Lee Swanson, Maureen Hoskyn, Carole Lee',
        year: 1999,
        journal: 'Guilford Press',
        url: 'https://scholar.google.es/scholar?q=Swanson+Hoskyn+Lee+Interventions+students+learning+disabilities+meta-analysis',
        finding: 'Metaanálisis que confirma la eficacia de la instrucción directa combinada con estrategias y apoyos visuales en dificultades de aprendizaje.',
      },
    ],
    resources: [
      {
        name: 'Plena Inclusión',
        url: 'https://plenainclusion.org',
        description: 'Confederación española con guías de lectura fácil y apoyos para el aprendizaje.',
      },
      {
        name: 'DISFAM',
        url: 'https://disfam.org',
        description: 'Recursos para familias y escuelas sobre dificultades específicas de aprendizaje.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Marco normativo y guías de apoyo educativo del sistema educativo español.',
      },
    ],
  },

  'memoria-trabajo': {
    slug: 'memoria-trabajo',
    name: 'Dificultades de memoria de trabajo',
    group: 'Dificultades de Aprendizaje',
    icon: '🧠',
    color: 'bg-[#B91C1C]',
    accentColor: '#B91C1C',
    prevalence: '≈10% del alumnado presenta dificultades significativas de memoria de trabajo (3% graves)',
    shortDescription:
      'Dificultad para retener y manipular información en el corto plazo: olvidan instrucciones, pierden el hilo de los problemas y necesitan información fragmentada y apoyos externos.',
    fullDescription:
      'La memoria de trabajo es el sistema que permite retener y manipular información durante unos segundos mientras se realiza una tarea cognitiva. Según el modelo de Alan Baddeley combina almacenes temporales (fonológico y visoespacial) con un ejecutivo central que coordina la atención. Nelson Cowan ha establecido que su capacidad ronda los cuatro elementos informativos en personas adultas; los niños con dificultades operan con un margen aún menor, por lo que la información "cae" de su mente antes de poder usarla.\n\nLos estudios de Susan Gathercole y Tracy Alloway estiman que alrededor del 10% del alumnado presenta dificultades significativas de memoria de trabajo, y un 3% graves. Estos niños parecen distraídos: olvidan a mitad de tarea qué se les había pedido, pierden el lugar donde estaban, no recuerdan los pasos de un problema o dejan respuestas incompletas. No es falta de atención ni de esfuerzo: es un cuello de botella de capacidad. La dificultad se asocia frecuentemente a TDAH, dislexia y TDL, y predice resultados académicos independientemente del cociente intelectual.\n\nLa buena noticia es que esta barrera es de las más fáciles de eliminar en la evaluación: externalizar la memoria —instrucciones escritas, información clave destacada, formularios permitidos, problemas divididos en pasos— reduce drásticamente la carga y permite que el alumno dedique sus recursos limitados a razonar en lugar de a recordar. Un examen bien diseñado para este perfil apenas difiere del estándar, pero cambia completamente el resultado.',
    impactInExams:
      'Durante el examen, este alumno llega al final de un enunciado largo y ya ha olvidado el dato inicial; pierde pasos en problemas multipaso; olvida responder alguna subpregunta; pasa de página y no recuerda qué se pedía. Comete errores de omisión abundantes que nada tienen que ver con su conocimiento de la materia, y que la corrección castiga sin distinción.\n\nEl esfuerzo de mantener activa la información consume los recursos que deberían destinarse al razonamiento, de modo que incluso las preguntas que sabe resolver fallan por pérdida de datos intermedios. La frustración resultante —saber que estudió, recordar haberlo sabido y no poder acceder a ello en el momento— erosiona la confianza. Con apoyos externos simples (formulario, checklist, enunciados fragmentados), el rendimiento de estos alumnos se normaliza casi por completo.\n\nEl profesorado suele interpretar las omisiones como falta de estudio o de cuidado, lo que añade reproches a la frustración. Identificar el patrón —respuestas correctas pero incompletas, últimos pasos perdidos, preguntas saltadas sin querer— permite distinguir la barrera de memoria de trabajo de un problema de conocimiento y aplicar el ajuste adecuado.',
    adaptationsWeSeek: [
      'Instrucciones presentadas por escrito y de una en una',
      'Información clave destacada visualmente dentro de los enunciados',
      'Problemas divididos en pasos numerados con espacios guiados',
      'Permiso de formulario, apuntes personales o lista de fórmulas',
      'Tiempo adicional para compensar la doble manipulación de información',
      'Lista de verificación final para comprobar que ninguna pregunta queda sin responder',
    ],
    examRedFlags: [
      'Instrucciones dadas solo de forma oral y de varias tareas a la vez',
      'Enunciados con muchos datos dispersos en párrafos largos',
      'Preguntas que encadenan varias tareas sin separación visible',
      'Prohibición absoluta de apuntes, formulario o material de apoyo',
      'Tiempo estándar en pruebas con alta carga de retención temporal',
    ],
    studies: [
      {
        title: 'Working memory and language: an overview',
        authors: 'Alan Baddeley',
        year: 2003,
        journal: 'Journal of Communication Disorders',
        url: 'https://doi.org/10.1016/S0021-9924(03)00019-4',
        finding: 'Síntesis del modelo multicomponente de la memoria de trabajo y su papel central en la comprensión y producción del lenguaje.',
      },
      {
        title: 'Working Memory and Learning: A Practical Guide for Teachers',
        authors: 'Susan E. Gathercole, Tracy Packiam Alloway',
        year: 2008,
        journal: 'Sage Publications',
        url: 'https://scholar.google.es/scholar?q=Gathercole+Alloway+Working+Memory+and+Learning+Practical+Guide+Teachers',
        finding: 'Guía práctica basada en investigación: identifica al ~10% del alumnado con dificultades de memoria de trabajo y propone estrategias de aula.',
      },
      {
        title: 'The magical number 4 in short-term memory: A reconsideration of mental storage capacity',
        authors: 'Nelson Cowan',
        year: 2001,
        journal: 'Behavioral and Brain Sciences',
        url: 'https://doi.org/10.1017/S0140525X01003922',
        finding: 'Revisa la capacidad de la memoria a corto plazo y la sitúa en torno a cuatro elementos, base conceptual de las dificultades de almacenamiento.',
      },
    ],
    resources: [
      {
        name: 'Fundación CADAH',
        url: 'https://fundacioncadah.org',
        description: 'Recursos en español sobre funciones ejecutivas y memoria de trabajo aplicadas al aula.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Materiales oficiales sobre estrategias didácticas y evaluación inclusiva.',
      },
      {
        name: 'Portal Guiasalud',
        url: 'https://portal.guiasalud.es',
        description: 'Guías clínicas del Sistema Nacional de Salud con recomendaciones sobre desarrollo cognitivo infantil.',
      },
    ],
  },

  'retraso-madurativo': {
    slug: 'retraso-madurativo',
    name: 'Retraso madurativo generalizado',
    group: 'Dificultades de Aprendizaje',
    icon: '🌱',
    color: 'bg-[#047857]',
    accentColor: '#047857',
    prevalence: '1–3% de menores de 5 años (retraso global del desarrollo)',
    shortDescription:
      'Ritmo de desarrollo más lento de lo esperado en uno o varios ámbitos (motor, cognitivo, lenguaje, socioemocional) que exige ajustes curriculares y de evaluación.',
    fullDescription:
      'El retraso madurativo generalizado, denominado retraso global del desarrollo en el DSM-5 para menores de 5 años, se aplica cuando un niño no alcanza los hitos evolutivos esperados en dos o más dominios: motricidad, lenguaje, cognición, autonomía e interacción social. Es una categoría diagnóstica provisional: algunos niños lo superan con estimulación adecuada y en otros constituye el primer signo de una discapacidad intelectual u otra condición del neurodesarrollo que solo puede confirmarse más adelante.\n\nLas causas son heterogéneas —genéticas, perinatales, ambientales— y su detección precoz es determinante. El Libro Blanco de la Atención Temprana, elaborado por el Grupo de Atención Temprana en España, establece el marco de referencia para la intervención en los primeros años, momento de máxima plasticidad cerebral. Los estudios de Shevell y colaboradores muestran que el seguimiento neurológico y psicométrico periódico permite reorientar el diagnóstico y los apoyos conforme el niño crece.\n\nEn la escuela, este alumno aprende al mismo ritmo conceptual que sus compañeros pero necesita más tiempo, más repetición y mayor concreción: ejemplos cotidianos, instrucciones paso a paso y objetivos secuenciados. La evaluación debe partir de su nivel competencial actual, no del curso nominal. Cuando se le aplican exámenes diseñados para la media sin ajustes, el resultado es frustración y bloqueo; cuando se adapta el formato manteniendo contenidos nucleares, demuestra aprendizajes reales y sostenidos.',
    impactInExams:
      'Los exámenes diseñados para el nivel medio del grupo superan con frecuencia su nivel madurativo: enunciados abstractos, vocabulario avanzado, preguntas que exigen generalización o inferencia y tiempos calculados para un ritmo de procesamiento mayor. El resultado habitual es un examen en blanco o incompleto que no informa de nada sobre lo aprendido y que genera frustración visible.\n\nEste alumno necesita evaluación adaptada: mismos contenidos nucleares pero formato simplificado, apoyo adulto para leer y mediar las instrucciones, tiempo ampliado y preguntas concretas con ejemplos. También requiere evaluación continua frente a pruebas únicas, porque su rendimiento mejora notablemente con repetición espaciada. Con estos ajustes, la nota deja de medir su velocidad de maduración y pasa a reflejar sus progresos curriculares reales.\n\nTambién es decisiva la distribución temporal: pruebas cortas repetidas a lo largo de la evaluación continua informan mucho mejor que una sola sesión larga, en la que la fatiga y la saturación aparecen pronto. Cada mini-prueba exitosa refuerza además su seguridad y disposición ante el siguiente reto académico.',
    adaptationsWeSeek: [
      'Adaptación curricular con objetivos priorizados y secuenciados',
      'Enunciados concretos, con ejemplos cercanos a su experiencia',
      'Tiempo adicional ampliado y posibilidad de dividir la prueba en sesiones',
      'Apoyo de un adulto para leer instrucciones y mediar durante la prueba',
      'Formatos sencillos: emparejar, señalar, completar, ordenar secuencias',
      'Evaluación continua y por observación frente a pruebas sumativas únicas',
    ],
    examRedFlags: [
      'Exámenes idénticos a los del grupo sin ninguna adaptación',
      'Vocabulario abstracto o técnico sin apoyo visual ni ejemplos',
      'Tiempo estándar en pruebas extensas',
      'Peso excesivo de una única prueba sumativa en la calificación',
      'Ausencia total de ejemplos o modelos de respuesta',
    ],
    studies: [
      {
        title: 'Practice parameter: Evaluation of the child with global developmental delay',
        authors: 'Michael Shevell y cols. (American Academy of Neurology)',
        year: 2003,
        journal: 'Neurology',
        url: 'https://doi.org/10.1212/01.WNL.0000031431.81555.16',
        finding: 'Parámetro de práctica clínica sobre la evaluación sistemática del retraso global del desarrollo y la necesidad de seguimiento evolutivo.',
      },
      {
        title: 'Diagnostic yield of the neurologic assessment of the developmentally delayed child',
        authors: 'Annette Majnemer, Michael I. Shevell',
        year: 1995,
        journal: 'Pediatrics',
        url: 'https://scholar.google.es/scholar?q=Majnemer+Shevell+Diagnostic+yield+neurologic+assessment+developmentally+delayed+child',
        finding: 'Demuestra el valor diagnóstico de la evaluación neurológica estructurada en niños con retraso del desarrollo y la alta tasa de hallazgos etiológicos.',
      },
      {
        title: 'Libro Blanco de la Atención Temprana',
        authors: 'Grupo de Atención Temprana (GAT)',
        year: 2000,
        journal: 'Ministerio de Sanidad y Consumo',
        url: 'https://www.sanidad.gob.es',
        finding: 'Documento fundacional español que define el marco organizativo y profesional de la atención temprana en nuestro país.',
      },
    ],
    resources: [
      {
        name: 'Plena Inclusión',
        url: 'https://plenainclusion.org',
        description: 'Confederación española de apoyo a personas con discapacidad intelectual o del desarrollo.',
      },
      {
        name: 'Down España',
        url: 'https://www.downespagna.es',
        description: 'Federación española de asociaciones de personas con síndrome de Down: programas educativos y de desarrollo infantil.',
      },
      {
        name: 'Ministerio de Sanidad',
        url: 'https://www.sanidad.gob.es',
        description: 'Recursos oficiales sobre atención temprana y desarrollo infantil en España.',
      },
    ],
  },

  'altas-capacidades': {
    slug: 'altas-capacidades',
    name: 'Altas capacidades intelectuales (ACI)',
    group: 'Otros Perfiles',
    icon: '🚀',
    color: 'bg-[#1E40AF]',
    accentColor: '#1E40AF',
    prevalence: '2–5% del alumnado según criterio (CI ≥ 130: aproximadamente el 2%)',
    shortDescription:
      'Alumnado con rendimiento intelectual muy superior a la media que necesita ampliación, profundización y desafío real para mantenerse motivado y desarrollar plenamente su talento.',
    fullDescription:
      'Las altas capacidades intelectuales designan al alumnado cuyo funcionamiento intelectual supera significativamente la media. El modelo de los tres anillos de Joseph Renzulli concibe la superdotación como interacción entre capacidad elevada, creatividad e implicación en la tarea, mientras que el modelo DMGT de Françoys Gagné distingue entre don (potencial innato) y talento (competencia desarrollada sistemáticamente). El criterio psicométrico más extendido sitúa el umbral en un CI de 130, correspondiente aproximadamente al 2% superior de la población, aunque definiciones más amplias alcanzan el 5%.\n\nEstos alumnos suelen mostrar aprendizaje rápido, memoria excepcional, pensamiento abstracto temprano, curiosidad intensa, humor sofisticado y perfeccionismo. Un dato crítico frecuentemente ignorado: existe la doble excepcionalidad (alumnos con ACI y simultáneamente TDAH, dislexia o TEA), donde la capacidad enmascara la dificultad y la dificultad oculta la capacidad, dejando al alumno sin ningún tipo de apoyo.\n\nContrario al mito, el alto potencial no garantiza éxito escolar: sin desafío adecuado aparece aburrimiento, desmotivación, bajo rendimiento aparente e incluso fracaso académico. Necesitan ampliación y profundización —no simplemente "más de lo mismo"—, agrupamientos flexibles con pares de nivel similar y, excepcionalmente, flexibilización de curso. La evaluación debe ofrecerles techo: ítems de transferencia, análisis y creación que les permitan demostrar hasta dónde llegan.',
    impactInExams:
      'Los exámenes centrados en reproducción memorística no miden el techo de estos alumnos: terminan mucho antes del tiempo concedido, se aburren y cometen descuidos por desatención, de modo que la nota obtenida no informa ni de su dominio ni de su potencial. El tiempo sobrante sin propuesta adicional convierte la prueba en una experiencia desmotivadora que, repetida curso tras curso, alimenta actitudes de desenganche.\n\nLas preguntas cerradas y convergentes limitan además su pensamiento divergente: donde otros ven una respuesta correcta, ellos generan alternativas válidas que el formato penaliza. La solución no es darles más tiempo sino más profundidad: preguntas optativas de ampliación con valor añadido, problemas abiertos de mayor demanda cognitiva y reconocimiento explícito de procedimientos propios correctos aunque difieran del esperado. Así, la evaluación vuelve a cumplir su función: informar del aprendizaje real.\n\nCabe recordar que parte de este alumnado presenta doble excepcionalidad: si coexisten TDAH o dislexia, el examen estándar les castiga por la barrera mientras el formato fácil les aburre por el techo, con el resultado de notas mediocres que ocultan simultáneamente talento y necesidad de apoyo. Solo una evaluación ajustada en ambos sentidos revela el perfil completo.',
    adaptationsWeSeek: [
      'Preguntas de ampliación optativas con valor añadido tras los contenidos básicos',
      'Ítems de mayor demanda cognitiva: transferencia, análisis, evaluación y creación',
      'Actividades de enriquecimiento o proyectos de investigación como alternativa evaluativa',
      'Flexibilidad para aceptar procedimientos propios correctos aunque difieran del modelo',
      'Agrupamiento con pares de nivel similar en tareas evaluables cuando sea posible',
      'Reconocimiento curricular del trabajo de profundización realizado fuera del examen',
    ],
    examRedFlags: [
      'Exámenes exclusivamente memorísticos y reproductivos',
      'Tiempo claramente sobrante sin propuesta adicional alguna',
      'Penalización de métodos o procedimientos propios aunque sean correctos',
      'Ausencia total de reto: todas las preguntas al nivel mínimo del currículo',
      'Interpretar el aburrimiento resultante como problema de conducta',
    ],
    studies: [
      {
        title: 'What makes giftedness? Reexamining a definition',
        authors: 'Joseph S. Renzulli',
        year: 1978,
        journal: 'Phi Delta Kappan',
        url: 'https://scholar.google.es/scholar?q=Renzulli+What+makes+giftedness+Reexamining+a+definition',
        finding: 'Formula el modelo de los tres anillos: capacidad superior, creatividad e implicación en la tarea como componentes de la conducta superdotada.',
      },
      {
        title: 'Transforming gifts into talents: the DMGT as a developmental theory',
        authors: 'Françoys Gagné',
        year: 2004,
        journal: 'High Ability Studies',
        url: 'https://doi.org/10.1080/1359813042000314682',
        finding: 'Desarrolla el modelo diferenciador de dotación y talento: el don natural se transforma en talento mediante catalizadores y práctica deliberada.',
      },
      {
        title: 'Conceptions of Giftedness (2ª ed.)',
        authors: 'Robert J. Sternberg, Janet E. Davidson',
        year: 2005,
        journal: 'Cambridge University Press',
        url: 'https://doi.org/10.1017/CBO9780511610455',
        finding: 'Compila las principales concepciones científicas sobre la superdotación y sus implicaciones para la identificación y la educación.',
      },
    ],
    resources: [
      {
        name: 'Centro Huerta del Rey',
        url: 'https://centrohuertadelrey.com',
        description: 'Centro pionero en España en evaluación y atención de niños con altas capacidades (Valladolid).',
      },
      {
        name: 'MENSA España',
        url: 'https://mensa.es',
        description: 'Asociación de personas de alto CI con actividades y recursos para familias y docentes.',
      },
      {
        name: 'Programa ESTALMAT',
        url: 'https://estalmat.rac.es',
        description: 'Programa de la Real Academia de Ciencias para la detección y estímulo del talento matemático precoz.',
      },
    ],
  },

  'ansiedad': {
    slug: 'ansiedad',
    name: 'Ansiedad ante la evaluación',
    group: 'Otros Perfiles',
    icon: '😰',
    color: 'bg-[#6D28D9]',
    accentColor: '#6D28D9',
    prevalence: 'Hasta un tercio del alumnado la experimenta de forma significativa; 10–15% con interferencia grave',
    shortDescription:
      'Respuesta de activación intensa ante situaciones de evaluación que bloquea la recuperación de la información y degrada el rendimiento por debajo del nivel real del alumno.',
    fullDescription:
      'La ansiedad ante la evaluación (o ansiedad ante los exámenes) es una reacción específica de situación que combina un componente cognitivo —preocupación, pensamientos intrusivos tipo "voy a suspender", rumiación— y un componente emocional-fisiológico: taquicardia, sudoración, tensión muscular, náuseas y el conocido "blanco mental". El trabajo clásico de Moshe Zeidner la estableció como constructo propio, diferenciado de la ansiedad general, con efectos demostrados sobre el rendimiento académico.\n\nSu mecanismo es bien conocido: la preocupación ocupa memoria de trabajo que debería dedicarse a resolver las preguntas. La teoría control-valor de Reinhard Pekrun explica que cuanto más importante percibe el alumno el resultado y menos control siente sobre él, más intensa es la emoción negativa. El metaanálisis de von der Embse confirma una correlación negativa estable entre ansiedad evaluativa y rendimiento a lo largo de tres décadas de investigación. Fisiológicamente, la activación del eje HPA interfiere en la recuperación de memoria consolidada: el alumno sabe la respuesta antes y después del examen, pero no durante.\n\nEn la escuela se manifiesta con somatizaciones (dolor abdominal, vómitos, insomnio previo), absentismo los días de prueba, abandono de preguntas pese a conocerlas y un círculo vicioso potente: mal examen, más ansiedad para el siguiente, peor preparación emocional. Necesita clima de evaluación predecible y seguro, prácticas de regulación emocional y, en casos graves, intervención psicológica especializada.',
    impactInExams:
      'El patrón típico comienza con el bloqueo inicial: lee la primera pregunta, no accede a la respuesta pese a saberla, entra en pánico y la cascada se extiende al resto de la prueba. Comete errores tontos en preguntas fáciles, gestiona mal el tiempo (se atasca sin saltar a lo siguiente) y puede abandonar o entregar en blanco. La nota resultante está sistemáticamente por debajo de su nivel real de conocimiento, verificado en tareas cotidianas sin presión.\n\nEl contexto del examen modula intensamente el impacto: salas saturadas, cronómetro visible, comentarios amenazantes del profesorado o pruebas sorpresa disparan la respuesta ansiosa; la anticipación clara de estructura, duración y tipo de preguntas la reduce drásticamente. A diferencia de otros perfiles, aquí la barrera no está en el procesamiento sino en el estado emocional, lo que hace que los ajustes de condiciones —más que de contenido— sean especialmente eficaces.\n\nEl efecto de los ajustes es rápido y visible: alumnos que entregaban en blanco completan la prueba cuando conocen de antemano su estructura o pueden empezar por la pregunta que eligen. Reducir el peso de cada examen individual y repartir la calificación en varias evidencias disminuye la percepción de amenaza que dispara todo el ciclo ansioso.',
    adaptationsWeSeek: [
      'Anticipar siempre estructura, duración y tipo de preguntas del examen',
      'Posibilidad de realizar la prueba en sala apartada con menos personas',
      'Tiempo adicional sin cronómetro visible ni anuncios de tiempo restante',
      'Opción de comenzar por la pregunta que el alumno elija',
      'Desdramatizar la prueba: valor formativo, corrección diferida o segunda oportunidad',
      'Permitir agua, pausas breves y técnicas de regulación respiratoria',
    ],
    examRedFlags: [
      'Formato y contenido totalmente sorpresivo, sin anticipación previa',
      'Ambiente competitivo o comentarios amenazantes durante la prueba',
      'Cronómetro visible y avisos frecuentes del tiempo restante',
      'Una única prueba de altísimo peso que decide casi toda la calificación',
      'Lectura pública de notas o comparaciones entre alumnos',
    ],
    studies: [
      {
        title: 'Test Anxiety: The State of the Art',
        authors: 'Moshe Zeidner',
        year: 1998,
        journal: 'Plenum Press',
        url: 'https://scholar.google.es/scholar?q=Zeidner+Test+Anxiety+The+State+of+the+Art',
        finding: 'Obra de referencia que sistematiza la investigación sobre ansiedad evaluativa: componentes, causas, mecanismos e intervenciones.',
      },
      {
        title: 'The control-value theory of achievement emotions: Assumptions, corollaries, and implications for educational research and practice',
        authors: 'Reinhard Pekrun',
        year: 2006,
        journal: 'Educational Psychology Review',
        url: 'https://doi.org/10.1007/s10648-006-9029-9',
        finding: 'Explica las emociones académicas mediante el control percibido y el valor atribuido: base teórica de la ansiedad ante exámenes.',
      },
      {
        title: 'Test anxiety effects, predictors, and correlates: A 30-year meta-analytic review',
        authors: 'Nathaniel von der Embse, David Jester, Dhara Roy, Jasmine Post',
        year: 2018,
        journal: 'Journal of Affective Disorders',
        url: 'https://doi.org/10.1016/j.jad.2017.11.048',
        finding: 'Metaanálisis de tres décadas que confirma la relación negativa estable entre ansiedad evaluativa y rendimiento académico.',
      },
    ],
    resources: [
      {
        name: 'Salud Mental España',
        url: 'https://consaludmental.org',
        description: 'Confederación española de asociaciones de salud mental: recursos para jóvenes y familias.',
      },
      {
        name: 'Fundación ANAR',
        url: 'https://anar.org',
        description: 'Ayuda a niños y adolescentes en riesgo: línea gratuita y confidencial de apoyo psicológico.',
      },
      {
        name: 'Consejo General de la Psicología de España',
        url: 'https://www.cop.es',
        description: 'Localización de psicólogos colegiados especializados en infancia y adolescencia.',
      },
    ],
  },

  'tea': {
    slug: 'tea',
    name: 'Trastorno del espectro autista (TEA) - Nivel 1',
    group: 'Otros Perfiles',
    icon: '♾️',
    color: 'bg-[#0369A1]',
    accentColor: '#0369A1',
    prevalence: '1–2% de la población escolar (CDC 2023: 1 de cada 36 niños en EE. UU.)',
    shortDescription:
      'Condición del neurodesarrollo que afecta a la comunicación social y presenta necesidad de predictibilidad, intereses intensos y procesamiento sensorial atípico.',
    fullDescription:
      'El trastorno del espectro autista de nivel 1 (que requiere apoyo, correspondiente a los antiguos diagnósticos de síndrome de Asperger o autismo sin discapacidad intelectual) se caracteriza por dificultades persistentes en la comunicación e interacción social junto con patrones restrictivos de intereses y conductas. Estos alumnos tienen lenguaje fluido pero pragmática alterada: interpretan el lenguaje literalmente, les cuesta captar ironía, metáforas y dobles sentidos, y encuentran seguridad en rutinas, anticipación y predictibilidad.\n\nLas principales teorías cognitivas —coherencia central débil de Francesca Happé y Uta Frith (procesamiento centrado en detalles), alteraciones de flexibilidad ejecutiva y diferencias en teoría de la mente— explican tanto sus fortalezas (atención al detalle, memoria fidedigna, pensamiento lógico) como sus barreras (ambigüedad, cambios imprevistos, demandas sociales simultáneas). La prevalencia ha aumentado hasta cifras como 1 de cada 36 niños según la red ADDM de los CDC, reflejo principalmente de mejor detección.\n\nEn la escuela, estos alumnos rinden excelentemente con contenido estructurado, preciso y conectado con sus intereses intensos, que funcionan como palanca motivacional. Sufren con imprevistos, cambios de formato sin aviso, ambigüedad evaluativa y entornos sensorialmente aversivos. Son además especialmente vulnerables a ansiedad y acoso escolar. Con anticipación, lenguaje literal y condiciones sensoriales adecuadas, su rendimiento académico suele ser plenamente acorde —o superior— a su curso.',
    impactInExams:
      'Los enunciados ambiguos, metafóricos o irónicos bloquean a este alumno aunque domine el contenido: interpreta literalmente instrucciones indirectas ("comenta el texto" no le indica qué acción concreta se espera) y pierde tiempo intentando descifrar la intención de la pregunta. Los cambios de última hora —aula distinta, formato nuevo, tiempo modificado— elevan su ansiedad y degradan todo el desempeño posterior.\n\nLa sobrecarga sensorial (zumbido de fluorescentes, ruido de compañeros, gente moviéndose en el aula) consume recursos atencionales de forma invisible para el observador. En cambio, cuando la prueba se anticipa completamente —estructura, número de preguntas, duración, lugar—, el lenguaje es literal y preciso, y el entorno es tranquilo, este alumno rinde de forma estable y fiel a su capacidad real, frecuentemente por encima de la media.\n\nUn detalle frecuentemente pasado por alto: este alumno puede necesitar más tiempo no por lentitud sino por perfeccionismo y literalidad, revisando instrucciones una y otra vez buscando la acción exacta solicitada. Enunciar con precisión qué producto se espera —cuántas líneas, qué elementos debe contener la respuesta— elimina esa duda y acelera notablemente su ejecución.',
    adaptationsWeSeek: [
      'Lenguaje literal, preciso y sin ambigüedades en todos los enunciados',
      'Anticipación completa de estructura, duración, lugar y formato de la prueba',
      'Realización en sala tranquila con pocas personas',
      'Tiempo adicional sin presión temporal explícita',
      'Evitar ironía, dobles sentidos y preguntas de opinión forzada',
      'Permitir objeto regulador y pausas breves durante la prueba',
    ],
    examRedFlags: [
      'Enunciados figurados, irónicos o con dobles sentidos',
      'Cambios de aula, horario o formato comunicados sin antelación',
      'Salas ruidosas o sensorialmente saturadas',
      'Preguntas abiertas sin especificar qué se espera exactamente',
      'Instrucciones orales indirectas del tipo "ya sabéis lo que hay que hacer"',
    ],
    studies: [
      {
        title: 'Autism',
        authors: 'Meng-Chuan Lai, Michael V. Lombardo, Simon Baron-Cohen',
        year: 2014,
        journal: 'The Lancet',
        url: 'https://doi.org/10.1016/S0140-6736(13)61539-1',
        finding: 'Revisión semanal de referencia sobre etiología, diagnóstico y apoyo en el espectro autista.',
      },
      {
        title: 'Prevalence and characteristics of autism spectrum disorder among children aged 8 years — ADDM Network, 2020',
        authors: 'Matthew J. Maenner y cols. (CDC)',
        year: 2023,
        journal: 'MMWR Surveillance Summaries',
        url: 'https://doi.org/10.15585/mmwr.ss7202a1',
        finding: 'Establece la prevalencia del TEA en 1 de cada 36 niños de 8 años en EE. UU., con aumento sostenido atribuido a mejor detección.',
      },
      {
        title: 'The weak coherence account: detail-focused cognitive style in autism spectrum disorders',
        authors: 'Francesca Happé, Uta Frith',
        year: 2006,
        journal: 'Journal of Autism and Developmental Disorders',
        url: 'https://doi.org/10.1007/s10803-005-0039-0',
        finding: 'Formula el estilo cognitivo centrado en los detalles como rasgo explicativo transversal del espectro autista.',
      },
    ],
    resources: [
      {
        name: 'Autismo España',
        url: 'https://autismo.org.es',
        description: 'Confederación española de asociaciones de personas con TEA y sus familias.',
      },
      {
        name: 'AETAPI',
        url: 'https://aetapi.org',
        description: 'Asociación Española de Profesionales del Autismo: guías de buenas prácticas.',
      },
      {
        name: 'Ministerio de Educación y Formación Profesional',
        url: 'https://www.educacionyfp.gob.es',
        description: 'Recursos oficiales de apoyo educativo para alumnado con TEA.',
      },
    ],
  },

  'barreras-sensoriales': {
    slug: 'barreras-sensoriales',
    name: 'Barreras sensoriales (audición / visión)',
    group: 'Otros Perfiles',
    icon: '🦻',
    color: 'bg-[#A16207]',
    accentColor: '#A16207',
    prevalence: '1–2 por cada 1.000 nacimientos con hipoacusia grave; 0,1–0,5% del alumnado con baja visión o ceguera',
    shortDescription:
      'Alumnado con hipoacusia o baja visión que encuentra en el entorno —no en su capacidad— las principales barreras: formatos inaccesibles, canales únicos y tiempos no ajustados.',
    fullDescription:
      'Desde el modelo social de la discapacidad, las barreras sensoriales no residen en el alumno sino en la interacción entre su forma de percibir y un entorno diseñado para personas oyentes y videntes. El alumnado con hipoacusia abarca desde pérdidas leves hasta profundas; muchos usan audífonos o implantes cocleares, algunos se comunican en lengua de signos española (LSE) y otros de forma oral con apoyos logopédicos. El alumnado con baja visión o ceguera emplea restos visuales, magnificación, braille o tiflotecnología según su situación funcional.\n\nLos datos epidemiológicos muestran que la hipoacusia congénita grave afecta a 1–2 por cada 1.000 nacimientos, detectada hoy mayoritariamente mediante cribado neonatal, mientras que las deficiencias visuales graves son menos frecuentes pero de gran impacto funcional. Los informes mundiales de la OMS sobre audición (2021) y visión (2019) subrayan que la mayoría de estas situaciones puede participar plenamente en entornos educativos ordinarios si se eliminan las barreras de acceso.\n\nEn el aula, estos alumnos sufren fatiga por el sobreesfuerzo constante de escucha (lectura labial, uso intensivo de atención) o de visión. Necesitan acceso visual a toda información oral (subtítulos, transcripciones, intérprete de LSE), materiales con buen contraste e iluminación, descripción textual de imágenes y tiempos ajustados cuando acceden en braille o formato ampliado. Con acceso equivalente, su rendimiento es indistinguible del de sus compañeros.',
    impactInExams:
      'Un examen con audio inaudible, imágenes imprescindibles sin descripción, fotocopias de bajo contraste o instrucciones dadas solo de viva voz resulta directamente inaccesible: el problema no es el conocimiento del alumno sino el formato de la prueba. Cuando el canal de acceso falla, ni siquiera se evalúa el contenido, se evalúa la barrera.\n\nAdemás, los tiempos estándar están calculados para lectura visual convencional: leer en braille o mediante magnificación requiere significativamente más tiempo porque reduce el campo visual útil por fijación. Sin transcripciones, descripciones alternativas, formatos accesibles y tiempo ajustado, la nota mide la discapacidad y no el aprendizaje. Con acceso equivalente garantizado, estos alumnos demuestran exactamente los mismos niveles de competencia que el resto del grupo.\n\nLa accesibilidad debe planificarse antes de la prueba, no improvisarse durante: preparar transcripciones, descripciones y formatos alternativos exige coordinación previa con los profesionales de apoyo. Un examen accesible beneficia además a todo el grupo, porque los principios de diseño universal —contraste, claridad, redundancia de canales— mejoran la legibilidad y comprensión para cualquier alumno.',
    adaptationsWeSeek: [
      'Formatos accesibles: braille, macrotipos, alto contraste o digital compatible con lectores de pantalla',
      'Transcripción o subtítulos obligatorios para cualquier contenido de audio',
      'Descripción textual de imágenes, gráficos y diagramas imprescindibles',
      'Tiempo ampliado proporcional al formato de acceso utilizado',
      'Ubicación con buena iluminación, acústica y visibilidad durante la prueba',
      'Intérprete de lengua de signos o apoyo tiflotécnico cuando proceda',
    ],
    examRedFlags: [
      'Audios de baja calidad sin transcripción disponible',
      'Imágenes o gráficos imprescindibles sin descripción alternativa',
      'Fotocopias de bajo contraste o escaneados ilegibles',
      'Tiempo estándar para pruebas leídas en braille o formato ampliado',
      'Instrucciones transmitidas únicamente de forma oral sin apoyo visual',
    ],
    studies: [
      {
        title: 'World Report on Hearing',
        authors: 'Organización Mundial de la Salud',
        year: 2021,
        journal: 'OMS',
        url: 'https://www.who.int/publications/i/item/9789240020481',
        finding: 'Informe mundial que cuantifica la pérdida auditiva y establece recomendaciones de acceso comunicativo en entornos educativos.',
      },
      {
        title: 'World Report on Vision',
        authors: 'Organización Mundial de la Salud',
        year: 2019,
        journal: 'OMS',
        url: 'https://www.who.int/publications/i/item/9789241516570',
        finding: 'Panorama global de la salud visual con directrices para garantizar la participación educativa plena del alumnado con baja visión.',
      },
      {
        title: 'Prevalence of permanent childhood hearing impairment in the United Kingdom and comparison with three previous studies',
        authors: 'Heather M. Fortnum y cols.',
        year: 2001,
        journal: 'BMJ',
        url: 'https://doi.org/10.1136/bmj.323.7312.536',
        finding: 'Estudio epidemiológico de referencia que sitúa la hipoacusia infantil permanente en torno a 1–2 por cada 1.000 nacimientos.',
      },
    ],
    resources: [
      {
        name: 'CNSE',
        url: 'https://cnse.es',
        description: 'Confederación Estatal de Personas Sordas: recursos lingüísticos y de accesibilidad.',
      },
      {
        name: 'FIAPAS',
        url: 'https://fiapas.es',
        description: 'Confederación Española de Familias de Personas Sordas: apoyo educativo y logopédico.',
      },
      {
        name: 'ONCE',
        url: 'https://www.once.es',
        description: 'Organización Nacional de Ciegos Españoles: tiflotecnología, braille y apoyo educativo.',
      },
    ],
  },

  'multidiscapacidad': {
    slug: 'multidiscapacidad',
    name: 'Multidiscapacidad / Plurideficiencia',
    group: 'Otros Perfiles',
    icon: '♿',
    color: 'bg-[#374151]',
    accentColor: '#374151',
    prevalence: 'Estimada entre el 0,5% y el 2% del alumnado (plurideficiencia grave)',
    shortDescription:
      'Combinación de discapacidad intelectual grave con discapacidad motórica y/o sensorial que requiere apoyos generalizados, comunicación aumentativa y evaluación totalmente individualizada.',
    fullDescription:
      'La multidiscapacidad o plurideficiencia combina una discapacidad intelectual grave o profunda con discapacidades motóricas y/o sensoriales significativas. Según el marco conceptual de Henk Nakken y Carla Vlaskamp, hablamos de alumnos cuya afectación intelectual impide la autonomía en múltiples áreas de la vida diaria y coexiste con alteraciones motoras (frecuentemente parálisis cerebral), sensoriales (ceguera, sordera) o ambas. Cada alumno presenta una configuración única de capacidades, formas de comunicación y necesidades de apoyo.\n\nA las limitaciones funcionales se suman con frecuencia condiciones de salud asociadas: epilepsia, dificultades alimentarias, problemas respiratorios y posturales, documentadas por los estudios de Zijlstra y Vlaskamp. Estos alumnos necesitan posicionamiento adecuado, productos de apoyo, medicación controlada y mediación constante de adultos. La comunicación es la prioridad absoluta: muchos utilizan sistemas aumentativos y alternativos de comunicación (SAAC) —tablas pictográficas, conmutadores, dispositivos con salida de voz— que requieren interlocutores formados.\n\nEn la escuela, este alumnado cursa una adaptación curricular significativa con objetivos funcionales e individualizados: comunicación funcional, autonomía personal, habilidades cognitivas básicas y participación social. La evaluación no puede ser comparativa ni estandarizada: debe centrarse en los logros personales respecto a sus propios objetivos, documentados mediante observación sistemática. Con apoyos adecuados, estos alumnos participan activamente del proceso de enseñanza-aprendizaje y demuestran progresos reales y medibles.',
    impactInExams:
      'Los exámenes ordinarios resultan totalmente inaccesibles para este perfil y no miden nada: ni contenidos (que pertenecen a otra programación) ni formato de respuesta (que exige escritura convencional) ni condiciones (que ignoran posicionamiento, comunicación y ritmo). Aplicarlos constituye una barrera ilegal además de pedagógicamente absurda.\n\nLa evaluación pertinente deriva directamente de su adaptación curricular individualizada: objetivos comunicativos, cognitivos funcionales y de autonomía, valorados mediante observación sistemática, sistemas de respuesta accesibles (señalar con mirada, SAAC, conmutadores) y mediación adulta registrada. El reto del diseño es garantizar participación real evitando la sobreayuda: el alumno debe ser el autor de la respuesta, con el apoyo justo y documentado. Sesiones cortas, tiempos individualizados y materiales estables y adaptados completan el marco.\n\nCuando la evaluación funciona bien, aporta algo más que una nota: documenta progresos comunicativos y funcionales que orientan las decisiones educativas siguientes y ofrecen a las familias evidencias tangibles de desarrollo. Es, en este perfil, la herramienta pedagógica más valiosa de cuantas maneja el equipo docente.',
    adaptationsWeSeek: [
      'Evaluación basada exclusivamente en los objetivos de su adaptación curricular individualizada',
      'Sistemas de respuesta accesibles: SAAC, señalar, mirada, conmutadores',
      'Mediación del adulto permitida y registrada como parte del protocolo',
      'Tiempos individualizados y sesiones cortas distribuidas en varios días',
      'Materiales adaptados: alto contraste, táctiles, estables y posicionados correctamente',
      'Registro sistemático de observación en lugar de pruebas sumativas convencionales',
    ],
    examRedFlags: [
      'Aplicar el examen ordinario del grupo sin ninguna adaptación',
      'Evaluar contenidos fuera de su adaptación curricular individualizada',
      'Exigir respuesta escrita convencional sin sistema de comunicación alternativo',
      'Concentrar la evaluación en una única prueba sumativa',
      'Ausencia de sistema de comunicación o de registro de observación',
    ],
    studies: [
      {
        title: 'A need for a taxonomy for profound intellectual and multiple disabilities',
        authors: 'Henk Nakken, Carla Vlaskamp',
        year: 2007,
        journal: 'Journal of Policy and Practice in Intellectual Disabilities',
        url: 'https://doi.org/10.1111/j.1741-1130.2007.00104.x',
        finding: 'Establece el marco conceptual internacional de la plurideficiencia: discapacidad intelectual profunda más discapacidad motórica y/o sensorial.',
      },
      {
        title: 'The impact of medical health conditions in children with profound intellectual and multiple disabilities',
        authors: 'Heleen P. Zijlstra, Carla Vlaskamp',
        year: 2005,
        journal: 'Journal of Applied Research in Intellectual Disabilities',
        url: 'https://doi.org/10.1111/j.1468-3148.2005.00242.x',
        finding: 'Documenta la alta prevalencia de condiciones médicas asociadas (epilepsia, problemas posturales y alimentarios) en la plurideficiencia.',
      },
      {
        title: 'Informe Mundial sobre la Discapacidad',
        authors: 'Organización Mundial de la Salud, Banco Mundial',
        year: 2011,
        journal: 'OMS',
        url: 'https://www.who.int/publications/i/item/9789241564182',
        finding: 'Informe de referencia que fundamenta el modelo social de la discapacidad y la obligación de eliminar barreras en educación.',
      },
    ],
    resources: [
      {
        name: 'Plena Inclusión',
        url: 'https://plenainclusion.org',
        description: 'Confederación española de apoyo a personas con discapacidad intelectual o del desarrollo y sus familias.',
      },
      {
        name: 'Confederación ASPACE',
        url: 'https://aspace.org',
        description: 'Confederación española de entidades de atención a personas con parálisis cerebral.',
      },
      {
        name: 'CERMI',
        url: 'https://cermi.es',
        description: 'Comité Español de Representantes de Personas con Discapacidad: plataforma estatal de defensa de derechos.',
      },
    ],
  },
};
