import { combineReducers } from '@reduxjs/toolkit'
import toDoReducer from './reducers/ToDoSlice'
import sortReducer from './reducers/SortSlice'

// slouceni vsech reduseru do rootReducer pro pouziti v storu Redux
export const rootReducer = combineReducers({
    toDoReducer,
    sortReducer
})

// Vytvoreni typu pro stav rootReducer
export type RootState = ReturnType<typeof rootReducer>
