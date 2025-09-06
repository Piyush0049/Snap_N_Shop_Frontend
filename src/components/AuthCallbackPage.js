import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../actions/useractions';
import { useAuth } from '../context/AuthContext';

const AuthCallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const search = location.search.substring(1); 
        const paramsArray = search.split("&");
        let code = null;

        for (let param of paramsArray) {
            const [key, value] = param.split("=");
            if (key === "code") {
                code = decodeURIComponent(value);
                break;
            }
        }

        console.log(code);

        if (!code) {
            toast.error("Google login failed: No code received.");
            navigate("/login");
            return;
        }

        const exchangeCode = async () => {
            console.log(code);
            try {
                const res = await dispatch(googleLogin(code));
                if (res?.success) {
                    toast.success("Logged in with Google!");
                    checkAuth();
                    navigate("/home");
                } else {
                    toast.error(res?.message || "Google login failed.");
                    navigate("/login");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred during login.");
                navigate("/login");
            }
        };

        exchangeCode();
    }, [location, navigate, dispatch, checkAuth]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">Logging in with Google...</p>
        </div>
    );
};

export default AuthCallbackPage;
