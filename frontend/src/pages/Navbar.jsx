import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSearch,
  FaWhatsapp,
  FaYoutube,
  FaGoogle
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/sofiaalogo.png";
import { IoCallOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/OurProduct?search=${searchQuery}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const loadGoogleTranslate = () => {
      const initializeGoogleTranslate = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };

      if (window.google && window.google.translate) {
        initializeGoogleTranslate();
      } else {
        const interval = setInterval(() => {
          if (window.google && window.google.translate) {
            initializeGoogleTranslate();
            clearInterval(interval);
          }
        }, 100);
      }
    };

    // Defer the initialization of Google Translate widget
    const timeoutId = setTimeout(() => {
      loadGoogleTranslate();
    }, 10); // 2 seconds delay

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, []);

  const isActive = (path) => {
    const currentPath = window.location.pathname;

    // Check if the path matches exactly for Home
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };


  return (
    <>
      <section className={`headerSection pt-2 ${isSticky ? "hide-row" : ""}`}>
        <div className="container">
          <div style={{ alignItems: "center" }} className="row top-row">
            <div className="col-12 col-md-4 text-center text-md-start mb-2 mb-md-0 p-0">
              <div className="d-flex justify-content-center justify-content-md-around align-items-center">
                <div className="logoIcon">
                  <Link
                    target="_blank"
                    to="https://www.facebook.com/indra.chauhan.18?mibextid=LQQJ4d"
                  >
                    <FaFacebook size={15} className="icon m-1" />
                  </Link>
                  <Link target="_blank" to="https://wa.me/919015555501">
                    <FaWhatsapp size={15} className="icon m-1" />
                  </Link>
                  <Link
                    target="_blank"
                    to="https://www.linkedin.com/in/sofia-surgicals-pvt-ltd-231310126?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  >
                    <FaLinkedin size={15} className="icon m-1" />
                  </Link>
                  <Link
                    target="_blank"
                    to="https://www.instagram.com/sofia_surgicals/profilecard/?igsh=ZHF1am5xeHFjYmY2"
                  >
                    <FaInstagram size={15} className="icon m-1" />
                  </Link>
                  <Link target="_blank" to="https://x.com/sofiasurgicals?s=11">
                    <BsTwitterX size={15} className="icon m-1" />
                  </Link>
                  <Link
                    target="_blank"
                    to="https://youtube.com/@sofiasurgicals4790?si=QhwQt4xWsRBh6VF4"
                  >
                    <FaYoutube size={15} className="icon m-1" />
                  </Link>
                  <Link
                    target="_blank"
                    to="https://g.co/kgs/6dqMdyG"
                  >
                    <FaGoogle size={15} className="icon m-1" />
                  </Link>
                </div>
                <Link className="cl"
                  to="tel:+919015555501"
                  onClick={closeNavbar}
                >
                  <IoCallOutline className="fs-5" /> +91-9015555501
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-8 p-0 text-center text-md-end">
              <div className="actions">
                <div className="search-box mb-md-0">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="search-box mb-2 mb-md-0"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="search-input"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button className="search-btn">
                      <FaSearch />
                    </button>
                  </form>
                </div>
                <div className="cursor-pointer" id="google_translate_element" />
                <Link to="GetdealerShip">
                  <button className="cta-button mb-2 mb-md-0">
                    <b>Get Dealership</b>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <nav className={`navbar navbar-expand-lg ${isSticky ? "sticky" : ""}`}>
          <div className="container container-section">
            <Link className="navbar-brand" to="/" onClick={closeNavbar}>
              <img src={logo} alt="logo" className="logoImg" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggle}
              aria-controls="navbarSupportedContent"
              aria-expanded={navbarOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/") ? "active" : ""}`}
                    to="/"
                    onClick={closeNavbar}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/About-us") ? "active" : ""}`}
                    to="/About-us"
                    onClick={closeNavbar}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/why-us") ? "active" : ""}`}
                    to="/why-us"
                    onClick={closeNavbar}
                  >
                    Why Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/OurProduct") || isActive("/Implants") || isActive("/Instruments") ? "active" : ""}`}
                    to="/OurProduct"
                    onClick={closeNavbar}
                  >
                    Products
                  </Link>

                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/Certificates") ? "active" : ""}`}
                    to="/Certificates"
                    onClick={closeNavbar}
                  >
                    Certificates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/Catalog") ? "active" : ""}`}
                    to="/Catalog"
                    onClick={closeNavbar}
                  >
                    Catalogue
                  </Link>
                </li>
                <li>
                  <Link style={{ textDecoration: 'none', color: 'var(--bs-nav-link-color)' }} to="GetdealerShip" onClick={closeNavbar}>
                    <span className="cta-button-responsive mb-2 mb-md-0">
                      Get Dealership
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/Contact-us") ? "active" : ""}`}
                    to="/Contact-us"
                    onClick={closeNavbar}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/csr") ? "active" : ""}`}
                    to="/csr"
                    onClick={closeNavbar}
                  >
                    CSR
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="tel:+919015555501"
                    onClick={closeNavbar}
                  >
                    <IoCallOutline className="fs-4" /> +91-9015555501
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
