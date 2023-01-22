var socket = new WebSocket('ws://localhost:8080');
var gameContainer = document.getElementById("game-container");
let playerCards=[];
let vez = "";
let playerName, playerPassword;
const cardDeck = [
{ id: 1, imgSrc: 'img/god1.png', name: 'Zoom', power: 96, defense: 76,  element: 'Fumaça',  classe: 'sombra' },
{ id: 2, imgSrc: 'img/god2.png', name: 'Flash', power: 99, defense: 90,  element: 'Portal',  classe: 'alien' },
{ id: 3, imgSrc: 'img/god3.png', name: 'Sombra', power: 97, defense: 88,  element: 'Acido',  classe: 'alien' },
{ id: 4, imgSrc: 'img/god4.png', name: 'Ultron', power: 90, defense: 88,  element: 'Larva',  classe: 'elementos' },
{ id: 5, imgSrc: 'img/god5.png', name: 'Kratos', power: 80, defense: 68,  element: 'Furação',  classe: 'elementos' },
{ id: 6, imgSrc: 'img/god6.png', name: 'GeloX', power: 90, defense: 88,  element: 'Gelo',  classe: 'elementos' },
{ id: 7, imgSrc: 'img/god7.png', name: 'Pedra Pyetra', power: 97, defense: 88,  element: 'Pedra',  classe: 'elementos' },
{ id: 8, imgSrc: 'img/god8.png', name: 'Fogo Branco', power: 88, defense: 88,  element: 'Fogo',  classe: 'elementos' },
{ id: 9, imgSrc: 'img/god9.png', name: 'Andromeda', power: 82, defense: 80,  element: 'Areia',  classe: 'elementos' },
{ id: 10, imgSrc: 'img/god10.png', name: 'Red Jhon', power: 92, defense: 80,  element: 'Hibrido',  classe: 'alien' },
{ id: 11, imgSrc: 'img/god11.png', name: 'Ametista', power: 99, defense: 90,  element: 'Agua',  classe: 'elementos' },
{ id: 12, imgSrc: 'img/god12.png', name: 'Julia', power: 99, defense: 99,  element: 'Mente',  classe: 'mago' },
{ id: 13, imgSrc: 'img/god13.png', name: 'Constantine MX', power: 99, defense: 96,  element: 'Guerreiro',  classe: 'guerreiro' },
{ id: 14, imgSrc: 'img/god14.png', name: 'Xou', power: 89, defense: 76,  element: 'Fumaça',  classe: 'sombra' },
{ id: 15, imgSrc: 'img/god15.png', name: 'MX Flash', power: 96, defense: 86,  element: 'Portal',  classe: 'alien' },
{ id: 16, imgSrc: 'img/god16.png', name: 'Rubia', power: 95, defense: 57,  element: 'Acido',  classe: 'alien' },
{ id: 17, imgSrc: 'img/god17.png', name: 'Lucisa', power: 99, defense: 99,  element: 'Larva',  classe: 'elementos' },
{ id: 18, imgSrc: 'img/god18.png', name: 'Pantera Rocha', power: 99, defense: 96,  element: 'Furação',  classe: 'elementos' },
{ id: 19, imgSrc: 'img/god19.png', name: 'Gelo', power: 89, defense: 76,  element: 'Gelo',  classe: 'elementos' },
{ id: 20, imgSrc: 'img/god20.png', name: 'Pedra', power: 89, defense: 76,  element: 'Pedra',  classe: 'elementos' },
{ id: 21, imgSrc: 'img/god21.png', name: 'Fogo', power: 96, defense: 86,  element: 'Fogo',  classe: 'elementos' },
{ id: 22, imgSrc: 'img/god22.png', name: 'Areia', power: 120, defense: 100,  element: 'Areia',  classe: 'elementos' },
{ id: 23, imgSrc: 'img/god23.png', name: 'Hibrido', power: 93, defense: 73,  element: 'Hibrido',  classe: 'alien' },
{ id: 24, imgSrc: 'img/god24.png', name: 'Liquido', power: 97, defense: 73,  element: 'Agua',  classe: 'elementos' },
{ id: 25, imgSrc: 'img/god25.png', name: 'Mente', power: 97, defense: 73,  element: 'Mente',  classe: 'mago' },
{ id: 26, imgSrc: 'img/god26.png', name: 'Guerreiro', power: 90, defense: 67,  element: 'Guerreiro',  classe: 'guerreiro' },
{ id: 27, imgSrc: 'img/god27.png', name: 'Zoom', power: 78, defense: 68,  element: 'Fumaça',  classe: 'sombra' },
{ id: 28, imgSrc: 'img/god28.png', name: 'Portal', power: 88, defense: 68,  element: 'Portal',  classe: 'alien' },
{ id: 29, imgSrc: 'img/god29.png', name: 'Acido', power: 98, defense: 88,  element: 'Acido',  classe: 'alien' },
{ id: 30, imgSrc: 'img/god30.png', name: 'Larva', power: 98, defense: 88,  element: 'Larva',  classe: 'elementos' },
{ id: 31, imgSrc: 'img/god31.png', name: 'Furação', power: 98, defense: 88,  element: 'wing',  classe: 'elementos' },
{ id: 32, imgSrc: 'img/god32.png', name: 'Gelo Azul', power: 84, defense: 54,  element: 'plant',  classe: 'elementos' },
{ id: 33, imgSrc: 'img/god33.png', name: 'Pedra', power: 84, defense: 54,  element: 'plant',  classe: 'elementos' },
{ id: 34, imgSrc: 'img/god34.png', name: 'Fogo rosa', power: 84, defense: 77,  element: 'plant',  classe: 'elementos' },
{ id: 35, imgSrc: 'img/god35.png', name: 'Areia', power: 89, defense: 83,  element: 'Areia',  classe: 'elementos' },
{ id: 36, imgSrc: 'img/god36.png', name: 'Hibrido', power: 79, defense: 63,  element: 'Hibrido',  classe: 'alien' },
{ id: 37, imgSrc: 'img/god37.png', name: 'Agua', power: 91, defense: 77,  element: 'Gelo',  classe: 'elementos' },
{ id: 38, imgSrc: 'img/god38.png', name: 'Mente', power: 99, defense: 37,  element: 'Mente',  classe: 'human' },
];



