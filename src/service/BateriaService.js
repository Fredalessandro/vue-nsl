import Bateria from "../model/Bateria.js";
export class BateriaService {


  static gerarBaterias(atletasPorBateria, atletas) {
    
    const baterias = [];
    let totalBaterias = Math.ceil(atletas / atletasPorBateria);
    let strRound = 1;
    let id = 1;
    while (totalBaterias>=1) {
      console.log("Quantidade baterias " + totalBaterias);
      for (let i = 0; i < totalBaterias; i++) {
        baterias.push(
          new Bateria(null,null,
            id,
            i + 1 + "ª bateria do ",
            "" + strRound,
            null,
            null,
            "Aguardando"
          )
        );
        ++id;
      }

      if (totalBaterias!=1){
        strRound++
        totalBaterias = Math.ceil((atletas/strRound) / atletasPorBateria);
      } else {
        totalBaterias = 0;
      }

    }
    
    // Distribui os atletas em baterias
    return JSON.stringify(baterias);

  }  
}