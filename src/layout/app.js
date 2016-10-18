import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import "./common";

const App = ({ children }) =>
  <div>
      <div className="logo">
        Coffee Shop
      </div>
      <header>
        <Link className="nav-item" to="/addOrder">Add Order</Link>
        <Link className="nav-item" to="/orders">Orders</Link>
        <Link className="nav-item" to="/menu">Menu</Link>
        <Link className="nav-item" to="/addMenuItem">Add Menu Item</Link>
      </header>
      { children }
      <footer>
          <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item" to="/menu">Menu</Link>
      </footer>
  </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
