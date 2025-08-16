import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { forgotuserpassword } from '../actions/useractions';
const Forgotpassword = () => {
    const [x, setx] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setx(window.innerWidth);

        window.addEventListener('resize', handleResize);

        if (localStorage.getItem("width") !== null) {
            setx(parseInt(localStorage.getItem("width")));
        } else {
            setx(window.innerWidth);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotuserpassword(email));
        setMessage(`Password reset link sent to ${email}`);

    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight:'1000px' , 
            height : "auto",
            width : "100%",
            flexDirection: 'column',
            backgroundColor : "#B4E9FF",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <h2 style={{ marginBottom: '20px', fontSize: x > 480 ? '40px' : "30px", fontFamily : "sans-serif" }}><b>Forgot Your Password?</b></h2>
            <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                        width: x > 532 ? '40%' : '90%',
                        padding:  '10px' ,
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign : "center",
                        fontSize : '18px' ,
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop : "10px",
                        fontSize :'18px',
                    }}
                >
                    Send Reset Link
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', fontSize : "20px" }}><b>{message}</b></p>}
        </div>
    );
};

export default Forgotpassword;


