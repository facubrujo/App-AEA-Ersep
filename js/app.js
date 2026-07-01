//APP.JS NUEVO DESDE CERO //

// ==============================
// CANVAS BASE
// ==============================
const canvas = new fabric.Canvas("canvasPlano", {
    width: window.innerWidth - 200,
    height: window.innerHeight,
    selection: false
});

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

let tool = "boca";

function setTool(t) {
    tool = t;
}

// BOTONES BARRA HERRAMIENTAS

// -------- Primer sistema de botones -------------
// document.getElementById("toolBoca").onclick = () => setTool("boca");
// document.getElementById("toolToma").onclick = () => setTool("toma");
// document.getElementById("toolTablero").onclick = () => setTool("tablero");
// -------- Segundo Sistem de Bot. Seleccion de objetos --------------
// document.getElementById("toolBoca").onclick = () => {
//     tool = "boca";
//     canvas.selection = false;
// };

// document.getElementById("toolToma").onclick = () => {
//     tool = "toma";
//     canvas.selection = false;
// };

// document.getElementById("toolTablero").onclick = () => {
//     tool = "tablero";
//     canvas.selection = false;
// };
// =====================================================
// SISTEMA DE BOTONES (TOOLS)
// =====================================================

document.getElementById("toolSelect").onclick = () => {
    tool = "select";
    canvas.selection = true;
    console.log("🟢 SELECT activado");
};

document.getElementById("toolDelete").onclick = () => {
    tool = "delete";
    canvas.selection = false;
    console.log("🗑️ DELETE activado");
};

document.getElementById("toolCable").onclick = () => {
    tool = "cable";
    console.log("🔌 CABLE activado");
};

// =====================================================
// BOCA DE ILUMINACIÓN (SVG)
// =====================================================

document.getElementById("toolBoca").onclick = () => {
    tool = "boca";
    console.log("💡 BOCA activada");
};

// =====================================================
// BOCA DE PARED
// =====================================================

document.getElementById("toolBocaPared").onclick = () => {
    tool = "bocaPared";
    console.log("💡 BOCA PARED activada");
};

// =====================================================
// TOMACORRIENTE
// =====================================================

document.getElementById("toolToma").onclick = () => {
    tool = "toma";
    console.log("🔌 TOMA activada");
};

// =====================================================
// TABLEROS
// =====================================================

document.getElementById("toolTPA").onclick = () => {
    tool = "tableroTPA";
    console.log("⚡ TPA activado");
};

document.getElementById("toolTS").onclick = () => {
    tool = "tableroTS";
    console.log("⚡ TS activado");
};

// =====================================================
// INTERRUPTORES
// =====================================================

document.getElementById("toolSwitch1").onclick = () => {
    tool = "switch1";
    console.log("🔘 SWITCH 1 activado");
};

document.getElementById("toolSwitch2").onclick = () => {
    tool = "switch2";
    console.log("🔘 SWITCH 2 activado");
};

document.getElementById("toolSwitchCombo").onclick = () => {
    tool = "switchCombo";
    console.log("🔘 SWITCH COMBO activado");
};

// =====================================================
// VENTILADOR
// =====================================================

document.getElementById("toolFan").onclick = () => {
    tool = "fan";
    console.log("🌀 VENTILADOR activado");
};

// CREA SIMBOLOS/OBJETOS QUE REPRESENTAN DESCRIPCION DE LOS BOTONES

// function crearSimbolo(x, y, tipo) {

//     let obj;

//     // if (tipo === "boca") {
//     //     obj = new fabric.Circle({
//     //         left: x,
//     //         top: y,
//     //         radius: 6,
//     //         fill: "orange",
//     //         originX: "center",
//     //         originY: "center"
//     //     });
//     // }
//     if (tipo === "boca") {

//         crearBocaSVG(x, y, function (simbolo) {

//             simbolo.tipo = "boca";

//             canvas.add(simbolo);

//             console.log("Se creó una boca SVG");

//         });

//         return;

//     }

//     if (tipo === "toma") {
//         obj = new fabric.Rect({
//             left: x,
//             top: y,
//             width: 12,
//             height: 12,
//             fill: "blue",
//             originX: "center",
//             originY: "center"
//         });
//     }

//     if (tipo === "tablero") {
//         obj = new fabric.Rect({
//             left: x,
//             top: y,
//             width: 20,
//             height: 20,
//             fill: "gray",
//             originX: "center",
//             originY: "center"
//         });
//     }

//     obj.tipo = tipo;
//     obj.set({ selectable: true });

//     canvas.add(obj);
//     console.log("Se ha creado nuev - " + obj + " - " + obj.tipo);
//     return obj;
// }
async function crearSimbolo(x, y, tipo) {

    let obj = null;

    switch (tipo) {

        case "boca":
            obj = await crearBocaSVG(x, y);
            break;

        case "bocaPared":
            obj = await crearSVG(SVG_BOCA_PARED, x, y, 0.15);
            break;

        case "toma":
            obj = await crearSVG(SVG_TOMA, x, y, 0.15);
            break;

        case "tableroTPA":
            obj = await crearSVG(SVG_TPA, x, y, 0.15);
            break;

        case "tableroTS":
            obj = await crearSVG(SVG_TS, x, y, 0.15);
            break;

        case "switch1":
            obj = await crearSVG(SVG_SWITCH_1, x, y, 0.15);
            break;

        case "switch2":
            obj = await crearSVG(SVG_SWITCH_2, x, y, 0.15);
            break;

        case "switchCombo":
            obj = await crearSVG(SVG_SWITCH_COMBO, x, y, 0.15);
            break;

        case "fan":
            obj = await crearSVG(SVG_FAN, x, y, 0.15);
            break;
    }

    if (!obj) {
        console.warn("⚠️ símbolo no creado:", tipo);
        return;
    }

    obj.tipo = tipo;
    canvas.add(obj);

    console.log("✔ Creado:", tipo);
}
// MOUSE DOWN - Click izquierdo
// COORDENADAS DONDE SE INSTANCIAN LOS OBJETOS SOBRE EL MAPA/PLANO
// Click en Canvas (USAR SIEMPRE COORDENADAS DE CANVAS!!)

canvas.on("mouse:down", async function (opt) {

    // PAN con click derecho
    if (opt.button === 2) return;

    const pointer = canvas.getPointer(opt.e);

    const target = opt.target;

    // 🔥 MODO BORRAR
    if (tool === "delete") {

        if (target) {
            borrarObjeto(target);
        }

        return;
    }


    // 🔥 MODO SELECCIÓN
    if (tool === "select") {
        return; // Fabric maneja todo automáticamente
    }
    // 🔥 MODO CREACIÓN
    // if (tool === "boca" || tool === "toma" || tool === "tablero") {
    //     crearSimbolo(pointer.x, pointer.y, tool);
    // }
    await crearSimbolo(pointer.x, pointer.y, tool);
});

// HERRAMIENTA SELECCIONAR

// Variables, estado de herramienta
//let tool = "boca";

// Boton seleccionar

document.getElementById("toolSelect").onclick = () => {
    tool = "select";

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
    tool = "delete";

    canvas.selection = false;

    console.log("🗑️ Modo BORRADO activo");
};

// Metodo para borrar objetos

function borrarObjeto(obj) {

    if (!obj) return;

    console.log("Eliminando objeto:", obj.tipo || "desconocido");

    canvas.remove(obj);
};

//ToolTip 

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

const tooltipList = [...tooltipTriggerList].map(el => {
    return new bootstrap.Tooltip(el);
});