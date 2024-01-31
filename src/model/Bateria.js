
export default class Bateria {
    // Define properties of your model     

    constructor(id,descricao,round,  atletas = [], notas = [], status,avanca){
        this.id = id;
        this.descricao = descricao;
        this.round     = round;
        this.atletas   = atletas;
        this.notas     = notas;
        this.status    = status;
        this.avanca    = avanca;
    };

}

const bateriasPrimeiroRound = [
   new Bateria(1,'1ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(2,'2ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(3,'3ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(4,'4ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(5,'5ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(6,'6ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(7,'7ª Bateria','1º Round',null,null,'Aguardando', null),
   new Bateria(8,'8ª Bateria','1º Round',null,null,'Aguardando', null)
]



const bateriasSegundoRound = [
   new Bateria(1,'1ª Bateria','Quartas de final',null,null,'Aguardando'),
   new Bateria(2,'2ª Bateria','Quartas de final',null,null,'Aguardando'),
   new Bateria(3,'3ª Bateria','Quartas de final',null,null,'Aguardando'),
   new Bateria(4,'4ª Bateria','Quartas de final',null,null,'Aguardando'),
]

const bateriasTerceiroRound = [
   new Bateria(1,'1ª Bateria','Semi final',null,null,'Aguardando'),
   new Bateria(2,'2ª Bateria','Semi final',null,null,'Aguardando'),
]

const bateriasFinalRound = [
   new Bateria(1,'1ª Bateria','Final',null,null,'Aguardando'),
]