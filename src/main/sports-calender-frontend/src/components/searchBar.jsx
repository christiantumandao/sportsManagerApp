import React, { Component } from 'react';
import '../App.css';

class SearchBar extends Component {
    state = {  } 
    render() { 
        return (
            <div class="search-bar">
                <div class="input-group">
                    <input type="search" class="form-control rounded" placeholder="Look up events" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" class="btn btn-outline-primary">Look up events</button>
                </div>
            </div>
            
        );
    }
}
 
export default SearchBar;