// Envia os dados de login para o servidor
socket.onopen = function(event) {
    let jogadorNome = prompt("Insira seu nome de usuário:", cardDeck[Math.floor(Math.random() * 39)].name);
    playerName = jogadorNome;
    playerPassword = prompt("Insira sua senha:");
    socket.send(JSON.stringify({ type: 'login', data: { playerName, playerPassword } }));
    playerCards = dealCards(3);
    socket.send(`player-cards:${JSON.stringify(playerCards)}`);
    displayCards(playerCards);
    var nome = document.getElementById("nome");
    nome.value=jogadorNome;
    updateRangeValue();
}


socket.onmessage = function(event) {
    //recebe as mensagens do servidor
    const message = JSON.parse(event.data);
    if (message.type === 'move-card') {
        playerCards = message;
        vez= message.playerName;
        showSelectedCard(playerCards);
        } else if (message.type === 'player-cards') {
        playerCards = message;
        displayCards(playerCards);
        } else if (message.type === 'acabou') {
            venceu();
        }
        else if (message.type === 'card-selected') {
        const cardId = message;
        let selectedCard;
        playerCards.forEach(cards => {
            if (cards.id == cardId) {
            selectedCard = cards;
            }
        updateRangeValue();
        });
        if(selectedCard){
        showSelectedCard(selectedCard);
        }

        }
};

// const cardImages = document.querySelectorAll("img[data-defense]");
// let totalDefense = 0;
// console.log(cardImages);
// cardImages.forEach(image => {
//     totalDefense += parseInt(image.getAttribute("data-defense"));
    
// });
// document.getElementById("myRange").value = totalDefense;
// console.log(totalDefense);
var totalDefense = 0;
function updateRangeValue() {
    //atualiza os pontos de vida global
    var range = document.getElementById("myRange");
    var cards = document.querySelectorAll("img");
    var vida = document.getElementById("vida");
   
    var totalDefense = 0;
    cards.forEach(card => {
        totalDefense += parseInt(card.dataset.defense);
    });
    range.value = totalDefense;
    vida.value= totalDefense;
    if (totalDefense === 0) {
        socket.send(JSON.stringify({ type: 'acabou', data: { playerName, 'perdeu':'perdeu!' } }));
        perdeu();
    }else{
        sim()
    }
}

