import { configureStore } from '@reduxjs/toolkit'
import nameSlice from '../store/slices/name.slice'

export default configureStore({
  reducer: {
        nameSlice
    }
})