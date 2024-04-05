import Bateria from "../model/Bateria.js";
export class BateriaService {


  static gerarBaterias(atletas, atletasPorBateria) {
    
    const baterias = [];
    let totalBaterias = Math.ceil(atletas / atletasPorBateria);
    let strRound = 1;
    let id = 0;
    while (totalBaterias>=1) {
      console.log("Quantidade baterias " + totalBaterias);
      for (let i = 0; i < totalBaterias; i++) {
        baterias.push(
          new Bateria(null,null,
            ++id,
            i + 1 + "ª bateria do ",
            "" + strRound,
            null,
            null,
            "Aguardando"
          )
        );
      }
      if (totalBaterias==1){
        break;
      }
      totalBaterias = Math.ceil((atletas/++strRound) / atletasPorBateria);
    }
    
    // Distribui os atletas em baterias
    return JSON.stringify(baterias);

  }  
}