/* calculadoramedicamentos.js
   - Contiene base de medicamentos (familias, dosis)
   - Genera checkboxes agrupados por familia
   - Calcula dosis en tiempo real según peso (obtenido de data.js)
   - Muestra resultados a la derecha
   - Inserta los resultados en la sección "Evolución y Órdenes" y reemplaza menciones genéricas
     de medicamentos por la dosis en ml calculada (primera ocurrencia por medicamento).
*/

/* =========================
   Base de medicamentos (simple)
   - nombre -> metadata (familia, dosis mg/kg o dosis fija, concentracion mg/ml, via, max_mg)
*/
const MEDICAMENTOS = {
   "Paracetamol VO": {
    categoria: "Analgésicos",
    dosis_mg_kg: 15,
    concentracion_mg_ml: 32,
    max_mg: 1000,
    via: "VO",
    indicacion: "fiebre y dolor"
  },
  "Paracetamol EV": {
    categoria: "Analgésicos",
    dosis_mg_kg: 15,
    concentracion_mg_ml: 10,
    max_mg: 1000,
    via: "EV",
    indicacion: "fiebre y dolor"
  },
  "Dipirona EV": {
    categoria: "Analgésicos",
    dosis_mg_kg: 20,
    concentracion_mg_ml: 500,
    max_mg: 2000,
    via: "EV",
    indicacion: "fiebre y dolor"
  },
  "Ibuprofeno VO": {
    categoria: "Analgésicos",
    dosis_mg_kg: 10,
    concentracion_mg_ml: 20,
    max_mg: 600,
    via: "VO",
    indicacion: "fiebre y dolor"
  },
  "Diazepam (Rectal/IV)": {
    categoria: "Anticonvulsivantes",
    dosis_mg_kg: 0.5,
    concentracion_mg_ml: 5,
    max_mg: 10,
    via: "EV/Rectal",
    indicacion: "convulsiones"
  },
  "Fenitoína Carga EV": {
    categoria: "Anticonvulsivantes",
    dosis_mg_kg: 20,
    concentracion_mg_ml: 50,
    via: "EV",
    indicacion: "carga anticonvulsiva"
  },
  "Adrenalina IM": {
    categoria: "Reanimación",
    dosis_mg_kg: 0.01,
    concentracion_mg_ml: 1,
    max_mg: 0.5,
    via: "IM",
    indicacion: "anafilaxia"
  },
  "Adrenalina IV/IO": {
    categoria: "Reanimación",
    dosis_mg_kg: 0.01,
    concentracion_mg_ml: 1,
    max_mg: 1,
    via: "IV/IO",
    indicacion: "resucitación"
  },
  "Atropina EV": {
    categoria: "Reanimación",
    dosis_mg_kg: 0.02,
    concentracion_mg_ml: 0.4,
    max_mg: 0.5,
    min_mg: 0.1,
    via: "EV",
    indicacion: "bradicardia"
  },
  "Salbutamol Neb": {
    categoria: "Respiratorios",
    dosis_mg_kg: 0.15,
    concentracion_mg_ml: 5,
    max_mg: 5,
    via: "Nebulización",
    indicacion: "broncoespasmo"
  },
  "Ipratropio Neb": {
    categoria: "Respiratorios",
    dosis_fija: 0.5,
    concentracion_mg_ml: 0.25,
    via: "Nebulización",
    indicacion: "broncoespasmo"
  },
  "Hidrocortisona EV": {
    categoria: "Corticoides",
    dosis_mg_kg: 7,
    concentracion_mg_ml: 50,
    via: "EV",
    indicacion: "antiinflamatorio"
  },
  "Dexametasona EV/IM": {
    categoria: "Corticoides",
    dosis_mg_kg: 0.6,
    concentracion_mg_ml: 4,
    max_mg: 10,
    via: "IM/EV",
    indicacion: "crup/laringitis"
  },
  "Difenhidramina EV": {
    categoria: "Antihistamínicos",
    dosis_mg_kg: 1.25,
    concentracion_mg_ml: 10,
    max_mg: 50,
    via: "EV",
    indicacion: "antialérgico"
  },
  "Cetirizina VO": {
    categoria: "Antihistamínicos",
    dosis_mg_kg: 0.25,
    concentracion_mg_ml: 1,
    max_mg: 10,
    via: "VO",
    indicacion: "antialérgico"
  },
  "Ranitidina EV/VO": {
    categoria: "Gastrointestinales",
    dosis_mg_kg: 2,
    concentracion_mg_ml: 25,
    max_mg: 50,
    via: "EV/VO",
    indicacion: "protector gástrico"
  },
  "Metoclopramida EV": {
    categoria: "Gastrointestinales",
    dosis_mg_kg: 0.15,
    concentracion_mg_ml: 5,
    max_mg: 10,
    via: "EV",
    indicacion: "antiemético"
  },
  "Ceftriaxona EV": {
    categoria: "Antibióticos",
    dosis_mg_kg: 50,
    concentracion_mg_ml: 100,
    max_mg: 2000,
    via: "EV",
    indicacion: "antibiótico amplio espectro"
  },
  "Amoxicilina VO": {
    categoria: "Antibióticos",
    dosis_mg_kg: 50,
    concentracion_mg_ml: 125,
    max_mg: 2000,
    via: "VO",
    indicacion: "antibiótico"
  }

};

