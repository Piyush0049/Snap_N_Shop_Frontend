import React from 'react';
import successful from "./1cbd3594bb5e8d90924a105d4aae924c.gif";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const Success = () => {
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
    container: {
      minHeight: '900px', 
      height: "auto",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      textAlign: "center",
      position: "relative",
    },
    hr2: {
      borderWidth: "2px",
      opacity: 0.6,
      width: "300px",
    },
  };
  return (
    <div style={styles.container}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop : '60px' }}>
        <Link to="/mycart" style={{ fontSize:'25px' , color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize:  '25px', color: "green", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: '25px', color: "green", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
      </div>
      <div style={styles.content}>
        <img src={successful} alt="Animated GIF" style={{width : x > 800 ? null : "100%", paddingBottom : "50px"}}/>
        <h2 style={{ position: "relative", bottom: "130px"}}>Payment Successful!</h2>
        <Link style={{ position: "relative", bottom: "115px", fontSize: "22px", textDecoration: "none" }} to="/myorders">See Your Orders...</Link>
      </div>
    </div>
  );
};



export default Success;

