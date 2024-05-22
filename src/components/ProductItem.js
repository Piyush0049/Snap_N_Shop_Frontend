import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProductItem({ product, innerWidth }) {
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
  const cardStyle = {
    borderRadius: '10px',
    transition: 'transform 0.3s',
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: "50px",
  };

  const hoverStyle = {
    transform: 'scale(1.05) translateY(-5px)',
    boxShadow: '8px 16px 16px rgba(0, 0, 0, 0.2)',
    cursor: "pointer"
  };

  const ratings = {
    edit: false,
    size: 19,
    isHalf: true,
    value: product.averageRating,
    activeColor: '#ffd700',
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fas fa-star-half-alt" />,
    filledIcon: <i className="fas fa-star" />,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const priceButtonStyle = {
    backgroundColor: '#5ABCE6',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid white',
    fontSize: "20px"
  };

  const priceButtonHoverStyle = {
    backgroundColor: '#62C4C6',
    color: 'black',
    border: '1px solid white'
  };

  const rev = `...Reviews(${product.numberofrev})`;

  const price = `₹${product.price}`;

  const navigate = useNavigate();

  const handleCardClick = () => {
    scrollToTop();
    navigate(`/product/${product._id}`);
  };

  // Initialize hover state using useState hook
  const [hover, setHover] = useState(false);
  const [bodyhover, setbodyHover] = useState(false);

  return (
    <div style={{ marginBottom: '50px', marginLeft: '100px', position: 'relative', marginTop: "70px" }}>
      <div className="card" onClick={handleCardClick} style={{ ...cardStyle, transition: 'transform 0.3s', ...(bodyhover ? hoverStyle : null) }} onMouseEnter={() => setbodyHover(true)}
        onMouseLeave={() => setbodyHover(false)} >
        <img
          src={product.images[0].url}
          className="card-img-top"
          alt="..."
          style={{ backgroundColor: '#B3F7F8', height: x > 571 ? "300px" : "220px" }}
        />

        <div className="card-body" style={{ backgroundColor: '#62C4C6', borderRadius: '10px', height: x > 571 ? null : "180px"  }}>
          <h5 className="card-title" style={{ fontSize: x > 571 ? '25px' : "20px" }}>{product.name}</h5>  {/* Adjust font size for smaller screens */}
          <p className="card-text" style={{ fontSize: x > 571 ? '20px' : "17px", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</p>
          <Link to={`/product/${product._id}`}>
            <h6 style={{ color: 'black', marginBottom: '2px' }}>
              <span
                style={{ ...priceButtonStyle, ...(hover ? priceButtonHoverStyle : null) }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {price}
              </span>
            </h6>
          </Link>
          <span style={{ position: "relative", left: "45%", bottom : "30px", fontFamily: "monospace", fontSize: x > 571 ? '19px' : "13px" }}>{rev}</span>
          {/* Adjust font size for reviews */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5%', fontSize: x > 571 ? "40px" : "30px" }}>
            <ReactStars {...ratings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

