export default class Atleta {
  constructor(id,nome,apelidio,email,telefone,cpf,dataNascimento,cep,endereco,
    numero,complemento,bairro,cidade,uf,rankNordestino,rankEstadual) {
    this.id = id;
    this.nome = nome;
    this.apelidio = apelidio;
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
    this.rankNordestino=rankNordestino;
    this.rankEstadual=rankEstadual;
  }
  static atletas = [
    new Atleta(null,'LEONADO MATEUS','LEONADO MATEUS',      'LEONADOMATEUS@nsl.com.br'    ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',101,200),
    new Atleta(null,'MIGUEL GOMES','MIGUEL GOMES',          'MIGUELGOMES@nsl.com.br'      ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',10,200), 
    new Atleta(null,'HEITOR GOMES','HEITOR GOMES',          'HEITORGOMES@nsl.com.br'      ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',159,211), 
    new Atleta(null,'GABRIEL MEDEIROS','GABRIEL MEDEIROS',  'GABRIELMEDEIROS@nsl.com.br'  ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',102,200), 
    new Atleta(null,'GABRIEL CIPRIANO','GABRIEL CIPRIANO',  'GABRIELCIPRIANO@nsl.com.br'  ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','MACEIO','AL',103,120),
    new Atleta(null,'SHAR BOY','SHAR BOY',                  'SHARBOY@nsl.com.br'          ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',104,201), 
    new Atleta(null,'DAVI BRASIL','DAVI BRASIL',            'DAVIBRASIL@nsl.com.br'       ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',98,300), 
    new Atleta(null,'GABRIEL BRASIL','GABRIEL BRASIL',      'GABRIELBRASIL@nsl.com.br'    ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',25,250),  
    new Atleta(null,'JONAS GABRIEL','JONAS GABRIEL',        'JONASGABRIEL@nsl.com.br'     ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',122,200),
    new Atleta(null,'NICOLAS CLAUDINO','NICOLAS CLAUDINO',  'NICOLASCLAUDINO@nsl.com.br'  ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',131,99), 
    new Atleta(null,'NICOLAS MIGUEL','NICOLAS MIGUEL',      'NICOLASMIGUEL@nsl.com.br'    ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','MACEIO','AL',102,111), 
    new Atleta(null,'ALESSANDRO FELLIX','ALESSANDRO FELLIX','ALESSANDROFELLIX@nsl.com.br' ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',103,98), 
    new Atleta(null,'PAULIINHO EDC','PAULIINHO EDC',        'PAULIINHEDC@nsl.com.br'      ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',111,99),
    new Atleta(null,'NICOLAS DANIEL','NICOLAS DANIEL',      'NICOLASDANIEL@nsl.com.br'    ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','MACEIO','AL',121,80), 
    new Atleta(null,'CAUÃ LUCIO XAVIER','CAUÃ LUCIO XAVIER','CAUALUCIOXAVIER@nsl.com.br'  ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','MACEIO','AL',131,0), 
    new Atleta(null,'IURY ROCHA','IURY ROCHA',              'IURYROCHA@nsl.com.br'        ,'81988888888','621.374.924-11','10/03/2014','50900-120','RUA DO SURF','10','','VIBER','RECIFE','PE',100,0),  
  ] 
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
}*/



/*Atleta(1 ,'Atleta 1 ',true ,'01/01/2019'),
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
Atleta(32,'Atleta 32',true ,'01/01/2019')*/