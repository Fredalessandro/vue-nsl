export default class Categoria {
    // Define properties of your model     
    constructor(id='', descricao='', idade=0, regra='',valorInscricao=0, qtdAtletasBateria=4,qtdAtletas=16){
        this.idEvento     = null;
        this.id           = id;
        this.descricao    = descricao;
        this.idade        = idade;
        this.regra        = regra;
        this.valorInscricao = valorInscricao;
        this.qtdAtletasBateria = qtdAtletasBateria;
        this.qtdAtletas = atletas;
        this.baterias   = [];
    }

    static categorias = [
        new Categoria(null,'Até 6',6,'Até',50,4,16),
        new Categoria(null,'Até 8',8,'Até',50,4,16),
        new Categoria(null,'Até 10',10,'Até',50,4,16),
        new Categoria(null,'Até 12',12,'Até',50,4,16),
        new Categoria(null,'Até 14',14,'Até',50,4,16),
        new Categoria(null,'Até 16',16,'Até',50,4,16),
        new Categoria(null,'Até 18',18,'Até',50,4,16),
        new Categoria(null,'Open Amador',0,'Open Amador',50,4,16),
        new Categoria(null,'Open Pro',0,'Open Pro',50,4,16),
        new Categoria(null,'Master',35,'A partir de',50,4,16),
        new Categoria(null,'GraMaster',40,'A partir de',50,4,16),
        new Categoria(null,'Karruna',50,'A partir de',50,4,16),
        new Categoria(null,'Legend',55,'A partir de',50,4,16),
    ]
}