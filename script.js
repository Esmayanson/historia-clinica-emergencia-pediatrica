// Constante de conversión de peso: 1 kg = 2.20462 lb
const LB_POR_KG = 2.20462; // 

// 💊 Datos de Medicamentos (Fórmulas Anexas)
// Almacenamos la Dosis Estándar, la Concentración Común, y la Categoría [cite: 39, 42, 44, 46, 48, 50, 52]
const MEDICAMENTOS = {
    // Analgésicos y Antipiréticos [cite: 41, 42]
    "Paracetamol (Acetaminofén)": { categoria: "Analgésicos", dosis_mg_kg: 15, concentracion_mg_ml: 24, max_mg: null },
    "Dipirona (Metamizol)": { categoria: "Analgésicos", dosis_mg_kg: 30, concentracion_mg_ml: 500, max_mg: null },
    "Neumulubrina": { categoria: "Analgésicos", dosis_mg_kg: 30, concentracion_mg_ml: 500, max_mg: null }, // Sinónimo de Dipirona [cite: 52]
    "Diclofenac": { categoria: "Analgésicos", dosis_mg_kg: 1, concentracion_mg_ml: 15, max_mg: null },
    "Ketorolaco": { categoria: "Analgésicos", dosis_mg_kg: 0.5, concentracion_mg_ml: 15, max_mg: 30 }, // Máximo 30 mg 

    // Anticonvulsivantes [cite: 43, 44]
    "Diazepam (Rectal, IV)": { categoria: "Anticonvulsivantes", dosis_mg_kg: 0.5, concentracion_mg_ml: 5, max_mg: null },
    "Fenitoína Carga": { categoria: "Anticonvulsivantes", dosis_mg_kg: 20, concentracion_mg_ml: 50, max_mg: null },
    "Fenitoína Mantenimiento": { categoria: "Anticonvulsivantes", dosis_mg_kg: 7.5, concentracion_mg_ml: 50, max_mg: null },

    // Respiratorios y Reanimación [cite: 45, 46]
    "Adrenalina (Resucitación IV/IO)": { categoria: "Reanimación", dosis_mg_kg: 0.01, concentracion_mg_ml: 1, max_mg: null },
    "Atropina (Reanimación)": { categoria: "Reanimación", dosis_mg_kg: 0.02, concentracion_mg_ml: 0.4, max_mg: null, min_mg: 0.1 }, // Mínimo 0.1 mg [cite: 46]
    "Salbutamol (Nebulizar)": { categoria: "Respiratorios", dosis_mg_kg: 0.15, concentracion_mg_ml: 5, max_mg: 5 }, // Máximo 5 mg [cite: 46]

    // Antihistamínicos y Corticoides [cite: 47, 48]
    "Hidrocortisona (Shock/Asma)": { categoria: "Corticoides", dosis_mg_kg: 7, concentracion_mg_ml: 50, max_mg: null },
    "Dexametasona (Crup)": { categoria: "Corticoides", dosis_mg_kg: 0.6, concentracion_mg_ml: 4, max_mg: null },
    "Difenhidramina": { categoria: "Antihistamínicos", dosis_mg_kg: 1.25, concentracion_mg_ml: 2.5, max_mg: null }, // Jarabe 12.5 mg/5 mL = 2.5 mg/mL [cite: 48]

    // Gastrointestinales [cite: 49, 50, 55]
    "Ranitidina (IV/Oral)": { categoria: "Gastrointestinales", dosis_mg_kg: 2, concentracion_mg_ml: 25, max_mg: null },
    "Metoclopramida": { categoria: "Gastrointestinales", dosis_mg_kg: 0.15, concentracion_mg_ml: 5, max_mg: null },
    "Domperidona (Dramidom)": { categoria: "Gastrointestinales", dosis_mg_kg: 0.3, concentracion_mg_ml: 1, max_mg: null }, // Dramidom = Domperidona [cite: 52]
    "Sertal Simple (Propinox)": { categoria: "Gastrointestinales", dosis_mg_kg: 0.4, concentracion_mg_ml: null, max_mg: null, solo_mg: true } // Solo se calcula en mg [cite: 55]
};

