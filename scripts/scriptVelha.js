var tituloVencedor = document.getElementById('tituloVencedor');
var board = document.getElementById('board');
var titulo = document.getElementById('titulo');
var quadrados = [];
var matriz = ['', '', '', '', '', '', '', '', ''];
var player = 1;
function checaGanhador() {
    var winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombos.some(function (combo) {
        var a = combo[0], b = combo[1], c = combo[2];
        return (matriz[a] !== '' && matriz[a] === matriz[b] && matriz[a] === matriz[c]);
    });
}
function limparTabuleiro() {
    quadrados.forEach(function (element) {
        element.style.backgroundImage = "";
    });
    board.classList.remove('blur');
    tituloVencedor.innerHTML = '';
}
function colocarPeca(i, square) {
    if (player == 1 && !(matriz[i] === 'x' || matriz[i] === 'o')) {
        square.style.backgroundImage = "url('../imgs/o.png')";
        square.style.backgroundSize = "100% 100%";
        player = 0;
        matriz[i] = 'o';
        if (checaGanhador() == true) {
            matriz = ['', '', '', '', '', '', '', '', ''];
            tituloVencedor.innerHTML = "O Circulo Ganhou!";
            board.classList.add('blur');
        }
    }
    else if (player == 0 && !(matriz[i] === 'x' || matriz[i] === 'o')) {
        square.style.backgroundImage = "url('../imgs/x.png')";
        square.style.backgroundSize = "100% 100%";
        player = 1;
        matriz[i] = 'x';
        if (checaGanhador() == true) {
            matriz = ['', '', '', '', '', '', '', '', ''];
            tituloVencedor.innerHTML = "O X Ganhou!";
            board.classList.add('blur');
        }
    }
}
var _loop_1 = function (i) {
    var square = document.createElement('div');
    square.className = 'square';
    square.id = "square".concat(i);
    square.addEventListener('click', function () { return colocarPeca(i, square); });
    board.appendChild(square);
    quadrados.push(square);
};
for (var i = 0; i < 9; i++) {
    _loop_1(i);
}
