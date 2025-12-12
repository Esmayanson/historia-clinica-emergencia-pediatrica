/* casoclinico.js
   - Renderizado de diagnósticos (lista con color de triaje)
   - Selección de diagnóstico (carga plantillas y colorea título de órdenes)
   - Integración con construirAnamnesis (llama a la función que monta el texto dinámico)
   - Asegura que sólo la PRIMERA mención de tiempo de evolución sea modificada automáticamente.
*/

/* =========================
   Carga parcial / templates
   (Se mantienen las presentaciones y órdenes en este archivo para facilitar edición)
   -- Las plantillas están escritas con frases que contienen los patrones que nuestras funciones
      reconocerán ("hace X ... de evolución", "Por tal motivo es traída a este centro de salud.", etc.)
*/

const dataInformes = {
  "ALERGIAS": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que hace 24 horas de evolución, comenzó con prurito intenso generalizado y lesiones eritematosas en cara, tronco y extremidades, que no ceden con el uso de Cetirizina en casa.",
        evolucion_ordenes: "Se recibe en sala de emergenci paciente Afebril, eupneico, adolorido, quejumbroso, agitado, con prurito intenso y lesiones jabonosas con eritema en todo el cuerpo. \n\nÓrdenes Médicas (Indicaciones): \n* Canalizar con Solución Salina al 0.9% y mantener vía permeable. \n* Medicar con Fendramin EV como antialérgico. \n* Medicar con Hidrocortisona EV como antiinflamatorio. \n* Revalorar. \n\nNota adicional de manejo: Se administró Adrenalina subcutánea (0.2 cc y 0.1cc IM) debido al aumento del cuadro de inflamación y dificultad para deglutir, a pesar del manejo inicial con esteroides.",
    },
    "CAIDA": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente se encontraba estable hasta presentar caída de la cama, provocando dolor, irritabilidad, edema y hematoma en la región frontal de 2 horas de evolución",
        evolucion_ordenes: "Se recibe hipoactivo, eupneico, afebril, con mucosa oral seca, saliva espesa, lengua saburral, palidez marcada, debilidad, dolor, edema y hematoma frontal. \n\nÓrdenes Médicas (Indicaciones): \n* Canalizar con Solución Salina al 0.9% y mantener vía permeable. \n* Realizar Hemograma completo para valorar biometría hemática. \n* Monitoreo cardíaco y de SpO2 continuo. \n* Realizar TAC de Cráneo simple de urgencia (descartar fracturas o hemorragias intracraneales). \n* Administrar Acetaminofén o Ibuprofeno EV para el dolor. \n* Observación en sala monitorizada y revaloración neurológica seriada (cada hora) por 12 horas.",
    },
    "CUERPO EXTRAÑO EN VÍA AÉREA / ASPIRACIÓN": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente se encontraba comiendo maní hace aproximadamente 15 minutos de evolución y, de forma súbita, comenzó con dificultad respiratoria extrema, tos inefectiva, cianosis perioral y no podía emitir sonidos. La madre realizó la maniobra de Heimlich sin éxito parcial. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente ansioso, agitado, con cianosis perioral y signos de agotamiento respiratorio. Presenta estridor audible y tos débil. A la auscultación pulmonar, se encuentra murmullo vesicular disminuido de forma asimétrica, con mayor disminución en hemitórax derecho.\nSe ordena:\n* Maniobras de Desalojo Inmediatas (Heimlich o Palmadas en espalda si es menor, o Heimlich si es mayor).\n* Administrar Oxígeno al 100% por mascarilla con reservorio.\n* Canalizar vía periférica rápidamente con solución salina al 0.9% ev\n* Rx de Tórax y Cuello AP/ Lateral (para intentar localizar el objeto, si es radiopaco).\n* Coordinar el Traslado a UCI Pediátrica para manejo avanzado o intubación, si hay falla inminente.",
    },
    "BRONQUIOLITIS AGUDA": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente comenzó hace 4 días de evolución con síntomas de resfriado común. Hace aproximadamente 24 horas, la tos se volvió más persistente y se agregó dificultad respiratoria, notando la madre que respiraba más rápido y con un \"silbido\" en el pecho. Mantiene la fiebre controlada con Paracetamol oral. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente despierto, irritable, taquipneico. Se observa tiraje subcostal y aleteo nasal leve. A la auscultación, sibilancias espiratorias bilaterales (difusas) y crepitantes finos en bases pulmonares. T:37.9° C.\nSe ordena:\n* Colocar Oxígeno suplementario por cánula nasal para mantener SpO 2: 94%.\n* Aspiración suave de secreciones nasales.\n* Administrar Paracetamol EV para la fiebre.\n* Rx de Tórax AP y Lateral (para descartar neumonía o hiperinsuflación marcada).\n* Panel Viral Respiratorio (si está disponible y es relevante para el manejo).\n* No se recomienda Salbutamol (evidencia limitada en este grupo, se puede dar prueba terapéutica bajo supervisión).\n* Fisioterapia respiratoria.\n* Dejar bajo Observación en Sala Pediátrica hasta estabilidad respiratoria.",
    },
    "CEFALEA": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que la paciente inició hace 6 horas de evolución con cefalea holocraneana, descrita como pulsátil y de intensidad 8/10 Escala del dolor. La madre refiere que la niña se queja de fotofobia y presentó un episodio de vómito hace una hora. La paciente se muestra irritable y prefiere estar acostada en una habitación oscura. Niega fiebre o rigidez de cuello. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente consciente, orientada, quejumbrosa. Afebril. Al examen físico, mucosas húmedas. No hay signos de rigidez nucal. El dolor de cabeza es evidente y la niña se tapa los ojos. Resto del examen neurológico es normal\nSe ordena:\n* Reposo en un ambiente tranquilo y oscuro.\n* Canalizar vía periférica con Solución Salina al 0.9% (SS 0.9%) y mantener vía permeable.\n* Administrar Ibuprofeno EV o Ketorolaco EV como analgésico.\n* Administrar Dramidon EV (antiemético) para el vómito.\n* Hemograma para valorar biometría hematica\n* Dejar bajo Observación hasta la mejoría de la sintomatología.",
    },
    "CONVULSIÓN FEBRIL": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente se encontraba estable hasta hace 30 minutos de evolución, cuando la madre notó un aumento súbito de la temperatura corporal. Minutos después, presentó un episodio de movimientos tónico-clónicos generalizados de aproximadamente 2 minutos de duración, con desviación de la mirada y pérdida del conocimiento. El episodio cedió espontáneamente. A la llegada a la emergencia, el paciente está en periodo post-crisis. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente en periodo post-ictal, somnoliento, pero con respuesta a estímulos dolorosos/verbales. Mucosa oral seca. Al examen neurológico: sin focalización motora. El resto del examen físico no revela foco infeccioso claro.\nSe ordena:\n* ABC (Asegurar vía aérea).\n* Canalizar vía periférica con Solución Salina al 0.9% y mantener vía permeable.\n* Medicación de Rescate: Tener Diazepam EV listo para administrar si hay recurrencia o progresión.\n* Administrar Paracetamol EV o Neomelubrina EV como antipirético.\n* Medios físicos.\n* Hemograma completo para valorar biometría hematica\n* Glicemia para valorar glucosa en sangre\n* Examen de Orina para descartar IVU\n* Dejar bajo Observación Estricta en Sala de Emergencia Pediátrica.",
    },
    "CRISIS ASMÁTICA / BRONCOESPASMO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que El paciente se encontraba estable hasta hace 3 horas de evolución, cuando inició con disnea y sensación de opresión torácica luego de jugar. La madre notó el uso de músculos accesorios y un silbido al respirar. Usó el Salbutamol de rescate una vez sin mejoría. Niega fiebre o síntomas de infección. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente irritable, disneico y taquicárdico. Se observa tiraje intercostal y subcostal marcado. A la auscultación, murmullo vesicular disminuido globalmente, con sibilantes espiratorios difusos intensos.\nSe ordena:\n* Colocar Oxígeno suplementario (mantener SpO 2: 94%).\n* Canalizar vía periférica con Solución Salina al 0.9%. Para mantener vía permeable\n* Nebulización con Salbutamol 2.5 mg + Bromuro de Ipratropio 0.5 mg cada 20 minutos por 3 dosis.\n* Administrar Hidrocortisona EV o Dexametasona EV/ IM. para controlar la inflamación bronquial y evitar el empeoramiento del cuadro, complementando el efecto de los broncodilatadores de acción rápida\n* Rx de Tórax AP (descartar neumotórax o neumonía).\n* Revalorar después de las 3 dosis. Si no hay mejoría, considerar Sulfato de Magnesio EV y/o nebulización continua.\n* Dejar en Observación Estricta.",
    },
    "DESHIDRATACIÓN": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que La paciente ha tenido un cuadro de diarrea y vómitos severos durante 2 días de evolución. La madre refiere que ha orinado muy poco en las últimas 12 horas, está muy decaída, somnolienta, y rechaza completamente los líquidos orales. Ha perdido peso visiblemente. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente hipoactiva, con tendencia al sueño, muy irritable al manipular. TA límite inferior. Mucosas orales muy secas, ojos hundidos, pliegue cutáneo positivo (lento). Llenado capilar de 4 segundos.\nSe ordena:\n* Canalizar 2 vías periféricas. Con solución salina al 0.9% ev\n* Iniciar Bolos de Resucitación con Solución Salina al 0.9%, 20 ml/EV en 15-20 minutos. Repetir si es necesario hasta mejorar el estado hemodinámico.\n* Monitorización cardíaca continua y control de la diuresis.\n* Hemograma para valorar biometría hemática\n* Glicemia para valorar glicemia en sangre\n* Traslado a UCI Pediátrica para manejo de líquidos y electrolitos.\n* Corregir causa de base (Gastroenteritis).",
    },
    "DOLOR ABDOMINAL AGUDO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que El paciente comenzó hace 12 horas de evolución con dolor periumbilical (alrededor del ombligo) de leve intensidad. Hace 4 horas, el dolor se intensificó y se localizó en el cuadrante inferior derecho (FID). Ha presentado un episodio de vómito. Niega diarrea, pero no quiere caminar por el dolor. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente quejumbroso, cojeando al caminar. Afebril inicialmente, pero hipertermia presente. Al examen físico, abdomen blando, pero con dolor intenso a la palpación en FID. Signos de rebote y defensa muscular en FID (signos de irritación peritoneal) y signo de McBurney positivo.\nSe ordena:\n* NPO (Nada por vía oral).\n* Canalizar vía periférica con Solución Salina al 0.9 %.\n* Administrar Sentrol Compuesto o Ketorolaco EV para el dolor.\n* Hemograma (para valorar leucocitosis con neutrofilia).\n* Examen de Orina (EGO) (descartar ITU).\n* Sonografía Abdominal (para valorar el apéndice y descartar otras causas).\n* Interconsulta Urgente con Cirugía Pediátrica.",
    },
    "EPISODIO PAROXÍSTICO NO EPILÉPTICO (ALTE)": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que El paciente presentó un episodio mientras dormía hace 4 horas de evolución. La madre lo encontró pálido, hipotónico, y no respondía al llamado. Ella lo estimuló vigorosamente y el paciente \"despertó\", tosió, y regresó a su estado normal. El episodio duró menos de 1 minuto. Actualmente está asintomático. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente despierto, activo, alerta, con examen físico completamente normal. Auscultación pulmonar y cardíaca sin alteraciones. Examen neurológico normal.\nSe ordena:\n* Monitorización cardíaca y SpO 2 continua durante la observación.\n* ECG (Electrocardiograma) y Ecocardiograma (descartar arritmias o cardiopatía).\n* EEG (Electroencefalograma) de urgencia (descartar actividad epiléptica).\n* Hemograma para valorar biometría hemática\n* Dejar bajo Observación Estricta en sala monitorizada para registrar cualquier evento recurrente.\n* Interconsulta con Neurología Pediátrica y/o Cardiología Pediátrica.",
    },
    "FARINGOAMIGDALITIS AGUDA": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente inició hace 2 días de evolución con fiebre alta que cede parcialmente con antipiréticos. Hace 1 día se agregó odinofagia tan intensa que le dificulta la ingesta de líquidos. Presenta mal aliento. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente quejumbrosa por dolor. Eupneica. Al examen de la garganta, se observan Amígdalas hipertróficas e hiperémicas con exudado blanquecino. Adenopatías cervicales anteriores dolorosas.\nSe ordena:\n* Administrar Paracetamol EV o Neomelubrina EV para dolor y fiebre.\n* Test Rápido para Streptococcus Grupo A.\n* Hemograma para valorar biometría hemática\n* Fomentar líquidos fríos.\n* Dejar en Observación hasta el control de la fiebre.",
    },
    "GASTROENTERITIS AGUDA (GEA)": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que El paciente inició hace 3 días de evolución con diarrea (10 deposiciones líquidas en las últimas 24 horas), acompañada de vómitos (4 episodios) y fiebre. La madre refiere que ha orinado muy poco y está muy decaído. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente hipoactivo, febril. Signos evidentes de deshidratación moderada (mucosas secas, ojos hundidos, pliegue cutáneo lento. Abdomen blando, depresible, dolor leve difuso.\nSe ordena:\n* Canalizar vía periférica con Solución Salina al 0.9% para mantener vía permeable\n* Administrar Dramidon EV (antiemético).\n* Paracetamol EV para la fiebre.\n* Coprológico para descartar infección y/o parasitosis\n* Hemograma, para valorar biometría hemática\n* Iniciar SRO (Sales de Rehidratación Oral) fraccionada una vez que el vómito ceda.\n* Dejar bajo Observación hasta la mejoría de los signos de deshidratación.",
    },
    "HERIDAS CORTANTES / LACERACIONES": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente sufrió un corte en la mano derecha hace 1 hora de evolución con un trozo de vidrio roto en el patio. Presenta sangrado activo y dolor. La herida es visiblemente profunda. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente llorando, sangrado activo en la región palmar de la mano derecha. Laceración de aproximadamente 3 cm de longitud, con bordes limpios, pero que atraviesa la dermis. Examen de sensibilidad y movimiento digital distal son normales (no hay lesión nerviosa o tendinosa aparente).\nSe ordena:\nManejo de la Herida:\n* Anestesia local con Lidocaína 2%. sc\n* Asepsia y Antisepsia y Lavado profuso de la herida.\n* Exploración para descartar cuerpo extraño.\n* Cierre primario con sutura no absorbible (Nylon 5.0).\nControl Sintomático:\n* Administrar Ibuprofeno oral o EV para manejo del dolor.\nProfilaxis Antitetánica:\n* Adiministrar vacuna tetánica Ganmaglobulina humana tetánica, como refuero tetánico\nManejo General:\n* Gasa estéril, venda estéril y elevación de la extremidad.\n* Indicaciones de cuidado de herida y retiro de puntos.",
    },
    "ITU / PIELONEFRITIS": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente inició hace 2 días de evolución con fiebre alta que no cede. Hace 1 día comenzó a quejarse de dolor en la espalda baja y ardor al orinar, con micciones más frecuentes. No ha presentado vómitos o diarrea. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente febril, quejumbrosa. Mucosa oral reseca. Dolor a la palpación profunda en la región suprapúbica y puñopercusión positiva en ambas fosas lumbares (indicativo de Pielonefritis). Abdomen blando, sin irritación peritoneal.\nSe ordena:\n* Canalizar vía periférica con Solución Salina al 0.9%. Para mantener vía permeable\n* Administrar Paracetamol EV o Neomelubrina EV para la fiebre.\n* Examen de Orina para descartas infección vía urinaria\n* Hemograma para valorar biometría hemática\n* Dejar en Observación para control de fiebre y asegurar la respuesta inicial al antibiótico IV.\n* Iniciar Antibiótico EV de amplio espectro (ej. Ceftriaxona) de inmediato debido a la fiebre y la sospecha de Pielonefritis.",
    },
    "IRA SIN NEUMONÍA": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente inició hace 3 días de evolución con síntomas de rinorrea hialina y congestión nasal. Hace 24 horas agregó fiebre y tos productiva. No hay dificultad respiratoria, vómito o diarrea. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente activa, alerta, con congestión nasal evidente. Eupneica. A la auscultación pulmonar, murmullo vesicular presente y simétrico. Se escuchan algunos roncus que desaparecen con la tos. Faringe ligeramente hiperémica.\nSe ordena:\n* Paracetamol oral o EV para la fiebre y el malestar.\n* Lavados nasales con Solución Salina 0.9% para la congestion.\n* Hemograma para valorar biometría hemática\n* Fomentar la ingesta de líquidos.\n* Alta con instrucciones para seguimiento en casa y signos de alarma (dificultad respiratoria, fiebre persistente).",
    },
    "INGESTA CUERPO EXTRAÑO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente estaba jugando con monedas hace aproximadamente 1 hora de evolución y, de repente, comenzó a llorar, a babear excesivamente (sialorrea) y a quejarse de dolor en el pecho. No presenta tos ni dificultad respiratoria. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia Paciente consciente, angustiada, con sialorrea constante. El examen cardiopulmonar es normal, sin estridor ni sibilancias. Abdomen blando. El examen orofaríngeo no revela el objeto.\nSe ordena:\n* Nada por VO.\n* Canalizar vía periférica con solución salina 0.9% para mantener vía permeable\n* Solicitar Radiografía de Tórax y Abdomen (AP y Lateral) para localizar el objeto\n* Si el objeto está en el esófago, interconsulta con Cirugía para extracción endoscópica en quirófano.\n* Si el objeto pasó al estómago y no es peligroso, Observación para que el objeto sea eliminado por las heces.",
    },
    "INTOXICACIÓN POR TÓXICOS": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el encontró al paciente hace 45 minutos de evolución con un frasco de pastillas de su abuela (Hipertensivos) abierto y vacío parcialmente. El paciente está somnoliento y presentó un episodio de vómito de contenido desconocido. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente hipoactivo, con tendencia al sueño (Letárgico). Afebril. Auscultación pulmonar normal. Examen neurológico: respuesta lenta a estímulos.\nManejo de Emergencia (Asegurar ABC):\n* Protección de la vía aérea (riesgo de aspiración).\n* Canalizar con solución\n* Monitoreo cardíaco y de SpO 2 continuo.\n* Administrar Carbón Activado por SNG (Sonda Nasogástrica) si no hay contraindicación (ej. convulsiones inminentes) y si está dentro de la \"ventana\" de absorción (idealmente < 1 hora).\n* Hemograma, Electrolitos, Función Hepática y Renal para valorar biometría hemática\n* Gases Arteriales (para valorar acidosis).\n* Coordinar el Traslado a UCI Pediátrica para soporte hemodinámico y ventilatorio.",
    },
    "INTOXICACIÓN POR ALCOHOL": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente ingirió accidentalmente una cantidad no determinada de una bebida alcohólica hace aproximadamente 1 hora de evolución. Inició con vómitos y se puso somnoliento y torpe al caminar. Niega otras ingestas o traumas. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente somnoliento, desorientado, con aliento alcohólico evidente. Pálido. Pupilas reactivas. El examen neurológico muestra ataxia. Abdomen blando y depresible. \nSe ordena:\n* Protección de la vía aérea\n* Administrar solución salina 0.9% EV (para prevenir o tratar hipoglucemia).\n* Se ordena realizar Hemograma, Glicemia para valorar biometría hemática y glucosa en sangre\n* Dejar bajo Observación Estricta y monitoreo continuo hasta la recuperación completa.\n* Se hace el llamado y reporte a salud pública de este caso.",
    },
    "LARINGITIS AGUDA (CRUP)": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente comenzó hace 2 días de evolución con síntomas de resfriado. Hace pocas horas desarrolló una tos perruna (tos de foca), áspera, que empeora por las noches. La madre nota que tiene un estridor (ruido agudo al inspirar) evidente al llorar o agitarse. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente ansioso, sentado, con la tos perruna característica. Se escucha un estridor inspiratorio audible. Ligeros tirajes suprasternales al inspirar profundamente.\nSe ordena:\n* Colocar Oxígeno si SpO 2 < 92%.\n* Administrar Dexametasona IM o EV para reducir la inflamación y mejorar la respiración.\n* Nebulización con Adrenalina Racémica (o L-Adrenalina) al 1:1000 (dosis según protocolo) para reducir el edema de la vía aérea.\n* Dejar bajo Observación al menos 2-3 horas después de la Adrenalina (riesgo de efecto rebote).\n* Alta si tolera el alta y no presenta estridor en reposo.",
    },
    "NEUMONÍA": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente lleva 3 días con fiebre alta que no cede. Hace 1 día de evolución comenzó con tos productiva y dificultad respiratoria (la madre nota que respira más rápido). Refiere dolor torácico al toser. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente febril, taquipneica. Se observa tiraje intercostal leve. A la auscultación, disminución del murmullo vesicular en la base pulmonar derecha y crepitantes localizados en la misma zona.\nSe ordena:\n* Colocar Oxígeno suplementario por mascarilla (para mantener SpO 2: 94%).\n* Canalizar vía periférica con Solución Salina al 0.9%. Para mantener vía permeabla\n* Administrar Paracetamol EV o Neomelubrina EV para la fiebre.\n* Rx de Tórax AP y Lateral (para confirmar infiltrado, consolidación o derrame).\n* Hemograma, para valorar biometría hemática",
    },
    "OTITIS MEDIA AGUDA (OMA)": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente comenzó hace 2 días de evolución con un resfriado común. Hace 12 horas comenzó a quejarse de dolor intenso en el oído derecho (otalgia) que empeora al acostarse. Ha estado irritable y con fiebre leve. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente irritable, quejándose del oído. Eupneico. Al examen con otoscopio, el tímpano derecho está abombado, eritematoso y con pérdida del cono de luz (signos de Otitis Media Aguda). Tímpano izquierdo normal. Faringe ligeramente hiperémica.\nSe ordena:\n* Administrar Paracetamol ev o Ibuprofeno oral (analgésico y antiinflamatorio) en dosis de carga.\n* Manejo ambulatorio (alta) si el dolor y la fiebre se controlan y la ingesta es adecuada.\n* Indicaciones de revaloración si el dolor persiste o hay secreción por el oído.\n* Referido a consulta de otorrinonaringía",
    },
    "POLITRAUMATISMO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente fue atropellado por un vehículo hace 45 minutos de evolución. Presentó pérdida de conocimiento transitoria en el sitio. Se queja de dolor en la pierna derecha y tiene múltiples excoriaciones y sangrado. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente alerta, agitado, con el collarín cervical ya colocado. Presenta excoriaciones faciales. Dolor y deformidad evidente en la extremidad inferior derecha (sospecha de fractura de fémur). Abdomen distendido y doloroso a la palpación.\nSe ordena:\n* Asegurar Vía Aérea y Control Cervical.\n* Administrar Oxígeno al 100%.\n* Canalizar 2 Vías Periféricas de calibre grueso.\n* Iniciar Bolos de Solución Salina al 0.9%\n* FAST (Ecografía Abdominal Focalizada) de urgencia (para descartar líquido libre/sangrado).\n* Rx de Columna Cervical, Tórax y Pelvis. Para valorar estado óseo y descartar fracturas\n* Control del sangrado externo y férula de tracción para la posible fractura de fémur.\n* Interconsulta Urgente con Cirugía, Ortopedia y Neurocirugía.\n* Coordinar el Traslado a Sala de Trauma o UCI Pediátrica.",
    },
    "QUEMADURAS": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente se quemó la parte frontal del muslo izquierdo hace 30 minutos de evolución con agua caliente mientras jugaba en la cocina. Presenta dolor intenso, enrojecimiento y ampollas. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente llorando de dolor. Se observa una lesión en la cara anterior del muslo izquierdo, de aproximadamente 5% de la Superficie Corporal Total. La lesión es roja, húmeda y presenta algunas ampollas intactas. No hay signos de compromiso respiratorio.\nSe ordena:\n* Administrar dolketol ev para el dolor severo.\n* Canalizar con solución salina al 0.9% para mantener vía permeable\n* Lavado con Solución Salina estéril y cubrir con casas húmedas y estériles (retirar la ropa).\n* Aplicar Sulfadiazina de Plata y vendaje estéril no adherente.",
    },
    "RASH ALERGIA A MEDICAMENTO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que 3 horas de evolución después de tomar la tercera dosis del antibiótico, el paciente comenzó con picazón intensa y la aparición de ronchas rojas generalizadas que rápidamente se extendieron por el tronco, la cara y las extremidades. Niega dificultad para respirar o hinchazón facial. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente despierto, ansioso por la picazón. La piel presenta urticaria y angioedema leve en los labios. No hay estridor, ni sibilancias, ni compromiso hemodinámico. Auscultación cardiopulmonar normal \nSe ordena:\n* Administrar solución salina 0.9% para mantener vía permeable\n* Suspender de inmediato el medicamento sospechoso.\n* Administrar Clorfenamina EV o Difenhidramina EV (como antihistamínico).\n* Administrar Metilprednisolona EV o IM (como corticoesteroide).\n* Observación para descartar una progresión a anafilaxia.",
    },
    "SÍNDROME FEBRIL SIN FOCO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente lleva 2 días de evolución con fiebre alta que cede parcialmente al antipirético. La madre niega tos, vómito, diarrea, disuria o cualquier otro síntoma. El niño está irritable cuando tiene fiebre, pero activo cuando está afebril. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente febril, pero activo cuando se encuentra estimulado. Mucosa oral ligeramente reseca. Faringe, oídos y auscultación pulmonar son completamente normales. No hay dolor abdominal, ni signos de ITU.\nSe ordena:\n* Administrar Paracetamol EV o Neomelubrina EV para la fiebre.\n* Hemograma para valorar biometría hemática\n* Examen de Orina para descartar infección de vía urinaria\n* Dejar bajo Observación.\n* Revaloración exhaustiva una vez que la fiebre haya cedido.",
    },
    "TCE LEVE A MODERADO": {
        presentacion: "Paciente femenina de 5 años, con antecedentes mórbido conocido negado, alergia negada, viene en compañía de su madre el cual refiere que el paciente sufrió una caída desde un muro de 1.5 metros hace 1 hora de evolución, golpeándose la región occipital. Lloró de inmediato, se queja de cefalea intensa. Por tal motivo es traída a este centro de salud.",
        evolucion_ordenes: "Se recibe en emergencia paciente consciente, pero somnolienta e irritable. Se observa hematoma en región occipital. Examen neurológico: Pupilas isocóricas y reactivas. No hay focalización motora evidente.\nSe ordena:\n* Nada por vía oral\n* Inmovilización del cuello hasta descartar lesión\n* Canalizar vía periférica con solución salina 0.9 % para mantener via permeable\n* TAC de Cráneo simple de urgencia\n* Administrar Dramidon EV (antiemético).\n* Administrar Acetaminofén EV o Ibuprofeno EV para la cefalea.\n* Observación Estricta en sala monitorizada y revaloración neurológica seriada (cada hora).\n* Ingreso hospitalario si el TAC es positivo o el GCS no mejora",
    },
