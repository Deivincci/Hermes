/* Hermes — la página. JS a pelo, sin dependencias, sin build.
   =============================================================================
   Hace tres cosas: pintar los textos en el idioma elegido, el visor de imágenes
   y marcar en la barra en qué sección estás.

   LA REGLA DEL IDIOMA: aquí no hay ni una sola frase escrita. Todas viven en
   i18n/<código>.js y el marcado solo dice QUÉ clave va en cada hueco. Añadir un
   idioma es traducir un fichero y añadirlo a IDIOMAS y a index.html; este
   fichero no se toca.
   ============================================================================= */

(function () {
  "use strict";

  /* Los idiomas que existen, en el orden en que salen en la barra. */
  var IDIOMAS = [
    { codigo: "es", nombre: "ES", titulo: "Español" },
    { codigo: "en", nombre: "EN", titulo: "English" }
  ];

  var TEXTOS = window.HERMES_TEXTOS || {};
  var POR_DEFECTO = "en"; // igual que la app: si no reconocemos el idioma del navegador, inglés
  var idiomaActual = null;

  /* ---------------------------------------------------------------------------
     GUARDAR LA ELECCIÓN.
     Envuelto en try/catch porque una página abierta con file:// es un origen
     opaco y localStorage puede LANZAR en vez de devolver null. Sin esto, abrir
     el index.html a pelo —que es justo uno de los dos modos que tienen que
     funcionar— dejaría la página en blanco.
     --------------------------------------------------------------------------- */
  function recuerda(codigo) {
    try { localStorage.setItem("hermes.idioma", codigo); } catch (e) { /* da igual */ }
  }
  function recordado() {
    try { return localStorage.getItem("hermes.idioma"); } catch (e) { return null; }
  }

  function existe(codigo) {
    return !!(codigo && TEXTOS[codigo]);
  }

  /* Qué idioma toca: lo que pida la URL, lo que se eligió la última vez, lo que
     dice el navegador, y si nada de eso vale, el de por defecto. */
  function idiomaInicial() {
    var pedido = null;
    try {
      pedido = new URLSearchParams(location.search).get("lang");
    } catch (e) { /* navegador antiguo: seguimos */ }
    if (existe(pedido)) return pedido;

    var guardado = recordado();
    if (existe(guardado)) return guardado;

    var navegador = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    var corto = navegador.toLowerCase().split("-")[0];
    if (existe(corto)) return corto;

    return existe(POR_DEFECTO) ? POR_DEFECTO : IDIOMAS[0].codigo;
  }

  function T(clave) {
    var tabla = TEXTOS[idiomaActual];
    if (tabla && Object.prototype.hasOwnProperty.call(tabla, clave)) return tabla[clave];
    // Un hueco sin traducir se ve, no se esconde: mejor la clave a la vista que
    // un espacio en blanco que nadie sabe si sobra o falta.
    return "[" + clave + "]";
  }

  /* ---------------------------------------------------------------------------
     PINTAR LOS TEXTOS.
     data-t       → texto plano (lo normal)
     data-t-html  → permite <b> dentro (solo para las frases nuestras del i18n)
     data-t-attr  → "atributo:clave", para alt, aria-label, content…
     --------------------------------------------------------------------------- */
  function pinta() {
    document.querySelectorAll("[data-t]").forEach(function (el) {
      el.textContent = T(el.getAttribute("data-t"));
    });
    document.querySelectorAll("[data-t-html]").forEach(function (el) {
      el.innerHTML = T(el.getAttribute("data-t-html"));
    });
    document.querySelectorAll("[data-t-attr]").forEach(function (el) {
      el.getAttribute("data-t-attr").split(",").forEach(function (par) {
        var trozos = par.split(":");
        if (trozos.length === 2) el.setAttribute(trozos[0].trim(), T(trozos[1].trim()));
      });
    });
    document.documentElement.lang = T("meta.lang");
    document.title = T("meta.titulo");
  }

  function cambiaIdioma(codigo, recordarlo) {
    if (!existe(codigo)) return;
    idiomaActual = codigo;
    if (recordarlo) recuerda(codigo);
    pinta();
    // El visor puede estar abierto: su pie también es texto.
    if (visorAbierto()) pintaVisor();
    document.querySelectorAll("#selectorIdioma button").forEach(function (b) {
      var suyo = b.getAttribute("data-idioma") === codigo;
      b.classList.toggle("es-el-activo", suyo);
      b.setAttribute("aria-pressed", suyo ? "true" : "false");
    });
  }

  function montaSelector() {
    var caja = document.getElementById("selectorIdioma");
    if (!caja) return;
    IDIOMAS.forEach(function (idi) {
      if (!existe(idi.codigo)) return; // un idioma anunciado sin fichero no se pinta
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = idi.nombre;
      b.title = idi.titulo;
      b.setAttribute("data-idioma", idi.codigo);
      b.addEventListener("click", function () { cambiaIdioma(idi.codigo, true); });
      caja.appendChild(b);
    });
  }

  /* ---------------------------------------------------------------------------
     EL VISOR DE IMÁGENES.
     La lista sale del propio marcado, así que añadir una captura a la galería no
     obliga a tocar este fichero.
     --------------------------------------------------------------------------- */
  var lupas = [];
  var enElVisor = -1;
  var visor, visorImg, visorPie, devuelveFoco = null;

  function visorAbierto() { return visor && !visor.hidden; }

  function pintaVisor() {
    if (enElVisor < 0 || enElVisor >= lupas.length) return;
    var boton = lupas[enElVisor];
    var img = boton.querySelector("img");
    visorImg.src = img.getAttribute("src");
    visorPie.textContent = T(boton.getAttribute("data-pie"));
    visorImg.alt = visorPie.textContent;
  }

  function abreVisor(i) {
    enElVisor = i;
    devuelveFoco = document.activeElement;
    visor.hidden = false;
    document.body.classList.add("con-visor");
    pintaVisor();
    document.getElementById("visorCerrar").focus();
  }

  function cierraVisor() {
    visor.hidden = true;
    document.body.classList.remove("con-visor");
    visorImg.src = "";
    // Devolver el foco a la miniatura desde la que se abrió: sin esto, quien
    // navega con el teclado vuelve al principio de la página cada vez que mira
    // una captura.
    if (devuelveFoco && devuelveFoco.focus) devuelveFoco.focus();
    devuelveFoco = null;
  }

  function mueveVisor(paso) {
    if (!lupas.length) return;
    enElVisor = (enElVisor + paso + lupas.length) % lupas.length;
    pintaVisor();
  }

  function montaVisor() {
    visor = document.getElementById("visor");
    visorImg = document.getElementById("visorImg");
    visorPie = document.getElementById("visorPie");
    if (!visor) return;

    lupas = Array.prototype.slice.call(document.querySelectorAll(".lupa"));
    lupas.forEach(function (b, i) {
      b.type = "button";
      b.addEventListener("click", function () { abreVisor(i); });
    });

    document.getElementById("visorCerrar").addEventListener("click", cierraVisor);
    document.getElementById("visorAntes").addEventListener("click", function () { mueveVisor(-1); });
    document.getElementById("visorLuego").addEventListener("click", function () { mueveVisor(1); });
    // Pinchar el fondo cierra; pinchar la imagen, no.
    visor.addEventListener("click", function (ev) {
      if (ev.target === visor) cierraVisor();
    });
    document.addEventListener("keydown", function (ev) {
      if (!visorAbierto()) return;
      if (ev.key === "Escape") cierraVisor();
      else if (ev.key === "ArrowLeft") mueveVisor(-1);
      else if (ev.key === "ArrowRight") mueveVisor(1);
    });
  }

  /* ---------------------------------------------------------------------------
     LA BARRA: marcar en qué sección estamos.
     Con IntersectionObserver si lo hay; si no, no pasa nada — la página entera
     funciona igual, solo que sin el subrayado.
     --------------------------------------------------------------------------- */
  function montaBarra() {
    var barra = document.querySelector(".barra");
    if (barra) {
      addEventListener("scroll", function () {
        barra.classList.toggle("barra-pegada", scrollY > 40);
      }, { passive: true });
    }

    if (!("IntersectionObserver" in window)) return;
    var enlaces = {};
    document.querySelectorAll(".barra-nav a").forEach(function (a) {
      enlaces[a.getAttribute("href").slice(1)] = a;
    });
    var ojo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var a = enlaces[e.target.id];
        if (a) a.classList.toggle("es-la-actual", e.isIntersecting);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(enlaces).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) ojo.observe(s);
    });
  }

  /* ---------------------------------------------------------------------------
     EL QR. Se dibuja aquí, con qr.js, sin pedirle nada a nadie: un generador de
     QR ajeno es una empresa de por medio que el día que cierre deja el hueco en
     blanco y sin avisar.

     La dirección va AQUÍ y en un solo sitio. Y apunta a la PÁGINA, no al .exe:
     quien escanea lo hace con un móvil, y un instalador de Windows en un móvil
     no es que falle, es que no significa nada.
     --------------------------------------------------------------------------- */
  var DIRECCION = "https://deivincci.github.io/Hermes/";

  function montaQR() {
    var caja = document.getElementById("qrCaja");
    if (!caja) return;
    try {
      caja.innerHTML = global_HermesQR().svg(DIRECCION, T("qr.alt"));
    } catch (e) {
      // Si por lo que sea no se puede dibujar, se quita el bloque entero en vez
      // de dejar un hueco con un rótulo que no lleva a ningún sitio.
      var bloque = caja.closest ? caja.closest(".qr") : null;
      if (bloque) bloque.hidden = true;
    }
  }
  function global_HermesQR() {
    if (!window.HermesQR) throw new Error("qr.js no está cargado");
    return window.HermesQR;
  }

  /* ---------------------------------------------------------------------------
     Arranque.
     --------------------------------------------------------------------------- */
  montaSelector();
  montaVisor();
  montaBarra();
  cambiaIdioma(idiomaInicial(), false);
  montaQR(); // después del idioma: el texto alternativo del QR también se traduce
})();