/* Estado */
let ultimosResultados = [];
let resultadosManuales = [];

/* Helper CSS safe */
function cssSafe(text) {
  return String(text).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
}

/* Generar checkboxes agrupados por categoria */
function generarCheckboxes() {
  const cont = safeGet("medicamentos-checkboxes");
  if (!cont) return;

  cont.innerHTML = "";
  const categorias = {};

  for (const nombre in MEDICAMENTOS) {
    const item = MEDICAMENTOS[nombre];
    if (!categorias[item.categoria]) categorias[item.categoria] = [];
    categorias[item.categoria].push(nombre);
  }

  for (const categoria in categorias) {
    const grupo = document.createElement("div");
    grupo.className = "medicamento-grupo";
    const titulo = document.createElement("h4");
    titulo.innerText = categoria;
    grupo.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "medicamento-grid";

    categorias[categoria].forEach(nombre => {
      const id = `chk-${cssSafe(nombre)}`;
      const wrapper = document.createElement("div");
      wrapper.className = "checkbox-item";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.value = nombre;

      const label = document.createElement("label");
      label.htmlFor = id;
      label.innerText = nombre;

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      grid.appendChild(wrapper);

      // recalcular al cambiar
      input.addEventListener('change', () => {
        handleCalcularDosis();
      });

      // mejora UX: click en wrapper togglea
      wrapper.addEventListener('click', (e) => {
        if (e.target !== input) {
          input.checked = !input.checked;
          handleCalcularDosis();
        }
      });
    });

    grupo.appendChild(grid);
    cont.appendChild(grupo);
  }
}

/* Calcular dosis para un medicamento específico según peso (kg) */
function calcularDosisMedicamento(nombre, pesoKg) {
  const med = MEDICAMENTOS[nombre];
  if (!med) return null;

  let dosisMg = null;
  if (med.hasOwnProperty('dosis_fija') && med.dosis_fija !== undefined && med.dosis_fija !== null) {
    dosisMg = med.dosis_fija;
  } else if (med.hasOwnProperty('dosis_mg_kg') && med.dosis_mg_kg !== undefined && med.dosis_mg_kg !== null) {
    dosisMg = med.dosis_mg_kg * pesoKg;
  } else {
    return null;
  }

  // límites
  if (med.max_mg && typeof med.max_mg === 'number' && dosisMg > med.max_mg) dosisMg = med.max_mg;
  if (med.min_mg && typeof med.min_mg === 'number' && dosisMg < med.min_mg) dosisMg = med.min_mg;

  // calcular ml si concentracion disponible
  let ml = null;
  if (med.concentracion_mg_ml && dosisMg && med.concentracion_mg_ml !== 0) {
    ml = roundTo(dosisMg / med.concentracion_mg_ml, 2);
  }

  return {
    nombre,
    dosisMg: (dosisMg === null || dosisMg === undefined || isNaN(dosisMg)) ? null : roundTo(dosisMg, 2),
    ml,
    via: med.via || "",
    indicacion: med.indicacion || ""
  };
}