"DIAGNOSTICO NO INCLUIDO EN DATA": {
        presentacion: "Los detalles de la Presentación no están incluidos en el historial.",
        evolucion_ordenes: "La Evolución no está detallada en el historial. \n\nÓrdenes Médicas (Indicaciones): \n* Pendiente de órdenes...",
    }
};

/* =========================
   Inicializa la lista de diagnósticos en la UI
   - Añade clases de triage basadas en DIAG_Triage (data.js)
*/
function inicializarDiagnosticos() {
  const list = safeGet("diagnosesList");
  if (!list) return;

  list.innerHTML = "";

  Object.keys(dataInformes).forEach(key => {
    const li = document.createElement("li");
    li.innerText = key;
    li.setAttribute('data-key', key);

    // Aplicar color de triaje
    const triageName = DIAG_Triage[key] || "VERDE";
    const triageClass = TRIAGE[triageName] || TRIAGE["VERDE"];
    li.classList.add(triageClass);

    li.addEventListener("click", () => selectDiagnosis(key, li));
    list.appendChild(li);
  });
}

/* =========================
   Seleccionar diagnóstico
   - setea estado, actualiza editor de evolución y presentación
   - colorea el título de las Órdenes de acuerdo al triaje
*/
function selectDiagnosis(key, liElement) {
  if (!dataInformes[key]) return;

  appState.currentDiagnosisKey = key;
  appState.currentOriginalPresentationTemplate = dataInformes[key].presentacion;
  appState.currentOriginalEvolutionTemplate = dataInformes[key].evolucion_ordenes;

  // actualizar UI
  const diag = safeGet("currentDiagnosis");
  const evo = safeGet("evolucion-ordenes-editor");
  const present = safeGet("presentacion-editor");
  const ordersTitle = safeGet("ordersTitle");

  if (diag) diag.innerText = key;
  if (evo) evo.innerText = dataInformes[key].evolucion_ordenes;
  if (present) present.innerText = dataInformes[key].presentacion;

  // colorear título de Órdenes según triaje del diagnóstico
  const triageName = DIAG_Triage[key] || "VERDE";
  const triageClass = TRIAGE[triageName] || TRIAGE["VERDE"];
  // remover clases previas y añadir la nueva (simple)
  ordersTitle.className = ""; // limpiar
  ordersTitle.classList.add(triageClass);
  ordersTitle.id = "ordersTitle"; // mantener id

  // Guardar plantillas actuales en appState (ya hecho arriba)
  // Construir anamnesis dinámica (construirAnamnesis está en data.js)
  if (typeof construirAnamnesis === "function") {
    construirAnamnesis();
  }
}

