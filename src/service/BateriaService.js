export class BateriaService {
    
    static async geraBaterias(categoria,qtdAtletasBateria,atletas) {
        
        try {
            
            let tamanho = (altetas!=null)?atletas.size:32;
            let i = tamanho;
            let round = 0;
            let x = qtdAtletasBateria;
            let dadosBaterias = [];
            let id = 0;
            
            while (i >= 2) {
              
                let baterias = [];
        
              round++;
        
              i = tamanho / x;
        
              console.log("Quantidade baterias " + round + " " + i);
        
              for (let index = 0; index < i; index++) {
                let strRound = round + "º Round";
                if (i==4) {
                  strRound = "Quartas de Final";
                } else if (i=2) {
                  strRound = "SemiFinal";
                } else if (i=1) {
                  strRound = "Final";
                }
                baterias.push(
                  new Bateria(id++,index + 1 + "ª bateria do ",strRound,null,null,"Aguardando")
                );
              }
              dadosBaterias.push(baterias);
              tamanho = i;
              x = 2;
            }
            
            categoria.baterias = qtdAtletasBateria;
           
            return categoria;

         } catch (error) {
           console.error('Erro ao gerar baterias', error);
           throw error;
         }
    }
}