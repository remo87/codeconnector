import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode";

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(result => {
            history.push('/login');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
}


//Login - Get user Token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;

            localStorage.setItem('jwtToken', token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            // Set currect user
            dispatch(setCurrentUser(decoded));
            
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

//Set logged user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    //remove token from localstorage
    localStorage.removeItem('jwtToken');
    //remove token from header
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}