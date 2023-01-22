var socket = new WebSocket('ws://localhost:8080');
var gameContainer = document.getElementById("game-container");
let playerCards=[];
let vez = "";
let playerName, playerPassword;
let sala;
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
    // Adicionado código para escolher criar ou entrar em uma sala
    let choice = prompt("Digite 'criar' para criar uma nova sala ou 'entrar' para entrar em uma sala existente:");
    if (choice === 'criar') {
    socket.send(JSON.stringify({ type: 'create-room', data: { playerName, playerPassword } }));
    } else {
    let roomId = prompt("Insira o ID da sala que você deseja entrar:");
    sala=roomId;
    socket.send(JSON.stringify({ type: 'join-room', data: { playerName, playerPassword, 'roomId': roomId } }));
    }
   
    playerCards = dealCards(3);
    socket.send(JSON.stringify({ type: 'player-cards', data: playerCards }));
    displayCards(playerCards);
    var nome = document.getElementById("nome");
    nome.value=jogadorNome;
    updateRangeValue();
    }
    
   
    socket.onmessage = function(event) {
        //recebe as mensagens do servidor
        const message = JSON.parse(event.data);
        console.log(message);
    
        // Adicionando verificação para sala cheia
        if (message.type === 'cheia') {
            alert(message.mensagem);
            return;
        }
    
        if (message.type === 'move-card') {
            playerCards = message.data;
            vez= message.data.playerName;
            showSelectedCard(playerCards);
        } 
        else if (message.type === 'create-room' && message.playerName==playerName) {
            sala=message.roomId;
            var salaid = document.getElementById("sala");
            salaid.value=sala;
        }
        else if (message.type === 'join-room') {
        // Verifica se a sala corresponde à sala do jogador atual
        if (message.data.roomId !== sala) {
    
        return;
        }
        }
        else if (message.type === 'player-cards') {
        playerCards = message.data;
        displayCards(playerCards);
        } else if (message.type === 'acabou') {
        alert(vez + 'Venceu!');
        }
        else if (message.type === 'card-selected') {
        const cardId = message.data;
        let selectedCard;
        playerCards.forEach(cards => {
        if (cards.id == cardId) {
        selectedCard = cards;
        }
        alert("Sua vez")
        updateRangeValue();
        });
        if(selectedCard){
        showSelectedCard(selectedCard);
        }
     
        }
    };
    


    

   

      