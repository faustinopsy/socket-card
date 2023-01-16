var socket = new WebSocket('ws://216.172.172.207:8080');
var gameContainer = document.getElementById("game-container");
let playerCards=[];
let vez = "";
let playerName, playerPassword;
const cardDeck = [
{ id: 1, imgSrc: 'img/god1.png', name: 'Zoom', power: 50, defense: 30,  element: 'Fumaça',  classe: 'sombra' },
{ id: 2, imgSrc: 'img/god2.png', name: 'Portal', power: 50, defense: 29,  element: 'Portal',  classe: 'alien' },
{ id: 3, imgSrc: 'img/god3.png', name: 'Acido', power: 50, defense: 27,  element: 'Acido',  classe: 'alien' },
{ id: 4, imgSrc: 'img/god4.png', name: 'Larva', power: 50, defense: 28,  element: 'Larva',  classe: 'elementos' },
{ id: 5, imgSrc: 'img/god5.png', name: 'Furação', power: 50, defense: 26,  element: 'Furação',  classe: 'elementos' },
{ id: 6, imgSrc: 'img/god6.png', name: 'Gelo', power: 50, defense: 29,  element: 'Gelo',  classe: 'elementos' },
{ id: 7, imgSrc: 'img/god7.png', name: 'Pedra', power: 50, defense: 28,  element: 'Pedra',  classe: 'elementos' },
{ id: 8, imgSrc: 'img/god8.png', name: 'Fogo', power: 50, defense: 27,  element: 'Fogo',  classe: 'elementos' },
{ id: 9, imgSrc: 'img/god9.png', name: 'Areia', power: 50, defense: 27,  element: 'Areia',  classe: 'elementos' },
{ id: 10, imgSrc: 'img/god10.png', name: 'Hibrido', power: 50, defense: 27,  element: 'Hibrido',  classe: 'alien' },
{ id: 11, imgSrc: 'img/god11.png', name: 'Agua', power: 50, defense: 27,  element: 'Agua',  classe: 'elementos' },
{ id: 12, imgSrc: 'img/god12.png', name: 'Mente', power: 50, defense: 27,  element: 'Mente',  classe: 'mago' },
{ id: 13, imgSrc: 'img/god13.png', name: 'Guerreiro', power: 50, defense: 27,  element: 'Guerreiro',  classe: 'guerreiro' },
];



// Envia os dados de login para o servidor


socket.onopen = function(event) {
    let jogadorNome = prompt("Insira seu nome de usuário:");
playerName = jogadorNome;
playerPassword = prompt("Insira sua senha:");
    socket.send(JSON.stringify({ type: 'login', data: { playerName, playerPassword } }));
playerCards = dealCards(3);
socket.send(`player-cards:${JSON.stringify(playerCards)}`);
displayCards(playerCards);
updateRangeValue();
}


socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    console.log(message);
    if (message.type === 'move-card') {
        playerCards = message;
        showSelectedCard(playerCards);
        } else if (message.type === 'player-cards') {
        playerCards = message;
        displayCards(playerCards);
        } else if (message.type === 'card-selected') {
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
function updateRangeValue() {
    var range = document.getElementById("myRange");
    var cards = document.querySelectorAll("img");
    var totalDefense = 0;
    cards.forEach(card => {
        totalDefense += parseInt(card.dataset.defense);
    });
    range.value = totalDefense;
}

function sendCardId(card) {
const cardId = card.getAttribute('data-id');
socket.send(JSON.stringify({type:'card-selected',data:cardId}));
}
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
    }
    
    function dealCards(numCards) {
    const shuffledDeck = shuffleDeck(cardDeck);
    return shuffledDeck.slice(0, numCards);
    }

function showSelectedCard(selectedCard) {
    
    console.log(selectedCard);
    var cards = document.querySelectorAll("img");
    const divsArr = Array.from(cards)
    let total=0;
    if(selectedCard.targetDiv=='div1'){
        total=cardDeck[divsArr[0].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[0].id].defense=  total;
        cards[0].setAttribute('data-defense',   total);
        console.log(cards[0]);
        if(cardDeck[divsArr[0].id].defense<=0){
            cards[0].remove();
        }
    }
    else if(selectedCard.targetDiv=='div2'){
        total=cardDeck[divsArr[1].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[1].id].defense=  total;
        cards[1].setAttribute('data-defense',   total);
        if(cardDeck[divsArr[1].id].defense<=0){
            cards[1].remove();
        }
    }
    if(selectedCard.targetDiv=='div3'){
        total=cardDeck[divsArr[2].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[2].id].defense=  total;
        cards[2].setAttribute('data-defense', total);
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
          <div class="w3-container w3-center">
          <p> Força: ${card.power}   Defesa: ${card.defense}  Elemento: ${card.element}</p>
          </div>
          <img src="${card.imgSrc}" alt="${card.name}" id="${card.id}" data-id="${card.id}" data-power="${card.power}" data-defense="${card.defense}" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ontouchstart="drag(event)" ontouchmove="touchMove(event)" ontouchend="endTouch(event)">
          
          </div>
        `;
      });
    cardContainer.innerHTML = cardsHTML;
    }
    function sendCardMovement(ev) {
        
        var elementId = ev.dataTransfer.getData("elementId");
        var cardElement = document.getElementById(elementId);
        var cardId = cardElement.getAttribute('data-id');
        var cardPower = cardElement.getAttribute('data-power')/cardElement.getAttribute('data-defense');
        var targetDiv = ev.target.id;
        
        socket.send(JSON.stringify({ type: 'move-card', data: { cardId, cardPower,  targetDiv } }));
    }

    function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("elementId", ev.target.id);
        
      }
      
      function drop(ev) {
       
          ev.preventDefault();
          var elementId = ev.dataTransfer.getData("elementId");
          var element = document.getElementById(elementId);
          var targetDiv = ev.target.id;
          //if (vez === playerName) {
            ev.target.appendChild(element);
          if (element && targetDiv) {
            
            sendCardMovement(ev);
            
        }
    // } else {
    //     alert("Não é a sua vez de jogar!");
    // }
      }
   

      