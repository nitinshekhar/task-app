import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

const links = [
  { path: '/', text: 'Home', exact: true },
  { path: 'about', text: 'About' },
  { path: 'profile', text: 'Profile' },
  { path: 'login', text: 'Login' },
  { path: 'logout', text: 'logout' },
];

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (
        navbarOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [navbarOpen]);

  return (
    <>
      <nav ref={ref} className="navbar">
        <button className="toggle"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          {navbarOpen ? (
            <MdClose style={{ width: '32px', height: '32px' }} />
          ) : (
            <FiMenu style={{ width: '32px', height: '32px' }} />
          )}
        </button>

        <ul className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>
          {links.map((link) => {
            if (link.path === 'logout' && !isAuthenticated) {
              return null; //Don't show the logout link if not authenticated
            }
            
            return (
              <React.Fragment key={link.text}>
                {link.path === 'login' ? (
                  !isAuthenticated && (
                    <li>
                      <NavLink to={link.path}
                        onClick={() => setNavbarOpen(false)}
                      >
                        {link.text}
                      </NavLink>
                    </li>
                  )
                ) : (
                  <li>
                    <NavLink to={link.path}
                      onClick={() => setNavbarOpen(false)}
                    >
                      {link.text}
                    </NavLink>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
