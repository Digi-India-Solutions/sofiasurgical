import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCSRImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type.split('/')[0];
            if (fileType !== 'image') {
                toast.error('Only image files are allowed.');
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!file) {
            toast.error('Please select an image to upload.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                'https://api.sofiasurgicals.com/api/create-csr',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast.success('CSR image uploaded successfully!');
            navigate('/all-csr');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(
                error.response?.data?.message ||
                'Failed to upload CSR image. Please check the file.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add CSR Image</h4>
                </div>
                <div className="links">
                    <Link to="/all-csr" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                            Upload CSR Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCSRImage;
