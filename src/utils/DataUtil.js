

export default class UtilData {

    static ConvertDDMMYYYY(dataOriginal) {
        
        const data = new Date(dataOriginal);
        // 2024-04-25
        const ano = dataOriginal.substring(0, 4);//String(data.getDate()).padStart(2, '0');
        const mes = dataOriginal.substring(5,7)
        const dia = dataOriginal.substring(8,10)
        
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }    

}