import React, { useState, useEffect } from 'react';
import backimg from "./snapedit_1710434121810.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { updateuser, updateuserpassword } from './actions/useractions';
import { IconButton, makeStyles } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Account = () => {
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
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const userdata = useSelector(state => state.userdetails.user);
    const [editopt, seteditopt] = useState(false)
    const [changepassword, setchangepassword] = useState(false);
    const [oldpassword, setoldpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [showoldPassword, setShowoldPassword] = useState(true);
    const [shownewPassword, setShownewPassword] = useState(true);
    const [showcPassword, setShowcPassword] = useState(true);
    const navigate = useNavigate();
    const useStyles = makeStyles((theme) => ({
        input: {
            display: 'none',
        },
        iconButton: {
            marginLeft: theme.spacing(1),
        },
        icon: {
            fontSize: 48, // Adjust the size of the icon as needed
        },
    }));
    const classes = useStyles();
    const editprof = () => {
        seteditopt(!editopt);
    }
    const handleUpdate = () => {
        dispatch(updateuser(userName, email));
        navigate("/");
        window.alert(`Your profile has been successfully updated!`);
    }

    const handlepasswordUpdate = () => {
        dispatch(updateuserpassword(oldpassword, newpassword, cpassword));
        navigate("/");
        window.alert(`Your password has been successfully updated!`);
    }

    const changepass = () => {
        setchangepassword(!changepassword)
    }

    const toggleoldPasswordVisibility = () => {
        setShowoldPassword(!showoldPassword);
    };

    const togglenewPasswordVisibility = () => {
        setShownewPassword(!shownewPassword);
    };

    const toggleconfirmPasswordVisibility = () => {
        setShowcPassword(!showcPassword);
    };

    const { isAuthenticated } = useSelector((state) => state.userdetails)
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            padding: '20px',
            backgroundImage: `url(${backimg})`,
            minHeight: "1000px"
        },
        heading: {
            fontSize: '40px',
            marginBottom: '30px',
            color: '#333',
            fontWeight: 'bold',
        },
        detailsContainer: {
            width: '80%',
            background: 'rgba(255, 255, 255, 0.6)', // Semi-transparent background for better readability
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        },
        detailItem: {
            marginBottom: '20px'
        },
        label: {
            fontSize: '23px',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#555',
            zIndex: 2
        },
        label1: {
            marginBottom: '5px',
            color: '#555',
            zIndex: 2,
            fontSize: x > 631 ? '35px' : "27px",
            textAlign: "center",
            fontWeight: "bold",
        },
        value: {
            fontSize: x > 425 ? '18px' : "16px",
            marginBottom: '20px',
            color: '#777',
            zIndex: 2
        },
        editButton: {
            position: "relative",
            left: "95%",
            fontSize: "18px",
            cursor: "pointer",
            transition: "opacity 0.3s ease",
        },
        keyIcon: {
            cursor: "pointer",
            position: "relative",
            fontSize: "18px",
            transition: "opacity 0.3s ease",
            "&:hover": {
                opacity: 0.7,
            },
        },
    };

    return (
        <div>
            <div style={styles.container}>
                <h1 style={styles.heading}>Account Details</h1>
                <div style={styles.detailsContainer}>
                    <div style={{ ...styles.detailItem, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
                        <h3 style={styles.label}>Name:</h3>
                        <p style={styles.value}>{userdata ? userdata.username : ''}</p>
                    </div>
                    <div style={{ ...styles.detailItem, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
                        <h3 style={styles.label}>Email:</h3>
                        <p style={styles.value}>{userdata ? userdata.email : ''}</p>
                    </div>
                    <div style={{ ...styles.detailItem, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
                        <h3 style={styles.label}>Joined On:</h3>
                        <p style={styles.value}>{userdata ? userdata.createdAt.slice(0, 10) : ''}</p>
                    </div>
                    {isAuthenticated &&
                        <>
                            <i
                                className="fa-solid fa-pen-to-square"
                                style={{
                                    ...styles.editButton,
                                    opacity: editopt ? 0.5 : 1,
                                }}
                                onClick={editprof}
                            ></i>
                            <i
                                className="fa-solid fa-key"
                                style={{
                                    ...styles.keyIcon,
                                }}
                                onClick={changepass}
                            ></i>
                        </>
                    }
                    {
                        changepassword && (
                            <>
                                <div style={{ ...styles.detailItem, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
                                    <h2 style={{ ...styles.label1 }}>Change Your Password</h2>
                                    <form onSubmit={handlepasswordUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <label htmlFor="Old password" style={{ marginBottom: '10px', ...styles.label }}>Old Password </label>

                                        <div style={{ display: "flex", marginLeft: "55px" }}>
                                            <input
                                                type={showoldPassword ? "password" : "text"}
                                                id="Old password"
                                                value={oldpassword}
                                                onChange={(e) => setoldpassword(e.target.value)}
                                                style={{
                                                    width: '80%',
                                                    padding: '10px',
                                                    marginBottom: '20px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '10px',
                                                    boxSizing: 'border-box',
                                                    textAlign: "center",
                                                    ...styles.value
                                                }}
                                            />
                                            <IconButton style={{ width: "40px", height: "40px", marginTop: "9px" }}// Show/Hide password button
                                                onClick={toggleoldPasswordVisibility}
                                                className={classes.iconButton}
                                            >
                                                {showoldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </div>


                                        <label htmlFor="new password" style={{ marginBottom: '10px', ...styles.label }}>New Password</label>
                                        <div style={{ display: "flex", marginLeft: "55px" }}>
                                            <input
                                                type={shownewPassword ? "password" : "text"}
                                                id="New password"
                                                value={newpassword}
                                                onChange={(e) => setnewpassword(e.target.value)}

                                                style={{
                                                    width: '80%',
                                                    padding: '10px',
                                                    marginBottom: '20px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '10px',
                                                    boxSizing: 'border-box',
                                                    textAlign: "center",
                                                    ...styles.value
                                                }}
                                            />
                                            <IconButton style={{ width: "40px", height: "40px", marginTop: "9px" }}// Show/Hide password button
                                                onClick={togglenewPasswordVisibility}
                                                className={classes.iconButton}
                                            >
                                                {shownewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </div>

                                        <label htmlFor="cpassword" style={{ marginBottom: '10px', ...styles.label }}>Confirm Password</label>

                                        <div style={{ display: "flex", marginLeft: "55px" }}>
                                            <input
                                                type={showcPassword ? "password" : "text"}
                                                id="cpassword"
                                                value={cpassword}
                                                onChange={(e) => setcpassword(e.target.value)}
                                                style={{
                                                    width: '80%',
                                                    padding: '10px',
                                                    marginBottom: '20px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '10px',
                                                    boxSizing: 'border-box',
                                                    textAlign: "center",
                                                    ...styles.value
                                                }}
                                            />
                                            <IconButton style={{ width: "40px", height: "40px", marginTop: "9px" }}// Show/Hide password button
                                                onClick={toggleconfirmPasswordVisibility}
                                                className={classes.iconButton}
                                            >
                                                {showcPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </div>

                                        <button
                                            type="submit"
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: '#fff',
                                                border: 'none',
                                                cursor: 'pointer',
                                                borderRadius: '10px',
                                                transition: 'background-color 0.3s ease',
                                                fontSize: "20px",
                                                padding: "10px"
                                            }}
                                        >
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </>
                        )
                    }
                    {editopt ? (
                        <div style={{ ...styles.detailItem, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px' }}>
                            <h2 style={{ ...styles.label1 }}>Update Your Profile</h2>
                            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <label htmlFor="userName" style={{ marginBottom: '10px', ...styles.label }}>User Name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    style={{
                                        width: '80%',
                                        padding: '10px',
                                        marginBottom: '20px',
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        boxSizing: 'border-box',
                                        textAlign: "center",
                                        ...styles.value
                                    }}
                                />
                                <label htmlFor="email" style={{ marginBottom: '10px', ...styles.label }}>Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '80%',
                                        padding: '10px',
                                        marginBottom: '20px',
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        boxSizing: 'border-box',
                                        textAlign: "center",
                                        ...styles.value
                                    }}

                                />

                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        transition: 'background-color 0.3s ease',
                                        fontSize: "20px",
                                        padding: "10px"
                                    }}
                                >
                                    Update
                                </button>
                            </form>
                        </div>

                    ) :
                        null
                    }
                </div>
            </div>
        </div>
    );
};



export default Account;