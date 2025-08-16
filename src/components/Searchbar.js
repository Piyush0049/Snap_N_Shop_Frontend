import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
    
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleSearchInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    const [hoveri, setHoveri] = useState(false);

    const ButtonHoverStyle = {
        backgroundColor: '#7ED5F9',
        color: 'black',
    };
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Adjust to column layout
            maxWidth: "35%",
            margin: 'auto',
            position: 'relative',
            top: '350px',
        },
        
        input: {
            flex: '1',
            padding:'12px' ,
            fontSize:'18px',
            border: '2px solid #ccc',
            borderRadius: '20px',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        button: {
            padding: '12px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius:'20px',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background-color 0.3s',
        },
    };
    return (
        <div style={{ backgroundImage: `url(/img/snapedit_1709804086088.jpeg)`, backgroundSize: 'cover', minHeight: '800px' ,// Adjusted height based on window width

        width : "100%"}}>
            <div style={styles.container}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleSearchInputChange}
                    placeholder="Search..."
                    style={styles.input}
                />
                <button
                    onClick={handleSearch}
                    style={{ ...styles.button, ...(hoveri ? ButtonHoverStyle : null) }}
                    onMouseEnter={() => setHoveri(true)}
                    onMouseLeave={() => setHoveri(false)}
                >
                    Search
                </button>
            </div>
        </div>
    );
};



export default SearchBar;
