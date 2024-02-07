export default class Categoria {
    // Define properties of your model     
    constructor(id='', descricao='', idade='', regra='', atletas=null){
        this.id           = id;
        this.descricao    = descricao;
        this.idade        = idade;
        this.regra        = regra;
        this.atletas      = atletas;
    }
}