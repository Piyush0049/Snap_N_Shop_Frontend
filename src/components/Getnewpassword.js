import React, { useState } from 'react';
import backgroundImage from './snapedit_1710097319045.jpeg';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { IconButton} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotpasswordreset } from './actions/useractions'
const Getnewpassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showcPassword, setShowcPassword] = useState(true);
    const params = useParams();
    const dispatch = useDispatch();
    const token = params.id;
    const navigate = useNavigate();
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setMessage('Password reset successfully');
            dispatch(forgotpasswordreset(token, password, confirmPassword));
            setTimeout(() => {
                navigate("/login")
            }, 2000);

        } else {
            setMessage('Passwords do not match');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglecPasswordVisibility = () => {
        setShowcPassword(!showcPassword);
    };


    return (
        <div style={{
            minHeight: '1000px', 
            height : "auto",
            width : "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundImage: `url(${backgroundImage}`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <h2 style={{ marginBottom: '35px', fontSize: '40px' }}><b>Reset Your Password :</b></h2>
            <form onSubmit={handleSubmit} style={{ width: '400px', textAlign: 'center' }}>
                <div style={{ display: "flex" }}>
                    <input
                        type={showPassword ? "password" : "text"}
                        placeholder="New Password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            textAlign: 'center'
                        }}
                        required
                    />
                    <IconButton style={{ width: "40px", height: "40px", marginTop: "5px" }}// Show/Hide password button
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </div>

                <div style={{ display: "flex" }}>
                    <input
                        type={showcPassword ? "password" : "text"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            textAlign: 'center'
                        }}
                        required
                    />
                    <IconButton style={{ width: "40px", height: "40px", marginTop: "5px" }}// Show/Hide password button
                        onClick={togglecPasswordVisibility}
                    >
                        {showcPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: "20px"
                    }}
                >
                    Reset Password
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', color: message.startsWith('Password reset successfully') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default Getnewpassword;

