import React, {useState} from 'react';
import './App.css';

function SearchBar({onSearch,callback}){
    const [request,setRequest]= useState('');
    const [history,setHistory]=useState([]);
    //Creating an event listener to see if enter is pressed, and if it is i want to run handleSearch
    const enter = document.getElementsByClassName('searchBar')

    function handleKeyDown(event){
        if(event.key === 'Enter'){
            handleSearch();
        }
    }
    function handleInputChange(event){
        setRequest(event.target.value);
    }
    function handleSearch(){
        setHistory(prev => [...prev, request]);
        setRequest('');
        onSearch(request);
    }
    return(
        <div className="searchBar">      
            <input 
            type="text"
            value={request}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."/>
            <button className="search-button" type="submit" onClick={handleSearch}>
                <i className="fas fa-search"></i>
            </button>

        </div>
    )
}
export default SearchBar;