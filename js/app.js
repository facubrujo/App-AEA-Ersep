//APP.JS NUEVO DESDE CERO //

//let tool = "boca";

const TOOL = {
    SELECT: "select",
    BOCA: "boca",
    BOCA_PARED: "bocaPared",
    TOMA: "toma",
    CABLE: "cable",
    TEXTO: "texto",
    DELETE: "delete",
    TPA: "tableroTPA",
    TPU: "tableroTS",
    INT1: "switch1",
    INT2: "switch2",
    VENTILADOR: "fan"
};

let tool = TOOL.SELECT;

// SISTEMA DE CABLEADO ---------- Dibuja linea curva

// ==============================
// SISTEMA DE CABLEADO
// ==============================

// Estado:
// 0 = esperando punto A
// 1 = esperando punto B
let cableStep = 0;

// Punto inicial del cable
let cableStart = null;

let cableEnd = null;

// cable que se está editando
let cableTemp = null;

let cableControl = null;

let cablePreview = null;

// ---- COLOR -----
let colorActual = "#000000";


// ---- TEXTO  -----
let fuenteTexto = "Arial";
let tamanioTexto = 20;
let isTyping = false;


// ==============================
// CANVAS BASE
// ==============================
const canvas = new fabric.Canvas("canvasPlano", {
    width: window.innerWidth - 200,
    height: window.innerHeight,
    selection: false
});

const LAYERS = {
    BACKGROUND: 0,
    CABLES: 1,
    SYMBOLS: 2
};

/// variables propiedades
const inputColor = document.getElementById("propColorInput");
const inputEscala = document.getElementById("propEscalaInput");
const inputAngulo = document.getElementById("propAnguloInput");

// ==============================
// ELEMENTOS DOM
// ==============================
const btnCargarPlano = document.getElementById("btnCargarPlano");
const inputPlano = document.getElementById("inputPlano");

// ==============================
// EVENTO BOTÓN → ABRIR FILE INPUT
// ==============================
btnCargarPlano.addEventListener("click", () => {
    inputPlano.click();
});

// ==============================
// CARGAR IMAGEN COMO FONDO
// ==============================
inputPlano.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (f) {

        fabric.Image.fromURL(f.target.result, function (img) {

            // ajustar escala al canvas
            const scaleX = canvas.getWidth() / img.width;
            const scaleY = canvas.getHeight() / img.height;
            const scale = Math.min(scaleX, scaleY);

            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: scale,
                scaleY: scale,
                originX: "left",
                originY: "top"
            });

        });

    };

    reader.readAsDataURL(file);
});

// ZOOM MAS PAN MAS CLICK DERECHO//

// Bloquea clic derecho (desplegable de copiar pegar guardar imagen etc)
canvas.upperCanvasEl.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// VARIABLES - ESTADO DEL PAN
let isPanning = false;
let lastX = 0;
let lastY = 0;
// CLICK DERECHO ---> INICIA PAN
canvas.upperCanvasEl.addEventListener("mousedown", function (e) {

    if (e.button !== 2) return; // solo click derecho

    isPanning = true;

    lastX = e.clientX;
    lastY = e.clientY;

    canvas.selection = false;
});
// MOVIMIENTO DEL PAN
canvas.upperCanvasEl.addEventListener("mousemove", function (e) {

    if (!isPanning) return;

    const vpt = canvas.viewportTransform;

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    vpt[4] += deltaX;
    vpt[5] += deltaY;

    canvas.requestRenderAll();

    lastX = e.clientX;
    lastY = e.clientY;
});
//SOLTAR CLICK DERECHO ----> TERMINA EL PAN
window.addEventListener("mouseup", function () {
    isPanning = false;
    canvas.selection = true;
});
// ZOOM CON RUEDA DEL MOUSE
canvas.on("mouse:wheel", function (opt) {

    let delta = opt.e.deltaY;

    let zoom = canvas.getZoom();

    zoom *= 0.999 ** delta;

    if (zoom > 5) zoom = 5;
    if (zoom < 0.2) zoom = 0.2;

    canvas.zoomToPoint(
        { x: opt.e.offsetX, y: opt.e.offsetY },
        zoom
    );

    opt.e.preventDefault();
    opt.e.stopPropagation();
});

