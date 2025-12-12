/* data.js
   Contiene: - estado global - utilidades - lógica de peso por edad - listas auxiliares (alergias),
   y funciones auxiliares reutilizables por el resto de módulos.
*/

/* =========================
   Estado global de la app
   ========================= */
const appState = {
  currentDiagnosisKey: null,
  currentOriginalPresentationTemplate: "",
  currentOriginalEvolutionTemplate: "",
  // track if peso fue editado manualmente por el usuario
  pesoEditedManually: false,
  // store last auto-set peso so we can decide cuando sobrescribir
  lastAutoPeso: null
};

/* =========================
   Listas / constantes
   ========================= */
/* Colores de triaje - usados para clases y estilos */
const TRIAGE = {
  "ROJO": "triage-rojo",
  "NARANJA": "triage-naranja",
  "AMARILLO": "triage-amarillo",
  "VERDE": "triage-verde"
};

/* Asignación de color por diagnóstico (según requisitos) */
const DIAG_Triage = {
  "ALERGIAS": "NARANJA",
  "CAIDA": "AMARILLO",
  "CUERPO EXTRAÑO EN VÍA AÉREA / ASPIRACIÓN": "ROJO",
  "BRONQUIOLITIS AGUDA": "NARANJA",
  "CEFALEA": "VERDE",
  "CONVULSIÓN FEBRIL": "NARANJA",
  "CRISIS ASMÁTICA / BRONCOESPASMO": "NARANJA",
  "DESHIDRATACIÓN": "AMARILLO",
  "DOLOR ABDOMINAL AGUDO": "NARANJA",
  "EPISODIO PAROXÍSTICO NO EPILÉPTICO (ALTE)": "NARANJA",
  "FARINGOAMIGDALITIS AGUDA": "VERDE",
  "GASTROENTERITIS AGUDA (GEA)": "AMARILLO",
  "HERIDAS CORTANTES / LACERACIONES": "AMARILLO",
  "ITU / PIELONEFRITIS": "AMARILLO",
  "IRA SIN NEUMONÍA": "VERDE",
  "INGESTA CUERPO EXTRAÑO": "NARANJA",
  "INTOXICACIÓN POR TÓXICOS": "NARANJA",
  "INTOXICACIÓN POR ALCOHOL": "AMARILLO",
  "LARINGITIS AGUDA (CRUP)": "NARANJA",
  "NEUMONÍA": "NARANJA",
  "OTITIS MEDIA AGUDA (OMA)": "VERDE",
  "POLITRAUMATISMO": "ROJO",
  "QUEMADURAS": "NARANJA",
  "RASH ALERGIA A MEDICAMENTO": "NARANJA",
  "SÍNDROME FEBRIL SIN FOCO": "VERDE",
  "TCE LEVE A MODERADO": "AMARILLO",
  "DIAGNOSTICO NO INCLUIDO EN DATA": "VERDE"
};

/* Lista de alergias reconocidas (se detectan en la entrada de texto exacta o por coincidencia parcial) */
const ALERGIAS_RECONOCIDAS = [
  "penicilinas", "penicilina", "cefalosporinas", "aines", "ibuprofeno",
  "paracetamol", "latex", "aspirina", "sulfas", "sulfonamidas"
];

/* =========================
   Utilidades Generales
   ========================= */
function safeGet(id) { return document.getElementById(id); }

function isPositiveNumber(v) { return typeof v === "number" && !isNaN(v) && v > 0; }

