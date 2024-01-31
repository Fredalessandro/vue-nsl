
let tamanho = i = 32;
let round = 0;
let x=4
while (i>=2) {
    
    round ++;

    i = tamanho / x;

    console.log('Quantidade baterias '+round+" "+i);

    for (let index = 0; index < i; index++) {

        console.log((index+1)+'ª bateria do '+round+'º Round');
        console.log(' ');

    }

    tamanho = i;
    x = 2;
}