// SECCION HERRAMIENTAS

// Sistema de herramientas simple



function setTool(t) {
    tool = t;
}

// BOTONES BARRA HERRAMIENTAS

// =====================================================
// SISTEMA DE BOTONES (TOOLS)
// =====================================================

document.getElementById("toolSelect").onclick = () => {
    //tool = "select";
    tool = TOOL.SELECT;
    actualizarCursor();
    actualizarToolUI();
    canvas.selection = true;
    console.log("🟢 SELECT activado");
};

document.getElementById("toolDelete").onclick = () => {
    //tool = "delete";
    tool = TOOL.DELETE;
    actualizarCursor();
    actualizarToolUI();
    canvas.selection = false;
    console.log("🗑️ DELETE activado");
};

// TEXTO boton

document.getElementById("toolText").onclick = () => {
    //tool = "texto";
    tool = TOOL.TEXTO;
    actualizarCursor();
    actualizarToolUI();
    console.log("📝 TEXTO activado");
};

// llamada del boton de cable
document.getElementById("toolCable").onclick = () => {

    //tool = "cable";
    tool = TOOL.CABLE;
    actualizarCursor();
    actualizarToolUI();

    cableStep = 0;
    cableStart = null;

    console.log("🔌 Modo CABLE");
};

// =====================================================
// BOCA DE ILUMINACIÓN (SVG)
// =====================================================

document.getElementById("toolBoca").onclick = () => {
    //tool = "boca";
    tool = TOOL.BOCA;
    actualizarCursor();
    actualizarToolUI();
    console.log("💡 BOCA activada");
};

// =====================================================
// BOCA DE PARED
// =====================================================

document.getElementById("toolBocaPared").onclick = () => {
    //tool = "bocaPared";
    tool = TOOL.BOCA_PARED;
    actualizarCursor();
    actualizarToolUI();
    console.log("💡 BOCA PARED activada");
};

// =====================================================
// TOMACORRIENTE
// =====================================================

document.getElementById("toolToma").onclick = () => {
    //tool = "toma";
    tool = TOOL.TOMA;
    actualizarCursor();
    actualizarToolUI();
    console.log("🔌 TOMA activada");
};

// =====================================================
// TABLEROS
// =====================================================

document.getElementById("toolTPA").onclick = () => {
    //tool = "tableroTPA";
    tool = TOOL.TPA;
    actualizarCursor();
    actualizarToolUI();
    console.log("⚡ TPA activado");
};

document.getElementById("toolTS").onclick = () => {
    //tool = "tableroTS";
    tool = TOOL.TPU;
    actualizarCursor();
    actualizarToolUI();
    console.log("⚡ TS activado");
};

// =====================================================
// INTERRUPTORES
// =====================================================

document.getElementById("toolSwitch1").onclick = () => {
    //tool = "switch1";
    tool = TOOL.INT1;
    actualizarCursor();
    actualizarToolUI();
    console.log("🔘 SWITCH 1 activado");
};

document.getElementById("toolSwitch2").onclick = () => {
    //tool = "switch2";
    tool = TOOL.INT2;
    actualizarCursor();
    actualizarToolUI();
    console.log("🔘 SWITCH 2 activado");
};

// document.getElementById("toolSwitchCombo").onclick = () => {
//     tool = "switchCombo";
//     actualizarCursor();
//     console.log("🔘 SWITCH COMBO activado");
// };

// =====================================================
// VENTILADOR
// =====================================================

document.getElementById("toolFan").onclick = () => {
    //tool = "fan";
    tool = TOOL.VENTILADOR;
    actualizarCursor();
    actualizarToolUI();
    console.log("🌀 VENTILADOR activado");
};

// ---- COLOR ----

