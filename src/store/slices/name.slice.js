import { createSlice } from '@reduxjs/toolkit';

export const nameSlice = createSlice({
    name: 'nameSlice',
    initialState: '',
    reducers: {
        setEspecificValue: (state, action) => action.payload
    }
})

export const { setEspecificValue } = nameSlice.actions;

export default nameSlice.reducer;