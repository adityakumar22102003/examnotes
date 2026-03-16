import React from "react"
import axios from "axios";
import {serverUrl} from "../App.jsx"
import { setUserData } from "../redux/userSlice.js";

export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverUrl + "/api/user/currentUser", { withCredentials: true });
        // console.log("API DATA -> ", result.data)
        dispatch(setUserData(result.data))
    } catch (error) {
        console.log("Error message:", error.response?.data);
        console.log("Status:", error.response?.status);
    }
}
export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(serverUrl + "/api/notes/generate-notes", payload, { withCredentials: true });
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log("error in generateNotes api -> ", error);
        throw error;
    }
}