// Función para obtener los medicamentos agrupados por categoría
function agruparMedicamentos(meds) {
    const grupos = {};
    for (const nombre in meds) {
        const categoria = meds[nombre].categoria;
        if (!grupos[categoria]) {
            grupos[categoria] = [];
        }
        grupos[categoria].push(nombre);
    }
    return grupos;
}

// Generar dinámicamente los checkboxes de medicamentos [cite: 19, 20]
function generarCheckboxes() {
    const contenedor = document.getElementById('medicamentos-checkboxes');
    contenedor.innerHTML = '';
    const grupos = agruparMedicamentos(MEDICAMENTOS);

    for (const categoria in grupos) {
        let html = `<div class="medicamento-grupo"><h4>${categoria}</h4>`;
        grupos[categoria].forEach(nombre => {
            html += `
                <div class="checkbox-item">
                    <input type="checkbox" id="med-${nombre.replace(/\s/g, '-')}" name="medicamentos" value="${nombre}">
                    <label for="med-${nombre.replace(/\s/g, '-')}" title="Dosis: ${MEDICAMENTOS[nombre].dosis_mg_kg} mg/kg, Conc: ${MEDICAMENTOS[nombre].concentracion_mg_ml ? MEDICAMENTOS[nombre].concentracion_mg_ml + ' mg/mL' : 'N/A'}">${nombre}</label>
                </div>
            `;
        });
        html += `</div>`;
        contenedor.innerHTML += html;
    }
}

// --------------------------------------------------------------------------------
// Lógica de Validación y Conversión [cite: 18, 40]
// --------------------------------------------------------------------------------

// Función de conversión de Libras a Kilogramos
function lbToKg(libras) {
    return libras / LB_POR_KG;
}

// Función principal de validación y obtención de peso en kg
function obtenerPesoKg() {
    const inputPeso = document.getElementById('peso');
    const pesoString = inputPeso.value;

    if (!pesoString || isNaN(parseFloat(pesoString)) || parseFloat(pesoString) <= 0) {
        mostrarError("Por favor, ingrese un valor de peso válido y positivo.", inputPeso);
        return null;
    }

    let peso = parseFloat(pesoString);
    const unidadActiva = document.querySelector('.unidad-selector button.activo').dataset.unidad;

    // Convertir a KG si la unidad activa es Libras (lb) 
    if (unidadActiva === 'lb') {
        peso = lbToKg(peso);
    }

    return peso; // Peso en Kilogramos (kg)
}

// --------------------------------------------------------------------------------
// Motor de Cálculo [cite: 23, 38]
// --------------------------------------------------------------------------------

// Función de cálculo de dosis para un medicamento
function calcularDosis(nombre, info, peso_kg) {
    const dosis_mg_kg = info.dosis_mg_kg;
    const concentracion_mg_ml = info.concentracion_mg_ml;
    const max_mg = info.max_mg;
    const min_mg = info.min_mg;
    const solo_mg = info.solo_mg;

    // 1. Cálculo de Dosis Total (mg) [cite: 33]
    let dosisTotalMg = peso_kg * dosis_mg_kg;

    // 2. Aplicar dosis mínima
    if (min_mg && dosisTotalMg < min_mg) {
        dosisTotalMg = min_mg;
    }

    // 3. Aplicar dosis máxima [cite: 35]
    let dosisMaximaMg = null;
    if (max_mg) {
        dosisMaximaMg = max_mg;
        if (dosisTotalMg > max_mg) {
            // La dosis normal no excederá la dosis máxima
            dosisTotalMg = max_mg;
        }
    }

    // 4. Cálculo de Volumen (mL) [cite: 34]
    let dosisVolumenMl = null;
    let dosisMaximaVolumenMl = null;

    if (concentracion_mg_ml && !solo_mg) {
        dosisVolumenMl = dosisTotalMg / concentracion_mg_ml;

        if (max_mg) {
            dosisMaximaVolumenMl = max_mg / concentracion_mg_ml;
        }
    }

    // Formatear resultados a 2 decimales
    dosisTotalMg = dosisTotalMg.toFixed(2);
    dosisVolumenMl = dosisVolumenMl !== null ? dosisVolumenMl.toFixed(2) : null;
    dosisMaximaMg = dosisMaximaMg !== null ? dosisMaximaMg.toFixed(2) : null;
    dosisMaximaVolumenMl = dosisMaximaVolumenMl !== null ? dosisMaximaVolumenMl.toFixed(2) : null;

    return {
        nombre: nombre,
        dosis_mg: dosisTotalMg,
        dosis_ml: dosisVolumenMl,
        max_mg: dosisMaximaMg,
        max_ml: dosisMaximaVolumenMl,
        concentracion: concentracion_mg_ml // para referencia
    };
}

