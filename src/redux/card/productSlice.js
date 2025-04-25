import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentCard: null
}

export const getAllCardAPI = createAsyncThunk(
  'card/getAllCardAPI',
  async (formData) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/cart/items`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Axios sẽ tự động thêm boundary
        }
      })
      console.log('🚀 ~ response:', response)
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
    builder.addCase(getAllCardAPI.fulfilled, (state, action) => {
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