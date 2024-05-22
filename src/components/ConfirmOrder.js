import React from 'react';
import backimage from "./snapedit_1710779459498.jpeg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { cartitems } = useSelector((state) => state.cart);
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const styles = {

        hr2: {
            borderWidth: "2px",
            opacity: 0.6,
            width: "300px",
        },
        container: {
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            width: "100%",
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            position: "relative",
            top: "1px",
            minHeight: "600px"
        },
        header: {
            textAlign: 'center',
            marginBottom: '80px',
            marginTop: "20px",
        },
        productList: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
        grandTotalContainer: {
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            width: "300px",
        },
        grandTotalContainer2: {
            marginTop: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            width: "300px",
        },
        checkoutButton: {
            marginTop: '80px',
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'block',
            margin: '0 auto',
        },
        image: {
            width: "100px",
            height: "100px",
            borderRadius: '10px',
            marginRight: '20px',
        },
        details: {
            flex: '1',
        },
        product: {
            marginBottom: '30px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '5px 7px 14px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
        },
    };

    const getTotal = () => {
        return cartitems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const shippingdet = JSON.parse(localStorage.getItem("shippingdetails"));

    const navtopay = () => {
        navigate("/payment")
        localStorage.setItem("totalprice", (getTotal() * 1.18).toFixed(2));
    }

    return (
        <div style={{
            backgroundImage: `url(${backimage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '1000px'  // Adjusted height based on window width
            , width: "100%",
            height: "auto", opacity: 0.9, paddingTop: '80px',
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link to="/mycart" style={{ fontSize: '25px', color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
                <hr style={styles.hr2} />
                <Link style={{ fontSize: '25px', color: "red", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
                <hr style={styles.hr2} />
                <Link style={{ fontSize: '25px', color: "red", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
            </div>
            <div style={styles.container}>
                <h1 style={styles.header}><b>Order Summary : </b></h1>
                <ul style={styles.productList}>
                    {cartitems.map((p) => (
                        <div key={p} style={styles.product}>
                            <img style={styles.image} src={p.image} alt={p.name} />
                            <div style={styles.details}>
                                <h3 style={{ marginBottom: '10px', fontSize: "20px", fontWeight: 'bold' }}>{p.name}</h3>
                                <p style={{ marginBottom: '5px', color: '#666', fontSize: "20px" }}>Price: ₹{p.price}</p>
                                <p style={{ marginBottom: '5px', color: '#666', fontSize: "20px" }}>Quantity: {p.quantity}</p>
                                <p style={{ marginBottom: '5px', color: '#666', fontSize: "20px" }}><b>Total: ₹{p.price * p.quantity}</b></p>
                            </div>
                        </div>
                    ))}
                </ul>


                <div style={{ display: x > 984 ? "flex" : "block", textAlign: x > 984 ? "left" : "center" }}>

                    <div style={{ marginLeft: x > 984 ? "70px" : null, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom : "70px" }}>
                        <h2 style={{ marginBottom: "40px" }}><b>Shipping Address : </b></h2>
                        <div style={styles.grandTotalContainer2}>
                            <div>Name :</div>
                            <div>{shippingdet.userDetails.name}</div>
                        </div>
                        <div style={styles.grandTotalContainer2}>
                            <div>Phone :</div>
                            <div>{shippingdet.userDetails.phone}</div>
                        </div>
                        <div style={styles.grandTotalContainer2}>
                            <div>Address :</div>
                            <div>{shippingdet.userDetails.address}</div>
                        </div>
                        <div style={styles.grandTotalContainer2}>
                            <div>Country :</div>
                            <div>{shippingdet.selectedCountry.label}</div>
                        </div>
                        <div style={styles.grandTotalContainer2}>
                            <div>State :</div>
                            <div>{shippingdet.selectedState.label}</div>
                        </div>
                        <div style={styles.grandTotalContainer2}>
                            <div>City :</div>
                            <div>{shippingdet.selectedCity.label}</div>
                        </div>
                    </div>

                    
                    <div style={{ marginLeft: x > 984 ? "30%" : null, display: x > 984 ? "null" : 'flex', flexDirection: x > 984 ? "null" : 'column', alignItems: x > 984 ? "null" : 'center',  paddingBottom : x > 984 ? "null" : "70px"  }}>
                        <h2><b>Invoice Details : </b></h2>
                        <div style={styles.grandTotalContainer}>
                            <div>Sub Total:</div>
                            <div>₹{getTotal().toFixed(2)}</div>
                        </div>
                        <div style={styles.grandTotalContainer}>
                            <div>GST (18%):</div>
                            <div>₹{(getTotal() * 0.18).toFixed(2)}</div>
                        </div>
                        <hr style={{ marginTop: '30px', borderWidth: "3px", borderColor: "black" }} />
                        <div style={{
                            marginTop: '40px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 'bold',
                            width: "300px",
                        }}>
                            <div>Grand Total:</div>
                            <div>₹{(getTotal() * 1.18).toFixed(2)}</div>
                        </div>
                    </div>

                </div>
                <button style={styles.checkoutButton} onClick={() => navtopay()}>Proceed to Pay</button>
            </div>
        </div>
    );
};

export default ConfirmOrder;