// Función para mostrar los resultados en la columna derecha [cite: 29, 30]
function mostrarResultados(resultados, peso_kg) {
    const contenedor = document.getElementById('resultados-dosis');
    contenedor.innerHTML = '';

    if (resultados.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-placeholder">No se seleccionó ningún medicamento o el peso no es válido.</p>';
        return;
    }

    let html = `<h3>Peso del Paciente: ${peso_kg.toFixed(2)} kg</h3>`;

    resultados.forEach(res => {
        html += `
            <div class="resultado-item">
                <h4>${res.nombre}</h4>
                <p><strong>Dosis Normal Total:</strong> ${res.dosis_mg} mg</p>
        `;

        // Mostrar Volumen si aplica
        if (res.dosis_ml !== null) {
            html += `<p><strong>Dosis Normal en Volumen:</strong> ${res.dosis_ml} mL (Conc: ${res.concentracion} mg/mL)</p>`;
        } else {
            html += `<p><strong>Dosis Normal en Volumen:</strong> N/A (Concentración no definida o sólo mg)</p>`;
        }

        // Mostrar Dosis Máxima si aplica [cite: 35, 36]
        if (res.max_mg !== null) {
            html += `<p><strong>Dosis Máxima Total:</strong> ${res.max_mg} mg</p>`;
            if (res.max_ml !== null) {
                html += `<p><strong>Dosis Máxima en Volumen:</strong> ${res.max_ml} mL</p>`;
            }
        }

        html += `</div>`;
    });

    contenedor.innerHTML = html;
}

// Manejador de eventos principal: CALCULAR DOSIS
function handleCalcularDosis() {
    // 1. Limpiar errores
    limpiarErrores();

    // 2. Obtener y validar el peso en kg [cite: 40]
    const peso_kg = obtenerPesoKg();
    if (peso_kg === null) return;

    // 3. Obtener medicamentos seleccionados 
    const checkboxes = document.querySelectorAll('#medicamentos-checkboxes input[type="checkbox"]:checked');
    const medicamentosSeleccionados = Array.from(checkboxes).map(cb => cb.value);

    // 4. Calcular dosis para cada medicamento
    const resultados = [];
    medicamentosSeleccionados.forEach(nombre => {
        const info = MEDICAMENTOS[nombre];
        if (info) {
            resultados.push(calcularDosis(nombre, info, peso_kg));
        }
    });

    // 5. Mostrar resultados
    mostrarResultados(resultados, peso_kg);
}

// --------------------------------------------------------------------------------
// Lógica de Cálculo Manual [cite: 24, 25, 26, 27]
// --------------------------------------------------------------------------------

// Array para guardar resultados manuales temporalmente junto a los predefinidos
let resultadosManuales = [];

