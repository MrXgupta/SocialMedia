import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/auth.js'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('user')
        if (serializedState === null) return undefined
        return { user: JSON.parse(serializedState) }
    } catch (e) {
        console.error("Could not load state", e)
        return undefined
    }
}


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state.user)
        localStorage.setItem('user', serializedState)
    } catch (e) {
        console.error("Could not save state", e)
    }
}

// ✅ Pass preloaded state to store
const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: loadState()
})

// ✅ Listen for changes and save to localStorage
store.subscribe(() => {
    saveState(store.getState())
})

export { store }
