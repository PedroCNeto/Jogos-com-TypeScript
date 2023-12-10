const imgCbc = document.getElementById('cabeca') as HTMLImageElement;
const imgTorso = document.getElementById('torso') as HTMLImageElement;
const imgBDir = document.getElementById('BDir') as HTMLImageElement;
const imgBEsq = document.getElementById('BEsq') as HTMLImageElement;
const imgPDir = document.getElementById('PDir') as HTMLImageElement;
const imgPEsq = document.getElementById('PEsq') as HTMLImageElement;
const buscarPlv = document.getElementById('enviarPalavra') as HTMLParagraphElement;
const btnComecar = document.getElementById('enviarBtn') as HTMLButtonElement;
const btnLetra = document.getElementById('enviarLetra') as HTMLButtonElement;
const letrasUsadasTxt = document.getElementById('letrasUsadas') as HTMLTitleElement;
const mensagem = document.getElementById('result') as HTMLDivElement;
const tituloVencedorForca = document.getElementById('tituloVencedor') as HTMLTitleElement;
const btnRestart = document.getElementById('resetBtn') as HTMLButtonElement;

const centro = document.getElementById('centro') as HTMLDivElement

const enviarLetraInput = document.getElementById('enviarLetraInput') as HTMLParagraphElement;

const palavra = document.getElementById('palavraTxt') as HTMLInputElement;

const letra = document.getElementById('letraTxt') as HTMLInputElement;

const  plvAdv = document.getElementById('palavra') as HTMLTitleElement;

var erros : number = 0;
var arrayPlv : string[] = [];
var arrayPlvCript : string[] = [];
var partesDoCorpo : HTMLImageElement[] = [imgCbc, imgTorso, imgBEsq, imgBDir, imgPEsq, imgPDir];
var letrasUsadas : string[] = [];

function cmcJogo(){
    erros = 0;
    if(palavra.value === ''){
        plvAdv.innerHTML = "Escreva uma palavra!";
    }
    else {
        plvAdv.innerHTML = '';
        arrayPlv = palavra.value.split('');
        for (let index = 0; index < partesDoCorpo.length; index++) {
            partesDoCorpo[index].style.display = 'none';  
        }
        

        for (let index = 0; index < arrayPlv.length; index++) {
            arrayPlvCript[index] = ' -';
            plvAdv.innerHTML = plvAdv.innerHTML + arrayPlvCript[index];
        }
        palavra.value = '';
        buscarPlv.style.display = 'none';
        btnComecar.style.display = 'none';
        btnLetra.style.display = 'block';
        btnRestart.style.display = 'block';
        letrasUsadasTxt.style.display = 'block';
        enviarLetraInput.style.display = 'block';
    }
}

function restartGame(){
    plvAdv.innerHTML = ''
    letrasUsadasTxt.innerHTML = 'Letras usadas: ';
    palavra.value = '';
    letrasUsadas = [];
    letrasUsadasTxt.style.display = 'none';
    btnRestart.style.display = 'none'
    buscarPlv.style.display = 'block';
    btnComecar.style.display = 'block';
    btnLetra.style.display = 'none';
    enviarLetraInput.style.display = 'none';
    tituloVencedorForca.innerHTML = "";
    centro.classList.remove('blur');
    for (let index = 0; index < partesDoCorpo.length; index++) {
        partesDoCorpo[index].style.display = 'none';  
    }
}

function checaVitoria(){
    for (let index = 0; index < arrayPlv.length; index++) {
        if(arrayPlv[index].toUpperCase() === arrayPlvCript[index].toUpperCase()){
            continue;
        }
        else{
            return false;
        }
    }
    btnLetra.style.display = 'none';
    tituloVencedorForca.innerHTML = "Vitoria";
    centro.classList.add('blur');
    return true;
}

function checaDerrota(){
    let resultado : boolean = checaVitoria()

    if(resultado === false && erros >= 5){
        tituloVencedorForca.innerHTML = "Perdeu"
        centro.classList.add('blur');
        btnLetra.style.display = 'none';
    }
}

function errarLetra(){
    for (let index = 0; index < erros; index++) {
        partesDoCorpo[index].style.display = 'block';   
    }
}

function checaLetra(letra : string){
    plvAdv.innerHTML = '';
    let acerto : boolean = false;
    for (let index = 0; index < arrayPlv.length; index++) {
        if(arrayPlv[index] === letra.toLowerCase()){
            arrayPlvCript[index] = letra;
            acerto = true;
        }
        else if(arrayPlv[index] === letra.toUpperCase()){
            arrayPlvCript[index] = letra;
            acerto = true;
        }
        checaVitoria();
        checaDerrota();
        plvAdv.innerHTML = plvAdv.innerHTML + ' ' +arrayPlvCript[index];
        
    }
    if(acerto === false){
        erros++;
        errarLetra();
    }
}

function enviarLetra(){
    if(letra.value === ''){
        mensagem.innerHTML = 'Escreva uma letra!';
    }
    else if(letra.value.length > 1){
        mensagem.innerHTML = 'Escreva apenas uma letra!';
    }
    else{
        let achou : boolean = false;
        letrasUsadas.forEach(element => {
            if(element === letra.value.toUpperCase()){
                achou = true;
            }
            else if(element === letra.value.toUpperCase()){
                achou = true;
            }
        });

        if(achou){
            mensagem.innerHTML = "Essa letra já foi usada!"
        }
        else{
            letrasUsadasTxt.innerHTML = letrasUsadasTxt.innerHTML + ' ' + letra.value + ' -';
            letrasUsadas.push(letra.value)
            checaLetra(letra.value);
        }
    }
    letra.value = '';

}