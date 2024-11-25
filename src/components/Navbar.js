import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar">
      <Link to="/products">Products</Link>
      {isAuthenticated ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
