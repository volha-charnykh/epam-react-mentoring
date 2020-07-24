import React from 'react';
import './App.css';
import List from "./list";
import Icon from "./icon";
import logo from './logo.svg';

const header = React.createElement(
    'h1',
    { className: 'header_title'},
    'Hello React!'
);

function App() {
    return (
        <div className="App">
            { header }
            <Icon logo={logo}/>
            <List title={"List header"} items={['a', 'b', 'c', 'd']}/>
        </div>
    );
}

export default App;
