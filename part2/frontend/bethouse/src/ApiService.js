import axios from 'axios'
const API_URL = 'http://localhost:2727'

export default class ApiService {
  getCategorias () {
    const url = `${API_URL}/categorias`

    return axios.get(url).then(response => {
      console.log(response.data)
    })
  }
  getCategoria (pk) {
    const url = `${API_URL}/categorias/${pk}`

    return axios.get(url).then(response => response.data)
  }

  deleteCategoria (categoria) {
    const url = `${API_URL}/categorias/${categoria.idCategoria}`
    return axios.delete(url)
  }

  createCategoria (categoria) {
    const url = `${API_URL}/categorias/`
    return axios.post(url, categoria)
  }

  updateCategoria (categoria) {
    const url = `${API_URL}/categorias/${categoria.idCategoria}`
    return axios.put(url, categoria)
  }

  createAposta (aposta) {
    console.log(aposta)
    // const url = `${API_URL}/aposta`
    // return axios.post(url, aposta)
  }

}

