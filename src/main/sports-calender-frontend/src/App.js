import logo from './logo.svg';
import './App.css';

import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import Calendar from './components/display';
import SearchBar from './components/searchBar';
import Tabs from './components/tabs';
import Tab from './components/tab';
import MainBody from './components/mainBody';

  

function App() {

  return (
    <div className="App flex-container-html">
          
        <div className="flex-item-html flex-item-html-1">
        <h1>Sporting Events Manager</h1>
        </div>
        <div className="flex-item-html flex-item-html-2 flex-container-mainBody">
          <MainBody />
        </div>

    </div>
  );

  
}

export default App;
