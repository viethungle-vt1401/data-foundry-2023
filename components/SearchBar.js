import React, {useState} from "react";
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css";


export const SearchBar = () =>{
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        /* asynchronousetch(`/api/data-foundry/?search_string=${value}`) /*1446*/

    }
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
    <div className="input-wrapper">
    <FaSearch id="search-icon"/>
    <input
     placeholder = "Type here to search" 
     value={input} onChange = {(e) => handleChange(e.target.value)}/> 
    </div>
    );
};
  