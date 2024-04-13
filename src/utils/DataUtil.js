import moment from 'moment';

export default class UtilData {

    static ConvertDDMMYYYY(dataOriginal) {
        
        /*const data = new Date(dataOriginal);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth()).padStart(2, '0');
        const ano = data.getFullYear();
        
        const dataFormatada = `${dia}/${mes}/${ano}`;*/
        return moment(dataOriginal).format('DD/MM/YYYY');;
    }    

}