const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", (e) => {
    colorActual = e.target.value;
    console.log("🎨 Color actual:", colorActual);
});

// CREA SIMBOLOS/OBJETOS QUE REPRESENTAN DESCRIPCION DE LOS BOTONES


function aplicarColor(obj, color) {

    // 🔥 SIEMPRE: color de líneas
    obj.set({
        stroke: color
    });

    // ❌ NUNCA tocar fill del grupo completo
    // obj.set({ fill: color });  ← ESTO ES EL ERROR

    // 🔥 recorrer SVG interno
    if (obj._objects) {

        obj._objects.forEach(o => {

            o.set({
                stroke: color
            });

            // 🚨 SOLO permitir fill si es explícitamente necesario
            // pero por defecto lo neutralizamos
            //if (o.fill && o.fill !== "none") {
            //if (!o.fill || o.fill === "none") {
            o.set({
                // fill: o.fill   // mantener original
                fill: "white"
            });
            //}
        });
    }

    obj.dirty = true;
}
async function crearSimbolo(x, y, tipo) {

    let obj = null;

    switch (tipo) {

        // ======================
        // BOCA TECHO
        // ======================
        case TOOL.BOCA:
            obj = await crearBocaSVG(x, y);
            obj.nombre = "Boca de techo";
            obj.icono = "💡";
            break;

        // ======================
        // BOCA PARED
        // ======================
        case TOOL.BOCA_PARED:
            obj = await crearSVG(SVG_BOCA_PARED, x, y, 0.15);
            obj.nombre = "Boca de pared";
            obj.icono = "💡";
            break;

        // ======================
        // TOMACORRIENTE
        // ======================
        case TOOL.TOMA:
            obj = await crearSVG(SVG_TOMA, x, y, 0.15);
            obj.nombre = "Tomacorriente";
            obj.icono = "🔌";
            break;

        // ======================
        // TABLERO PRINCIPAL
        // ======================
        case TOOL.TPA:
            obj = await crearSVG(SVG_TPA, x, y, 0.15);
            obj.nombre = "Tablero Principal";
            obj.icono = "⚡";
            break;

        // ======================
        // TABLERO SECCIONAL
        // ======================
        case TOOL.TPU:
            obj = await crearSVG(SVG_TS, x, y, 0.15);
            obj.nombre = "Tablero Seccional";
            obj.icono = "⚡";
            break;

        // ======================
        // INTERRUPTOR SIMPLE
        // ======================
        case TOOL.INT1:
            obj = await crearSVG(SVG_SWITCH_1, x, y, 0.15);
            obj.nombre = "Interruptor simple";
            obj.icono = "🔘";
            break;

        // ======================
        // INTERRUPTOR DOBLE
        // ======================
        case TOOL.INT2:
            obj = await crearSVG(SVG_SWITCH_2, x, y, 0.15);
            obj.nombre = "Interruptor doble";
            obj.icono = "🔘";
            break;

        // ======================
        // VENTILADOR
        // ======================
        case TOOL.VENTILADOR:
            obj = await crearSVG(SVG_FAN, x, y, 0.15);
            obj.nombre = "Ventilador";
            obj.icono = "🌀";
            break;

        default:
            console.warn("Tipo no reconocido:", tipo);
            return;
    }

    // ======================
    // VALIDACIÓN SEGURA
    // ======================
    if (!obj) {
        console.warn("⚠️ símbolo no creado:", tipo);
        return;
    }

    // ======================
    // COLOR GLOBAL
    // ======================
    aplicarColor(obj, colorActual);

    // ======================
    // SOMBRA
    // ======================
    obj.set({
        shadow: new fabric.Shadow({
            color: "rgba(255,255,255,1)",
            blur: 50,
            offsetX: 0,
            offsetY: 0
        })
    });

    // ======================
    // METADATA BASE
    // ======================
    obj.tipo = tipo;

    // ======================
    // INSERTAR EN CAPA SYMBOLS
    // ======================
    canvas.insertAt(obj, LAYERS.SYMBOLS);

    ordenarCapas();

    console.log("✔ Creado:", tipo);
}
// MOUSE DOWN - Click izquierdo
// COORDENADAS DONDE SE INSTANCIAN LOS OBJETOS SOBRE EL MAPA/PLANO
// Click en Canvas (USAR SIEMPRE COORDENADAS DE CANVAS!!)

