export default class Evento {
    constructor(idDiretor='',id='', evento='', local='', dataInicio=null, dataFinal=null, status){
        this.idDiretor = idDiretor;
        this.id        = id;
        this.evento    = evento;
        this.local     = local;
        this.dataInicio= dataInicio;
        this.dataFinal = dataFinal;
        this.status    = status;
    }
}