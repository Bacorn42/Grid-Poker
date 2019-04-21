const board = document.querySelector('.board');

for(let i = 0; i < 5; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for(let j = 0; j < 5; j++) {
        let element = document.createElement('div');
        element.classList.add('cell');
        row.appendChild(element);
    }
    board.appendChild(row);
}

const handNames = ['Royal flush', 'Straight flush', '4 of a kind', 'Full house', 'Flush', 'Straight', '3 of a kind', '2 pair', '1 pair'];
const americanScores = [100, 75, 50, 25, 20, 15, 10, 5, 2];
const englishScores = [30, 30, 16, 10, 5, 12, 6, 3, 1];

const table = document.querySelector('.table-body');
for(let i = 0; i < handNames.length; i++) {
    let row = table.insertRow();
    row.insertCell().appendChild(document.createTextNode(handNames[i]));
    row.insertCell().appendChild(document.createTextNode(americanScores[i]));
    row.insertCell().appendChild(document.createTextNode(englishScores[i]));
}