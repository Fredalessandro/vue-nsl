import axios from 'axios';
import config from '@/configuration/config';

const UsuarioService = {
  // Retorna todos os Usuarios
  async getAllUsuarios() {
    try {
      const response = await axios.get('/usuarios');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Retorna um Usuario por atributo  
  async getUsuariosByAttribute(atributos) {
    try {
      // Atributos que você deseja passar para a consulta
      //const atributos = 'tipo=DIRETOR/status=ATIVO';
  
      // Fazer a chamada para o endpoint com os atributos na URL
      const response = await axios.get(config.backendUrl+'/usuarios/'+atributos);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Usuários encontrados
        console.log('Usuários encontrados:', response.data);
        return response.data;
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao buscar usuários:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao buscar usuários:', error.message);
    }
  },
  
  // Cria um novo Usuario
  async createUsuario(usuarioData) {
    try {
      const response = await axios.post(config.backendUrl+'/usuarios', usuarioData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async atualizarUsuario(id, usuario) {
    try {
      // Fazer a chamada para o endpoint de atualização de usuário
      const response = await axios.put(config.backendUrl+`/usuarios/${id}`, usuario);
  
      // Verificar se a requisição foi bem-sucedida (status 200)
      if (response.status === 200) {
        // Usuário atualizado com sucesso
        console.log('Usuário atualizado:', response.data);
      } else {
        // O servidor retornou um código de erro
        console.error('Erro ao atualizar usuário:', response.statusText);
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error('Erro ao atualizar usuário:', error.message);
    }
  },  
  // Verifica login e senha
  async checkLogin(loginData) {
    try {
      const response = await axios.post(config.backendUrl+'/login', loginData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Remove um Usuario
  async removeUsuario(id) {
    try {
      const response = await axios.delete(config.backendUrl+`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default UsuarioService;