canvas.on("mouse:down", async function (opt) {

    if (isTyping) return;

    if (opt.button === 2) return;

    const pointer = canvas.getPointer(opt.e);
    const target = opt.target;

    // =====================
    // BORRAR
    // =====================
    if (tool === "delete") {
        if (target) borrarObjeto(target);
        return;
    }

    // =====================
    // SELECT
    // =====================
    if (tool === "select") {
        return;
    }

    //======================
    // TEXTO
    //======================
    if (tool === "texto") {
        isTyping = true;

        const texto = new fabric.IText("Escriba...", {

            left: pointer.x,
            top: pointer.y,

            fontFamily: fuenteTexto,
            fontSize: tamanioTexto,

            fill: colorActual,

            originX: "center",
            originY: "center",

            editable: true
        });

        texto.tipo = "texto";

        canvas.insertAt(texto, LAYERS.SYMBOLS);

        canvas.setActiveObject(texto);

        texto.enterEditing();

        texto.on("editing:exited", function () {

            isTyping = false;

            const contenido = texto.text.trim();

            // 🔥 CASO VACÍO O SOLO PLACEHOLDER
            if (contenido === "" || contenido === "Escriba...") {
                canvas.remove(texto);
                canvas.requestRenderAll();

                tool = TOOL.SELECT;
                actualizarCursor();
                actualizarToolUI();

                return;
            }

            tool = TOOL.SELECT;
            actualizarCursor();
            actualizarToolUI();

            canvas.setActiveObject(texto);
            canvas.requestRenderAll();

            console.log("Texto terminado");
        });

        texto.selectAll();

        return;
    }

    // =====================
    // CABLE MODE
    // =====================
    if (tool === "cable") {

        // CLICK 1 → A
        // if (cableStep === 0) {

        //     cableStart = pointer;
        //     cableStep = 1;
        //     return;
        // }
        if (cableStep === 0) {

            cableStart = pointer;
            cableStep = 1;

            // 🔥 crear preview visual inmediata
            cablePreview = new fabric.Path("", {
                fill: "",
                stroke: colorActual,
                strokeWidth: 2,
                selectable: false,
                evented: false,
                opacity: 0.6
            });

            canvas.add(cablePreview);

            return;
        }

        // CLICK 2 → B
        // if (cableStep === 1) {

        //     cableEnd = pointer;
        //     cableStep = 2;

        //     cableControl = {
        //         x: (cableStart.x + cableEnd.x) / 2,
        //         y: (cableStart.y + cableEnd.y) / 2
        //     };

        //     cableTemp = new fabric.Path("", {
        //         fill: "",
        //         stroke: colorActual,
        //         strokeWidth: 2,
        //         selectable: false,
        //         evented: false
        //     });

        //     canvas.add(cableTemp);

        //     return;
        // }
        if (cableStep === 1) {

            cableEnd = pointer;
            cableStep = 2;

            return;
        }

        // CLICK 3 → fijar curva
        // if (cableStep === 2) {

        //     cableControl = pointer;

        //     cableStep = 0;

        //     return;
        // }
        if (cableStep === 2) {

            cableControl = pointer;

            // 🔥 reemplazar preview por cable definitivo
            canvas.remove(cablePreview);
            ordenarCapas();

            const finalPath = new fabric.Path(`
        M ${cableStart.x} ${cableStart.y}
        Q ${cableControl.x} ${cableControl.y}
        ${cableEnd.x} ${cableEnd.y}
    `, {
                fill: "",
                stroke: colorActual,
                strokeWidth: 2,
                selectable: false,
                evented: false
            });

            canvas.add(finalPath);
            ordenarCapas();

            cablePreview = null;
            cableStep = 0;

            return;
        }
    }


    // =====================
    // MODO NORMAL (BOCAS ETC)
    // =====================
    await crearSimbolo(pointer.x, pointer.y, tool);
    actualizarContadores();
});

