import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootReducer } from './rootReducer'

// Umoznuje ulozeni stavu a opetovne nacteni z local storu usera po obnoveni stranky
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Konfigurace a vytvoreni uloziste Redux pomoci persistedReducer a povoleni Redux DevTools
export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
})

export const persistor = persistStore(store)

// Vytvoreni typizovane verze hooku useDispatch pomoci typu funkce odeslani storu
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Vytvoreni typované verze hooku useSelector pomoci typu stavu storu
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
