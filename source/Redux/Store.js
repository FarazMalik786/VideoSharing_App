import { configureStore } from '@reduxjs/toolkit';
import userinforeducer from "./User_Info";
import userpostreducer from "./UserPost"
export const mystore = configureStore({
    reducer:{
        user_information: userinforeducer,
        user_post: userpostreducer,
    },
});