import React from 'react';
import backgroundimg from "./snapedit_1710779459498.jpeg";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addtocart } from './actions/cartactions';
import { removefromcart } from './actions/cartactions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MyCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartitems } = useSelector((state) => state.cart);
    const { _id } = useSelector((state) => state.userdetails.user);
    const { isAuthenticated } = useSelector((state) => state.userdetails);
    
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${backgroundimg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '1000px', 
            height : "auto",
            width : "100%",
            padding : "0",
            margin : "0"
        },
        hr2: {
            borderWidth: "2px",
            opacity: 0.6,
            width: "300px",
        },
        cartContainer: {
            width : "auto",
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)',
            marginTop :"100px",
        },
        product: {
            marginBottom: '30px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width : "100%"
        },
        image: {
            width: '100px',
            height: '100px' ,
            borderRadius: '10px',
            marginRight: '20px',
        },
        details: {
            flex: '1',
        },
        quantityContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        quantityButton: {
            backgroundColor: '#5ABCE6',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            border: 'none',
            fontSize:'20px' ,
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginRight: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            width: '21px',
        },
        quantityButton2: {
            backgroundColor: 'gray',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '20px',
            transition: 'background-color 0.3s',
            marginRight: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            width: "21px",
        },
        quantityText: {
            fontSize: '20px',
            color: '#333',
            margin: '0 5px',
            marginRight: "10px"
        },
        checkoutButton: {
            marginTop: '30px',
            padding: '15px 30px',
            fontSize:'16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            outline: 'none',
        },
        grandTotal: {
            marginTop: '30px',
            fontSize: '24px' ,
            fontWeight: 'bold',
            textAlign: 'center',
        },

    };

    const increaseQuant = (productId, quantity, stock) => {
        if (quantity < stock)
            dispatch(addtocart(productId, quantity + 1, _id));
    };

    const decreaseQuant = (productId, quantity) => {
        if (quantity > 1) {
            dispatch(addtocart(productId, quantity - 1, _id));
        }
    };

    const getTotal = () => {
        if(cartitems!==null){
        return cartitems.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
        else{
            return 0;
        }
    };

    const deleteprod = (productId, quantity, stock) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
        if (confirmDelete) {
            dispatch(removefromcart(productId, quantity, stock));
        }
    };

    const navtoship = () => {
        if (isAuthenticated) {
            navigate("/shipping")
        }
    }

    return (
        <div style={styles.container}>
            <div style={{ display: "flex", position : "relative", top : "80px", justifyContent : "center" }}>
                <Link to="/mycart" style={{ fontSize: '25px' , color: "red", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
                <hr style={styles.hr2} />
                <Link style={{ fontSize: '25px', color: "red", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
                <hr style={styles.hr2} />
                <Link style={{ fontSize: '25px' , color: "red", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>

            </div>
            <div style={styles.cartContainer}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize:'45px'  }}><b>Your Cart : </b></h1>
                {cartitems === null ? (
                    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '25px' , fontWeight: 'bold', color: '#333' }}>Your cart is empty</h2>
                    </div>
                ) : (
                    cartitems.map((p) => (
                        <div key={p} style={styles.product}>
                            <img style={styles.image} src={p.image} alt={p.name} />
                            <div style={styles.details}>
                                <h3 style={{ marginBottom: '10px', fontSize:'20px', fontWeight: 'bold' }}>{p.name}</h3>
                                <p style={{ marginBottom: '5px', color: '#666', fontSize:   '16px' }}>Price: ₹{p.price}</p>
                                <p style={{ marginBottom: '5px', color: '#666', fontSize: '16px' }}>Quantity: {p.quantity}</p>
                                <p style={{ marginBottom: '5px', color: '#666', fontSize:  '16px' }}>Total: ₹{p.price * p.quantity}</p>
                            </div>
                            <div style={styles.quantityContainer}>
                                <button onClick={() => decreaseQuant(p.product, p.quantity)} style={styles.quantityButton}>-</button>
                                <span style={styles.quantityText}>{p.quantity}</span>
                                <button onClick={() => increaseQuant(p.product, p.quantity, p.stock)} style={p.quantity === p.stock ? styles.quantityButton2 : styles.quantityButton}>+</button>
                            </div>
                            <i
                                className="fa-solid fa-trash"
                                style={{ marginTop:'110px' , marginRight: "10px", cursor: "pointer"}}
                                onClick={() => deleteprod(p.product, p.quantity, p.stock)}
                                // Add hover effect
                                onMouseEnter={(e) => { e.target.style.color = "blue"; }}
                                onMouseLeave={(e) => { e.target.style.color = "black"; }}
                            ></i>
                        </div>
                    ))
                )}

                <div style={styles.grandTotal}>
                    Total: ₹{getTotal().toFixed(2)}
                </div>

                { cartitems !== null && (
                    cartitems.length > 0 && (
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button style={styles.checkoutButton} onClick={navtoship}>Proceed</button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MyCart;

