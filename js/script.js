let order = [];
let clicked_order = [];
let score = 0;

// 0 - green | 1 - red | 2 - yellow | 3 - blue

const btn_green = document.querySelector('.to-button-genius.green');
const btn_red = document.querySelector('.to-button-genius.red');
const btn_yellow = document.querySelector('.to-button-genius.yellow');
const btn_blue = document.querySelector('.to-button-genius.blue');
const message_return = document.querySelector("#message-return");

// Cria a orderm aleatória
let shuffleOrder = async () => {
    let color_order = Math.floor(Math.random() * 4);
    order[order.length] = color_order;
    clicked_order = [];

    for (let i = 0; i < order.length; i++) {
        lightColor(createColorElement(order[i]), Number(i) + 1);
    }
}

// acessar a proxima cor
let lightColor = async (element, number) => {
    number *= 500;
    element.classList.add('active');
    await delay(number);
    element.classList.remove('active')
}

// checando se os botoes clicados são os mesmos que foi gerado pelas orders
let checkOrder = () => {
    for (let i = 0; i < clicked_order.length; i++) {
        if (clicked_order[i] != order[i]) {
            gamerOver();
            break;
        }
        if (clicked_order.length == order.length) {
            message_return.innerHTML = `Pontuação: ${score}\nVocê acertou! Iniciando o próximo nível!`;
            message_return.classList.remove('danger', 'info');
            message_return.classList.add('success');
            nextLevel();
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// funcao de click do usuário
let click = async color => {
    clicked_order[clicked_order.length] = color;
    checkOrder();
}

// funcao que retorna a cor
let createColorElement = color => {
    let value;
    switch (color) {
        case 0:
            value = btn_green;
            break;
        case 1:
            value = btn_red;
            break;
        case 2:
            value = btn_yellow;
            break;
        case 3:
            value = btn_blue;
            break;
        default:
    }
    return value;
}

// função para o próximo nivel de jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// função para gamer hover
let gamerOver = () => {
    message_return.innerHTML = `Pontuação: ${score}!\nVocê perdeu o jogo!`;
    message_return.classList.remove('success', 'info');
    message_return.classList.add('danger');
    order = [];
    clicked_order = [];
}

// funcao para começar o jogo
let playGame = () => {
    message_return.innerHTML = `Bem vindo ao Genius! Iniciando um novo jogo!`;
    message_return.classList.remove('success', 'danger');
    message_return.classList.add('info');
    score = 0;
    order = [];
    clicked_order = [];
    nextLevel();
}

// funcao de error no create
let errorCreate = () => {
    order = [];
    clicked_order = [];
    score = 0;
}

btn_green.addEventListener('click', () => click(0));
btn_red.addEventListener('click', () => click(1));
btn_yellow.addEventListener('click', () => click(2));
btn_blue.addEventListener('click', () => click(3));

document.querySelector('#init-game-genius').addEventListener('click', () => playGame());