/* =========================
   Inicialización de listeners del formulario relacionados con anamnesis
   - edad/edadUnit: actualiza peso inicial (si no fue modificado manualmente)
   - demás campos: disparan construirAnamnesis en tiempo real
*/
function inicializarCore() {
  // ids a observar
  const ids = [
    "companionSelect",
    "patientAge",
    "ageUnit",
    "amcInput",
    "alergiaInput",
    "evolutionTime",
    "evolutionUnit",
    "peso"
  ];

  ids.forEach(id => {
    const el = safeGet(id);
    if (!el) return;

    // cambiar: si la edad cambia, calcular peso inicial
    if (id === "patientAge" || id === "ageUnit") {
      el.addEventListener("input", () => {
        const edad = safeGet("patientAge")?.value;
        const unidad = safeGet("ageUnit")?.value;
        const initial = getInitialWeightForAge(edad, unidad);
        if (initial !== null && initial !== undefined) {
          // setear peso si usuario no ha editado manualmente
          setPesoIfNotEdited(initial);
        }
        // reconstruir anamnesis en vivo
        if (typeof construirAnamnesis === "function") construirAnamnesis();
      });
    } else {
      el.addEventListener("input", () => {
        if (typeof construirAnamnesis === "function") construirAnamnesis();
      });
    }
  });

  // sexo radios
  document.querySelectorAll("input[name='sex']").forEach(radio => {
    radio.addEventListener("change", () => {
      if (typeof construirAnamnesis === "function") construirAnamnesis();
    });
  });
}

/* Hacemos disponibles las funciones necesarias globalmente para index.html */
window.inicializarDiagnosticos = inicializarDiagnosticos;
window.selectDiagnosis = selectDiagnosis;
window.inicializarCore = inicializarCore;
window.dataInformes = dataInformes;
