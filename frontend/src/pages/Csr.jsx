import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./csr.css";
import axios from "axios";

const Csr = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImgIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const prevImage = () =>
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const fetchCsrImages = async () => {
      try {
        const res = await axios.get(
          "https://api.sofiasurgicals.com/api/get-all-csr"
        );
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching CSR images:", error);
        alert("An error occurred while fetching CSR data.");
      }
    };

    fetchCsrImages();
  }, []);

  return (
    <div className="csr-page">
      {/* Hero Section */}
     
   <div className="csr-hero d-flex align-items-center text-white text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold text-dark">CSR</h1>
                    <p className="lead text-dark">Our Corporate Social Responsibility & Community Commitment</p>
                </div>
            </div>
            <hr />

            {/* CSR Cards Section */}
            <div className="container comitment">
                <h2 className="text-center section-title">Our Commitment</h2>
                <p>At Sofia Surgical, our Corporate Social Responsibility (CSR) efforts are rooted in a deep commitment to healthcare access, social welfare, and community development. As a company that manufactures and exports orthopedic implants and surgical instruments, we recognize our responsibility not only to patients but to society at large.
                </p>
            </div>
      <hr />

      {/* Gallery */}
      <div className="csr-gallery py-5">
        <div className="container text-center">
          <h2 className="section-title mb-4">CSR in Action</h2>
          <div className="row g-3">
            {images.map((item, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div
                  className="gallery-img rounded overflow-hidden cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={`https://api.sofiasurgicals.com/${item.image}`}
                    alt={`CSR activity ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          onClick={closeModal}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px", width: "90%" }}
          >
            <div
              className="modal-content position-relative"
              style={{
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  color: "#333",
                  fontSize: "24px",
                  fontWeight: "bold",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>

              {/* Image */}
              <div
                className="modal-body text-center p-3"
                style={{
                  borderBottomLeftRadius: "12px",
                  borderBottomRightRadius: "12px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <img
                  src={`https://api.sofiasurgicals.com/${images[currentImgIndex]?.image}`}
                  alt="CSR preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              </div>

              {/* Previous Button */}
              <button
                onClick={prevImage}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "#ffffff",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  padding: "10px 14px",
                  fontSize: "18px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                &lt;
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "#ffffff",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  padding: "10px 14px",
                  fontSize: "18px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Csr;