function handleCalcularManual() {
    limpiarErrores();

    const peso_kg = obtenerPesoKg();
    if (peso_kg === null) return;

    const nombre = document.getElementById('nombre-manual').value.trim();
    const dosisMgKg = parseFloat(document.getElementById('dosis-manual').value);
    const concentracionMgMl = parseFloat(document.getElementById('concentracion-manual').value);

    if (!nombre || isNaN(dosisMgKg) || dosisMgKg <= 0 || isNaN(concentracionMgMl) || concentracionMgMl <= 0) {
        mostrarError("Ingrese un nombre, dosis (mg/kg) y concentración (mg/mL) válidos y positivos para el cálculo manual.", document.getElementById('seccion-manual'));
        return;
    }

    const infoManual = {
        categoria: "Manual",
        dosis_mg_kg: dosisMgKg,
        concentracion_mg_ml: concentracionMgMl,
        max_mg: null,
        min_mg: null,
        solo_mg: false
    };

    // Calcular y añadir el resultado manual
    const resultado = calcularDosis(`(MANUAL) ${nombre}`, infoManual, peso_kg);
    resultadosManuales.push(resultado);

    // Limpiar campos del formulario manual y notificar
    document.getElementById('nombre-manual').value = '';
    document.getElementById('dosis-manual').value = '';
    document.getElementById('concentracion-manual').value = '';
    alert(`Dosis manual de ${nombre} calculada y lista para ser incluida en la lista principal.`);
}

// Función para combinar resultados predefinidos y manuales y mostrarlos
function combinarYMostrarResultados() {
    limpiarErrores();

    const peso_kg = obtenerPesoKg();
    if (peso_kg === null) return;

    // Resultados de la selección predefinida
    const checkboxes = document.querySelectorAll('#medicamentos-checkboxes input[type="checkbox"]:checked');
    const medicamentosSeleccionados = Array.from(checkboxes).map(cb => cb.value);
    const resultadosPredefinidos = medicamentosSeleccionados.map(nombre => calcularDosis(nombre, MEDICAMENTOS[nombre], peso_kg));

    // Combinar y mostrar
    const resultadosFinales = resultadosPredefinidos.concat(resultadosManuales);
    mostrarResultados(resultadosFinales, peso_kg);
}


// --------------------------------------------------------------------------------
// Utilidades y Listeners
// --------------------------------------------------------------------------------

function mostrarError(mensaje, elementoRelacionado = null) {
    const contenedor = document.getElementById('resultados-dosis');
    contenedor.innerHTML = `<div class="error-message">${mensaje}</div>`;
    if (elementoRelacionado) {
        elementoRelacionado.focus();
    }
}

function limpiarErrores() {
    // Si hay un error, lo limpia para mostrar los resultados correctos
    if(document.querySelector('.error-message')) {
        document.getElementById('resultados-dosis').innerHTML = '<p class="mensaje-placeholder">Presiona "CALCULAR DOSIS" para ver los resultados aquí.</p>';
    }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    generarCheckboxes(); // Genera los checkboxes al cargar [cite: 19]

    // Listeners para el cambio de unidad de peso 
    const btnLb = document.getElementById('btn-lb');
    const btnKg = document.getElementById('btn-kg');
    const inputPeso = document.getElementById('peso');
    
    // Configuración inicial del input
    btnLb.classList.add('activo'); // Libras es la opción predeterminada 
    inputPeso.placeholder = "Peso en Libras";

    function cambiarUnidad(unidad) {
        if (unidad === 'kg') {
            btnKg.classList.add('activo');
            btnLb.classList.remove('activo');
            inputPeso.placeholder = "Peso en Kilogramos";
        } else {
            btnLb.classList.add('activo');
            btnKg.classList.remove('activo');
            inputPeso.placeholder = "Peso en Libras";
        }
    }

    btnLb.addEventListener('click', () => cambiarUnidad('lb'));
    btnKg.addEventListener('click', () => cambiarUnidad('kg'));


    // Listener para el botón principal CALCULAR DOSIS [cite: 23]
    document.getElementById('btn-calcular').addEventListener('click', combinarYMostrarResultados);

    // Listener para el botón de cálculo manual 
    document.getElementById('btn-manual').addEventListener('click', () => {
        const seccionManual = document.getElementById('seccion-manual');
        // Muestra u oculta la sección modal/formulario
        seccionManual.style.display = seccionManual.style.display === 'none' ? 'block' : 'none';
    });

    // Listener para el botón de cálculo manual dentro del formulario
    document.getElementById('btn-calcular-manual').addEventListener('click', handleCalcularManual);
});