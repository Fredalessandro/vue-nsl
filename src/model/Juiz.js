export default class Juiz {
    constructor(idEvento='',id='', nome='', login,  senha='', tipo='',ativo=false){
        this.idEvento  = idEvento;
        this.id        = id;
        this.nome      = nome;
        this.login     = login;
        this.senha     = senha;
        this.tipo      = tipo;
        this.ativo     = ativo;
    }

    static juizes = [
        new Juiz(null,null,'JUIZ PRINCIPAL','JP01','0101','Juiz Principal',true),
        new Juiz(null,null,'PRIMEIRO JUIZ','J001','0001','Juiz',true),
        new Juiz(null,null,'SEGUNDO  JUIZ','J002','0002','Juiz',true),
        new Juiz(null,null,'TERCEIRO JUIZ','JP03','0003','Juiz',true),
        new Juiz(null,null,'QUARTO   JUIZ','JP04','0004','Juiz',true),
    ]
}