/* =========================
   LÓGICA: peso inicial por edad (simple, estimada)
   - Regla clínica simple para inicializar peso:
     - Recién nacido (0-1 mes): 3.5 kg
     - 1-12 meses: 0.5*edad en meses + 3 (aprox)
     - 1-2 años: 9-12 kg
     - 3-5 años: 12-18 kg
     - 6-12 años: 20 + 2*(edad-6)
     - >12 años: 40 + 2*(edad-12)  (estimación)
   Estas reglas son estimaciones rápidas y sólo sirven para inicializar el campo;
   siempre se permite editar manualmente el peso.
*/
function getInitialWeightForAge(ageValue, ageUnit) {
  const age = Number(ageValue);
  if (!isFinite(age) || age < 0) return null;

  if (ageUnit === "meses") {
    if (age <= 1) return 3.5;
    // 1-12 meses
    const w = Math.round((0.5 * age + 3) * 10) / 10;
    return w;
  } else { // años
    if (age < 1) return 3.5;
    if (age <= 2) return 11;         // promedio 1-2 años
    if (age <= 5) return Math.round((12 + (age - 3) * 3) * 10) / 10; // 3->12, 5->18
    if (age <= 12) return Math.round((20 + 2 * (age - 6)) * 10) / 10;
    return Math.round((40 + 2 * (age - 12)) * 10) / 10;
  }
}

/* Wrapper obtenerPesoKg: devuelve null si no válido */
function obtenerPesoKg() {
  const el = safeGet("peso");
  if (!el) return null;
  const v = parseFloat(el.value);
  return (isFinite(v) && v > 0) ? v : null;
}

/* Permite programáticamente setear peso si no fue editado manualmente */
function setPesoIfNotEdited(value) {
  const pesoEl = safeGet("peso");
  if (!pesoEl) return;
  if (!appState.pesoEditedManually) {
    pesoEl.value = value;
    appState.lastAutoPeso = value;
  }
}

/* Mark peso as edited on user focus/input */
(function attachPesoEditedListener() {
  document.addEventListener('DOMContentLoaded', () => {
    const pesoEl = safeGet("peso");
    if (!pesoEl) return;
    pesoEl.addEventListener('input', () => {
      // If user types and value differs from last auto-set => mark manual.
      const v = parseFloat(pesoEl.value);
      if (!isNaN(v) && appState.lastAutoPeso !== null && Math.abs(v - appState.lastAutoPeso) > 0.001) {
        appState.pesoEditedManually = true;
      } else if (isNaN(v) || v === "") {
        // do not force manual flag when empty
      }
    });
    // If user focuses, we consider intent to edit -> set manual flag on interaction
    pesoEl.addEventListener('focus', () => {
      appState.pesoEditedManually = true;
    });
  });
})();

