/* Hermes — generador de códigos QR. JS a pelo, sin dependencias.
   =============================================================================
   POR QUÉ ESTO EXISTE EN VEZ DE UNA LLAMADA A UN SERVICIO. Los generadores de QR
   «en la nube» son un enlace a una empresa ajena metido en la página: el día que
   cierre, cambie de dominio o decida cobrar, el QR desaparece y no nos enteramos
   hasta que alguien nos lo diga. Un CDN tiene el mismo problema con menos aviso.
   Aquí no se pide nada a nadie: la página se dibuja sola.

   HASTA DÓNDE LLEGA, dicho claro porque es una limitación a propósito: modo
   BYTE, corrección de errores M (15%), versiones 1 a 3. Eso son 42 caracteres
   como mucho. Con ese recorte no hay bloques entrelazados ni información de
   versión —las dos partes del formato QR donde es más fácil equivocarse—, y lo
   que queda cabe entero en la cabeza. La dirección que ponemos son 35
   caracteres; si algún día crece de 42, qrPara() LANZA en vez de dibujar un
   cuadrado bonito que no lee nadie.

   CÓMO SE HA COMPROBADO, que en esto es la mitad del trabajo: un QR mal hecho no
   se ve mal, se ve exactamente igual — y simplemente no escanea. Ver
   docs/web.md, sección «El QR».
   ============================================================================= */

