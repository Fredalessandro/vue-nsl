export default class Atleta {
  constructor(id,nome,email,telefone,cpf,dataNascimento,cep,endereco,
    numero,complemento,bairro,cidade,uf,tipo,rankEstadual,rankNacional) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.cep = cep;
    this.endereco = endereco;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.tipo = tipo;
    this.rankEstadual=rankEstadual;
    this.rankNacional=rankNacional;
  }
}
  /*static clone(atleta) {
    return new Atleta(
      atleta.id,
      atleta.nome,
      atleta.email,
      atleta.telefone,
      atleta.cpf,
      atleta.dataNascimento,
      atleta.cep,
      atleta.endereco,
      atleta.numero,
      atleta.complemento,
      atleta.bairro,
      atleta.cidade,
      atleta.uf,
      atleta.tipo,
      atleta.rankEstadual,
      atleta.rankNacional
    );
  }
}

/*const atletas = [
   Atleta(1 ,'Atleta 1 ',true ,'01/01/2019'),
   Atleta(2 ,'Atleta 2 ',false,'01/01/2019'),
   Atleta(3 ,'Atleta 3 ',false,'01/01/2019'),
   Atleta(4 ,'Atleta 4 ',false,'01/01/2019'),

   Atleta(5 ,'Atleta 5 ',false,'01/01/2019'),
   Atleta(6 ,'Atleta 6 ',false,'01/01/2019'),
   Atleta(7 ,'Atleta 7 ',true ,'01/01/2019'),
   Atleta(8 ,'Atleta 8 ',false,'01/01/2019'),

   Atleta(9 ,'Atleta 9 ',false,'01/01/2019'),
   Atleta(10,'Atleta 10',false,'01/01/2019'),
   Atleta(11,'Atleta 11',true ,'01/01/2019'),
   Atleta(12,'Atleta 12',false,'01/01/2019'),

   Atleta(13,'Atleta 13',true ,'01/01/2019'),
   Atleta(14,'Atleta 14',false,'01/01/2019'),
   Atleta(15,'Atleta 15',false,'01/01/2019'),
   Atleta(16,'Atleta 16',false,'01/01/2019'),

   Atleta(17,'Atleta 17',false,'01/01/2019'),
   Atleta(18,'Atleta 18',false,'01/01/2019'),
   Atleta(19,'Atleta 19',true ,'01/01/2019'),
   Atleta(20,'Atleta 20',false,'01/01/2019'),

   Atleta(21,'Atleta 21',false,'01/01/2019'),
   Atleta(22,'Atleta 22',false,'01/01/2019'),
   Atleta(23,'Atleta 23',true ,'01/01/2019'),
   Atleta(24,'Atleta 24',false,'01/01/2019'),

   Atleta(25,'Atleta 25',false,'01/01/2019'),
   Atleta(26,'Atleta 26',false,'01/01/2019'),
   Atleta(27,'Atleta 27',true ,'01/01/2019'),
   Atleta(28,'Atleta 28',false,'01/01/2019'),
   
   Atleta(29,'Atleta 29',false,'01/01/2019'),
   Atleta(30,'Atleta 30',false,'01/01/2019'),
   Atleta(31,'Atleta 31',false,'01/01/2019'),
   Atleta(32,'Atleta 32',true ,'01/01/2019'),
]*/