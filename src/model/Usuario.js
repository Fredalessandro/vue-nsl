  export default class Usuario {

  // Define properties of your model    
  constructor(
    id= '',
    nome= '',
    email= '',
    telefone= '',
    cpf= '',
    dataNascimento= '',
    cep= '',
    endereco= '',
    numero= '',
    complemento= '',
    bairro= '',
    cidade= '',
    uf= '',
    tipo= '') {
    this.id=id;              
    this.nome=nome;
    this.email=email;
    this.telefone=telefone;
    this.cpf=cpf;
    this.dataNascimento=dataNascimento;
    this.cep=cep;
    this.endereco=endereco;
    this.numero=numero;
    this.complemento=complemento;
    this.bairro=bairro;
    this.cidade=cidade;
    this.uf=uf;
    this.tipo=tipo;  
  }
}

