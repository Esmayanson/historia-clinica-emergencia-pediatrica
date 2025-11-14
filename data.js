/**
 * data.js
 * Contiene todos los datos predefinidos de los informes de emergencia extraídos del documento.
 * Clave = Motivo de emergencia, Valor = Objeto con la Presentación y la Evolución/Órdenes combinadas.
 */

const dataInformes = {
    "ALERGIAS": {
        presentacion: "sin antecedentes mórbidos, el cual se encontraba asintomático hasta el día de ayer, cuando empezó a presentar prurito intenso generalizado, lesiones eritematosas en cara, tronco y extremidades, que no ceden con el uso de Cetirizina en casa.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Al examen físico: Afebril, eupneico, dolor, quejumbroso, agitado, con prurito intenso, lesiones jabonosas con eritema en todo el cuerpo. \n" +
            "Nota adicional de manejo: Se administró Adrenalina subcutánea (0.2 cc y 0.1cc IM) debido al aumento del cuadro de inflamación y dificultad para deglutir a pesar del manejo inicial con esteroides.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con solución salina para vía periférica.\n" +
            "2. Medicar con Fendramin como antialérgico.\n" +
            "3. Medicar con Hidrocortizona como antiinflamatorio.\n" +
            "4. Revalorar.",
    },
    "CAIDA": {
        presentacion: "Paciente masculino de 6 meses de edad, sin antecedentes mórbidos conocidos, es traído vía emergencia por sus padres quienes refieren que dicho paciente estaba estable hasta presentar caída de la cama provocando dolor, irritabilidad, edema y hematoma en región frontal.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente, hipoactivo, eupneico, afebril, mucosa oral seca, saliva espesa, lengua saburral, palidez marcada, debilidad, con dolor, edema y hematoma frontal.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Salina al 0.9% y mantener vía permeable.\n" +
            "2. Administrar Sinedol Supositorio como analgésico.\n" +
            "3. Realizar Radiografía de Cráneo para descartar fractura.\n" +
            "4. Se deja bajo observación en Sala Pediátrica con fines de mejoría de cuadro clínico.",
    },
    "CONVULSIÓN FEBRIL": {
        presentacion: "Se trata de paciente masculino de 3 años de edad, con antecedente de convulsiones febriles previas (hace 6 meses). Hace 1 hora inició con fiebre alta no termometrada. Minutos después, presenta episodio tónico-clónico generalizado de aproximadamente 3 minutos de duración, con pérdida del conocimiento.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente post-crisis, somnoliento, afebril (tras administración de antipirético rectal por los padres), con mucosa oral seca, palidez marcada. Eupneico. Al examen neurológico: respuesta lenta a estímulos verbales. Signos vitales estables, salvo por ligera taquicardia.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Asegurar vía aérea y colocar en decúbito lateral.\n" +
            "2. Canalizar con Solución Salina al 0.9% para mantener vía e hidratación.\n" +
            "3. Administrar Diazepam EV si el paciente vuelve a convulsionar (indicación de rescate).\n" +
            "4. Administrar Paracetamol EV para control térmico.\n" +
            "5. Realizar Hemograma, Electrolitos y Glicemia para descartar causas metabólicas/infecciosas.\n" +
            "6. Observación estricta en Sala de Emergencia Pediátrica por al menos 12 horas.",
    },
    "CRISIS DE BRONCOESPASMO Y TOS SOLA": {
        presentacion: "Se trata de paciente femenina de 2 años de edad, sin antecedentes mórbidos conocidos, la cual refiere la madre que se encontraba estable hasta hace aproximadamente 24 horas cuando inicia con cuadro de tos seca persistente, que posteriormente se acompañó de marcada dificultad respiratoria expresada en retracciones costales y subcostales.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente hipoactivo, disneico, presentando congestión nasal, con tiraje intercostal. A la auscultación pulmonar con estertores tipo sibilantes y roncus.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Mandar a nebulizar paciente con Albuterol más Solución Salina.\n" +
            "2. Medicar con Hidrocortizona IM.\n" +
            "3. Realizar RX de Tórax para visualización de campo pulmonar y descartar probable proceso infeccioso.\n" +
            "4. Nota adicional de manejo: Se indicó Doblened (por antecedente de asma bronquial) y oxigenoterapia debido a que saturaba aún en 90%.",
    },
    "CRISIS DE BRONCOESPASMO, TOS, RINORREA, VOMITOS": {
        presentacion: "Paciente masculino de 7 meses de edad que estaba estable hasta el día de ayer, cuando comenzó a presentar tos seca persistente de 24 horas de evolución, marcada dificultad respiratoria expresada en retracciones costales y subcostales, acompañada de rinorrea hialina y un vómito de contenido alimenticio.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "No hay datos de Evolución específicos en el documento para este motivo. Se recomienda completar el campo con la valoración clínica actual.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "No hay Órdenes específicas en el documento para este motivo. Se recomienda seguir protocolo de manejo de Crisis de Broncoespasmo Pediátrico.",
    },
    "CUERPO EXTRAÑO EN VÍA AÉREA / ASFIXIA": {
        presentacion: "Paciente femenina de 1 año de edad. Es traída por su madre quien refiere que la paciente se encontraba jugando con una pelota pequeña hace 15 minutos e inicia súbitamente con dificultad respiratoria marcada, cianosis perioral y tos inefectiva.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente disneica, con cianosis perioral evidente, agitada, con estridor audible y tos débil. A la auscultación pulmonar, se encuentra disminución marcada o ausencia del murmullo vesicular en un hemitórax. El paciente presenta signos de agotamiento.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Maniobra de Heimlich/Palmadas en espalda (según edad) inmediata para intentar desalojar el cuerpo extraño.\n" +
            "2. Administrar Oxígeno por mascarilla con reservorio (si el cuerpo extraño se desalojó parcialmente).\n" +
            "3. Laringoscopía/Broncoscopía de emergencia si la maniobra inicial falla y el estado del paciente lo permite.\n" +
            "4. Realizar RX de Tórax y Cuello para localizar el objeto (si está estable).\n" +
            "5. Mantener en observación en UCI pediátrica para vigilar complicaciones.",
    },
    "DIARREA": {
        presentacion: "Se trata de paciente femenina de 6 años de edad, la cual se encontraba estable hasta hace 2 días cuando inició con cuadro de evacuaciones diarreicas, fétidas, amarillentas, de 4-5 deposiciones por día, que luego se acompañó de fiebre alta que no cede a la medicación con Acetaminofén Vía Oral. Presentó más de 10 deposiciones en el día de hoy.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente despierta, hipoactiva, palidez facial, febril, eupneica, con mucosa oral reseca. Amígdalas eutróficas, sin presencia de exudado ni hiperemia.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Mandar a canalizar paciente con Solución Salina al 0.9% para rehidratación.\n" +
            "2. Medicar con Paracetamol para contrarrestar temperatura elevada.\n" +
            "3. Realizar Hemograma y Coprológico para descartar probable proceso infeccioso.",
    },
    "DIARREA 2": {
        presentacion: "Se trata de paciente masculino de 5 años de edad, con antecedente de Amebiasis (ingresado y dado de alta hace una semana). Hace un día inició con cuadro de fiebre alta que no cede a la medicación con Acetaminofén, y en el día de hoy se acompañaron de evacuaciones diarreicas, fétidas, amarillentas (4 deposiciones), y vómitos de contenido alimenticio (5 ocasiones).",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "No hay datos de Evolución específicos en el documento para este motivo. Se recomienda completar el campo con la valoración clínica actual.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "No hay Órdenes específicas en el documento para este motivo. Se recomienda seguir protocolo de manejo de Gastroenteritis/Diarrea Pediátrica.",
    },
    "DISMENORREA": {
        presentacion: "Se trata de paciente femenina de 16 años de edad, la cual se encontraba estable hasta hace aproximadamente 3 horas cuando inició con cuadro de dolor pélvico intenso luego de una hora de inicio de la menstruación, que posteriormente se acompañó de vómitos (4 ocasiones de contenido alimenticio) y evacuaciones diarreicas (4 ocasiones).",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente consciente, orientada, afebril, eupneica, palidez facial, con mucosa oral seca. Refiere dolor intenso 10/10 en región pélvica y a la palpación superficial en epigastrio.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Hidratar con Solución Salina al 0.9% 500cc.\n" +
            "2. Medicar con Sentrol Compuesto como analgésico para contrarrestar dolor pélvico.",
    },
    "DISNEA, TOS, DIARREA, RINORREA": {
        presentacion: "Se trata de paciente masculino de 7 meses de edad, con antecedente de Asma Bronquial actualmente no tratada. Hace 3 días inició con cuadro de evacuaciones diarreicas, fétidas, amarillentas (4-5 deposiciones por día), que hace un día se acompañó de dificultad respiratoria marcada, aunado a tos persistente y rinorrea.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "No hay datos de Evolución específicos en el documento para este motivo. Se recomienda completar el campo con la valoración clínica actual.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "No hay Órdenes específicas en el documento para este motivo. Se recomienda seguir protocolo de manejo combinado (Diarrea/Asma Pediátrica).",
    },
    "DOLOR ABDOMINAL (Femenina Pediátrica)": {
        presentacion: "Se trata de paciente femenina de 9 años de edad. Estable hasta hace dos días cuando inicia con cuadro de dolor en epigastrio que empeoró el día de hoy, irradiándose a regiones abdominales bajas, con predominio en hipocondrio derecho y ambos flancos.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente despierta, orientada, afebril, eupneica. Refiriendo dolor abdominal intenso, difuso, a la palpación profunda, de predominio en epigastrio, hipocondrio derecho y ambos flancos.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Realizar Examen de Orina.\n" +
            "2. Realizar Sonografía Abdominal para descartar patologías del sistema urinario y/o gastrointestinal.",
    },
    "DOLOR ABDOMINAL (Masculino Pediátrico con Fiebre y Disuria)": {
        presentacion: "Paciente masculino de 8 años de edad. Estable hasta presentar fiebre no termometrada de dos días de evolución, aunado a náuseas (que no induce al vómito), acompañado de dolor a la palpación superficial y profunda en hipocondrio y flanco izquierdo.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente consciente, orientado, afebril, eupneico, quejumbroso, hipoactivo, palidez marcada, mucosa oral seca. Presentando dolor a la palpación superficial y profunda en hipocondrio y flanco izquierdo, refiriendo disuria.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Salina al 0.9% EV para vía e rehidratación.\n" +
            "2. Realizar Hemograma para valorar biometría hemática y descartar proceso infeccioso.\n" +
            "3. Realizar Orina para descartar proceso infeccioso de vía urinaria.\n" +
            "4. Realizar Sonografía Abdominal para descartar patologías abdominales.",
    },
    "DOLOR LUMBAR": {
        presentacion: "Paciente masculino de 12 años con antecedentes mórbidos conocidos de Falcemia (Anemia de Células Falciformes). Estable hasta el día de hoy cuando inicia un cuadro clínico agudo de dolor lumbar con grado 10/10.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente hipoactivo, eupneico, afebril, mucosa oral seca, saliva espesa, lengua saburral, palidez marcada, debilidad, con dolor y limitación de movimientos en columna lumbar, Puñopercusión positivo.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Administrar Ketorolaco como analgésico.\n" +
            "2. Canalizar con Solución Salina para hidratar y mantener vía permeable.\n" +
            "3. Se deja bajo observación en Sala Pediátrica con fines de mejoría de cuadro clínico.",
    },
    "DOLOR PELVICO Y DISURIA": {
        presentacion: "Paciente femenina de 27 años de edad, con embarazo de 7 semanas por US, G4P0C2A1. Estable hasta hace 4 horas cuando inicia dolor pélvico 7/10 tipo cólico acompañado de disuria y náuseas que inducen al vómito (5 ocasiones de contenido alimenticio, luego gástrico).",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Consciente, eupneica, afebril, quejumbrosa, mucosa oral seca, lengua saburral, palidez marcada, presentando disuria.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Salina 0.9% para hidratación.\n" +
            "2. Administrar Sertal Simple como antiespasmódico.\n" +
            "3. Realizar Examen de Orina para descartar infecciones de vías urinarias.\n" +
            "4. Realizar Hemograma para valorar biometría hemática y descartar proceso infeccioso.\n" +
            "5. Realizar Sonografía Transvaginal para valorar bienestar fetal.",
    },
    "DOLOR PELVICO, SANGRADO VAGINAL TIPO MANCHADO, DISURIA": {
        presentacion: "Paciente femenina de 29 años de edad. Estable hasta hace 4 horas cuando inicia dolor pélvico 8/10 tipo cólico acompañado de disuria y sangrado transvaginal tipo manchado de 3 horas de evolución.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "La Evolución no está detallada en el documento para este motivo. Se recomienda completar el campo con la valoración clínica actual.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Lactato de Ringer para hidratación.\n" +
            "2. Administrar Sertal Simple como antiespasmódico.\n" +
            "3. Realizar Examen de Orina para descartar infecciones de vías urinarias.\n" +
            "4. Realizar Hemograma para valorar biometría hemática y descartar proceso infeccioso.\n" +
            "5. Realizar Sonografía Transvaginal para valorar bienestar fetal.",
    },
    "FIEBRE Y DIARREA (Caso 1)": {
        presentacion: "Paciente masculino de 1 año de edad. Estable hasta hace aproximadamente 2 semanas cuando inició con cuadro de evacuaciones diarreicas, fétidas, amarillentas (4-5 deposiciones por día), que hace un día se acompañó de fiebre alta que no cede a la medicación con Acetaminofén Vía Oral.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente despierto, hipoactivo, palidez facial, febril, eupneico, con mucosa oral reseca. Amígdalas hipertróficas, con presencia de exudado abundante e hiperemia.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Mandar a canalizar paciente con Solución Salina al 0.9% para rehidratación.\n" +
            "2. Medicar con Neomelubrina para contrarrestar temperatura elevada.\n" +
            "3. Realizar Hemograma y Coprológico para descartar probable proceso infeccioso.",
    },
    "FIEBRE Y DIARREA (Caso 2)": {
        presentacion: "Paciente masculino de 1 año de edad. Estable hasta presentar fiebre no termometrada (ceden y reaparecen con Acetaminofén), aunada a evacuaciones de consistencia líquida, amarillenta, fétida en frecuencia de 8 ocasiones en las últimas 24 horas.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Paciente consciente, febril, mucosa oral reseca, lengua saburral, salivación espesa. Amígdalas eutróficas, hiperémicas.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Salina 0.9% vía periférica para hidratar.\n" +
            "2. Administrar Paracetamol EV como analgésico antipirético.\n" +
            "3. Realizar Hemograma para valorar biometría hemática.\n" +
            "4. Realizar Coprológico para descartar parasitosis intestinal.\n" +
            "5. Dejar bajo observación en Sala Pediátrica hasta mejorar cuadro clínico.",
    },
    "FIEBRE Y DIARREA (Caso 3)": {
        presentacion: "Se trata de paciente femenina de 9 años de edad. Estable hasta hace 24 horas cuando inició con cuadro de evacuaciones diarreicas, fétidas, amarillentas (5-6 deposiciones por día), acompañadas de fiebre alta que no cede a la medicación con Acetaminofén Vía Oral.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente febril, eupneica, con signos de deshidratación (mucosa oral seca, lengua saburral, conjuntivas pálidas). Amígdalas eutróficas, hiperémicas, sin placas.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Mandar a canalizar con Solución Salina al 0.9% para reposición de líquidos.\n" +
            "2. Indicar Paracetamol EV para contrarrestar temperatura elevada.\n" +
            "3. Indicar Dramidon por hiperémesis.\n" +
            "4. Realizar Biometría Hemática y Examen de Orina para descartar probable proceso infeccioso.",
    },
    "FIEBRE Y VOMITO QUE ACUDIO A OTRO CENTRO ANTES": {
        presentacion: "Se trata de paciente femenina de 1 año de edad. Estable hasta hace tres días cuando inició con cuadro de fiebre alta que no cede a la medicación con Acetaminofén Vía Oral, acompañado de vómitos en 5 ocasiones de contenido alimenticio. Acude a este centro por persistencia del cuadro clínico luego de ser tratada y dada de alta en otro centro.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "No hay datos de Evolución específicos en el documento para este motivo. Se recomienda completar el campo con la valoración clínica actual.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "No hay Órdenes específicas en el documento para este motivo. Se recomienda seguir protocolo de manejo de Fiebre/Vómitos Pediátrico.",
    },
    "FIEBRE SOLO": {
        presentacion: "Se trata de paciente masculino de 2 años de edad. Estable hasta hace 24 horas, cuando inició con cuadro de fiebre alta no termometrada, no escalofriante, no convulsivante, que no cede a la medicación con Acetaminofén Vía Oral.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente febril, eupneico, con signos de deshidratación (mucosa oral seca, lengua saburral, conjuntivas pálidas). Amígdalas hipertróficas, con presencia de placas. Pulmones con murmullo vesicular presente.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Proceder a canalizar con Solución Salina al 0.9% para reposición de líquidos.\n" +
            "2. Indicar Neomelubrina/Paracetamol EV para contrarrestar temperatura elevada.\n" +
            "3. Realizar Biometría Hemática y Examen de Orina para descartar probable proceso infeccioso.",
    },
    "FIEBRE, CEFALEA": {
        presentacion: "Se trata de paciente femenina de 10 años de edad. Estable hasta hace tres días cuando inició con cuadro de fiebre alta que no cede a la medicación con antipirético tipo Acetaminofén, acompañado de cefalea holocraneana referida 10/10, y diarrea en tres ocasiones.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente consciente, orientada, eupneica, febril, quejumbrosa. Mucosa oral seca, lengua saburral, conjuntivas pálidas, palidez marcada y signos de deshidratación moderada. Amígdalas hipertróficas.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Hidratar.\n" +
            "2. Medicar con Neomelubrina como antipirético.\n" +
            "3. Realizar Hemograma para valorar biometría hemática y descartar proceso infeccioso.\n" +
            "4. Realizar Coprológico para descartar parasitosis.\n" +
            "5. Dejar en Sala de Observación Pediátrica con fines de hidratación y mejoría de cuadro clínico.",
    },
    "FIEBRE, DEHIDRATACION Y VOMITO DOLOR ABDOMINAL": {
        presentacion: "Se trata de paciente masculino de 6 años de edad. Estable hasta hace tres días cuando inició con cuadro de fiebre alta que no cede a la medicación, acompañado de vómitos en 10 ocasiones de contenido alimenticio, y dolor estomacal de predominio en epigastrio.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Paciente consciente, quejumbroso, febril. Mucosa oral seca, lengua saburral, conjuntivas pálida, palidez marcada. Con dolor abdominal a la palpación superficial y profundo de predominio en epigastrio.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Salina 0.9% para hidratación.\n" +
            "2. Administrar Paracetamol EV como antipirético.\n" +
            "3. Administrar Dramidon EV como antiemético.\n" +
            "4. Administrar Ranitidina EV como protector gástrico.\n" +
            "5. Realizar Hemograma para valorar biometría hemática y descartar proceso infeccioso.\n" +
            "6. Realizar Orina para descartar infección de vías urinarias.\n" +
            "7. Se deja bajo observación en Sala Pediátrica con fines de hidratación y mejoría de cuadro clínico.",
    },
    "FIEBRE, DIARREA, TOS, DISNEA": {
        presentacion: "Se trata de paciente masculino de 4 años de edad. Estable hasta hace aproximadamente 4 días cuando inició con cuadro de evacuaciones diarreicas, fétidas, amarillentas (4-5 deposiciones por día), que luego se acompañó de fiebre alta que no cede a la medicación, tos persistente productiva de secreción blanquecina, y dificultad respiratoria marcada.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente despierto, hipoactivo, palidez facial, febril, con dificultad respiratoria marcada, tórax hiperdinámico. Mucosa oral reseca. Amígdalas hipertróficas. Dolor abdominal difuso a la palpación profunda.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Mandar a canalizar paciente con Solución Salina al 0.9% para rehidratación.\n" +
            "2. Medicar con Paracetamol para contrarrestar temperatura elevada.\n" +
            "3. Nebulizar con Doblened.\n" +
            "4. Realizar Hemograma y Coprológico para descartar probable proceso infeccioso.",
    },
    "FIEBRE, RINORREA, CONGESTION NASAL": {
        presentacion: "Se trata de paciente femenina de 1 año de edad. Estable hasta hace 24 horas, cuando inició con cuadro de fiebre alta que no cede a la medicación con Acetaminofén Vía Oral ni Vía Rectal, acompañado de rinorrea hialina y congestión nasal.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente hipoactiva, febril, eupneica, con signos de deshidratación (mucosa oral seca, lengua saburral, conjuntivas pálidas). Amígdalas hipertróficas e hiperémicas, sin exudado, con congestión nasal y rinorrea hialina. Auscultación pulmonar sin estertores presentes.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Proceder a canalizar con Solución Salina al 0.9% para reposición de líquidos.\n" +
            "2. Indicar Paracetamol EV para contrarrestar temperatura elevada.\n" +
            "3. Realizar Biometría Hemática para descartar probable proceso infeccioso.",
    },
    "FIEBRE, VOMITOS, DIARREA, TOS, DISNEA": {
        presentacion: "Se trata de paciente masculino de 3 años de edad, con antecedentes mórbidos de Asma Bronquial. Estable hasta hace 4 días cuando inició con cuadro de evacuaciones diarreicas (4-5 deposiciones por día) que mejoró, y se aunaron vómitos (3 ocasiones), que luego se acompañaron de fiebre alta, tos persistente, y dificultad respiratoria marcada.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Paciente consciente, disneico, quejumbroso, febril. Amígdalas eutróficas e hiperémicas. Murmullo vesicular disminuido, estertores tipo roncus y sibilantes en ambos campos pulmonares, retracciones inter y subcostales.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "No hay Órdenes específicas en el documento para este motivo. Se recomienda seguir protocolo de manejo de Fiebre/Dificultad Respiratoria Pediátrica.",
    },
    "HERIDA": {
        presentacion: "Paciente masculino de 4 años de edad. Estable hasta hace 45 minutos aproximadamente cuando presenta caída de su propio plano de sustento con la patineta mientras jugaba, con pérdida de continuidad de la piel en el mentón de aproximadamente 1 cm.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente consciente, irritado, eupneico, quejumbroso, afebril, presentando sangrado y herida en mentón de aproximadamente 1 cm.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Curar herida con previa asepsia y antisepsia.\n" +
            "2. Administrar anestesia local con Lidocaína.\n" +
            "3. Realizar aproximación de piel con 2 puntos de sutura usando hilo Nylon 5.0.\n" +
            "4. Cubrir con gasas estériles.\n" +
            "5. Administrar analgésico tipo Diclo-K ped. Supositorio para el dolor.\n" +
            "6. Administrar Gammaglobulina Antitetánica Humana (IGANTET) IM debido a esquema de vacuna incompleto y herida contaminada.\n" +
            "7. Se deja bajo observación en Sala Pediátrica con fines de mejoría de cuadro clínico.",
    },
    "INTOXICACIÓN ACCIDENTAL": {
        presentacion: "Paciente masculino de 2 años de edad. Traído por su padre quien encontró al niño con un frasco de pastillas de su abuela (ej. Hipertensivos o hipoglucemiantes) abierto y vaciado parcialmente. El niño está somnoliento y presentó un vómito de contenido desconocido hace 30 minutos.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente hipoactivo, con tendencia al sueño, afebril, eupneico, con mucosa oral húmeda, pero con olor a sustancia química/medicamento. Signos vitales con bradicardia e hipotensión (dependiendo del tóxico). Al examen físico, no hay signos de trauma.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Asegurar y proteger vía aérea (riesgo de aspiración).\n" +
            "2. Canalizar con Solución Salina al 0.9% y monitorización continua.\n" +
            "3. Administrar Carbón Activado Vía Oral/Sonda Nasogástrica para reducir la absorción (si no hay contraindicaciones).\n" +
            "4. Realizar Lavado Gástrico (según el tiempo y el tóxico).\n" +
            "5. Realizar Hemograma, Electrolitos, Función Hepática y Renal, Gases Arteriales y Nivel del Tóxico (si es posible).\n" +
            "6. Tratamiento antídoto específico si se conoce el tóxico.\n" +
            "7. Traslado a UCI pediátrica para manejo avanzado.",
    },
    "OTALGIA/ODONTALGIA": {
        presentacion: "Se trata de paciente masculino de 12 años de edad. Estable hasta hace dos días cuando inició con cuadro de dolor intenso de oído derecho, que luego se irradia a región maxilar derecha.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente afebril, eupneico, hidratado. Con ausencia de piezas dentales, y presencia de caries en 1er y 2do molar inf. izquierdo y 2do molar inf. derecho. Al examen del oído se observan secreciones blanquecinas en oído externo derecho e izquierdo. Con dolor a la palpación en región retroauricular derecha y región maxilar ipsilateral.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Proceder a medicar paciente con analgésico tipo Diclofenac (Dioxaflex) IM para el dolor.\n" +
            "2. Vigilar de cerca.",
    },
    "PICADURA DE TARANTULA (CACATA)": {
        presentacion: "Se trata de paciente masculino de 10 años de edad. Estable, hasta hace aproximadamente 20 minutos cuando sufrió picadura de insecto (presuntamente una tarántula/cacata) de características grande, negra y peluda.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente despierto, activo, afebril, eupneico, hidratado. Presentando picadura de parte distal posterior de brazo derecho, con dos picaduras paralelas. Se observa área de picadura enrojecida, con salida de líquido transparente y ligero hinchazón.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Proceder a medicar con Fendramin e Hidrocortisona por ser las reacciones alérgicas la principal manifestación de este tipo de picaduras.\n" +
            "2. Se procede a despachar estable con tratamiento ambulatorio y seguimiento por el departamento de Epidemiología.",
    },
    "RASH": {
        presentacion: "Se trata de paciente masculino de 12 años de edad, con antecedentes de alergia a colorantes. Hace aprox. 6 días inicia con cuadro de múltiples habones en mejillas, tronco, y extremidades, con edema en región del glande, manos y pies. Acompañado de prurito intenso, que en el día de ayer se aunaron mareos en 2 ocasiones.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente despierto, hipoactivo, orientado, conjuntivas pálidas, afebril al momento de la evaluación, con historia de fiebre. Mucosa oral reseca, lengua saburral. Presentando dolor abdominal difuso a la palpación profunda, de predominio en epigastrio, hipocondrio izquierdo e hipogastrio.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Mandar a canalizar paciente con Solución Salina al 0.9% para rehidratación.\n" +
            "2. Realizar Hemograma por historia de fiebre de 24 horas.\n" +
            "3. Indicar Orina y Coprológico para descartar probable proceso infeccioso.",
    },
    "TRAUMATISMO CRANEOENCEFÁLICO LEVE (TCE)": {
        presentacion: "Paciente femenina de 5 años de edad. Sufrió caída de altura (ej. de un columpio), golpeándose la cabeza contra el suelo. Inicialmente lloró inmediatamente y presentó un solo episodio de vómito de contenido alimenticio minutos después del golpe.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente consciente, alerta, irritable, con llanto fácil. Afebril, eupneica. Se observa hematoma y leve edema en región parietal derecha. No hay pérdida de conocimiento prolongada. Al examen neurológico: pupilas isocóricas, reactivas. No hay signos de focalización.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Reposo absoluto en Sala de Observación Pediátrica.\n" +
            "2. Aplicar hielo local en la zona del trauma.\n" +
            "3. Administrar Acetaminofén/Ibuprofeno si el dolor lo requiere.\n" +
            "4. Dieta líquida inicial y progresión.\n" +
            "5. Observación estricta (Escala de Glasgow y vigilancia neurológica) por 4-6 horas.\n" +
            "6. Realizar TAC de cráneo solo si el vómito es persistente, hay cefalea intensa o el estado de conciencia se deteriora.\n" +
            "7. Alta con signos de alarma claros a los padres si la evolución es satisfactoria.",
    },
    "VOMITOS POR CONTENIDO ALIMENTICIO": {
        presentacion: "Se trata de paciente masculino de 1 año de edad. Estable hasta presentar vómitos de contenidos alimentarios, no bilioso, no hemático, en 4 ocasiones de 30 minutos de evolución luego de haber ingerido una vitamina.",
        evolucion_ordenes: 
            "EVOLUCIÓN:\n" + 
            "Se recibe paciente consciente, quejumbroso, afebril. Mucosa oral seca, lengua saburral, conjuntivas pálida, palidez marcada.\n\n" +
            "ÓRDENES MÉDICAS:\n" + 
            "1. Canalizar con Solución Salina 0.9% para hidratación.\n" +
            "2. Administrar Dramidon EV como antiemético.\n" +
            "3. Se deja bajo observación en Sala Pediátrica con fines de hidratación y mejoría de cuadro clínico.",
    },
    
    // Placeholder para cualquier otro motivo no definido
    "DIAGNOSTICO NO INCLUIDO EN DATA": {
        presentacion: "Motivo no cargado. Por favor, complete la Presentación de Caso para el motivo seleccionado.",
        evolucion_ordenes: 
            "EVOLUCIÓN Y ÓRDENES MÉDICAS:\n" + 
            "Anotar la evolución del paciente aquí...\n\n\n" +
            "Anotar las órdenes médicas (ej: Soluciones, medicamentos, laboratorios) aquí...",
    }
};

// Lista de motivos de emergencia, extraída de las claves del objeto, ordenada alfabéticamente
const motivosLista = Object.keys(dataInformes)
    .filter(key => key !== 'DIAGNOSTICO NO INCLUIDO EN DATA')

    .sort();
