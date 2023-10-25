import { IToDo } from "../../interfaces/IToDo"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Pocatecni stav
const initialState: IToDo[] = []

// Slice pro ToDo
export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        // funkce pro pridani ukolu
        addToDo(state, action: PayloadAction<IToDo>) {
            state.push(action.payload)
        },
        // funkce pro smazani ukolu
        removeFromToDo(state, action: PayloadAction<number>) {
            state.splice(action.payload, 1)
        },
        // funkce pro zmenu actualnosti ukolu
        comleteOrIncompleteToDo(state, action: PayloadAction<IToDo>) {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.completed = action.payload.completed
            }
        },
        // funkce pro opravu 
        updateToDo(state, action: PayloadAction<IToDo>) {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.task = action.payload.task
                todo.time = action.payload.time
            }
        },
        // filtrace dle aktualnosti ukolu
        filterByVisibilityToDo(state, action: PayloadAction<boolean>) {
            state.forEach(todo => todo.completed === action.payload ? todo.visible = true : todo.visible = false)
        },
        // filtrace dle aktualnosti ukolu
        makeVisibleAllToDo(state) {
            state.forEach(todo => todo.visible = true)
        },
        // smazat vsechny neaktualni ukoly
        removeAllCompleteToDo(state) {
            return state.filter(todo => !todo.completed)
        },
        // sortirovani seznamu
        sortToDo(state, action: PayloadAction<string>) {
            switch (action.payload) {
                case "time":
                    state.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
                    break
                case "additionOrder":
                    state.sort((a, b) => a.id - b.id)
                    break
                case "alphabetical":
                    state.sort((a, b) => a.task.toLowerCase().charCodeAt(0) - b.task.toLowerCase().charCodeAt(0))
                    break
                case "unalphabetical":
                    state.sort((a, b) => b.task.toLowerCase().charCodeAt(0) - a.task.toLowerCase().charCodeAt(0))
                    break
            }
        }
    }
})

// Export Reduceru
export default toDoSlice.reducer