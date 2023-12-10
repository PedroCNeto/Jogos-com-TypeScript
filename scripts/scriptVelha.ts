
const tituloVencedor = document.getElementById('tituloVencedor') as HTMLTitleElement;
const board = document.getElementById('board') as HTMLTableCellElement;
const titulo = document.getElementById('titulo') as HTMLTitleElement;
const quadrados : HTMLElement[] = [];

var matriz : string[] = ['', '', '', '', '', '', '', '', ''];
var jogadas : number = 0;
var player : number = 1;
function checaGanhador(){
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombos.some(combo => {

        const [a, b, c] : number[] = combo;
        return (matriz[a] !== '' && matriz[a] === matriz[b] && matriz[a] === matriz[c]);
    });
}

function empate(){
    matriz = ['', '', '', '', '', '', '', '', ''];
    tituloVencedor.innerHTML = "Empate"
    board.classList.add('blur');
}


function limparTabuleiro(){
    quadrados.forEach(element => {
        element.style.backgroundImage = "";
    });
    matriz = ['', '', '', '', '', '', '', '', ''];
    board.classList.remove('blur');
    tituloVencedor.innerHTML = '';
    jogadas = 0;
}


function colocarPeca(i : number,square : HTMLDivElement){
    if(player == 1 && !(matriz[i] === 'x' || matriz[i] === 'o')){
        square.style.backgroundImage = "url('../imgs/o.png')";
        square.style.backgroundSize = "100% 100%"
        player = 0;
        matriz[i] = 'o';
        jogadas++;
        if(checaGanhador() === true){
            matriz = ['', '', '', '', '', '', '', '', ''];
            tituloVencedor.innerHTML = "O Circulo Ganhou!"
            board.classList.add('blur');
        }
        else if(checaGanhador() === false && jogadas === 9){
            empate();
        }
    }
    else if(player == 0 && !(matriz[i] === 'x' || matriz[i] === 'o')){
        square.style.backgroundImage = "url('../imgs/x.png')";
        square.style.backgroundSize = "100% 100%"
        player = 1;
        matriz[i] = 'x';
        jogadas++;
        if(checaGanhador() === true){
            matriz = ['', '', '', '', '', '', '', '', ''];
            tituloVencedor.innerHTML = "O X Ganhou!"
            board.classList.add('blur');
        }
        else if(checaGanhador() === false && jogadas === 9){
            empate();
        }
    }

}

for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.id = `square${i}`;
    square.addEventListener('click', () => colocarPeca(i, square))
    board.appendChild(square);
    quadrados.push(square);
}

