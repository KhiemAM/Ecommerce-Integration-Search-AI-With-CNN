import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/register`, data)
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

export const addToCartAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/carts`, data)
  return response.data
}

export const getCartAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/carts`)
  return response.data
}

export const updateSelectedItemCartAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/carts/selected`, data)
  return response.data
}

export const updateCartItemAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/carts`, data)
  return response.data
}

export const deleteCartItemAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/carts/${id}`)
  return response.data
}