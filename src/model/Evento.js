export default class Atleta {
    constructor(id, evento, local, dataInicio, dataFinal, valorInscricao, status){
        this.idDiretor = null;
        this.id        = id;
        this.evento    = evento;
        this.local     = local;
        this.dataInicio= dataInicio;
        this.dataFinal = dataFinal;
        this.status    = status;
    }
}