import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
    sortDescription: string
    sortCompleted: string
}

// Pocatecni stav
const initialState: SortState = {
    sortDescription: 'Time',
    sortCompleted: 'All'
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        // funkce pro ulozeni stavu usporadani ukolu
        setSortDescription(state, action: PayloadAction<string>) {
            state.sortDescription = action.payload
        },
        // funkce pro ulozeni stavu podle aktualnosti
        setSortCompleted(state, action: PayloadAction<string>) {
            state.sortCompleted = action.payload
        },
    },
});

// export funkce a reduceru
export const { setSortDescription, setSortCompleted } = sortSlice.actions
export default sortSlice.reducer