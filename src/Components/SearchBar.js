import React, { useState } from 'react';
import '../CSS/SearchBar.css';
import {useNavigate} from "react-router-dom";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const nav = useNavigate();
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
    };

    const onSub = () => {
       return nav(`/?search=${searchTerm}`)
    };

    return (
        <div className="search-container">
            <input
                type="search"
                placeholder="What company are you looking for?"
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
            />
            <button onClick={onSub} className="search-button">Search</button>
        </div>
    );
}

export default SearchBar;