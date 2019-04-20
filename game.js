"use strict"
const bg = 'https://dobsondev.com/wp-content/uploads/2015/04/windows-playing-cards.png';
const cards = [
    '2s', '2c', '2d', '2h',
    '3s', '3c', '3d', '3h',
    '4s', '4c', '4d', '4h',
    '5s', '5c', '5d', '5h',
    '6s', '6c', '6d', '6h',
    '7s', '7c', '7d', '7h',
    '8s', '8c', '8d', '8h',
    '9s', '9c', '9d', '9h',
    '0s', '0c', '0d', '0h',
    'js', 'jc', 'jd', 'jh',
    'qs', 'qc', 'qd', 'qh',
    'ks', 'kc', 'kd', 'kh',
    'as', 'ac', 'ad', 'ah',    
];

function Game() {
    this.deck = [];
    
    this.start = function() {
        this.shuffle();
        console.log(this.deck);
    }
    
    this.shuffle = function() {
        this.deck = [...cards].sort(() => Math.random() - 0.5);
    }
}

const game = new Game();
game.start();