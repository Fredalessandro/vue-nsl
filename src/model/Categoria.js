export default class Categoria {
    // Define properties of your model     
    constructor(id, descricao, idade, atletas, regra){
        this.id           = id;
        this.descricao    = descricao;
        this.idade        = idade;
        this.regra        = regra;
        this.atletas      = atletas;
    }
}