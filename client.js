// function to create a room
function createRoom() {
    playerName = document.getElementById("playerName").value;
    playerPassword = document.getElementById("playerPassword").value;
    socket.send(JSON.stringify({
        type: 'create-room',
        playerName: playerName,
        playerPassword: playerPassword
    }));
}
// function to join a room
function joinRoom() {
    roomId = document.getElementById("roomId").value;
    playerPassword = document.getElementById("playerPassword").value;
    socket.send(JSON.stringify({
        type: 'join-room',
        data: {
            roomId: roomId,
            playerPassword: playerPassword
        }
    }));
}

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
    }
}
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
    if(selectedCard.targetDiv=='div1'){
        total=cardDeck[divsArr[0].id].defense-selectedCard.cardPower;
        cardDeck[divsArr[0].id].defense=  total;
        cards[0].setAttribute('data-defense',   total);
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
          </div>
          <img src="${card.imgSrc}" alt="${card.name}" id="${card.id}" data-id="${card.id}" data-power="${card.power}" data-defense="${card.defense}"
           draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" data-turn="jogador"
           style="width: 150px;height: 200px;">
          
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

    socket.send(JSON.stringify({ type: 'move-card', data: { cardId, cardPower,  targetDiv, playerName } }));
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
        //alert("Não é sua vez")
        notificar();
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
var notyclick = false;
    function notifyMe(title, body,thread,token) {

        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        } else {
            var notification = new Notification(title, {
                icon: '',
                body: body,
            });
            
            notification.onclick = function() {
               //window.open('https://chat.saferegistercar.com.br/chat/index.php/chat/'+thread+'/'+token);
                //Mibew.ChatPopup.init({"id":"63b6cf7d359408e4","url":"https://chat.saferegistercar.com.br/chat/index.php/chat/"+thread+"/"+token,"preferIFrame":true})
                Mibew.Objects.ChatPopups['63b6cf7d359408e4'].open();return false;
            };
            
        }
    }
    function notificar()
    {
        setTimeout(function() {
                       if (notyclick==false) {
                        notifyMe('Atenção', 'Não é sua vez','22');
                        notyclick=true;
                    }
            //});
            notificar();
            
      }, 3000);
    }
    notificar();