// canvas.on("mouse:move", function (opt) {

//     if (tool !== "cable") return;
//     if (cableStep !== 2) return;

//     const p = canvas.getPointer(opt.e);

//     const path = `
//         M ${cableStart.x} ${cableStart.y}
//         Q ${p.x} ${p.y}
//         ${cableEnd.x} ${cableEnd.y}
//     `;

//     canvas.remove(cableTemp);

//     cableTemp = new fabric.Path(path, {
//         fill: "",
//         stroke: colorActual,
//         strokeWidth: 2,
//         selectable: false,
//         evented: false
//     });

//     canvas.insertAt(cableTemp, LAYERS.CABLES);
//     //canvas.add(cableTemp);
// });
canvas.on("mouse:move", function (opt) {

    if (tool !== TOOL.CABLE) return;
    if (!cableStart || cableStep === 0) return;

    const p = canvas.getPointer(opt.e);

    const end = cableStep === 1 ? p : cableEnd;

    if (!end) return;

    const pathData = `
        M ${cableStart.x} ${cableStart.y}
        Q ${p.x} ${p.y}
        ${end.x} ${end.y}
    `;

    // borrar preview anterior
    if (cablePreview) {
        canvas.remove(cablePreview);
    }

    cablePreview = new fabric.Path(pathData, {
        fill: "",
        stroke: colorActual,
        strokeWidth: 2,
        selectable: false,
        evented: false,
        opacity: 0.5
    });

    canvas.insertAt(cablePreview, LAYERS.CABLES);
    ordenarCapas();
    canvas.requestRenderAll();
});

// HERRAMIENTA SELECCIONAR

// Variables, estado de herramienta
//let tool = "boca";

// Boton seleccionar

document.getElementById("toolSelect").onclick = () => {
    //tool = "select";
    tool = TOOL.SELECT;
    actualizarToolUI();

    // habilitar selección global de Fabric
    canvas.selection = true;
    canvas.forEachObject(obj => {
        obj.selectable = true;
        obj.evented = true;
    });

    console.log("Modo selección activado");
};

// HERRAMIENTA BORRAR 

// -- boton borrar

document.getElementById("toolDelete").onclick = () => {
    //tool = "delete";
    tool = TOOL.DELETE;
    actualizarToolUI();

    canvas.selection = false;

    console.log("🗑️ Modo BORRADO activo");
};

// Metodo para borrar objetos

function borrarObjeto(obj) {

    if (!obj) return;

    console.log("Eliminando objeto:", obj.tipo || "desconocido");

    canvas.remove(obj);

    actualizarContadores();
};

//ToolTip 

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

const tooltipList = [...tooltipTriggerList].map(el => {
    return new bootstrap.Tooltip(el);
});




function actualizarContadores() {

    const objs = canvas.getObjects();

    //const bocas = objs.filter(o => o.tipo === "boca").length;
    const bocas = objs.filter(o =>
        o.tipo === "boca" ||
        o.tipo === "bocaPared" ||
        o.tipo === "fan"
    ).length;
    const tomas = objs.filter(o => o.tipo === "toma").length;
    const tableros = objs.filter(o => o.tipo?.includes("tablero")).length;
    const cables = objs.filter(o => o.stroke && !o.tipo).length;

    document.getElementById("countBocas").textContent = bocas;
    document.getElementById("countTomas").textContent = tomas;
    document.getElementById("countTableros").textContent = tableros;
    document.getElementById("countCables").textContent = cables;
}

// Panel de propiedades
// herramienta activa

