import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOAD_FAIL, USER_LOAD_SUCCESS, USER_LOAD_REQUEST, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATEPASS_FAIL, USER_UPDATEPASS_REQUEST, USER_UPDATEPASS_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_FORGOT_FAIL, USER_FORGOT_SUCCESS, USER_FORGOT_REQUEST, FORGOT_RESET_REQUEST, FORGOT_RESET_SUCCESS, FORGOT_RESET_FAIL, ALL_USERS_FAIL, ALL_USERS_SUCCESS, ALL_USERS_REQUEST } from "../constants/userconstants";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const userlogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};


export const googleLogin = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await axios.post(
            `${API_BASE_URL}/auth/google`,
            { token }, // ✅ send raw Google ID token
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        // ✅ Make payload structure consistent with normal login
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
                user: data.user,      // user object from backend
                authtoken: data.token // JWT
            },
        });

        return data;
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response?.data?.message || "Google login failed",
        });
    }
};



export const usersignup = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        const { data } = await axios.post(`${API_BASE_URL}/auth/createuser`, userdata, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
    }
};



export const userdataaccess = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOAD_REQUEST });

        const { data } = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
};

export const userlogout = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST });
        const { data } = await axios.get(`${API_BASE_URL}/auth/userlogout`, { withCredentials: true });
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
    }
};

export const updateuser = (username, email) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const { data } = await axios.put(`${API_BASE_URL}/auth/updateprofile`, { username, email }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response.data.error
        });
    }
};


export const updateuserpassword = (oldpassword, newpassword, confirmpassword) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATEPASS_REQUEST });
        const { data } = await axios.put(`${API_BASE_URL}/auth/updatepassword`, { oldpassword, newpassword, confirmpassword }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: USER_UPDATEPASS_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_UPDATEPASS_FAIL,
            payload: error.response.data.error
        });
    }
};

export const deleteuser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        await axios.delete(`${API_BASE_URL}/auth/userdelete`, { withCredentials: true });
        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response.data.error
        });
    }
};


export const forgotuserpassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOT_REQUEST });
        const { data } = await axios.post(`${API_BASE_URL}/auth/password/forgot`, { email }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: USER_FORGOT_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: USER_FORGOT_FAIL,
            payload: error.response.data.error
        });
    }
};


export const forgotpasswordreset = (token, newpassword, confirmpassword) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_RESET_REQUEST });
        const { data } = await axios.put(`${API_BASE_URL}/auth/password/reset/${token}`, { newpassword, confirmpassword }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch({
            type: FORGOT_RESET_SUCCESS,
            payload: data
        });
        return data;
    } catch (error) {
        dispatch({
            type: FORGOT_RESET_FAIL,
            payload: error.response.data.error
        });
    }
};


export const getallusers = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST
        })
        const { data } = await axios.get(`${API_BASE_URL}/auth/getalluserprofile`, { withCredentials: true });
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })
        return data;
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.error
        });
    }
}


// Add this new action

