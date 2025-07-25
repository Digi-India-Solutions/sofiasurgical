
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import OurProduct from './pages/OurProduct.jsx';
import Implants from './pages/Implants.jsx';
import Instruments from './pages/Instruments.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Certificates from './pages/Certificates.jsx';
import GetdealerShip from './components/GetdealerShip.jsx';
import Catalog from './pages/Catalog.jsx';
import Thumbnail from './pages/Thumbnail.jsx';
import Socialicons from './components/Socialicon.jsx';
import InstrumentProduct from './pages/InstrumentProduct.jsx';
import CareerPage from './pages/CareerPage.jsx';
import REviews from './pages/REviews.jsx';
import FAQ from './pages/FAQ.jsx';
import { useEffect } from 'react';
import Csr from './pages/Csr.jsx';
import WhyUs from './pages/WhyUs.jsx';
import Blog from './pages/Blog.jsx';
function App() {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", disableRightClick);

    // Disable specific keyboard shortcuts
    const disableShortcuts = (e) => {
      if (
        e.ctrlKey && (e.key === "u" || e.key === "U") || // View Source
        e.ctrlKey && (e.key === "s" || e.key === "S") || // Save
        e.key === "F12" || // DevTools
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) || // Inspect
        (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) // Copy / Inspect
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", disableShortcuts);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About-us" element={<About />} />
          <Route path="/Ourproduct" element={<OurProduct />} />
          <Route path="/Implants/:categoryName" element={<Implants />} />
          <Route path="/Instruments/:categoryName" element={<Instruments />} />
          <Route path="/inplants-details/:name" element={<Thumbnail />} />
          <Route path="/instrument-details/:name" element={<InstrumentProduct />} />
          <Route path="/GetdealerShip" element={<GetdealerShip />} />
          <Route path="/Certificates" element={<Certificates />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Contact-us" element={<ContactUs />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/write-review" element={<REviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/csr" element={<Csr />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/blogs" element={<Blog />} />
        </Routes>
        <Socialicons />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
