// =====================================================
// SIMBOLOS.JS
// =====================================================
// Este archivo contiene todos los símbolos eléctricos
// dibujados en SVG.
//
// Aquí NO existe lógica del programa.
// Su única responsabilidad es fabricar símbolos.
//
// Más adelante aquí estarán:
//
// - Boca de iluminación
// - Tomacorriente
// - Tablero
// - Llaves
// - TV
// - Datos
// - Etc.
// =====================================================


// =====================================================
// SVG DE LAS HERRAMIENTAS o mas bien SIMBOLOS
// =====================================================
const SVG_BOCA = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="10 10 180 180">

    <ellipse
        cx="100"
        cy="100"
        rx="90"
        ry="90"
        fill="rgb(255, 255, 255)"
        stroke="black"
        stroke-width="10"/>

    <path
        d="M 29.901 47.096
           C 18.307 26.405
             136.619 125.789
             161.321 169.863"
        fill="none"
        stroke="black"
        stroke-width="10"/>

    <path
        d="M 36.363 166.605
           C 34.493 153.395
             169.007 39.434
             169.937 46.011"
        fill="none"
        stroke="black"
        stroke-width="10"/>

</svg>
`;

const SVG_BOCA_PARED = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
  <ellipse style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 8;" cx="102" cy="83.692" rx="90" ry="81.692"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" d="M 32.979 33.701 C 21.384 14.919 138.622 107.099 163.323 147.106"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" d="M 38.365 144.15 C 36.494 132.158 171.009 28.717 171.939 34.687"/>
  <line style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" x1="100" y1="165.539" x2="100" y2="200"/>
  <line style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" x1="85.366" y1="200" x2="114.634" y2="200"/>
</svg>`;
// INTERRUPTOR 1 EFECTO
const SVG_SWITCH_1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 8;" cx="70.959" cy="82.542" rx="9.041" ry="7.458"/>
  <polyline style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" points="67.945 75.085 38.562 10 25 17.458"/>
</svg>`;
// INTERRUPTOR 2 EFECTOS
const SVG_SWITCH_2 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 8;" cx="77.398" cy="79.593" rx="7.602" ry="7.155"/>
  <polyline style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" points="74.863 72.44 50.157 10 38.754 17.155"/>
  <polyline style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" points="69.48 82.845 17.533 75.692 15 90"/>
</svg>`;
// INTERRUPTOR COMBINACION
const SVG_SWITCH_COMBO = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 8; transform-origin: 236.142px 290.351px;" cx="246.652" cy="311.018" rx="5.167" ry="4.737" transform="matrix(-0.50638, -0.86231, 0.871191, -0.491257, -194.925853, -223.79163)"/>
  <polyline style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8; transform-origin: 41.217px 66.561px;" points="49.724 82.492 33.655 41.154 25.821 45.891" transform="matrix(-0.50638, -0.86231, 0.86231, -0.50638, -0.000023, 0.000002)"/>
  <polyline style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" points="56.675 43.31 81.219 12.737 73.038 8"/>
</svg>`;
// TP - TPA
const SVG_TPA = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
  <rect x="10.629" y="30" width="179.372" height="90" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 8;"/>
  <line style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" x1="10" y1="30" x2="190" y2="120"/>
  <line style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" x1="189.37" y1="30" x2="10.629" y2="120"/>
</svg>`;
//TPU - TS
const SVG_TS = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
  <rect x="10.628" y="30" width="179.372" height="90" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 8;"/>
  <line style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" x1="10" y1="30" x2="190" y2="120"/>
</svg>`;
// TOMACORRIENTE
const SVG_TOMA = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 30 200 150">
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8; transform-origin: 100.848px 93.5px;" d="M 43.113 139.116 C 43.113 46.952 161.981 59.036 161.981 139.116"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8; transform-origin: 100.848px 93.5px;" d="M 190 140 L 161.132 140"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8; transform-origin: 100.848px 93.5px;" d="M 10 139.116 L 43.962 139.116"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8; transform-origin: 100.848px 93.5px;" d="M 100 47 L 100 74.457"/>
</svg>`;
// VENTILADOR
const SVG_FAN = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <ellipse style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 1;" cx="99.531" cy="123.371" rx="11.184" ry="10.545"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" d="M 100.463 113.788 C 86.549 113.788 82.19 8.945 100.463 8.945 C 116.518 7.925 121.547 112.447 100.463 113.788 Z"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" d="M 107.908 129.899 C 118.93 115.744 200.67 174.131 189.649 188.287 C 185.85 194.997 97.668 147.983 107.908 129.899 Z"/>
  <path style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 8;" d="M 93.078 127.977 C 74.388 115.827 -0.47 179.538 12.078 187.694 C 15.909 195.445 102.258 146.54 93.078 127.977 Z"/>
</svg>`;

// =====================================================
// CREA UNA BOCA DE ILUMINACIÓN
// =====================================================

function crearBocaSVG(x, y) {

    return crearSVG(SVG_BOCA, x, y, 0.08);
}

function crearSVG(svgString, x, y, scale = 0.2) {

    return new Promise((resolve) => {

        fabric.loadSVGFromString(svgString, (objects, options) => {

            if (!objects || objects.length === 0) {
                console.error("SVG vacío o inválido");
                resolve(null);
                return;
            }

            const obj = fabric.util.groupSVGElements(objects, options);

            obj.set({
                left: x,
                top: y,
                originX: "center",
                originY: "center",
                scaleX: scale,
                scaleY: scale,
                selectable: true
            });

            resolve(obj);
        });
    });
}