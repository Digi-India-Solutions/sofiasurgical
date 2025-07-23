import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCSRImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch existing CSR image by ID
    const fetchCSR = async () => {
        try {
            const response = await axios.get(`https://api.sofiasurgicals.com/api/get-csr-by-id/${id}`);
            if (response.data?.image) {
                setPreview(`https://api.sofiasurgicals.com/${response.data.image}`);
            }
        } catch (error) {
            toast.error("Failed to load CSR image.");
        }
    };

    useEffect(() => {
        fetchCSR();
    }, [id]);

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type.split('/')[0];
            if (fileType !== 'image') {
                toast.error('Only image files are allowed.');
                setFile(null);
                setPreview(null);
                return;
            }

            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
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
            const response = await axios.put(
                `https://api.sofiasurgicals.com/api/update-csr/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            toast.success('CSR image updated successfully!');
            navigate('/all-csr');
        } catch (error) {
            console.error('Error updating image:', error);
            toast.error(
                error.response?.data?.message ||
                'Failed to update CSR image. Please try again.'
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
                    <h4>Edit CSR Image</h4>
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
                            Upload New CSR Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <div className="col-md-6">
                            <label className="form-label">Preview</label>
                            <div>
                                <img
                                    src={preview}
                                    alt="CSR Preview"
                                    style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ccc' }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? 'Updating...' : 'Update Image'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCSRImage;