/* Round helper */
function roundTo(num, decimals) {
  if (num === null || num === undefined || isNaN(Number(num))) return null;
  const factor = Math.pow(10, decimals || 2);
  return Math.round(Number(num) * factor) / factor;
}

/* Obtener peso según prioridad (peso ingresado en el formulario sobre todo) */
function obtenerPesoKgSegunCalculoPrioritario() {
  // preferimos campo peso (editable)
  const p = obtenerPesoKg();
  return p;
}

/* Handler principal que calcula según checkboxes seleccionados */
function handleCalcularDosis() {
  const pesoKg = obtenerPesoKgSegunCalculoPrioritario();
  const cont = safeGet("resultados-dosis");
  if (!cont) return;

  if (!isPositiveNumber(pesoKg)) {
    cont.innerHTML = "";
    ultimosResultados = [];
    return;
  }

  const resultados = [];
  const checks = document.querySelectorAll("#medicamentos-checkboxes input[type='checkbox']:checked");
  checks.forEach(chk => {
    const res = calcularDosisMedicamento(chk.value, pesoKg);
    if (res) resultados.push(res);
  });

  // incluir cálculos manuales (si implementados)
  resultadosManuales.forEach(m => resultados.push(m));

  ultimosResultados = resultados;
  mostrarResultados(resultados);
}

/* Mostrar resultados en la UI */
function mostrarResultados(lista) {
  const cont = safeGet("resultados-dosis");
  if (!cont) return;
  cont.innerHTML = "";

  if (!lista || !lista.length) return;

  lista.forEach(r => {
    const div = document.createElement("div");
    div.className = "resultado-item";

    const titulo = document.createElement("h4");
    titulo.style.margin = "0 0 6px 0";
    titulo.innerText = r.nombre;
    div.appendChild(titulo);

    const pDosis = document.createElement("p");
    pDosis.style.margin = "0";
    pDosis.innerHTML = `<strong>Dosis:</strong> ${r.dosisMg !== null ? `<span class="dosis">${r.dosisMg} mg</span>` : `<span class="dosis">N/A</span>`}`;
    div.appendChild(pDosis);

    if (r.ml !== null && r.ml !== undefined && !isNaN(Number(r.ml))) {
      const pVol = document.createElement("p");
      pVol.style.margin = "0";
      pVol.innerHTML = `<strong>Volumen:</strong> <span class="volumen">${r.ml} mL</span>`;
      div.appendChild(pVol);
    }

    const pVia = document.createElement("p");
    pVia.style.margin = "0";
    pVia.innerHTML = `<strong>Vía:</strong> <span class="via">${r.via}</span>`;
    div.appendChild(pVia);

    if (r.indicacion) {
      const pInd = document.createElement("p");
      pInd.style.margin = "6px 0 0 0";
      pInd.innerHTML = `<em>${r.indicacion}</em>`;
      div.appendChild(pInd);
    }

    cont.appendChild(div);
  });
}

