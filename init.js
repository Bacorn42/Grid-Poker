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