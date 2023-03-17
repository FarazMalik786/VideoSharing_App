import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../Firebase/Config";



export const fetchUserPost = createAsyncThunk(
  'User_Post/fetchUserPostStatus',
  async (obj) => {
    var a = [];
    const querySnapshot = await getDocs(collection(db,"Post" ,obj.userId, obj.email_id));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data.Unique_Id = doc.id;
      a.push(data);
    });
    console.log(a);
    return a;
  }
)
const User_Post_Slice = createSlice({
  name: "User_Post",
  initialState: [],
  reducers: {
  },
  extraReducers: (builder) => {

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserPost.fulfilled, (state, action) => {
      return action.payload
    })
    //
    builder.addCase(fetchUserPost.rejected, (state, action) => {
      Alert.alert("Something Wronge , Please Try Again Later")
    })
  },
});

export default User_Post_Slice.reducer;