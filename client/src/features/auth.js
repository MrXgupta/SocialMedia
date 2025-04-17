import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {user: null},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
        }
    }
})

export const {setUser , logout} = userSlice.actions;
export default userSlice.reducer;