// function sendCardId(card) {
//     const cardId = card.getAttribute('data-id');
//     socket.send(JSON.stringify({type:'card-selected',data:cardId}));
// }

    
function dealCards(numCards) {
    const shuffledDeck = shuffleDeck(cardDeck);
    return shuffledDeck.slice(0, numCards);
}
function shuffleDeck(deck) {
    //embalhara as cartas
    for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function showSelectedCard(selectedCard) {
    // recebe o movimento do oponente
    var cards = document.querySelectorAll("img");
    const divsArr = Array.from(cards)
    let total=0;
    for(var i=0;i<cards.length;i++){
        cards[i].removeAttribute("class");
    }
    if(selectedCard.targetDiv=='div1'){
        total=cardDeck[divsArr[0].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[0].id].defense=  total;
        cards[0].setAttribute('data-defense',   total);
        cards[0].setAttribute("class", "w3-animate-zoom");
        if(cardDeck[divsArr[0].id].defense<=0){
            cards[0].remove();
        }
    }
    else if(selectedCard.targetDiv=='div2'){
        total=cardDeck[divsArr[1].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[1].id].defense=  total;
        cards[1].setAttribute('data-defense',   total);
        cards[1].setAttribute("class", "w3-animate-zoom");
        if(cardDeck[divsArr[1].id].defense<=0){
            cards[1].remove();
        }
    }
    if(selectedCard.targetDiv=='div3'){
        total=cardDeck[divsArr[2].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[2].id].defense=  total;
        cards[2].setAttribute('data-defense', total);
        cards[2].setAttribute("class", "w3-animate-zoom");
        if(cardDeck[divsArr[2].id].defense<=0){
            cards[2].remove();
        }
    }
    
    updateRangeValue()
}

function displayCards(cards){
    const cardContainer = document.querySelector(".card-container");
    let cardsHTML = "";
    
    cards.forEach(card => {
        cardsHTML += `
          <div class="card greek top w3-card-4" data-id="${card.id}" data-defense="${card.defense}" ondrop="drop(event)" ondragover="allowDrop(event)" >
          <img src="${card.imgSrc}" alt="${card.name}" id="${card.id}" data-id="${card.id}" data-power="${card.power}" data-defense="${card.defense}"
           draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" data-turn="jogador"
           style="width: 130px;height: 200px;">
          
          </div>
        `;
      });
    cardContainer.innerHTML = cardsHTML;
}
function sendCardMovement(ev) {
    // quando a carta é movimentada, divide o poder pela defesa e envia o ataque
    var elementId = ev.dataTransfer.getData("elementId");
    var cardElement = document.getElementById(elementId);
    var cardId = cardElement.getAttribute('data-id');
    var cardPower = cardElement.getAttribute('data-power')/cardElement.getAttribute('data-defense')+0.66;
    var targetDiv = ev.target.id;

    socket.send(JSON.stringify({ type: 'move-card', data: { cardId, cardPower,  targetDiv,playerName } }));
}

function doObjectsCollide(obj1, obj2) {
    var obj1Rect = obj1.getBoundingClientRect();
    var obj2Rect = obj2.getBoundingClientRect();
    return !(obj1Rect.top > obj2Rect.bottom || 
             obj1Rect.right < obj2Rect.left || 
             obj1Rect.bottom < obj2Rect.top || 
             obj1Rect.left > obj2Rect.right)
}

function checkCollision(image) {
    console.log(image)
    var images = document.getElementsByTagName("img");
    const divsArr = Array.from(images)
    
    for (var i = 0; i < images.length; i++) {
        if (doObjectsCollide(image, images[i]) && image.parentNode === images[i].parentNode && images[i].parentNode !== null) {
            // Calcular novos valores de ataque e defesa
            if(parseInt(image.getAttribute('data-power'))<100 || parseInt(images[i].getAttribute('data-power'))<100){
            var newAttack =  parseInt(image.getAttribute('data-power'))+parseInt(images[i].getAttribute('data-power'));
            var newDefense = parseInt(image.getAttribute('data-defense'))+parseInt(images[i].getAttribute('data-defense'));
            // Atualizar valores de ataque e defesa na imagem
            images[i].setAttribute('data-power', newAttack);
            images[i].setAttribute('data-defense', newDefense);
            }
            // Remover imagem colidida
            //image.remove();
        }
    }
}

// os eventos arrastar e soltar
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("elementId", ev.target.id);

}

function drop(ev) {
    if(vez===playerName){
        nao()
        return;
    }
    
    ev.preventDefault();
    var elementId = ev.dataTransfer.getData("elementId");
    var element = document.getElementById(elementId);
    var targetDiv = ev.target.id;
    //if (vez === playerName) {
    ev.target.appendChild(element);
    
    if (element && targetDiv) {
        checkCollision(element);
        sendCardMovement(ev);
        vez=playerName;
    }

}
   
// Get the modal
var modal = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function  nao() {
    modal2.style.display = "none";
    modal.style.display = "block";
    
}
function  sim() {
    modal.style.display = "none";
    modal2.style.display = "block";
}
function  venceu() {
    modal4.style.display = "block";
}
function  perdeu() {
    modal3.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
if (event.target == modal2) {
    modal2.style.display = "none";
}
}
      