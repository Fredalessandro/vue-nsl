// src/services/CepService.ts
import axios from 'axios';

export class CepService {
  static async consultarCep(cep) {
   try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      throw error;
    }
  }
}
