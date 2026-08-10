/* Hermes — ENGLISH text.
   =============================================================================
   A .js and not a .json on purpose: the page has to work by opening index.html
   straight from disk, and browsers block fetch() over file://. See es.js for
   the full note and for the three steps needed to add a language.

   Keys are grouped BY SECTION of the page, top to bottom, which is how you read
   it while translating. Never touch the keys on the left.
   ============================================================================= */

window.HERMES_TEXTOS = window.HERMES_TEXTOS || {};
window.HERMES_TEXTOS.en = {

  /* ---------- Page metadata ---------- */
  "meta.lang": "en",
  "meta.titulo": "Hermes — the LAN party, in a single window",
  "meta.descripcion": "Virtual LAN, chat, voice, games, screen sharing and controller sharing. One program. Free beta for Windows.",

  /* ---------- Navigation ---------- */
  "nav.inicio": "Home",
  "nav.quees": "What it is",
  "nav.galeria": "Gallery",
  "nav.descarga": "Download",
  "nav.saber": "Before you install",
  "nav.idioma": "Language",

  /* ---------- 1. Home ---------- */
  "hero.claim": "LAN parties never died. They were just missing an app.",
  "hero.sub": "Virtual LAN, chat, voice, games, screen sharing and controller sharing. All in the same window.",
  "hero.boton": "Download for Windows",
  "hero.pie": "Beta · Windows 10 and 11 · free",
  "hero.alt": "Hermes emblem",
  "hero.bajar": "Read on",

  /* ---------- 2. What is Hermes ---------- */
  "quees.titulo": "What is Hermes?",
  "quees.p1": "Getting a game going with friends left me with ten programs open at once. One to talk. One so the games could see each other on the same network. One to share my screen. One to send files. And another so one of us could play on someone else's PC. Each with its own account, its own window and its own way of doing things.",
  "quees.p2": "Hermes is an attempt to fix that by putting it all in one place. You open Hermes, your friends join the same room, and you're in.",

  "quees.red.t": "A virtual LAN",
  "quees.red.d": "You and your friends end up on the same network even though everyone is at home. Old LAN games can see each other again, and you never touch the router.",
  "quees.voz.t": "Chat and voice",
  "quees.voz.d": "Text chat in the room, and group voice so you can talk while you play. With emoji and a whiteboard to draw on.",
  "quees.pantalla.t": "Screen sharing",
  "quees.pantalla.d": "Show your screen to everyone else, with your PC's sound along with it. No screenshot of it here: you already know what that looks like.",
  "quees.camara.t": "Video calls",
  "quees.camara.d": "Up to four cameras, inside the private group only, and only if you turn yours on. Nobody's camera comes on by accident.",
  "quees.mando.t": "Controller sharing",
  "quees.mando.d": "A local two-player game, played from two different houses. This is the one no other program does, and it gets its own spot in the gallery.",
  "quees.archivos.t": "Send files",
  "quees.archivos.d": "Files go straight between you inside the group. They don't go up to anyone's cloud on the way.",
  "quees.juegos.t": "Nine games built in",
  "quees.juegos.d": "Hangman, tic-tac-toe, rock-paper-scissors, connect 4, draughts, Pictionary, Golazo, Olimpia and poker. Against the computer or against each other.",
  "quees.grupo.t": "Rooms and groups",
  "quees.grupo.d": "The room is the public place where you meet people. The group is the private one, invitation only, and it's where everything personal lives.",

  /* ---------- 3. Gallery ---------- */
  "galeria.titulo": "What it looks like",
  "galeria.sub": "Ten screenshots of the app running. Click any of them to see it full size.",

  "gal.antesala.t": "The lobby",
  "gal.antesala.d": "The first thing you see. Pick one of the standing rooms, or type a name at the bottom and make your own: if that room doesn't exist it gets created on the spot, and all you have to pass around is the name. This is also where you change your nickname; inside a room it stays put.",

  "gal.sala.t": "Inside a room",
  "gal.sala.d": "The room is the public place: chat reaches everyone who's in it. The left-hand column holds what you can do — play, share a controller, share your screen — and below it, who's here and their address on the virtual network.",

  "gal.juegos.t": "The games",
  "gal.juegos.d": "Nine games included, with nothing to install or download. The turn-based ones can be played alone against the computer when nobody's around, and Golazo and Olimpia are two-player, either sharing a keyboard or one controller each.",

  "gal.grupo.t": "The private group",
  "gal.grupo.d": "Groups are created from a room and joined by invitation. Things that don't exist in the room show up here: sending files, watching a video together, the video call. Voice lives here too — the icons next to your name are your microphone and your speaker.",

  "gal.pizarra.t": "Emoji and whiteboard",
  "gal.pizarra.d": "The chat has emoji and a whiteboard to draw on. What travels across the network is the strokes, not a picture, which is why a drawing weighs about as much as a text message and arrives straight away.",

  "gal.poker.t": "Poker",
  "gal.poker.d": "Texas Hold'em for two to four, against the computer or against each other, with the chat right there for the trash talk. Chips are counted for you and you bet by clicking them.",

  "gal.golazo.t": "Golazo",
  "gal.golazo.d": "8-bit football, the old kind. Two players on one keyboard, or against the computer, or — and this is the point — one of them playing on a controller shared from another house.",

  "gal.olimpia.t": "Olimpia",
  "gal.olimpia.d": "Eight button-mashing events, against the computer or against another person. Javelin, sprint, jump… what you'd expect from an 8-bit olympics.",

  "gal.mando.t": "Controller sharing: a one-PC game, played from two houses",
  "gal.mando.p1": "This is the feature I couldn't find anywhere else, and the hardest one to explain. A local two-player game — a couch game — knows nothing about the internet. All it knows is that two controllers are plugged in.",
  "gal.mando.p2": "With Hermes, one of you shares their screen and a controller slot along with it. A virtual controller appears on the other person's PC, and the game is convinced a second controller just got plugged in. You can invite up to three people: P2, P3 and P4.",
  "gal.mando.a": "What the person sharing sees: the Hermes panel, with the guest already in as P2, a note saying they're playing on the keyboard, and a button to kick them out whenever.",
  "gal.mando.b": "And the game, with both players in it. They're in different houses.",
  "gal.mando.etiqueta": "The standout feature",

  /* ---------- 4. Download ---------- */
  "descarga.titulo": "Download Hermes",
  "descarga.p": "Windows 10 and 11, 64-bit. It's free and there's no signing up: there are no accounts.",
  "descarga.boton": "Download Hermes-Setup.exe",
  "descarga.fichero": "The button downloads <b>Hermes-Setup.exe</b> straight away: that's the installer, and it's the only thing you need.",
  "descarga.todas": "See every release, its notes and the .sha256 file",
  "descarga.aviso": "Read the section below before you install. It's four things and none of them is fine print.",
  "descarga.actualiza": "Once installed, Hermes tells you when there's a new version and installs it if you say yes. It never downloads or installs anything on its own.",

  /* ---------- 5. Before you install ---------- */
  "saber.titulo": "Before you install",
  "saber.sub": "Four things better read now than discovered later.",

  "saber.smart.t": "Windows will warn you that it doesn't recognise the app",
  "saber.smart.p1": "When you open the installer you'll get the blue SmartScreen page: \"Windows protected your PC\" and \"unrecognised app\".",
  "saber.smart.p2": "Why: signing an application costs a few hundred euros a year, and Hermes isn't signed yet. That warning isn't saying the program is bad; it's saying Windows doesn't recognise who signed it. Nobody did.",
  "saber.smart.p3": "How to carry on: click <b>More info</b> and then <b>Run anyway</b>.",
  "saber.smart.p4": "If you'd rather check for yourself, every version publishes a <b>.sha256</b> file next to the installer with its fingerprint, so you can confirm that what you downloaded is what was published.",

  "saber.drivers.t": "It installs two drivers, and they can be removed",
  "saber.drivers.p1": "Hermes needs two pieces that sit below the operating system, and the installer puts them there:",
  "saber.drivers.tap": "<b>TAP-Windows</b> — the virtual network adapter. This is what puts your PC and your friends' on the same network so that LAN games can see each other.",
  "saber.drivers.vigem": "<b>ViGEmBus</b> — the virtual controller. This is what makes a game believe another controller has been plugged in when someone shares theirs.",
  "saber.drivers.p2": "Without them there's no virtual LAN and no controller sharing: that's half of what Hermes does. When you uninstall, the uninstaller asks whether to remove them too, with two boxes already ticked.",

  "saber.privacidad.t": "The room is public. The group is the private one",
  "saber.privacidad.p1": "<b>The room</b> is the public place. Anyone who knows the name can walk in, so there may well be strangers in it. It's for meeting people, chatting and playing.",
  "saber.privacidad.p2": "<b>The group</b> is the private space, and you get in by invitation. Voice, files and camera exist <b>only</b> inside the group.",
  "saber.privacidad.p3": "This isn't a setting you can flip by accident: in a room those features simply aren't there. Cameras around strangers, no.",

  "saber.beta.t": "It's a beta, with everything that means",
  "saber.beta.p1": "Hermes is made by one person and it's in beta. There will be bugs, half-finished corners and releases that fix what the last one broke. If you're after something finished with a company behind it, this isn't it yet.",
  "saber.beta.p2": "What you can expect: that problems get told rather than buried, and that every release says what changed. Hermes keeps a log in <b>hermes.log</b> inside its own folder, which is what you need to work out what happened.",
  "saber.beta.p3": "There are no accounts and no passwords: you don't register anywhere and you don't hand over an email to use it.",

  /* ---------- Footer ---------- */
  "pie.hecho": "Hermes is made by one person, for the fun of it.",
  "pie.repo": "This repository publishes the downloads and this page. The source isn't public for now.",
  "pie.releases": "Downloads",
  "pie.arriba": "Back to top",

  /* ---------- Image viewer ---------- */
  "visor.cerrar": "Close",
  "visor.anterior": "Previous",
  "visor.siguiente": "Next"
};
