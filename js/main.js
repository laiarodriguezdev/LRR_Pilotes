import { Pilota } from "./Pilota.js";

// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// funció per generar un número aleatori entre dues xifres

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// funció per generar un color aleatori

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// let Pilota1 = new Pilota(50, 100, 4, 4, "blue", 10);
// Pilota1.dibuixa(ctx);

let pilotes = [];

for (let i = 0; i < 25; i++) {
  const mida = random(10, 20);
  const x = random(mida, width - mida);
  const y = random(mida, height - mida);
  const velX = random(-5.5, 5.5);
  const velY = random(-5.5, 5.5);
  const color = randomRGB();

  const pilota = new Pilota(x, y, velX, velY, color, mida);
  pilotes.push(pilota);
}

function collision() {
  //console.log("Collision");
  for (let i = 0; i < pilotes.length; i++) {
    for (let j = i + 1; j < pilotes.length; j++) {
      const pilota1 = pilotes[i];
      const pilota2 = pilotes[j];

      const dx = pilota2.x - pilota1.x;
      const dy = pilota2.y - pilota1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // console.log("DISTANCE" + distance);

      if (distance < (pilota1.mida + pilota2.mida)) {
        //console.log(`Collision detectada entre pilota" ${i} i pilota ${j}`);

        const overlap = (pilota1.mida + pilota2.mida - distance) / 2;
        const angle = Math.atan2(dy, dx);
        const moveX = overlap * Math.cos(angle);
        const moveY = overlap * Math.sin(angle);

        pilota1.x -= moveX;
        pilota1.y -= moveY;
        pilota2.x += moveX;
        pilota2.y += moveY;

        // VelX es converteix en tempVelX per intercanviar el """"sentit"""" de la pilota.
        const tempVelX = pilota1.velX;
        const tempVelY = pilota1.velY;
        pilota1.velX = pilota2.velX;
        pilota1.velY = pilota2.velY;
        pilota2.velX = tempVelX;
        pilota2.velY = tempVelY;
      }
    }
  }
}

function loop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  pilotes.forEach((pilota) => {
    pilota.dibuixa(ctx);
    pilota.mou(width, height);
  });

  collision();

  requestAnimationFrame(loop);
}

loop();
