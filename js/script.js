var leftCard;
var centerCard;
var rightCard;
var cardBack = 'url("img/back.png")';
var asDeOros = 'url("img/Asdeoros.png")';
var tresDeBastos = "url('img/3debastos.png')";
var ochoDeCopas = "url('img/8decopas.png')";
var cardImages =  new Array("url('img/Asdeoros.png')", "url('img/3debastos.png')", "url('img/8decopas.png')");
var moving = false;
var flipped = false;
var wins = 0;


function init(){
    for(var i = 0; i < 3; i++){
        var card = document.createElement("div");
        card.className = "card";
        card.id = "card" + (i + 1);
        document.getElementById("tablero").appendChild(card);
    }
    
    leftCard = document.getElementById("card1");
    centerCard = document.getElementById("card2");
    rightCard = document.getElementById("card3");

    var cards = document.querySelectorAll(".card"); 
    
    for(var i = 0; i < cards.length; i++){
        cards[i].addEventListener("click", function (){
            flipCard(this)}, false);
    }

    //controls init
    var node = document.createElement("span");
    node.textContent = "Has ganado " + wins + " veces!";
    node.id = "wins";
    document.getElementById("controls").appendChild(node);


    var node = document.createElement("a");
    node.addEventListener("click", shuffleCards, false);
    node.href = "#";
    node.textContent = "Otra Vez";
    document.getElementById("controls").appendChild(node);
    
    shuffleCards();
}

function moveToCenter(){
    leftCard.className = "card leftToCenter";
    rightCard.className = "card rightToCenter";
}

function moveToSides(){
    leftCard.className = "card centerToLeft";
    rightCard.className = "card centerToRight";
}

function shuffle(){
    var randomOrder = new Array();
    while(randomOrder.length != 3){
        var aux = Math.ceil(Math.random() * 3);
        if(randomOrder.indexOf(aux) == -1){
            randomOrder.push(aux);
        }
    }
    leftCard = document.getElementById("card" + randomOrder[0]);
    leftCard.style.order = 1;

    centerCard = document.getElementById("card" + randomOrder[1]);
    centerCard.style.order = 2;

    rightCard = document.getElementById("card" + randomOrder[2]);
    rightCard.style.order = 3;
}

function shuffleCards(){
    simpleReset();
    moving = true;
    moveToCenter();
    setTimeout(moveToSides, 1000);
    setTimeout(shuffle, 1400);
    setTimeout( function(){ moving = false}, 1800);
}



function flipCard(e){
    if(moving == false && flipped == false){
        flipped = true;
        var id = e.id.split("card");
        e.style.transform = "rotateY(90deg)";
        setTimeout(function(){
            e.style.backgroundImage = cardImages[(id[1] - 1)];
        },500);
        setTimeout(function(){
            e.style.transform = "rotateY(0deg)";
        },800);
        
        setTimeout(function(){
            checkWin(e)}, 1500);
    }
}

function checkWin(e){
    if(e.style.backgroundImage == asDeOros){
        wins++;
        document.getElementById("wins").textContent = "Has ganado " + wins + " veces!!";
    }
    else{
        var as = document.getElementById("card1");
        if(moving == false){
            setTimeout(function(){
                as.style.transform = "rotateY(90deg)";
            },500);
            setTimeout(function(){
                as.style.backgroundImage = cardImages[0];
            },1000);
            setTimeout(function(){
                as.style.transform = "rotateY(0deg)";
            },1300);
        }
    }
}

/*function reset(){
    if(flipped == true){
        var cards = document.querySelectorAll(".card");
        for(var i = 0; i < cards.length; i++){
            if(cards[i].style.backgroundImage != cardBack){
                alert(cards[i].style.backgroundImage);
            }
        }
        flipped = false;
    }
    cards[i].style.transform = "rotateY(90deg)";
    setTimeout(function(){
        cards[i].style.backgroundImage = cardBack;
    },500);
    setTimeout(function(){
        cards[i].style.transform = "rotateY(0deg)";
    },800);
}*/

function simpleReset(){
    if(flipped == true){
        var cards = document.querySelectorAll(".card");
        for(var i = 0; i < cards.length; i++){
            if(cards[i].style.backgroundImage != cardBack){
                cards[i].style.backgroundImage = cardBack;
            }
        }
        flipped = false;
    }
}