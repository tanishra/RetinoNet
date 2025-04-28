import React from 'react';
import { Link } from "react-router-dom";
import '../NavBar/NavBar.css';

const NavBar = ({ navbarHidden }) => {
  return (
    <div>
      <header className={`header ${navbarHidden ? 'hidden' : ''}`}>
        <Link to="/" className="logo">RetinoNet</Link>

        <nav className='navbar'>
          <a href='#home'>Home </a>
          <a href='#about'>About</a>
          <a href="#contact">Contact</a>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
