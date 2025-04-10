import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentProduct: null
}

export const searchProductAPI = createAsyncThunk(
  'product/searchProductAPI',
  async (formData) => {
    try {
      const response = await authorizedAxiosInstance.post(`${API_ROOT}/flowers/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Axios sẽ tự động thêm boundary
        }
      })
      return response.data
    } catch {
      return null
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchProductAPI.fulfilled, (state, action) => {
      const product = action.payload
      state.currentProduct = product
    })
  }
})

// export const {} = userSlice.actions

export const selectCurrentProduct = (state) => {
  return state.product.currentProduct
}

export const productReducer = productSlice.reducer