function actualizarToolUI() {

    const label = document.getElementById("toolActivo");

    switch (tool) {
        case "select":
            label.textContent = "Seleccionar";
            break;
        case "boca":
            label.textContent = "Boca techo";
            break;
        case "bocaPared":
            label.textContent = "Boca pared";
            break;
        case "toma":
            label.textContent = "Tomacorriente";
            break;
        case "cable":
            label.textContent = "Cableado";
            break;
        case "texto":
            label.textContent = "Texto";
            break;
        case "delete":
            label.textContent = "Borrar";
            break;
        default:
            label.textContent = tool;
    }
}

// ---- CURSOR DEL RATON
function actualizarCursor() {

    switch (tool) {

        case "select":
            canvas.defaultCursor = "default";
            break;

        case "texto":
            canvas.defaultCursor = "text"; // cursor I
            break;

        case "cable":
            canvas.defaultCursor = "crosshair"; // mira +
            break;

        case "delete":
            canvas.defaultCursor = "not-allowed"; // o "crosshair"
            break;

        default:
            canvas.defaultCursor = "default";
    }
}

window.addEventListener("keydown", function (e) {

    if (e.key !== "Escape") return;

    console.log("⛔ ESC presionado → cancelar acción");

    // =========================
    // CANCELAR TEXTO
    // =========================
    if (isTyping) {
        const active = canvas.getActiveObject();
        if (active && active.isEditing) {
            active.exitEditing();
        }
        isTyping = false;
    }

    // =========================
    // CANCELAR CABLE
    // =========================
    if (tool === TOOL.CABLE) {

        cableStep = 0;
        cableStart = null;
        cableEnd = null;
        cableControl = null;

        if (cablePreview) {
            canvas.remove(cablePreview);
            cablePreview = null;
        }

        console.log("🔌 Cable cancelado");
    }

    // =========================
    // LIMPIAR SELECCIÓN
    // =========================
    canvas.discardActiveObject();
    canvas.requestRenderAll();

    // =========================
    // VOLVER A SELECT
    // =========================
    tool = TOOL.SELECT;
    actualizarToolUI();
    actualizarCursor();
});


function ordenarCapas() {

    const objects = canvas.getObjects();

    objects.forEach(obj => {

        // no tocar background
        if (obj === canvas.backgroundImage) return;

        // cables abajo
        if (obj.stroke && !obj.tipo) {
            canvas.sendToBack(obj);
        }
    });

    // y asegurar símbolos arriba de cables
    objects.forEach(obj => {

        if (obj.tipo) {
            canvas.bringToFront(obj);
        }
    });

}

// propiedades de objetos

function mostrarPropiedades(obj) {

    document.getElementById("propSeleccion").style.display = "block";
    document.getElementById("propSinSeleccion").style.display = "none";

    document.getElementById("propIcono").textContent = obj.icono || "❓";

    document.getElementById("propNombre").textContent = obj.nombre || obj.tipo;

    document.getElementById("propColorInput").value = obj.stroke || "#000000";

    const escala = Math.round((obj.scaleX || 1) * 100);
    document.getElementById("propEscalaInput").value = escala;
    document.getElementById("propEscala").textContent = escala + "%";

    const angulo = Math.round(obj.angle || 0);
    document.getElementById("propAnguloInput").value = angulo;
    document.getElementById("propAngulo").textContent = angulo + "°";

    console.log("MOSTRANDO PROPIEDADES", obj);
    // if (inputColor) inputColor.value = obj.stroke || "#000000";
    // if (inputEscala) inputEscala.value = Math.round((obj.scaleX || 1) * 100);
    // if (inputAngulo) inputAngulo.value = Math.round(obj.angle || 0);
}



let objetoSeleccionado = null;

function ocultarPropiedades() {

    document.getElementById("propSeleccion").style.display = "none";

    document.getElementById("propSinSeleccion").style.display = "block";

}


// ==============================
// EDITOR DE PROPIEDADES
// ==============================



