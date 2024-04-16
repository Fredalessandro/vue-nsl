import axios from 'axios';
import config from '@/configuration/config';

const AtletaService = {
  // Retorna todos os Atletas
  async getAllAtletas() {
    try {
      const response = await axios.get('/atletas');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async getAtletasByAttribute(atributos) {
    try {
      // Atributos que você deseja passar para a consulta
      //const atributos = 'tipo=DIRETOR/status=ATIVO';
  
      // Fazer a chamada para o endpoint com os atributos na URL
      const response = await axios.get(config.backendUrl+'/atletas/'+atributos);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Atletas encontrados
        console.log('Atletas encontrados:', response.data);
        return response.data;
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao buscar atletas:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao buscar atletas:', error.message);
    }
  },
  async createAtleta(atletaData) {
    try {
      const response = await axios.post(config.backendUrl+'/atletas', atletaData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async atualizarAtleta(id, atleta) {
    try {
      // Fazer a chamada para o endpoint de atualização de atleta
      const response = await axios.put(config.backendUrl+`/atletas/${id}`, atleta);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Atleta atualizado com sucesso
        console.log('Atleta atualizado:', response.data);
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao atualizar atleta:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao atualizar atleta:', error.message);
    }
  },  
  // Remove um Atleta
  async removeAtleta(id) {
    try {
      const response = await axios.delete(config.backendUrl+`/atletas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default AtletaService;
