var socket = new WebSocket('ws://localhost:8080');
var gameContainer = document.getElementById("game-container");
let playerCards=[];
let vez = "";
let playerName, playerPassword;
const cardDeck = [
{ id: 1, imgSrc: 'img/god1.png', name: 'Zeus', power: 50, defense: 30,  element: 'raio',  classe: 'mago' },
{ id: 2, imgSrc: 'img/god2.png', name: 'Apollo', power: 50, defense: 29,  element: 'fogo',  classe: 'mago' },
{ id: 3, imgSrc: 'img/god3.png', name: 'Hades', power: 50, defense: 27,  element: 'larva',  classe: 'mago' },
{ id: 4, imgSrc: 'img/god4.png', name: 'Poseidon', power: 50, defense: 28,  element: 'agua',  classe: 'mago' },
{ id: 5, imgSrc: 'img/god5.png', name: 'Ra', power: 50, defense: 26,  element: 'fogo',  classe: 'mago' },
{ id: 6, imgSrc: 'img/god6.png', name: 'Shiva', power: 50, defense: 29,  element: 'terra',  classe: 'mago' },
{ id: 7, imgSrc: 'img/god7.png', name: 'Thor', power: 50, defense: 28,  element: 'raio',  classe: 'mago' },
{ id: 8, imgSrc: 'img/god8.png', name: 'Odin', power: 50, defense: 27,  element: 'fogo',  classe: 'mago' },
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
    
    if (message.type === 'move-card') {
        playerCards = message.data;
        showSelectedCard(playerCards);
        } else if (message.type === 'player-cards') {
        playerCards = message.data;
        displayCards(playerCards);
        } else if (message.type === 'card-selected') {
        const cardId = message.data;
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
    var cards = document.querySelectorAll(".card");
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
    alert(selectedCard.cardPower);
    alert(selectedCard.targetDiv);
    var cards = document.querySelectorAll("img");
    const divsArr = Array.from(cards)
    console.log(divsArr[0].id);
    if(selectedCard.targetDiv=='div1'){
        cardDeck[divsArr[0].id].defense=cards[0].dataset.defense-selectedCard.cardPower;
        console.log(cardDeck[cards[0].id]);
    }
    else if(selectedCard.targetDiv=='div2'){
        cardDeck[divsArr[1].id].defense==cards[1].dataset.defense-selectedCard.cardPower;
        console.log(cardDeck[cards[1].id]);
    }
    if(selectedCard.targetDiv=='div3'){
        cardDeck[divsArr[2].id].defense=cards[2].dataset.defense-selectedCard.cardPower;
        console.log(cardDeck[cards[2].id]);
    }



}

function displayCards(cards){
    const cardContainer = document.querySelector(".card-container");
    let cardsHTML = "";
    
    cards.forEach(card => {
        cardsHTML += `
          <div class="card greek top w3-card-4" data-id="${card.id}" data-defense="${card.defense}" ondrop="drop(event)" ondragover="allowDrop(event)">
          <div class="w3-container w3-center">
          <p> Força: ${card.power}   Defesa: ${card.defense}  Elemento: ${card.element}</p>
          </div>
          <img src="${card.imgSrc}" alt="${card.name}" id="${card.id}" data-id="${card.id}" data-power="${card.power}" data-defense="${card.defense}" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)">
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
        
        socket.send(JSON.stringify({ type: 'move-card', data: { cardId, cardPower, targetDiv: targetDiv } }));
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
    
      