/* =========================
   Construcción de la anamnesis dinámica
   - Reemplazos seguros y controlados
   - Solo reemplaza la primera ocurrencia de la frase de evolución
   - Inserta peso (si existe) en el primer lugar apropiado
   - Reconoce alergias predefinidas e inserta frase específica
*/
function construirAnamnesis() {
  if (!appState.currentDiagnosisKey || !appState.currentOriginalPresentationTemplate) return;
  let t = appState.currentOriginalPresentationTemplate;

  // valores del formulario
  const sexoEl = document.querySelector("input[name='sex']:checked");
  const sexo = sexoEl ? sexoEl.value : "femenino";
  const edad = safeGet("patientAge")?.value || "";
  const edadU = safeGet("ageUnit")?.value || "";
  const acomp = safeGet("companionSelect")?.value || "madre";
  const amc = safeGet("amcInput")?.value || "negado";
  const alergiaRaw = (safeGet("alergiaInput")?.value || "negada").trim();
  const evoN = safeGet("evolutionTime")?.value || "";
  const evoU = safeGet("evolutionUnit")?.value || "";

  // Reemplazo Sexo y edad: buscamos patrón que normalmente inicia con "Paciente femenina/masculino de X años"
  t = t.replace(/Paciente\s+(femenina|masculino)[^,]*/i, `${sexo === "femenino" ? "Paciente femenina" : "Paciente masculino"} de ${edad} ${edadU}`);

  // Reemplazo compañía: primera ocurrencia de "acompañía de su ..."
  t = t.replace(/acompañía de su\s+\w+/i, `acompañía de su ${acomp}`);

  // AMC (antecedente mórbido conocido)
  t = t.replace(/antecedentes mórbido conocido [^,]*,/i, `antecedentes mórbido conocido ${amc},`);

  // Alergia: si usuario escribió una alergia reconocida, incluimos texto detallado
  let alergiaText = alergiaRaw;
  if (alergiaRaw && alergiaRaw.toLowerCase() !== "negada" && alergiaRaw.toLowerCase() !== "negado") {
    // buscar coincidencia parcial en lista predefinida
    const found = ALERGIAS_RECONOCIDAS.find(a => alergiaRaw.toLowerCase().includes(a));
    if (found) {
      // construir frase más médica
      alergiaText = `alergia a ${alergiaRaw} (posible reacción a ${found})`;
    }
  }
  // Reemplazar el segmento "alergia ..." (sólo primera ocurrencia)
  t = t.replace(/alergia\s+[^,]*,/i, `alergia ${alergiaText},`);

  // Reemplazo del tiempo de evolución: sólo primera ocurrencia relevante
  // Queremos: "aproximadamente 1 minuto/hora/día de evolución" según evoU
  let evoUnitSingular = evoU;
  if (evoU === "horas") evoUnitSingular = (evoN && Number(evoN) === 1) ? "hora" : "horas";
  if (evoU === "días") evoUnitSingular = (evoN && Number(evoN) === 1) ? "día" : "días";
  if (evoU === "minutos") evoUnitSingular = (evoN && Number(evoN) === 1) ? "minuto" : "minutos";

  const evoReplacement = `aproximadamente ${evoN} ${evoUnitSingular} de evolución`;

  // Hacemos sólo la primera sustitución de una frase que contenga "hace X ... de evolución" o similar.
  t = replaceFirst(t, /hace\s*\d+\s*\w*\s*(minutos|horas|días)?\s*de evolución/i, evoReplacement);

  // Insertar peso: buscamos frase típica y añadimos "Peso: X kg." al primer sitio lógico
  const peso = obtenerPesoKg();
  if (peso) {
    // si existe la frase "Por tal motivo es traída a este centro de salud."
    if (/Por tal motivo es traída a este centro de salud\./i.test(t)) {
      t = t.replace(/Por tal motivo es traída a este centro de salud\./i, `Por tal motivo es traída a este centro de salud. Peso: ${peso} kg.`);
    } else {
      // si no, insertarlo al final de la primera oración (hasta primer punto)
      t = t.replace(/([^.]{10,}\.)/, `$1 Peso: ${peso} kg.`);
    }
  }

  // Finalmente asignar al editor
  const out = safeGet("presentacion-editor");
  if (out) out.innerText = t;
}

/* Helper: reemplaza sólo la primera ocurrencia (regex global no usado) */
function replaceFirst(text, regex, replacement) {
  const m = text.match(regex);
  if (!m) return text;
  // Use String.replace but only replace first matched segment; here regex will match first by default
  return text.replace(regex, replacement);
}

/* =========================
   Función para filtrar diagnósticos (UI)
*/
function filtrarDiagnosticos(q) {
  const listEl = safeGet("diagnosesList");
  if (!listEl) return;
  const ql = (q || "").toLowerCase().trim();
  const items = listEl.querySelectorAll('li[data-key]');
  items.forEach(li => {
    const key = li.getAttribute('data-key') || "";
    if (!ql || key.toLowerCase().includes(ql)) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}

/* Exportar funciones principales globalmente (para HTML inyectado) */
window.getInitialWeightForAge = getInitialWeightForAge;
window.construirAnamnesis = construirAnamnesis;
window.safeGet = safeGet;
window.obtenerPesoKg = obtenerPesoKg;
window.setPesoIfNotEdited = setPesoIfNotEdited;
window.appState = appState;
window.DIAG_Triage = DIAG_Triage;
window.TRIAGE = TRIAGE;
window.ALERTS = {}; // placeholder for future alerting
