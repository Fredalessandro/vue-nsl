import Bateria from "../model/Bateria.js";
export class BateriaService {


  static gerarBaterias(atletasPorBateria, atletas) {
    
    const baterias = [];
    let totalBaterias = Math.ceil(atletas / atletasPorBateria);
    let strRound = 1;
    let sequencia = 1;
    while (totalBaterias>=1) {
      console.log("Quantidade baterias " + totalBaterias);
      for (let i = 0; i < totalBaterias; i++) {
        baterias.push(
          new Bateria(null,
            null,
            null,
            sequencia,
            i + 1 + "ª bateria do ",
            strRound+" Round",
            null,
            null,
            "Aguardando",
            null
          )
        );
        ++sequencia;
      }

      if (totalBaterias!=1){
        strRound++
        totalBaterias = Math.ceil((atletas/strRound) / atletasPorBateria);
      } else {
        totalBaterias = 0;
      }

    }
    
    // Distribui os atletas em baterias
    return baterias;

  }  
}