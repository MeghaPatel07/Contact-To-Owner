import React, { useEffect, useState } from "react";

import img111 from "../assets/images/log1.png";
import Sidecart from "./Sidecart"; 
import MobileSidecart from "./MobileSidecart";
import profile from "../assets/images/profile.png";

import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({Color}) => {
  const authToken = localStorage.getItem('authtoken');
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('authtoken');
   
   navigate('/login');
  };
  const handleToggleSidebar = () => {
    if (toggleSidebar == true) {
      setToggleSidebar(false);
    } else {
      setToggleSidebar(true);
    }
  };

  const [backgroundColor, setBackgroundColor] = useState("none");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll percentage
      const scrollPercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;

      // Change the background color based on the scroll percentage
      // You can adjust the conditions and colors according to your preference
      if (scrollPercentage < 2) {
        setBackgroundColor("none");
      } else {
        setBackgroundColor("white");
      }
    };

    // Add a scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleMobSidebar = () => {
    if (mobileSidebar) {
      setMobileSidebar(false);
    } else {
      setMobileSidebar(true);
    }
  };

  return (
    <div>
      {mobileSidebar ? (
        <MobileSidecart handleToggleMobSidebar={handleToggleMobSidebar} />
      ) : (
        ""
      )}
      {toggleSidebar ? (
        <Sidecart handleToggleSidebar={handleToggleSidebar} />
      ) : (
        ""
      )}
      <header className="main-header header-style-two header-style-14">
        {/* header-lower */}
        <div
          className="header-lower"
          style={{
            position: "fixed",
            zIndex: "999",
            display: "flex",
            backgroundColor: `${
              backgroundColor === "none" ? Color : "white"
            }`,
            transition: "background-color 0.5s ease",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="outer-container" style={{ width: "100%" }}>
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={img111} alt="" />
                  </Link>
                </figure>
              </div>
              <div className="menu-area clearfix">
                {/*Mobile Navigation Toggler*/}
                <div
                  className="mobile-nav-toggler"
                  style={{ left: "70px" }}
                  onClick={handleToggleMobSidebar}
                >
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                </div>
                <nav className="main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix home-menu">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      <li>
                        <a href="/get-your-qr-code">Get Your QRCode</a>
                      </li>
                      <li>
                        <a href="/why-use">Why Us</a>
                      </li>
                      <li>
                        <a href="/pricing">Pricing</a>
                      </li>
                      <li>
                        <a href="/contactus">Contact</a>
                      </li>
                      {authToken ? (
    // If authToken exists in local storage, render the logout button
    <>
        <li>
            <a href="/login" style={{ paddingLeft: '15px' }} className="play-store p_relative d_iblock fs_15 fw_sbold font_family_poppins white_color">
                <img src={profile} alt="" width="24px" height="24px" style={{ position: 'relative', right: '10px' }} />
            </a>
        </li>
        <li>
        {/* <Link  onClick={handleLogout}>Logout</Link> */}
            <a onClick={handleLogout} className="play-store p_relative d_iblock fs_15 fw_sbold font_family_poppins white_color">Log Out</a>
        </li>
    </>
) : null}

                      

                      
                     
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="nav-right">
                <div className="nav-btn nav-toggler navSidebar-button clearfix">
                  <i
                    className="icon-22"
                    onClick={handleToggleSidebar}
                    style={{
                      color: `${backgroundColor === "none" ? "white" : "#fec20e"}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*sticky Header*/}
        <div className="sticky-header">
          <div className="outer-container">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={img111} alt="" style={{ width: "30%" }} />
                  </Link>
                </figure>
              </div>
              <div className="menu-area clearfix">
                <nav className="main-menu clearfix">
                  {/*Keep This Empty / Menu will come through Javascript*/}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu  */}
      <div className="mobile-menu">
        <div className="menu-backdrop" />
        <div
          className="close-btn"
          data-toggle="mobile-menu"
          data-target="menu-box"
        >
          <i className="fas fa-times" />
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <a href="#home">
              <img src="assets/images/log1.png" alt="" title width="50%" />
            </a>
          </div>
          <div className="menu-outer">
            {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
            <h3>hello</h3>
            <h3>hello</h3>
            <h3>hello</h3>
            <h3>hello</h3>
            <h3>hello</h3>
          </div>
          <div className="contact-info">
            <h4>Contact Info</h4>
            <ul>
              <li>214-SAFFRON COMPLEX,
FATEHGUNJ,
VADODARA - 390002</li>
              <li>
                <a href="tel:8881-636363">+91 8881-636363</a>
              </li>
              <li>
              <a href="mailto:Support@contacttoowner.com">Support@contacttoowner.com</a>
              </li>
            </ul>
          </div>
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <a href="#home">
                  <span className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#home">
                  <span className="fab fa-facebook-square" />
                </a>
              </li>
              <li>
                <a href="#home">
                  <span className="fab fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="#home">
                  <span className="fab fa-instagram" />
                </a>
              </li>
              <li>
                <a href="#home">
                  <span className="fab fa-youtube" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* End Mobile Menu */}
    </div>
  );
};

export default Navbar;
