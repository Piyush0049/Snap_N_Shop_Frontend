import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
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

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    bottom: 0,
    height: 'auto',
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row' ,
    justifyContent: x >= 768 ? 'space-around' : 'center',
    alignItems: 'center' 
  };
  

  const headingStyle = {
    fontSize: '15px',
  };

  const paragraphStyle = {
    width: '220px',
    fontSize: '15px' 
  };

  const hrStyle = {
    margin: '20px 0',
  };

  const copyrightContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={{ width: "100%" }}>
      <footer style={footerStyle}>
        <div style={containerStyle}>
          {x >= 768 && (
            <div>
              <h3 style={headingStyle}>About Us</h3>
              <p style={paragraphStyle}>
                "Snap & Shop" revolutionizes online shopping by integrating cutting-edge image recognition technology.
              </p>
            </div>
          )}
          <div>
            <h3 style={headingStyle}>Contact Us</h3>
            <p style={paragraphStyle}>Email: S&S@gmail.com</p>
            <p style={paragraphStyle}>Phone: +94857XXXXX</p>
          </div>
          {x >= 768 && (
            <div>
              <h3 style={headingStyle}>Follow Us</h3>
              <Link to="/" className="nav-link active mt-2" aria-current="page" style={paragraphStyle}>
                Facebook
              </Link>
              <Link to="/" className="nav-link active mt-2" aria-current="page" style={paragraphStyle}>
                Twitter
              </Link>
              <Link to="/" className="nav-link active mt-2" aria-current="page" style={paragraphStyle}>
                Instagram
              </Link>
            </div>
          )}
        </div>
        <hr style={hrStyle} />
        <div style={copyrightContainerStyle}>
          <p style={paragraphStyle}>&copy; 2024 Snap & Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
