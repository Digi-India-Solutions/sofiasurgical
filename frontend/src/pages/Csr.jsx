import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './csr.css';

const Csr = () => {
    const images = [
        'https://source.unsplash.com/800x600/?health,care,people&sig=1',
        'https://source.unsplash.com/800x600/?medical,volunteer,people&sig=2',
        'https://source.unsplash.com/800x600/?doctor,children&sig=3',
        'https://source.unsplash.com/800x600/?clinic,hospital&sig=4'
    ];

    const [showModal, setShowModal] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const openModal = (index) => {
        setCurrentImgIndex(index);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);
    const prevImage = () => setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextImage = () => setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

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

            {/* Gallery */}
            <div className="csr-gallery py-5">
                <div className="container text-center">
                    <h2 className="section-title mb-4">CSR in Action</h2>
                    <div className="row g-3">
                        {images.map((src, index) => (
                            <div className="col-6 col-md-3  cursor-pointer" key={index}>
                                <div className="gallery-img rounded overflow-hidden cursor-pointer" onClick={() => openModal(index)}>
                                    <img src={src} alt={`CSR activity ${index + 1}`} className="img-fluid" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for image preview */}
            {showModal && (
                <div className="modal show fade d-block csr-modal-bg" tabIndex="-1" onClick={closeModal}>
                    <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content bg-dark text-white position-relative">
                            <button type="button" className="btn-close btn-close-white position-absolute end-0 m-3" onClick={closeModal}></button>
                            <div className="modal-body text-center">
                                <img src={images[currentImgIndex]} alt="Popup" className="img-fluid rounded" />
                            </div>
                            <button className="btn btn-outline-light position-absolute top-50 start-0 translate-middle-y" onClick={prevImage}>&lt;</button>
                            <button className="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y" onClick={nextImage}>&gt;</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Csr;
