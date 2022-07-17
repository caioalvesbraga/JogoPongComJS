//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//vaiáveis do oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeYOponenete;

//variáveis do placar
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaMinhaRaquete();
  movimentaOponente();
  verificaColisaoLib(xOponente,yOponente);
  verificaColisaoLib(xRaquete,yRaquete);
  mostraPlacar();
  marcaPontos();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }
  if (keyIsDown(83)){
    yRaquete += 10;
  }
}

let colidiu = false
function verificaColisaoLib(x,y){
   colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaOponente(){
  velocidadeYOponente = yBolinha -yOponente - raqueteComprimento / 2 - 30;
  yOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function mostraPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10, 40, 20);
  fill(255);
  text(meusPontos,170,26);
  fill(color(255,140,0))
  rect(450,10, 40, 20);
  fill(255);
  text(pontosOponente,470,26);
}

function marcaPontos(){
  if(xBolinha>592){
    meusPontos+=1;
    ponto.play();
  }
  if(xBolinha<8){
    pontosOponente+=1;
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 30){
    XBolinha = 23
    }
}