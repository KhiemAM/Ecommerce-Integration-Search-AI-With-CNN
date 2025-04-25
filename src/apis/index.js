import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/users`, data)
  toast.success('Register successfully!')
  return response.data
}

export const getAllProductsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/products`)
  return response.data
}

// export const searchProductsAPI = async (formData) => {
//   const response = await authorizedAxiosInstance.post(`${API_ROOT}/flowers/predict`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data' // Axios sẽ tự động thêm boundary
//     }
//   })
//   return response.data
// }

export const getProductByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/products/${id}`)
  return response.data
}