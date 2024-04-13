import axios from 'axios';
import config from '@/configuration/config';

const EventoService = {
  // Retorna todos os Eventos
  async getAllEventos() {
    try {
      const response = await axios.get('/eventos');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async getEventosByAttribute(atributos) {
    try {
      // Atributos que você deseja passar para a consulta
      //const atributos = 'tipo=DIRETOR/status=ATIVO';
  
      // Fazer a chamada para o endpoint com os atributos na URL
      const response = await axios.get(config.backendUrl+'/eventos/'+atributos);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Eventos encontrados
        console.log('Eventos encontrados:', response.data);
        return response.data;
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao buscar eventos:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao buscar eventos:', error.message);
    }
  },
  async createEvento(eventoData) {
    try {
      const response = await axios.post(config.backendUrl+'/eventos', eventoData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async atualizarEvento(id, evento) {
    try {
      // Fazer a chamada para o endpoint de atualização de evento
      const response = await axios.put(config.backendUrl+`/eventos/${id}`, evento);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Evento atualizado com sucesso
        console.log('Evento atualizado:', response.data);
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao atualizar evento:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao atualizar evento:', error.message);
    }
  },  

  // Remove um Evento
  async removeEvento(id) {
    try {
      const response = await axios.delete(config.backendUrl+`/eventos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default EventoService;
