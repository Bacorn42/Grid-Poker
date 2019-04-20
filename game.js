"use strict"
const bg = 'https://dobsondev.com/wp-content/uploads/2015/04/windows-playing-cards.png';
const cards = [
    'ac', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '0c', 'jc', 'qc', 'kc', 
    'ah', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '0h', 'jh', 'qh', 'kh', 
    'as', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '0s', 'js', 'qs', 'ks', 
    'ad', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '0d', 'jd', 'qd', 'kd',     
];
const cell = document.querySelector('.deck .cell');
const pile = document.querySelector('.deck .pile');
const deckElem = document.querySelector('.deck');
const deck = document.querySelector('.deck');
const cells = document.querySelectorAll('.board .cell');

function Game() {
    this.deck = [];
    this.cardElements = [];
    this.cardNumber = 0;
    this.hands = Array(25);
    this.canCLick = true;
    
    this.start = function() {
        this.initCells();
        this.shuffle();
        this.createPile();
        this.drawCard();
    }
    
    this.initCells = function() {
        for(let i = 0; i < 25; i++) {
            cells[i].onclick = () => this.place(i);
        }
    }
    
    this.shuffle = function() {
        this.deck = [...cards].sort(() => Math.random() - 0.5);
    }
    
    this.createPile = function() {
        for(let i = 0; i < 25; i++) {
            let card = document.createElement('div');
            card.style.position = 'absolute';
            card.style.top = pile.offsetTop;
            card.style.left = pile.offsetLeft;
            card.classList.add('card'); 
            deckElem.appendChild(card);
            this.cardElements.push(card);
        }
    }
    
    this.drawCard = function() {
        let card = this.cardElements[this.cardNumber]
        card.style.left = cell.offsetLeft;
        card.classList.add('flip');
        setTimeout(() => this.faceUp(), 750);
    }
    
    this.faceUp = function() {
        let cardIndex = cards.indexOf(this.deck[this.cardNumber]);
        this.cardElements[this.cardNumber].style.background = "url(" + bg + ") -" + ((cardIndex % 13) * 73 + 2) + "px -" + (Math.floor(cardIndex / 13) * 98 + 1) + "px";
        this.canClick = true;
    }
    
    this.place = function(index) {
        if(this.canClick && !this.hands[index]) {
            this.canClick = false;
            let card = this.cardElements[this.cardNumber];
            let cell = cells[index];
            card.style.top = "-" + (deck.offsetTop - cell.offsetTop) + "px";
            card.style.left = (cell.offsetLeft - 8) + "px";
            card.classList.add('rotate');
            this.hands[index] = this.deck[this.cardNumber];
            this.cardNumber++;
            this.drawCard();
        }
    }
}

window.onload = function() {
    const game = new Game();
    game.start();
}