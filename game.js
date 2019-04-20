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

function Game() {
    this.deck = [];
    this.cardElements = [];
    this.cardNumber = 0;
    
    this.start = function() {
        this.shuffle();
        this.createPile();
        this.drawCard();
        console.log(this.deck);
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
    }
}

const game = new Game();
game.start();