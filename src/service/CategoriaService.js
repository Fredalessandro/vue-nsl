import axios from 'axios';
import config from '@/configuration/config';

const CategoriaService = {
  // Retorna todos os Categorias
  async getAllCategorias() {
    try {
      const response = await axios.get('/categorias');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async getCategoriasByAttribute(atributos) {
    try {
      // Atributos que você deseja passar para a consulta
      //const atributos = 'tipo=DIRETOR/status=ATIVO';
  
      // Fazer a chamada para o endpoint com os atributos na URL
      const response = await axios.get(config.backendUrl+'/categorias/'+atributos);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Categorias encontrados
        console.log('Categorias encontrados:', response.data);
        return response.data;
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao buscar categorias:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao buscar categorias:', error.message);
    }
  },
  async createCategoria(categoriaData) {
    try {
      const response = await axios.post(config.backendUrl+'/categorias', categoriaData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async atualizarCategoria(id, categoria) {
    try {
      // Fazer a chamada para o endpoint de atualização de categoria
      const response = await axios.put(config.backendUrl+`/categorias/${id}`, categoria);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Categoria atualizado com sucesso
        console.log('Categoria atualizado:', response.data);
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao atualizar categoria:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao atualizar categoria:', error.message);
    }
  },  

  // Remove um Categoria
  async removeCategoria(id) {
    try {
      const response = await axios.delete(config.backendUrl+`/categorias/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default CategoriaService;
