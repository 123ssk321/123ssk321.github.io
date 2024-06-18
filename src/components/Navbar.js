import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar({ toggleTheme, darkTheme }) {
  const handleNavItemClick = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#brand'>
          My Portfolio
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='#hero' onClick={handleNavItemClick}>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#about'
                onClick={handleNavItemClick}
              >
                About
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#projects'
                onClick={handleNavItemClick}
              >
                Projects
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#extracurricular'
                onClick={handleNavItemClick}
              >
                Extracurricular
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#contact'
                onClick={handleNavItemClick}
              >
                Contact
              </a>
            </li>
            <li className='nav-item'>
              <button
                className='btn btn-outline-secondary'
                onClick={toggleTheme}
              >
                {darkTheme ? 'Light Theme' : 'Dark Theme'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
