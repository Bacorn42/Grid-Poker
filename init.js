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
const usScores = [100, 75, 50, 25, 20, 15, 10, 5, 2];
const gbScores = [30, 30, 16, 10, 5, 12, 6, 3, 1];

const table = document.querySelector('.table-body');
for(let i = 0; i < handNames.length; i++) {
    let row = table.insertRow();
    row.insertCell().appendChild(document.createTextNode(handNames[i]));
    row.insertCell().appendChild(document.createTextNode(usScores[i]));
    row.insertCell().appendChild(document.createTextNode(gbScores[i]));
}