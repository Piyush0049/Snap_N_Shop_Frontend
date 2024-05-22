import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { usersallorders } from './actions/orderactions';
const Myorders = () => {
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
    useEffect(() => {
        dispatch(usersallorders())
    }, [dispatch]);

    const { orderdet } = useSelector((state) => state.myorders);
    const { user } = useSelector((state) => state.userdetails);
    const userid = user._id;
    var filteredOrders = [];
    if (orderdet[0] !== null) {
        filteredOrders = orderdet.filter((order) => (order.user === userid));
    }
    const styles = {
        title: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        ordersContainer: {
            display: 'grid',
            gridGap: '20px',
            position: "relative",
            top: "50px",
            zIndex: 3,
        },
        orderCard: {
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
        },
        hr2: {
            borderWidth: "2px",
            opacity: 0.6,
            width: "300px",
        },
        container: {
            fontFamily: 'Arial, sans-serif',
            width : "95%",
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            position: "relative",
            top: "10px",
            minHeight: "1100px",
            height: "auto",
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
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
        grandTotalContainer3: {
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            width: "300px",
            position: "relative",
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
        noOrderMessage: {
            textAlign: 'center',
            fontSize:'50px',
            color: '#666',
            minHeight: '1600px', 
            height: "auto",
            width: "100%",
            backgroundColor: "#A0E1FC",
        },
        textMessage: {
            position: "relative",
            top: '300px',
            fontSize : '50px',
        }
    };
    return (<>
        <div>
            {filteredOrders.length !== 0 && orderdet[0] !== null ? filteredOrders.map((order) => (
                <div key={order._id} style={{ position: 'relative', minHeight: '1450px' }}>
                    <div style={{
                        minHeight: '1600px', 
                        height: "auto",
                        width: "100%",
                        backgroundColor: "#A7F7FE",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                    }}>
                        <div style={styles.ordersContainer}>
                            <div style={styles.container}>
                                <h1 style={styles.header}><b>My Order Summary : </b></h1>
                                <div style={styles.grandTotalContainer3}>
                                    <div style={{ fontSize:"20px", whiteSpace: 'nowrap', position : "relative", left : "20%", paddingBottom : "50px" }}>
                                        Placed On: <b>{order.createdAt.toString().slice(0, 10)}</b>
                                    </div>

                                </div>
                                <ul style={styles.productList}>
                                    {order.orderitems.map((p) => (
                                        <div key={p._id} style={styles.product}>
                                            <img style={styles.image} src={p.image} alt={p.name} />
                                            <div style={styles.details}>
                                                <h3 style={{ marginBottom: '10px', fontSize: "22px" , fontWeight: 'bold' }}>{p.name}</h3>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize: "20px" }}>Price: ₹{p.price}</p>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize:  "20px"  }}>Quantity: {p.quantity}</p>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize: "20px" }}>Total: ₹{p.price * p.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </ul>

                                <div style={{ display: x > 984 ? "flex" : "block", textAlign: x > 984 ? "left" : "center" }}>
                                    <div style={{marginLeft: x > 984 ? "70px" : null, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom : "70px" }}>
                                        <h2 style={{ marginBottom: "40px" }}><b>Shipping Address : </b></h2>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>Address :</div>
                                            <div>{order.shippinginfo.address}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>Country :</div>
                                            <div>{order.shippinginfo.country}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>State :</div>
                                            <div>{order.shippinginfo.state}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>City :</div>
                                            <div>{order.shippinginfo.city}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div><b>Order Status :</b></div>
                                            <div><b>{order.orderStatus}</b></div>
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: x > 984 ? "30%" : null, display: x > 984 ? "null" : 'flex', flexDirection: x > 984 ? "null" : 'column', alignItems: x > 984 ? "null" : 'center',  paddingBottom : x > 984 ? "null" : "70px"  }}>
                                        <h2 style={{ marginBottom: "40px"}}><b>Invoice Details : </b></h2>
                                        <div style={styles.grandTotalContainer}>
                                            <div>Sub Total:</div>
                                            <div>₹{order.itemsPrice}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer}>
                                            <div>GST (18%):</div>
                                            <div>₹{order.taxPrice}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer}>
                                            <div>Shipping Charges:</div>
                                            <div>₹{order.shippingPrice}</div>
                                        </div>
                                        <hr style={{ marginTop: '30px', borderWidth: "3px", borderColor: "black" }} />
                                        <div style={styles.grandTotalContainer}>
                                            <div ><b>Grand Total:</b></div>
                                            <div ><b>₹{order.totalPrice}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <div style={styles.noOrderMessage}><h1 style={styles.textMessage}><b>No orders to display!</b></h1></div>}
        </div>



    </>
    );
};

export default Myorders;
