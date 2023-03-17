import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {  getDocs , collection , doc , getDoc} from "firebase/firestore";
import { db } from "../Firebase/Config";
import { async } from "@firebase/util";


export const fetchUserById = createAsyncThunk(
    'user-info/fetchByIdStatus',
    async ( obj ) => {
        var a;
        const querySnapshot = await getDoc(doc(db, "User" , obj));
        console.log(querySnapshot.data());
      a = querySnapshot.data();
       return a;
    }
  )

const User_Info_Slice = createSlice({
    name: 'user-info',
    initialState: [],
    reducers:{
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUserById.pending, (state, action) => {
            // Add user to the state array
            state.push("pending")
          })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
          // Add user to the state array
         // state.push(action.payload)
         return action.payload
        })
        //
        builder.addCase(fetchUserById.rejected, (state, action) => {
            // Add user to the state array
            state.push("rejected")
          })
      },
})


export default User_Info_Slice.reducer;