/* Insertar dosis en órdenes:
   - Inserta listado de dosis calculadas en el editor de evolución y órdenes (append).
   - Además, busca menciones del nombre del medicamento en el texto y reemplaza la primera
     coincidencia con la versión que incluye el volumen calculado en mL.
*/
function insertarDosisEnOrdenes() {
  const area = safeGet("evolucion-ordenes-editor");
  if (!area) return;

  if (!ultimosResultados.length) {
    alert("No hay dosis calculadas para insertar.");
    return;
  }

  // 1) Reemplazar menciones en el texto (para cada medicamento con ml calculado)
  let texto = area.innerText || "";

  ultimosResultados.forEach(r => {
    if (r.ml === null || r.ml === undefined) return; // nada que insertar visualmente
    // Determinar cómo insertar el ml: si nombre incluye " EV" o " VO" se intenta colocar ml antes de la vía
    let replacement = r.nombre; // default
    const routeMatch = r.nombre.match(/\s(VO|EV|IM|IV|IO|EV\/IO|EV\/IM|Rectal|Neb|IM|IV|IM)/i);
    if (routeMatch) {
      // dividir para intercalar ml
      const idx = r.nombre.search(routeMatch[0]);
      const baseName = r.nombre.substring(0, idx).trim();
      const suffix = r.nombre.substring(idx).trim();
      replacement = `${baseName} ${r.ml} mL ${suffix}`;
    } else {
      replacement = `${r.nombre} ${r.ml} mL`;
    }

    // Reemplazar la primera ocurrencia del nombre (buscar con regex escapado, case-insensitive)
    const escapedName = escapeRegExp(r.nombre.split(' ').slice(0,2).join(' ')) || escapeRegExp(r.nombre);
    // Intención: buscar una mención razonable del nombre (puede existir "Paracetamol EV" o "Paracetamol")
    // Primero intentar con nombre exacto
    let regexExact = new RegExp(escapeRegExp(r.nombre), 'i');
    if (regexExact.test(texto)) {
      texto = texto.replace(regexExact, replacement);
    } else {
      // fallback: buscar por la primera palabra clave (p. ej. "Paracetamol")
      const firstWord = r.nombre.split(' ')[0];
      const regexFirst = new RegExp(`\\b${escapeRegExp(firstWord)}\\b`, 'i');
      if (regexFirst.test(texto)) {
        // Reemplazar sólo la primera ocurrencia
        texto = texto.replace(regexFirst, replacement);
      }
    }
  });

  // 2) Append listado de dosis calculadas al final (para registro)
  let appendText = "\n\n* Dosis calculadas:\n";
  ultimosResultados.forEach(r => {
    appendText += `- ${r.nombre}: ${r.dosisMg !== null ? r.dosisMg + ' mg' : 'N/A'}`;
    if (r.ml !== null && r.ml !== undefined && !isNaN(Number(r.ml))) appendText += ` (${r.ml} mL)`;
    appendText += ` vía ${r.via}.\n`;
  });

  // Asignar texto transformado + append
  area.innerText = texto + appendText;

  alert("Dosis insertadas en la sección 'Evolución y Órdenes'. Verifique antes de firmar.");
}

/* utility escape regex */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ====== funciones auxiliares para cálculos manuales (si quieres extender) ====== */
function toggleCalculoManual() {
  const seccion = safeGet("seccion-manual");
  if (!seccion) return;
  seccion.style.display = seccion.style.display === "none" ? "block" : "none";
}

function agregarCalculoManual() {
  const nombre = safeGet("nombre-manual")?.value || "";
  const dosis = parseFloat(safeGet("dosis-manual")?.value);
  const conc = parseFloat(safeGet("concentracion-manual")?.value);

  if (!nombre || isNaN(dosis) || isNaN(conc)) {
    alert("Complete los campos para el cálculo manual.");
    return;
  }

  const pesoKg = obtenerPesoKgSegunCalculoPrioritario();
  if (!isPositiveNumber(pesoKg)) {
    alert("Peso inválido.");
    return;
  }

  const dosisMg = dosis * pesoKg;
  const ml = roundTo(dosisMg / conc, 2);

  resultadosManuales.push({
    nombre,
    dosisMg: roundTo(dosisMg, 2),
    ml,
    via: "N/A",
    indicacion: "Cálculo manual"
  });

  handleCalcularDosis();
}

/* Attacher: recalcular cuando cambien checkboxes (ya manejado en generarCheckboxes) */
(function attachAutoListeners() {
  document.addEventListener('change', function(e) {
    if (e.target && e.target.matches && e.target.matches('#medicamentos-checkboxes input[type="checkbox"]')) {
      handleCalcularDosis();
    }
  });
})();