inputColor?.addEventListener("input", function (e) {
    if (!objetoSeleccionado) return;

    const color = e.target.value;

    objetoSeleccionado.set({
        stroke: color
    });

    // para SVG internos
    if (objetoSeleccionado._objects) {
        objetoSeleccionado._objects.forEach(o => {
            o.set({ stroke: color });
        });
    }

    // // si tiene fill interno (SVG o texto)
    // if (objetoSeleccionado.set) {
    //     objetoSeleccionado.set({ fill: color });
    // }

    canvas.requestRenderAll();
});

inputEscala?.addEventListener("input", function (e) {
    if (!objetoSeleccionado) return;

    let scale = parseFloat(e.target.value) / 100;

    if (isNaN(scale) || scale <= 0) return;

    objetoSeleccionado.set({
        scaleX: scale,
        scaleY: scale
    });

    canvas.requestRenderAll();
    mostrarPropiedades(objetoSeleccionado);
});

inputAngulo?.addEventListener("input", function (e) {
    if (!objetoSeleccionado) return;

    let angle = parseFloat(e.target.value);

    if (isNaN(angle)) return;

    objetoSeleccionado.set({
        angle: angle
    });

    canvas.requestRenderAll();
    mostrarPropiedades(objetoSeleccionado);
});




canvas.on("selection:created", function (e) {
    objetoSeleccionado = e.selected[0];
    mostrarPropiedades(objetoSeleccionado);
});

canvas.on("selection:updated", function (e) {
    objetoSeleccionado = e.selected[0];
    mostrarPropiedades(objetoSeleccionado);
});

canvas.on("selection:cleared", function () {
    objetoSeleccionado = null;
    ocultarPropiedades();
});


//==============================
// MENÚ DE SÍMBOLOS ELÉCTRICOS
//==============================

const btnElectricos = document.getElementById("btnElectricos");
const menuElectricos = document.getElementById("menuElectricos");

btnElectricos.addEventListener("click", function(e){

    e.stopPropagation();

    menuElectricos.classList.toggle("show");

});

// cerrar al hacer click fuera

document.addEventListener("click", function(){

    menuElectricos.classList.remove("show");

});

// impedir que se cierre al pulsar dentro

menuElectricos.addEventListener("click", function(e){

    e.stopPropagation();

});

menuElectricos.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",function(){

        menuElectricos.classList.remove("show");

    });

});

const panel = document.getElementById("panelRight");
const btn = document.getElementById("btnPanelPropiedades");

btn.addEventListener("click", () => {
    panel.classList.toggle("open");
});


//------------------------------------------


//let canvas = new fabric.Canvas("canvasPlano");

let lastDist = null;

function getDistance(touches) {
    let dx = touches[0].clientX - touches[1].clientX;
    let dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

canvas.upperCanvasEl.addEventListener("touchmove", function (e) {

    if (e.touches.length === 2) {
        e.preventDefault();

        let dist = getDistance(e.touches);

        if (lastDist) {
            let zoom = canvas.getZoom();
            let delta = dist / lastDist;

            zoom *= delta;

            zoom = Math.min(3, Math.max(0.5, zoom));

            canvas.setZoom(zoom);
        }

        lastDist = dist;
    }
});

canvas.upperCanvasEl.addEventListener("touchend", function () {
    lastDist = null;
});


let isDragging = false;
let lastPosX, lastPosY;

canvas.upperCanvasEl.addEventListener("touchstart", function (e) {
    if (e.touches.length === 1) {
        isDragging = true;
        lastPosX = e.touches[0].clientX;
        lastPosY = e.touches[0].clientY;
    }
});

canvas.upperCanvasEl.addEventListener("touchmove", function (e) {

    if (isDragging && e.touches.length === 1) {
        e.preventDefault();

        let vpt = canvas.viewportTransform;

        vpt[4] += e.touches[0].clientX - lastPosX;
        vpt[5] += e.touches[0].clientY - lastPosY;

        canvas.requestRenderAll();

        lastPosX = e.touches[0].clientX;
        lastPosY = e.touches[0].clientY;
    }
});

canvas.upperCanvasEl.addEventListener("touchend", function () {
    isDragging = false;
});