<p align="right"><a href="README.md">English</a> · <b>Español</b></p>

<p align="center">
  <img src="assets/hermes-emblema.webp" width="150" alt="Hermes">
</p>

<h1 align="center">Hermes</h1>

<p align="center"><b>La LAN party no murió. Solo le faltaba una app.</b></p>

<p align="center">
  Red virtual, chat, voz, juegos, pantalla compartida y mando compartido.<br>
  En la misma ventana.
</p>

<p align="center">
  <a href="https://deivincci.github.io/Hermes/?lang=es"><b>Página web</b></a> ·
  <a href="https://github.com/Deivincci/Hermes/releases/latest"><b>Descargar</b></a>
</p>

---

## ¿Qué es Hermes?

Para echar una partida con los colegas terminé con diez programas abiertos a la vez. Uno para
hablar. Otro para que los juegos nos vieran en la misma red. Otro para compartir pantalla. Otro para
pasarnos archivos. Otro más para que uno jugara en el PC del otro. Cada uno con su cuenta, su
ventana y su manera de hacer las cosas.

Hermes intenta resolver eso: juntarlo todo en un sitio. Abres Hermes, tus amigos entran a la misma
sala, y ya estáis dentro.

| | |
|---|---|
| **Una red virtual** | Tus amigos y tú quedáis en la misma red aunque cada uno esté en su casa. Los juegos de LAN de toda la vida vuelven a veros, sin tocar el router. |
| **Chat y voz** | Chat en la sala y voz de grupo, con emojis y una pizarra para dibujar. |
| **Compartir pantalla** | Enseñas tu pantalla a los demás, con el sonido de tu PC incluido. |
| **Videollamada** | Hasta cuatro cámaras, solo dentro del grupo privado y solo si la enciendes tú. |
| **Compartir el mando** | Un juego local de dos jugadores, jugado entre dos casas. Ver más abajo. |
| **Pasar archivos** | Archivos directos entre vosotros dentro del grupo. Sin subirlos a ninguna nube por el camino. |
| **Nueve juegos dentro** | Ahorcado, 3 en raya, piedra-papel-tijera, conecta 4, damas, Pictionary, Golazo, Olimpia y póker. |

### Compartir el mando

Un juego local de dos jugadores —de los de sofá— no sabe nada de internet: solo sabe que hay dos
mandos enchufados.

Con Hermes, uno de los dos comparte su pantalla y además una plaza de mando. En el PC del otro
aparece un mando virtual, y el juego se cree que le han enchufado un segundo mando. Se puede invitar
hasta a tres personas: P2, P3 y P4.

---

## Descargar

**[Ir a la última versión →](https://github.com/Deivincci/Hermes/releases/latest)**

Windows 10 y 11 de 64 bits. Busca el fichero **`Hermes-Setup-X.Y.Z.exe`**: es el instalador, no hay
más. Es gratis y no hay que registrarse: no existen las cuentas.

Una vez instalado, Hermes te avisa cuando hay versión nueva y la instala si tú dices que sí. Nunca
descarga ni instala nada por su cuenta.

---

## Antes de instalar

Cuatro cosas que es mejor leer ahora que descubrir luego.

### 1. Windows va a avisarte de que no reconoce la aplicación

Al abrir el instalador saldrá una pantalla azul de SmartScreen: *«Windows protegió su PC»* y
*«aplicación no reconocida»*.

**Por qué:** firmar una aplicación cuesta unos cuantos cientos de euros al año, y Hermes todavía no
está firmado. Ese aviso no dice que el programa tenga nada malo; dice que Windows no reconoce quién
lo firma. Y no lo firma nadie.

**Cómo seguir:** pincha en **Más información** y luego en **Ejecutar de todas formas**.

Si prefieres comprobarlo por tu cuenta, cada versión publica junto al instalador un fichero
`.sha256` con su huella, para que verifiques que lo que has bajado es lo que se publicó.

### 2. Instala dos controladores, y se pueden quitar

Hermes necesita dos piezas que van por debajo del sistema, y el instalador las pone:

- **TAP-Windows** — la tarjeta de red virtual. Es la que hace que tu PC y el de tus amigos estén en
  la misma red y que los juegos de LAN os vean.
- **ViGEmBus** — el mando virtual. Es la que hace que un juego crea que le han enchufado otro mando
  cuando alguien comparte el suyo.

Sin ellos no hay red virtual ni mando compartido: son la mitad de lo que hace Hermes. Al
desinstalar, el desinstalador te pregunta si quieres quitarlos también, con dos casillas marcadas.

### 3. La sala es pública. El grupo es el privado

**La sala** es el sitio público. Cualquiera que sepa el nombre puede entrar, así que ahí puede haber
desconocidos. Sirve para encontrarse, para el chat y para jugar.

**El grupo** es el espacio privado, y se entra por invitación. La voz, los archivos y la cámara
existen **solo** dentro del grupo.

No es una preferencia que puedas cambiar sin darte cuenta: en la sala esas funciones directamente no
están.

### 4. Es una beta, con lo que eso significa

Hermes lo hace una sola persona y está en beta. Va a haber fallos, cosas a medias y versiones que
arreglan lo que rompió la anterior. Si buscas algo terminado y con una empresa detrás, todavía no es
esto.

Lo que sí puedes esperar: que los fallos se cuenten en vez de taparse, y que cada versión diga qué
cambia. Hermes guarda un registro en `hermes.log`, dentro de su carpeta, que es lo que hace falta
para entender qué pasó.

No hay cuentas ni contraseñas: no te registras en ningún sitio y no hay que dar un correo para
usarlo.

---

<p align="center">
  <sub>Este repositorio publica las descargas y la página web. El código no es público por ahora.</sub>
</p>
