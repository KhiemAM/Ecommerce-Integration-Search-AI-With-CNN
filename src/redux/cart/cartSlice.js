import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCartAPI, addToCartAPI, updateCartItemAPI, deleteCartItemAPI, updateSelectedItemCartAPI } from '~/apis'

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null
}

// Async thunks
export const fetchCartAPI = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartAPI()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addToCartSliceAPI = createAsyncThunk(
  'cart/addToCart',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addToCartAPI(payload)
      return { ...response, payload }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateCartItemSliceAPI = createAsyncThunk(
  'cart/updateCartItem',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateCartItemAPI(payload)
      return { ...response, payload }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteCartItemSliceAPI = createAsyncThunk(
  'cart/deleteCartItem',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await deleteCartItemAPI(productId)
      return { ...response, productId }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateSelectedItemSliceAPI = createAsyncThunk(
  'cart/updateSelectedItem',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateSelectedItemCartAPI(payload)
      return { ...response, payload }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
    resetCartState: (state) => {
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCartAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCartAPI.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.map(item => ({
          ProductId: item.ProductId,
          Name: item.Name,
          Price: item.Price,
          ImageURL: item.ImageURL,
          IsChecked: item.IsChecked,
          Quantity: item.Quantity
        }))
        // Tính tổng số lượng sản phẩm
        state.totalItems = action.payload.reduce((total, item) => total + item.Quantity, 0)
        // Tính tổng giá trị của các sản phẩm được chọn
        state.totalPrice = action.payload.reduce((total, item) => {
          if (item.IsChecked) {
            return total + (item.Price * item.Quantity)
          }
          return total
        }, 0)
      })
      .addCase(fetchCartAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add to cart
      .addCase(addToCartSliceAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCartSliceAPI.fulfilled, (state) => {
        state.loading = false
        // Không cập nhật state ở đây vì sẽ fetch lại cart data để đảm bảo tính chính xác
        // Việc fetch cart sẽ được gọi sau khi add thành công
      })
      .addCase(addToCartSliceAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update cart item quantity
      .addCase(updateCartItemSliceAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItemSliceAPI.fulfilled, (state, action) => {
        state.loading = false
        const { product_id, quantity } = action.payload.payload
        const existingItem = state.items.find(item => item.ProductId === product_id)
        if (existingItem) {
          const oldQuantity = existingItem.Quantity
          existingItem.Quantity = quantity
          // Cập nhật tổng số lượng
          state.totalItems = state.totalItems - oldQuantity + quantity
          // Cập nhật tổng giá trị nếu sản phẩm được chọn
          if (existingItem.IsChecked) {
            state.totalPrice = state.totalPrice - (existingItem.Price * oldQuantity) + (existingItem.Price * quantity)
          }
        }
      })
      .addCase(updateCartItemSliceAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete cart item
      .addCase(deleteCartItemSliceAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCartItemSliceAPI.fulfilled, (state, action) => {
        state.loading = false
        const productId = action.payload.productId
        const deletedItem = state.items.find(item => item.ProductId === productId)
        if (deletedItem) {
          // Giảm tổng số lượng
          state.totalItems -= deletedItem.Quantity
          // Giảm tổng giá trị nếu sản phẩm được chọn
          if (deletedItem.IsChecked) {
            state.totalPrice -= (deletedItem.Price * deletedItem.Quantity)
          }
          // Xóa sản phẩm khỏi danh sách
          state.items = state.items.filter(item => item.ProductId !== productId)
        }
      })
      .addCase(deleteCartItemSliceAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update selected item
      .addCase(updateSelectedItemSliceAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateSelectedItemSliceAPI.fulfilled, (state, action) => {
        state.loading = false
        const { product_id } = action.payload.payload
        const updatedItem = state.items.find(item => item.ProductId === product_id)
        if (updatedItem) {
          updatedItem.IsChecked = action.payload.IsChecked
          // Cập nhật tổng giá trị
          if (updatedItem.IsChecked) {
            state.totalPrice += (updatedItem.Price * updatedItem.Quantity)
          } else {
            state.totalPrice -= (updatedItem.Price * updatedItem.Quantity)
          }
        }
      })
      .addCase(updateSelectedItemSliceAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearCart, resetCartState } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalItems = (state) => state.cart.totalItems
export const selectCartTotalPrice = (state) => state.cart.totalPrice
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error

export const cartReducer = cartSlice.reducer
