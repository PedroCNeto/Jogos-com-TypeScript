var imgCbc = document.getElementById('cabeca');
var imgTorso = document.getElementById('torso');
var imgBDir = document.getElementById('BDir');
var imgBEsq = document.getElementById('BEsq');
var imgPDir = document.getElementById('PDir');
var imgPEsq = document.getElementById('PEsq');
var buscarPlv = document.getElementById('enviarPalavra');
var btnComecar = document.getElementById('enviarBtn');
var btnLetra = document.getElementById('enviarLetra');
var letrasUsadasTxt = document.getElementById('letrasUsadas');
var mensagem = document.getElementById('result');
var tituloVencedorForca = document.getElementById('tituloVencedor');
var centro = document.getElementById('centro');
var enviarLetraInput = document.getElementById('enviarLetraInput');
var palavra = document.getElementById('palavraTxt');
var letra = document.getElementById('letraTxt');
var plvAdv = document.getElementById('palavra');
var erros = 0;
var arrayPlv = [];
var arrayPlvCript = [];
var partesDoCorpo = [imgCbc, imgTorso, imgBEsq, imgBDir, imgPEsq, imgPDir];
var letrasUsadas = [];
function cmcJogo() {
    erros = 0;
    if (palavra.value === '') {
        plvAdv.innerHTML = "Escreva uma palavra!";
    }
    else {
        plvAdv.innerHTML = '';
        arrayPlv = palavra.value.split('');
        for (var index = 0; index < partesDoCorpo.length; index++) {
            partesDoCorpo[index].style.display = 'none';
        }
        for (var index = 0; index < arrayPlv.length; index++) {
            arrayPlvCript[index] = ' -';
            plvAdv.innerHTML = plvAdv.innerHTML + arrayPlvCript[index];
        }
        palavra.value = '';
        buscarPlv.style.display = 'none';
        btnComecar.style.display = 'none';
        btnLetra.style.display = 'block';
        enviarLetraInput.style.display = 'block';
    }
}
function restartGame() {
    plvAdv.innerHTML = '';
    letrasUsadasTxt.innerHTML = 'Letras usadas: ';
    palavra.value = '';
    letrasUsadas = [];
    buscarPlv.style.display = 'block';
    btnComecar.style.display = 'block';
    btnLetra.style.display = 'none';
    enviarLetraInput.style.display = 'none';
    tituloVencedorForca.innerHTML = "";
    centro.classList.remove('blur');
    for (var index = 0; index < partesDoCorpo.length; index++) {
        partesDoCorpo[index].style.display = 'none';
    }
}
function checaVitoria() {
    for (var index = 0; index < arrayPlv.length; index++) {
        if (arrayPlv[index].toUpperCase() === arrayPlvCript[index].toUpperCase()) {
            continue;
        }
        else {
            return false;
        }
    }
    btnLetra.style.display = 'none';
    tituloVencedorForca.innerHTML = "Vitoria";
    centro.classList.add('blur');
    return true;
}
function checaDerrota() {
    var resultado = checaVitoria();
    if (resultado === false && erros >= 5) {
        tituloVencedorForca.innerHTML = "Perdeu";
        centro.classList.add('blur');
        btnLetra.style.display = 'none';
    }
}
function errarLetra() {
    for (var index = 0; index < erros; index++) {
        partesDoCorpo[index].style.display = 'block';
    }
}
function checaLetra(letra) {
    plvAdv.innerHTML = '';
    var acerto = false;
    for (var index = 0; index < arrayPlv.length; index++) {
        if (arrayPlv[index] === letra.toLowerCase()) {
            arrayPlvCript[index] = letra;
            acerto = true;
        }
        else if (arrayPlv[index] === letra.toUpperCase()) {
            arrayPlvCript[index] = letra;
            acerto = true;
        }
        checaVitoria();
        checaDerrota();
        plvAdv.innerHTML = plvAdv.innerHTML + ' ' + arrayPlvCript[index];
    }
    if (acerto === false) {
        erros++;
        errarLetra();
    }
}
function enviarLetra() {
    if (letra.value === '') {
        mensagem.innerHTML = 'Escreva uma letra!';
    }
    else if (letra.value.length > 1) {
        mensagem.innerHTML = 'Escreva apenas uma letra!';
    }
    else {
        var achou_1 = false;
        letrasUsadas.forEach(function (element) {
            if (element === letra.value.toUpperCase()) {
                achou_1 = true;
            }
            else if (element === letra.value.toUpperCase()) {
                achou_1 = true;
            }
        });
        if (achou_1) {
            mensagem.innerHTML = "Essa letra já foi usada!";
        }
        else {
            letrasUsadasTxt.innerHTML = letrasUsadasTxt.innerHTML + ' ' + letra.value + ' -';
            letrasUsadas.push(letra.value);
            checaLetra(letra.value);
        }
    }
    letra.value = '';
}
