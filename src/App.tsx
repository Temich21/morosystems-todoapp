import './App.css'
import { Header } from './components/Header/Header'
import ToDoComponent from './components/ToDoComponent/ToDoComponent'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

function App() {
  return (
    // Provider slouži abychom mohli vyvolat to do seznam v jaké koliv urovně
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <ToDoComponent />
      </PersistGate>
    </Provider>
  )
}

export default App;
