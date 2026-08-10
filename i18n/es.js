/* Hermes — textos en ESPAÑOL.
   =============================================================================
   POR QUÉ ESTO ES UN .js Y NO UN .json, que es lo que parecería natural:
   porque la página tiene que funcionar abriendo index.html a pelo, y un
   navegador con file:// BLOQUEA fetch() de ficheros locales. Un .json obligaría
   a levantar un servidor para verla, justo lo que no queremos. Un <script> se
   carga sin pedir permiso a nadie.

   AÑADIR UN IDIOMA son tres pasos, igual que en la app:
     1. copiar este fichero a i18n/<código>.js y traducir los VALORES (las
        claves de la izquierda no se tocan nunca: son las que busca el marcado);
     2. añadir su <script src> en index.html, junto a los otros;
     3. añadir el código y su nombre a IDIOMAS, arriba del todo de hermes.js.

   Las claves van agrupadas POR SECCIÓN de la página, no por orden alfabético:
   se traduce leyendo la página de arriba abajo, que es como se lee.
   ============================================================================= */

window.HERMES_TEXTOS = window.HERMES_TEXTOS || {};
window.HERMES_TEXTOS.es = {

  /* ---------- Metadatos de la página ---------- */
  "meta.lang": "es",
  "meta.titulo": "Hermes — la LAN party, en una sola ventana",
  "meta.descripcion": "Red virtual, chat, voz, juegos, pantalla compartida y mando compartido. En un solo programa. Beta gratuita para Windows.",

  /* ---------- Navegación ---------- */
  "nav.inicio": "Inicio",
  "nav.quees": "Qué es",
  "nav.galeria": "Galería",
  "nav.descarga": "Descarga",
  "nav.saber": "Antes de instalar",
  "nav.idioma": "Idioma",

  /* ---------- 1. Inicio ---------- */
  "hero.claim": "La LAN party no murió. Solo le faltaba una app.",
  "hero.sub": "Red virtual, chat, voz, juegos, pantalla compartida y mando compartido. En la misma ventana.",
  "hero.boton": "Descargar para Windows",
  "hero.pie": "Beta · Windows 10 y 11 · gratis",
  "hero.alt": "Emblema de Hermes",
  "hero.bajar": "Seguir leyendo",

  /* ---------- 2. Qué es Hermes ---------- */
  "quees.titulo": "¿Qué es Hermes?",
  "quees.p1": "Para echar una partida con los colegas terminé con diez programas abiertos a la vez. Uno para hablar. Otro para que los juegos nos vieran en la misma red. Otro para compartir pantalla. Otro para pasarnos archivos. Otro más para que uno jugara en el PC del otro. Cada uno con su cuenta, su ventana y su manera de hacer las cosas.",
  "quees.p2": "Hermes intenta resolver eso: juntarlo todo en un sitio. Abres Hermes, tus amigos entran a la misma sala, y ya estáis dentro.",

  "quees.red.t": "Una red virtual",
  "quees.red.d": "Tus amigos y tú quedáis en la misma red aunque cada uno esté en su casa. Los juegos de LAN de toda la vida vuelven a veros, sin tocar el router.",
  "quees.voz.t": "Chat y voz",
  "quees.voz.d": "Chat en la sala, y voz de grupo para hablar mientras jugáis. Con emojis y una pizarra para dibujar.",
  "quees.pantalla.t": "Compartir pantalla",
  "quees.pantalla.d": "Enseñas tu pantalla a los demás, con el sonido de tu PC incluido. Sin capturas aquí: ya sabes cómo se ve.",
  "quees.camara.t": "Videollamada",
  "quees.camara.d": "Hasta cuatro cámaras, solo dentro del grupo privado y solo si la enciendes tú. Nadie enciende la cámara sin querer.",
  "quees.mando.t": "Compartir el mando",
  "quees.mando.d": "Un juego local de dos jugadores, jugado entre dos casas. Es lo que no hace ningún otro programa, y tiene su sitio en la galería.",
  "quees.archivos.t": "Pasar archivos",
  "quees.archivos.d": "Archivos directos entre vosotros dentro del grupo. Sin subirlos a ninguna nube por el camino.",
  "quees.juegos.t": "Nueve juegos dentro",
  "quees.juegos.d": "Ahorcado, 3 en raya, piedra-papel-tijera, conecta 4, damas, Pictionary, Golazo, Olimpia y póker. Contra la máquina o en red.",
  "quees.grupo.t": "Salas y grupos",
  "quees.grupo.d": "La sala es el sitio público donde te encuentras con gente. El grupo es el privado, por invitación, y es donde vive todo lo personal.",

  /* ---------- 3. Galería ---------- */
  "galeria.titulo": "Cómo se ve",
  "galeria.sub": "Diez capturas de la aplicación funcionando. Pincha en cualquiera para verla grande.",

  "gal.antesala.t": "La antesala",
  "gal.antesala.d": "Lo primero que ves al abrir. Eliges una de las salas de siempre, o escribes un nombre abajo y creas la tuya: si esa sala no existe, se crea sola y solo tienes que pasar el nombre. Aquí también cambias tu nick; dentro de una sala queda fijo.",

  "gal.sala.t": "Dentro de una sala",
  "gal.sala.d": "La sala es el sitio público: el chat llega a todos los que estén dentro. En la columna de la izquierda tienes lo que se puede hacer —jugar, compartir mando, compartir pantalla— y debajo quién hay, con su dirección en la red virtual.",

  "gal.juegos.t": "Los juegos",
  "gal.juegos.d": "Nueve juegos incluidos, sin instalar ni descargar nada. Los de turnos se pueden jugar solo contra la máquina si no hay nadie conectado, y Golazo y Olimpia son de dos, en el mismo teclado o cada uno con su mando.",

  "gal.grupo.t": "El grupo privado",
  "gal.grupo.d": "El grupo se crea desde la sala y se entra por invitación. Aparecen las cosas que no existen en la sala: compartir archivos, ver un vídeo juntos, la videollamada. La voz también es de aquí: los iconos junto a tu nombre son tu micro y tu altavoz.",

  "gal.pizarra.t": "Emojis y pizarra",
  "gal.pizarra.d": "El chat tiene emojis y una pizarra para dibujar. Lo que viaja por la red son los trazos, no una imagen: por eso un dibujo pesa lo que un mensaje de texto y llega al momento.",

  "gal.poker.t": "Póker",
  "gal.poker.d": "Texas Hold'em de dos a cuatro, contra la máquina o en red, con el chat al lado para picarse. Las fichas se cuentan solas y se apuesta pinchando en ellas.",

  "gal.golazo.t": "Golazo",
  "gal.golazo.d": "Fútbol 8-bit de los de antes. Dos jugadores en el mismo teclado, contra la máquina, o —y aquí está la gracia— uno con el mando compartido de alguien que está en otra casa.",

  "gal.olimpia.t": "Olimpia",
  "gal.olimpia.d": "Ocho pruebas de aporrear botones, contra la máquina o contra otra persona. Jabalina, velocidad, salto… lo que uno esperaría de unas olimpiadas de 8 bits.",

  "gal.mando.t": "Compartir el mando: un juego de un solo PC, jugado entre dos casas",
  "gal.mando.p1": "Esta es la función que no encontré en ningún otro sitio, y la que más cuesta explicar. Un juego local de dos jugadores —de los de sofá— no sabe nada de internet: solo sabe que hay dos mandos enchufados.",
  "gal.mando.p2": "Con Hermes, uno de los dos comparte su pantalla y además una plaza de mando. En el PC del otro aparece un mando virtual, y el juego se cree que le han enchufado un segundo mando. Se puede invitar hasta a tres personas: P2, P3 y P4.",
  "gal.mando.a": "Lo que ve quien comparte: el panel de Hermes, con el invitado ya dentro como P2, el aviso de que juega con teclado y el botón de echarlo cuando quiera.",
  "gal.mando.b": "Y el juego, con los dos dentro. Están en casas distintas.",
  "gal.mando.etiqueta": "La función estrella",

  /* ---------- 4. Descarga ---------- */
  "descarga.titulo": "Descargar Hermes",
  "descarga.p": "Windows 10 y 11 de 64 bits. Es gratis y no hay que registrarse: no existen las cuentas.",
  "descarga.boton": "Descargar Hermes-Setup.exe",
  "descarga.fichero": "El botón baja <b>Hermes-Setup.exe</b> directamente: es el instalador, y es lo único que hay que descargar.",
  "descarga.todas": "Ver todas las versiones, las notas de cada una y el fichero .sha256",
  "descarga.aviso": "Antes de instalar, lee lo de aquí abajo. Son cuatro cosas y ninguna es letra pequeña.",
  "descarga.actualiza": "Una vez instalado, Hermes te avisa cuando hay versión nueva y la instala si tú dices que sí. Nunca descarga ni instala nada por su cuenta.",

  /* ---------- 5. Antes de instalar ---------- */
  "saber.titulo": "Antes de instalar",
  "saber.sub": "Cuatro cosas que es mejor leer ahora que descubrir luego.",

  "saber.smart.t": "Windows va a avisarte de que no reconoce la aplicación",
  "saber.smart.p1": "Al abrir el instalador saldrá una pantalla azul de SmartScreen: «Windows protegió su PC» y «aplicación no reconocida».",
  "saber.smart.p2": "Por qué: firmar una aplicación cuesta unos cuantos cientos de euros al año, y Hermes todavía no está firmado. Ese aviso no dice que el programa tenga nada malo; dice que Windows no reconoce quién lo firma. Y no lo firma nadie.",
  "saber.smart.p3": "Cómo seguir: pincha en <b>Más información</b> y luego en <b>Ejecutar de todas formas</b>.",
  "saber.smart.p4": "Si prefieres comprobarlo por tu cuenta, cada versión publica junto al instalador un fichero <b>.sha256</b> con su huella, para que verifiques que lo que has bajado es lo que se publicó.",

  "saber.drivers.t": "Instala dos controladores, y se pueden quitar",
  "saber.drivers.p1": "Hermes necesita dos piezas que van por debajo del sistema, y el instalador las pone:",
  "saber.drivers.tap": "<b>TAP-Windows</b> — la tarjeta de red virtual. Es la que hace que tu PC y el de tus amigos estén en la misma red y que los juegos de LAN os vean.",
  "saber.drivers.vigem": "<b>ViGEmBus</b> — el mando virtual. Es la que hace que un juego crea que le han enchufado otro mando cuando alguien comparte el suyo.",
  "saber.drivers.p2": "Sin ellos no hay red virtual ni mando compartido: son la mitad de lo que hace Hermes. Al desinstalar, el desinstalador te pregunta si quieres quitarlos también, con dos casillas marcadas.",

  "saber.privacidad.t": "La sala es pública. El grupo es el privado",
  "saber.privacidad.p1": "<b>La sala</b> es el sitio público. Cualquiera que sepa el nombre puede entrar, así que ahí puede haber desconocidos. Sirve para encontrarse, para el chat y para jugar.",
  "saber.privacidad.p2": "<b>El grupo</b> es el espacio privado, y se entra por invitación. La voz, los archivos y la cámara existen <b>solo</b> dentro del grupo.",
  "saber.privacidad.p3": "No es una preferencia que puedas cambiar sin darte cuenta: en la sala esas funciones directamente no están. La cámara con desconocidos, no.",

  "saber.beta.t": "Es una beta, con lo que eso significa",
  "saber.beta.p1": "Hermes lo hace una sola persona y está en beta. Va a haber fallos, cosas a medias y versiones que arreglan lo que rompió la anterior. Si buscas algo terminado y con una empresa detrás, todavía no es esto.",
  "saber.beta.p2": "Lo que sí puedes esperar: que los fallos se cuenten en vez de taparse, y que cada versión diga qué cambia. Hermes guarda un registro en <b>hermes.log</b>, dentro de su carpeta, que es lo que hace falta para entender qué pasó.",
  "saber.beta.p3": "No hay cuentas ni contraseñas: no te registras en ningún sitio y no hay que dar un correo para usarlo.",

  /* ---------- Pie ---------- */
  "pie.hecho": "Hermes lo hace una persona, por gusto.",
  "pie.repo": "Este repositorio publica las descargas y esta página. El código no es público por ahora.",
  "pie.releases": "Descargas",
  "pie.arriba": "Volver arriba",

  /* ---------- Visor de imágenes ---------- */
  "visor.cerrar": "Cerrar",
  "visor.anterior": "Anterior",
  "visor.siguiente": "Siguiente"
};
