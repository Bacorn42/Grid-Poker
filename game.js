"use strict"
const bg = ['cards.png', 'cards_chips.png'];
let bgIndex = 0;
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

const scoreLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
];

const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'j', 'q', 'k', 'a']

function Game() {
    this.deck = [];
    this.cardElements = [];
    this.cardNumber = 0;
    this.hands = Array(25);
    this.handsCards = Array(25);
    this.scoreLinesHistory = Array(12).fill(9);
    this.canClick = false;
    
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
            card.style.top = pile.offsetTop - 1;
            card.style.left = pile.offsetLeft;
            card.style.zIndex = 25 - i;
            card.classList.add('card');
            if(bgIndex === 1) {
                card.classList.add('chips');
            }
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
        this.setCardImage(this.cardNumber);
    }

    this.setCardImage = function(cardNumber) {
        let cardIndex = cards.indexOf(this.deck[cardNumber]);
        let x = (cardIndex % 13) * 73 + 2;
        let y = Math.floor(cardIndex / 13) * 98 + 1;
        if(bgIndex === 1) {
            x = (cardIndex % 13) * 70;
            y = Math.floor(cardIndex / 13) * 98;
        }
        this.cardElements[cardNumber].style.background = "url(" + bg[bgIndex] + ") -" + x + "px -" + y + "px";
        this.canClick = true;
    }

    this.updateCardImages = function() {
        for(let i = 0; i <= this.cardNumber; i++) {
            this.setCardImage(i);
        }
    }
    
    this.place = function(index) {
        if(this.canClick && !this.hands[index]) {
            this.canClick = false;
            let card = this.cardElements[this.cardNumber];
            let cell = cells[index];
            let x = 11 + (index % 5) * 93;
            let y = deck.offsetTop - cell.offsetTop - 1;
            if(bgIndex === 1) {
                x = 11 + (index % 5) * 92;
            }
            card.style.left = x + "px";
            card.style.top = "-" + y + "px";
            card.style.zIndex = 25 + this.cardNumber;
            card.classList.add('rotate');
            this.hands[index] = this.deck[this.cardNumber];
            this.handsCards[index] = card;
            this.cardNumber++;
            if(this.cardNumber < 25) {
                this.drawCard();
            }
            this.calculateScore();
        }
    }

    this.updateCardPlacements = function() {
        for(let i = 0; i < this.cardNumber; i++) {
            let card = this.cardElements[i];
            const index = this.handsCards.indexOf(card);
            let cell = cells[index];
            let x = 11 + (index % 5) * 93;
            let y = deck.offsetTop - cell.offsetTop - 1;
            if(bgIndex === 1) {
                x = 11 + (index % 5) * 92;
            }
            card.style.left = x + "px";
            card.style.top = "-" + y + "px";
        }
    }
    
    this.calculateScore = function() {
        let usScore = 0;
        let gbScore = 0;
        for(let i = 0; i < scoreLines.length; i++) {
            let cards = scoreLines[i].map(j => this.hands[j]).sort();
            let oldScoreLinesHistory = [...this.scoreLinesHistory];
            if(this.checkRoyalFlush(cards)) {
                usScore += usScores[0];
                gbScore += gbScores[0];
                this.scoreLinesHistory[i] = 0;
            }
            else if(this.checkStraightFlush(cards)) {
                usScore += usScores[1];
                gbScore += gbScores[1];
                this.scoreLinesHistory[i] = 1;
            }
            else if(this.checkFourKind(cards)) {
                usScore += usScores[2];
                gbScore += gbScores[2];
                this.scoreLinesHistory[i] = 2;
            }
            else if(this.checkFullHouse(cards)) {
                usScore += usScores[3];
                gbScore += gbScores[3];
                this.scoreLinesHistory[i] = 3;
            }
            else if(this.checkFlush(cards)) {
                usScore += usScores[4];
                gbScore += gbScores[4];
                this.scoreLinesHistory[i] = 4;
            }
            else if(this.checkStraight(cards)) {
                usScore += usScores[5];
                gbScore += gbScores[5];
                this.scoreLinesHistory[i] = 5;
            }
            else if(this.checkThreeKind(cards)) {
                usScore += usScores[6];
                gbScore += gbScores[6];
                this.scoreLinesHistory[i] = 6;
            }
            else if(this.checkTwoPair(cards)) {
                usScore += usScores[7];
                gbScore += gbScores[7];
                this.scoreLinesHistory[i] = 7;
            }
            else if(this.checkPair(cards)) {
                usScore += usScores[8];
                gbScore += gbScores[8];
                this.scoreLinesHistory[i] = 8;
            }
            if(oldScoreLinesHistory[i] > this.scoreLinesHistory[i]) {
                this.glow(i);
            }
        }
        document.querySelector('.us-score').innerHTML = usScore;
        document.querySelector('.gb-score').innerHTML = gbScore;
    }
    
    this.checkRoyalFlush = function(cards) {
        if(!cards[4]) {
            return false;
        }
        return cards[0][0] === '0' && cards[1][0] === 'a' && cards[2][0] === 'j' && cards[3][0] === 'k' && cards[4][0] === 'q' &&
               this.checkFlush(cards);
    }
    
    this.checkStraightFlush = function(cards) {
        if(!cards[4]) {
            return false;
        }
        return this.checkFlush(cards) && this.checkStraight(cards);
    }
    
    this.checkFourKind = function(cards) {
        return this.getCount(cards)[0] === 4;
    }
    
    this.checkFullHouse = function(cards) {
        if(!cards[4]) {
            return false;
        }
        let count = this.getCount(cards);
        return count[0] === 3 && count[1] === 2;
    }
    
    this.checkFlush = function(cards) {
        if(!cards[4]) {
            return false;
        }
        return cards[0][1] === cards[1][1] && cards[1][1] === cards[2][1] && cards[2][1] === cards[3][1] && cards[3][1] === cards[4][1];
    }
    
    this.checkStraight = function(cards) {
        if(!cards[4]) {
            return false;
        }
        let vals = cards.map(card => rankOrder.indexOf(card[0])).sort((a, b) => a - b);
        let count = this.getCount(cards);
        return count[4] === 1 && (vals[4] - vals[0]) === 4;
    }
    
    this.checkThreeKind = function(cards) {
        return this.getCount(cards)[0] === 3;
    }
    
    this.checkTwoPair = function(cards) {
        let count = this.getCount(cards);
        return count[0] === 2 && count[1] === 2;
    }
    
    this.checkPair = function(cards) {
        return this.getCount(cards)[0] === 2;
    }
    
    this.getCount = function(cards) {
        let counter = [];
        for(let rank of cards) {
            if(!rank) {
                continue;
            }
            let index = rank.charCodeAt(0);
            counter[index] ? counter[index]++ : counter[index] = 1;
        }
        return counter.sort((a, b) => b - a);
    }
    
    this.glow = function(i) {
        let scoreLine = scoreLines[i];
        for(let index of scoreLine) {
            if(this.handsCards[index]) {
                setTimeout(() => this.handsCards[index].classList.add('glow'), 900);
                setTimeout(() => this.removeGlow(index), 1900);
            }
        }
        setTimeout(() => document.querySelectorAll('tbody tr')[this.scoreLinesHistory[i]].classList.add('glow'), 900);
        setTimeout(() => document.querySelectorAll('tbody tr')[this.scoreLinesHistory[i]].classList.remove('glow'), 1900);
    }
    
    this.removeGlow = function(index) {
        this.handsCards[index].classList.remove('glow');
    }
    
    this.restart = function() {
        this.removeCards();
        this.deck = [];
        this.cardElements = [];
        this.cardNumber = 0;
        this.hands = Array(25);
        this.handsCards = Array(25);
        this.scoreLinesHistory = Array(12).fill(9);
        this.canClick = false;
        document.querySelector('.us-score').innerHTML = 0;
        document.querySelector('.gb-score').innerHTML = 0;
        let rows = document.querySelectorAll('tbody tr');
        for(let row of rows) {
            row.classList.remove('glow');
        }
        this.start();
    }
    
    this.removeCards = function() {
        for(let i = 0; i < this.cardElements.length; i++) {
            let card = this.cardElements[i];
            setTimeout(() => card.parentElement.removeChild(card), 1000);
            if(i <= this.cardNumber) {
                card.style.top = pile.offsetTop;
                card.style.left = pile.offsetLeft;
                card.style.zIndex = 0;
                card.classList.add('remove');
            }
        }
    }
}

window.onload = function() {
    const game = new Game();
    document.querySelector('#button-restart').onclick = game.restart.bind(game);
    document.querySelector('#button-deck').onclick = () => {
        bgIndex = (bgIndex === 0) ? 1 : 0;
        for(const element of document.querySelectorAll('.card')) {
            element.classList.toggle('chips');
        }
        for(const element of document.querySelectorAll('.cell')) {
            element.classList.toggle('chips');
        }
        game.updateCardImages();
        game.updateCardPlacements();
    }
    game.start();
}