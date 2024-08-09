const hanabiMany = 10;
const hanabis = [];
const hinokos = [];
const colors = ['#FF0000','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF'];
let imageDivHeight = 300;
let imageDivWidth = 3000;

window.onload = function() {
  imageDivWidth = document.getElementById(`imageDiv`).clientWidth;
  imageDivHeight = document.getElementById(`imageDiv`).clientHeight;
  for(let id = 1; id <= hanabiMany; id++) {
    createHanabi();
  }

  setInterval(() => {
    movehanabis();
    moveHinokos();
  }, 33);
}

function createHanabi(){
  const x = Math.floor(Math.random() * imageDivWidth);
  const mainY = imageDivHeight - Math.floor(Math.random() * 300);
  const deadY = Math.floor(imageDivHeight /2) - Math.floor(Math.random() * Math.floor(imageDivHeight /2));
  const deadWidth = 120 + Math.floor(Math.random() *50);
  const widePoint = 10 + Math.floor(Math.random() *2) *2;
  const moveY = 5 + Math.floor(Math.random() *3) *4;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const y = imageDivHeight;
  const width = 2;
  const height = 15;
  const hanabi = document.createElement("div");
  hanabi.style.width = `${width}px`;
  hanabi.style.height = `${height}px`;
  hanabi.style.backgroundColor = color;
  hanabi.style.borderRadius = '50%';
  hanabi.style.position = 'absolute';
  hanabi.style.left = x +'px';
  hanabi.style.top = y +'px';
  const hanabiObj = {
    x,
    y,
    width,
    height,
    deadY,
    deadWidth,
    widePoint,
    moveY,
    color,
    element: hanabi,
  }
  hanabis.push(hanabiObj);
  document.getElementById(`imageDiv`).appendChild(hanabi);
}

const hinokoMany = 30;

function createHinokos(x,y,color) {
  const width = 4;
  const height =4;
  let positionMax = 3 + Math.floor(Math.random() *2);
  for(let position = 0; position <positionMax; position++) {
    for(let i = 1; i <= hinokoMany; i++) {
      const direction = 360 * i / hinokoMany;
      const createX = x + Math.cos(getRadian(direction)) *12 *position;
      const createY = y + Math.sin(getRadian(direction)) *12 *position;
      const hinoko = document.createElement("div");
      hinoko.style.width = `${width}px`;
      hinoko.style.height = `${height}px`;
      hinoko.style.backgroundColor = color;
      hinoko.style.borderRadius = '50%';
      hinoko.style.position = 'absolute';
      hinoko.style.left = x + 'px';
      hinoko.style.top = y + 'px';
      const hinokoObj = {
        x: createX,
        y: createY,
        color,
        direction,
        aliveClock: 0,
        gravity: 0,
        element: hinoko,
      }
      hinokos.push(hinokoObj);
      document.getElementById('imageDiv').appendChild(hinoko);
    }
  }
}

function movehanabis() {
  for(let index=0; index < hanabis.length; index++) {
    const hanabiObj = hanabis[index];
    if(hanabiObj.y <= hanabiObj.deadY){
      hanabis.splice(index, 1);
      index -= 1;
      hanabiObj.element.parentNode.removeChild(hanabiObj.element);
      setTimeout(() => {
        createHinokos(hanabiObj.x, hanabiObj.y, hanabiObj.color);
        createHanabi();
      }, 400);

    continue;

    } else {
      hanabiObj.y -= hanabiObj.moveY;
      hanabiObj.element.style.top = hanabiObj.y + 'px';
    }
  }
}

const deadClock = 40;
const velocity = 4;

function moveHinokos() {
  for(let index =0; index< hinokos.length; index++) {
    const hinokoObj = hinokos[index];
    if (hinokoObj.aliveClock >= deadClock ) {
      hinokos.splice(index, 1);
      index -= 1;
      hinokoObj.element.parentNode.removeChild(hinokoObj.element);
    }

    hinokoObj.x += Math.cos(getRadian(hinokoObj.direction)) *velocity;
    hinokoObj.y += Math.sin(getRadian(hinokoObj.direction)) *velocity + hinokoObj.gravity;
    hinokoObj.gravity += 0.08;
    hinokoObj.element.style.left = hinokoObj.x + 'px';
    hinokoObj.element.style.top = hinokoObj.y + 'px';
    hinokoObj.element.style.opacity = 1 - (hinokoObj.aliveClock / deadClock).toFixed(2);

    hinokoObj.aliveClock += 1;
  }
}

function getRadian(kakudo) {
  return kakudo *(Math.PI / 180);
}