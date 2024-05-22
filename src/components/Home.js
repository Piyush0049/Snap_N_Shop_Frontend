import React, { useEffect, useState } from 'react';
import backgroundImage from './background-5.jpeg';
import ProductItem from './ProductItem';
import { allproducts } from './actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
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
        dispatch(allproducts());
    }, [dispatch]);

    const { products } = useSelector((state) => state.products);

    return (
        <>
            <div style={{
                minHeight: '850px',
                height: "100%",
                width: "100%",
                overflowX: 'hidden',
                zIndex: -1,
                position: 'relative',
                backgroundColor: "#7CE2F0",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src={backgroundImage} alt="Background" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.4,
                    position: 'absolute', // Position image absolutely to be behind the text
                    top: 0,
                    left: 0,
                    zIndex: -1, // Ensure image is behind other content
                    clipPath: 'polygon(70% 0, 100% 65%, 30% 100%, 0 38%)'
                }} />
                <div style={{
                    color: 'white',
                    textAlign: 'center',
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute', // Position absolutely to center within parent
                    top: '50%',
                    left: '50%',
                }}>
                    <h1 style={{
                        fontFamily: "fantasy",
                        fontSize: x > 536 ? '50px' : "30px",
                        whiteSpace: 'nowrap'
                    }}>
                        SNAP & SHOP!
                    </h1>
                    <h1 style={{
                        fontFamily: "fantasy",
                        fontSize: x > 536 ? '35px' : "22px",
                        marginTop: "30px",
                        whiteSpace: 'nowrap'
                    }}>
                        ORDER WITH A "SNAP"
                    </h1>
                </div>
            </div>
            <div style={{
                minHeight: '1000px',
                height: "auto",
                width: "100%",
                overflowX: 'hidden',
                zIndex: 2,
                position: 'relative',
                backgroundColor: "#87E6F9"
            }}>
                <h3 style={{
                    fontFamily: "revert",
                    position: "absolute",
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: "black",
                    textAlign: "center",
                    fontSize: x > 536 ? '50px' : "35px",
                    marginTop: '80px',
                    whiteSpace: 'nowrap'
                }}>
                    Featured Products :
                </h3>
                <hr style={{
                    position: "relative",
                    top: "140px",
                    borderWidth: "2px",
                    opacity: 0.9,
                    marginLeft: "35%",
                    marginRight: "35%"
                }} />
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    width: '90%',
                    marginTop: x > 536 ? '220px' : "150px"
                }}>
                    {products.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
