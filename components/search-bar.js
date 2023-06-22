import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"
import "../styles/search-bar.css";


export default function SearchBar() {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        console.log(value)
        fetch('/api/search/' + value, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
    }
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
    <div className="input-wrapper">
      <FaSearch id="search-icon"/>
      <input
        placeholder = "Type in Data source/ Person of Contact" 
        value={input} onChange = {(e) => handleChange(e.target.value)}/> 
      </div>
    );
};
  