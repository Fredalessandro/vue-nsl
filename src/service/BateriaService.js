import axios from 'axios';
import config from '@/configuration/config';

const BateriaService = {
  // Retorna todos os Baterias
  async getAllBaterias() {
    try {
      const response = await axios.get('/baterias');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async getBateriasByAttribute(atributos) {
    try {
      // Atributos que você deseja passar para a consulta
      //const atributos = 'tipo=DIRETOR/status=ATIVO';
  
      // Fazer a chamada para o endpoint com os atributos na URL
      const response = await axios.get(config.backendUrl+'/baterias/'+atributos);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Baterias encontrados
        console.log('Baterias encontrados:', response.data);
        return response.data;
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao buscar baterias:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao buscar baterias:', error.message);
    }
  },
  async createBateria(bateriaData) {
    try {
      const response = await axios.post(config.backendUrl+'/baterias', bateriaData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async gerarBateria(dadosCategoria) {
    try {
      const response = await axios.post(config.backendUrl+'/baterias/gerar', dadosCategoria);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async atualizarBateria(id, bateria) {
    try {
      // Fazer a chamada para o endpoint de atualização de bateria
      const response = await axios.put(config.backendUrl+`/baterias/${id}`, bateria);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Bateria atualizado com sucesso
        console.log('Bateria atualizado:', response.data);
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao atualizar bateria:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao atualizar bateria:', error.message);
    }
  },  

  // Remove um Bateria
  async removeBateria(id) {
    try {
      const response = await axios.delete(config.backendUrl+`/baterias/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default BateriaService;