(function (global) {
  "use strict";

  /* ---------------------------------------------------------------------------
     ARITMÉTICA DE GALOIS GF(256), que es donde vive la corrección de errores.
     Polinomio 0x11D y generador 2, que son los que fija la norma del QR.
     --------------------------------------------------------------------------- */
  var EXP = new Uint8Array(512);
  var LOG = new Uint8Array(256);
  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11D;
    }
    for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
  })();

  function mul(a, b) {
    return (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]];
  }

  // genPoly: el polinomio generador de grado n, (x+α⁰)(x+α¹)…(x+α^(n-1)).
  function genPoly(n) {
    var g = [1];
    for (var i = 0; i < n; i++) {
      var ng = new Array(g.length + 1);
      for (var k = 0; k < ng.length; k++) ng[k] = 0;
      for (var j = 0; j < g.length; j++) {
        ng[j] ^= g[j];                    // × x
        ng[j + 1] ^= mul(g[j], EXP[i]);   // × α^i
      }
      g = ng;
    }
    return g;
  }

  // ecc: los n bytes de corrección de un bloque de datos (resto de la división).
  function ecc(datos, n) {
    var g = genPoly(n);
    var r = datos.slice();
    for (var k = 0; k < n; k++) r.push(0);
    for (var i = 0; i < datos.length; i++) {
      var c = r[i];
      if (c === 0) continue;
      for (var j = 0; j < g.length; j++) r[i + j] ^= mul(g[j], c);
    }
    return r.slice(datos.length);
  }

  /* ---------------------------------------------------------------------------
     TABLAS. Solo versiones 1-3 con corrección M, que son las de un bloque único:
     sin bloque múltiple no hay entrelazado, y el entrelazado es de las cosas que
     al equivocarse dan un QR con pinta perfecta que no lee ningún teléfono.
     --------------------------------------------------------------------------- */
  var VERSIONES = [
    { v: 1, datos: 16, correccion: 10, alineacion: [] },
    { v: 2, datos: 28, correccion: 16, alineacion: [18] },
    { v: 3, datos: 44, correccion: 26, alineacion: [22] }
  ];
  var EC_M = 0; // los dos bits de la corrección M dentro de la cadena de formato

  function ladoDe(version) { return 17 + 4 * version; }

  /* ---------------------------------------------------------------------------
     LOS DATOS: modo, longitud, contenido, relleno.
     --------------------------------------------------------------------------- */
  function aBytes(texto) {
    // La dirección es ASCII, pero se codifica en UTF-8 igual: si alguien mete una
    // eñe, que salga bien en vez de salir rara.
    var out = [];
    for (var i = 0; i < texto.length; i++) {
      var c = texto.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xC0 | (c >> 6), 0x80 | (c & 63));
      else out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }

  function codewordsDe(texto, info) {
    var bytes = aBytes(texto);
    var bits = [];
    function mete(valor, cuantos) {
      for (var i = cuantos - 1; i >= 0; i--) bits.push((valor >> i) & 1);
    }
    mete(4, 4);              // modo BYTE
    mete(bytes.length, 8);   // longitud (8 bits para las versiones 1-9)
    for (var i = 0; i < bytes.length; i++) mete(bytes[i], 8);

    var tope = info.datos * 8;
    // Terminador: hasta cuatro ceros, y solo los que quepan.
    for (var t = 0; t < 4 && bits.length < tope; t++) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);

    var cw = [];
    for (var b = 0; b < bits.length; b += 8) {
      var v = 0;
      for (var k = 0; k < 8; k++) v = (v << 1) | bits[b + k];
      cw.push(v);
    }
    // Relleno alterno 0xEC / 0x11 hasta llenar. Lo dice la norma; no es un valor
    // cualquiera y no se puede rellenar con ceros.
    var alterna = [0xEC, 0x11], n = 0;
    while (cw.length < info.datos) cw.push(alterna[n++ % 2]);
    return cw.concat(ecc(cw, info.correccion));
  }

  /* ---------------------------------------------------------------------------
     LA MATRIZ. -1 = libre, 0/1 = módulo puesto. `fijo` marca lo que NO es dato
     (patrones y zonas reservadas): sirve para saltarlo al colocar y para no
     aplicarle la máscara.
     --------------------------------------------------------------------------- */
  function nuevaMatriz(lado) {
    var m = [], f = [];
    for (var i = 0; i < lado; i++) {
      m.push(new Array(lado).fill(-1));
      f.push(new Array(lado).fill(false));
    }
    return { m: m, fijo: f, lado: lado };
  }

  function pon(M, r, c, v, esFijo) {
    if (r < 0 || c < 0 || r >= M.lado || c >= M.lado) return;
    M.m[r][c] = v;
    if (esFijo) M.fijo[r][c] = true;
  }

  function patronesDe(M, info) {
    var lado = M.lado, i, j;

    // Los tres localizadores 7×7 con su separador blanco alrededor.
    var esquinas = [[0, 0], [0, lado - 7], [lado - 7, 0]];
    for (var e = 0; e < esquinas.length; e++) {
      var r0 = esquinas[e][0], c0 = esquinas[e][1];
      for (i = -1; i <= 7; i++) {
        for (j = -1; j <= 7; j++) {
          var dentro = i >= 0 && i <= 6 && j >= 0 && j <= 6;
          var oscuro = dentro && (i === 0 || i === 6 || j === 0 || j === 6 ||
            (i >= 2 && i <= 4 && j >= 2 && j <= 4));
          pon(M, r0 + i, c0 + j, oscuro ? 1 : 0, true);
        }
      }
    }

    // Temporización: la fila y la columna 6, alternando.
    for (i = 8; i < lado - 8; i++) {
      var v = (i % 2 === 0) ? 1 : 0;
      pon(M, 6, i, v, true);
      pon(M, i, 6, v, true);
    }

    // Alineación 5×5 (versiones 2 y 3: una sola, y no pisa ningún localizador).
    for (var a = 0; a < info.alineacion.length; a++) {
      var cen = info.alineacion[a];
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          var osc = (Math.abs(i) === 2 || Math.abs(j) === 2 || (i === 0 && j === 0));
          pon(M, cen + i, cen + j, osc ? 1 : 0, true);
        }
      }
    }

    // Reserva de las dos copias del formato: se marcan ahora para que la
    // colocación de datos las salte, y se rellenan al final con la máscara ya
    // elegida.
    for (i = 0; i <= 8; i++) {
      if (i !== 6) { pon(M, 8, i, 0, true); pon(M, i, 8, 0, true); }
    }
    // La segunda copia son 15 módulos repartidos ASIMÉTRICAMENTE: OCHO en la
    // fila 8 y SIETE en la columna 8. Con ocho en las dos —que es lo que sale
    // solo— la octava de la columna cae en (lado-8, 8), que es el módulo
    // siempre oscuro, y lo deja en blanco. No rompe nada a la vista: el código
    // se dibuja igual de bonito.
    for (i = 0; i < 8; i++) pon(M, 8, lado - 1 - i, 0, true);
    for (i = 0; i < 7; i++) pon(M, lado - 1 - i, 8, 0, true);

    // Y el módulo siempre oscuro va DESPUÉS de las reservas, no antes: si va
    // antes, cualquier reserva que se pase de rango se lo lleva por delante.
    pon(M, lado - 8, 8, 1, true);
  }

  // colocaDatos: zigzag de dos columnas desde abajo a la derecha, saltando la
  // columna 6 (la de temporización) y todo lo que sea fijo.
  function colocaDatos(M, cw) {
    var bits = [];
    for (var i = 0; i < cw.length; i++) {
      for (var b = 7; b >= 0; b--) bits.push((cw[i] >> b) & 1);
    }
    var n = 0, arriba = true;
    for (var col = M.lado - 1; col > 0; col -= 2) {
      if (col === 6) col--; // la columna 6 no cuenta como columna de datos
      for (var k = 0; k < M.lado; k++) {
        var fila = arriba ? (M.lado - 1 - k) : k;
        for (var d = 0; d < 2; d++) {
          var c = col - d;
          if (M.fijo[fila][c]) continue;
          M.m[fila][c] = (n < bits.length) ? bits[n] : 0;
          n++;
        }
      }
      arriba = !arriba;
    }
  }

  var MASCARAS = [
    function (i, j) { return (i + j) % 2 === 0; },
    function (i) { return i % 2 === 0; },
    function (i, j) { return j % 3 === 0; },
    function (i, j) { return (i + j) % 3 === 0; },
    function (i, j) { return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0; },
    function (i, j) { return ((i * j) % 2) + ((i * j) % 3) === 0; },
    function (i, j) { return ((((i * j) % 2) + ((i * j) % 3)) % 2) === 0; },
    function (i, j) { return ((((i + j) % 2) + ((i * j) % 3)) % 2) === 0; }
  ];

  // formatoBits: 5 bits (corrección + máscara) protegidos con BCH(15,5) y
  // mezclados con 0x5412 — sin esa mezcla, un QR todo blanco daría un formato
  // válido de ceros.
  function formatoBits(ec, mascara) {
    var d = (ec << 3) | mascara;
    var v = d << 10;
    for (var i = 14; i >= 10; i--) {
      if ((v >>> i) & 1) v ^= 0x537 << (i - 10);
    }
    return ((d << 10) | v) ^ 0x5412;
  }

  function ponFormato(M, ec, mascara) {
    var f = formatoBits(ec, mascara), lado = M.lado, i;
    function bit(k) { return (f >> k) & 1; }
    // Copia 1, alrededor del localizador de arriba a la izquierda.
    for (i = 0; i <= 5; i++) pon(M, 8, i, bit(i), true);
    pon(M, 8, 7, bit(6), true);
    pon(M, 8, 8, bit(7), true);
    pon(M, 7, 8, bit(8), true);
    for (i = 9; i <= 14; i++) pon(M, 14 - i, 8, bit(i), true);
    // Copia 2, repartida entre los otros dos.
    for (i = 0; i <= 6; i++) pon(M, lado - 1 - i, 8, bit(i), true);
    for (i = 7; i <= 14; i++) pon(M, 8, lado - 15 + i, bit(i), true);
  }

  /* ---------------------------------------------------------------------------
     PENALIZACIÓN: las cuatro reglas de la norma. Se prueban las ocho máscaras y
     gana la de menos puntos — no es cosmética, es lo que hace que un teléfono
     enganche el código a la primera en vez de tras diez segundos de baile.
     --------------------------------------------------------------------------- */
  function penaliza(m, lado) {
    var total = 0, i, j, k;

    // Regla 1: rachas de 5 o más del mismo color.
    for (i = 0; i < lado; i++) {
      for (var eje = 0; eje < 2; eje++) {
        var racha = 1, previo = -1;
        for (j = 0; j < lado; j++) {
          var v = eje === 0 ? m[i][j] : m[j][i];
          if (v === previo) racha++;
          else { if (racha >= 5) total += 3 + (racha - 5); racha = 1; previo = v; }
        }
        if (racha >= 5) total += 3 + (racha - 5);
      }
    }
    // Regla 2: bloques 2×2 del mismo color.
    for (i = 0; i < lado - 1; i++) {
      for (j = 0; j < lado - 1; j++) {
        var a = m[i][j];
        if (a === m[i][j + 1] && a === m[i + 1][j] && a === m[i + 1][j + 1]) total += 3;
      }
    }
    // Regla 3: el patrón que se confunde con un localizador.
    var p1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    var p2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    for (i = 0; i < lado; i++) {
      for (j = 0; j + 10 < lado; j++) {
        var casaF1 = true, casaF2 = true, casaC1 = true, casaC2 = true;
        for (k = 0; k < 11; k++) {
          if (m[i][j + k] !== p1[k]) casaF1 = false;
          if (m[i][j + k] !== p2[k]) casaF2 = false;
          if (m[j + k][i] !== p1[k]) casaC1 = false;
          if (m[j + k][i] !== p2[k]) casaC2 = false;
        }
        if (casaF1) total += 40;
        if (casaF2) total += 40;
        if (casaC1) total += 40;
        if (casaC2) total += 40;
      }
    }
    // Regla 4: desequilibrio entre claro y oscuro.
    var oscuros = 0;
    for (i = 0; i < lado; i++) for (j = 0; j < lado; j++) if (m[i][j] === 1) oscuros++;
    var pct = (oscuros * 100) / (lado * lado);
    total += 10 * Math.floor(Math.abs(pct - 50) / 5);
    return total;
  }

  /* ---------------------------------------------------------------------------
     qrPara: la matriz de un texto. Devuelve {lado, m} con 0/1.
     --------------------------------------------------------------------------- */
  function qrPara(texto) {
    var bytes = aBytes(texto).length;
    var info = null;
    for (var i = 0; i < VERSIONES.length; i++) {
      // 2 bytes de cabecera: los 4 bits de modo y los 8 de longitud.
      if (bytes + 2 <= VERSIONES[i].datos) { info = VERSIONES[i]; break; }
    }
    if (!info) {
      // MEJOR LANZAR QUE DIBUJAR. Un QR truncado no se ve roto: se ve igual de
      // bonito y no lo lee nada.
      throw new Error("qr: " + bytes + " bytes no caben (el tope aquí son 42)");
    }
    var cw = codewordsDe(texto, info);
    var lado = ladoDe(info.v);

    var mejor = null, mejorPuntos = Infinity;
    for (var mk = 0; mk < 8; mk++) {
      var M = nuevaMatriz(lado);
      patronesDe(M, info);
      colocaDatos(M, cw);
      // La máscara NO toca los patrones: solo los módulos de datos.
      for (var r = 0; r < lado; r++) {
        for (var c = 0; c < lado; c++) {
          if (!M.fijo[r][c] && MASCARAS[mk](r, c)) M.m[r][c] ^= 1;
        }
      }
      ponFormato(M, EC_M, mk);
      var p = penaliza(M.m, lado);
      if (p < mejorPuntos) { mejorPuntos = p; mejor = M; }
    }
    // `fijo` sale fuera para poder COMPROBARLO: el número de módulos libres de
    // cada versión es un dato de la norma (208, 359 y 567), así que contarlos
    // dice si el mapa de patrones está bien puesto. Ver docs/web.md.
    return { lado: lado, m: mejor.m, fijo: mejor.fijo, version: info.v };
  }

  /* ---------------------------------------------------------------------------
     qrSVG: la matriz como SVG. Un solo <path> en vez de 400 <rect>.
     La ZONA TRANQUILA de 4 módulos no es decoración: sin ella muchos lectores no
     encuentran el código, y es el fallo típico de los QR pegados a un borde.
     --------------------------------------------------------------------------- */
  function qrSVG(texto, alt) {
    var q = qrPara(texto), n = q.lado, borde = 4, total = n + borde * 2, d = "";
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (q.m[r][c] === 1) d += "M" + (c + borde) + " " + (r + borde) + "h1v1h-1z";
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + total + ' ' + total +
      '" shape-rendering="crispEdges" role="img" aria-label="' + (alt || "") + '">' +
      '<rect width="' + total + '" height="' + total + '" fill="#fff"/>' +
      '<path d="' + d + '" fill="#000"/></svg>';
  }

  global.HermesQR = { para: qrPara, svg: qrSVG, _ecc: ecc, _formato: formatoBits };
})(window);
