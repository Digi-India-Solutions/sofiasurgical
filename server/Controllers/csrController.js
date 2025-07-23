const fs = require('fs').promises;
const path = require('path');
const Csr = require('../Models/CsrModel');

// Helper to delete a file
const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath);
            await fs.unlink(fileToDelete);
            console.log("Deleted file:", filePath);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File not found or already deleted:", filePath);
        } else {
            console.error("Error deleting file:", err);
        }
    }
};

// Create CSR
const createCSR = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newCSR = new Csr({
            image: req.file.path,
        });

        await newCSR.save();
        res.status(201).json({ message: 'CSR image created successfully', data: newCSR });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create CSR image', error: error.message });
    }
};

// Get all CSR images
const getAllCSR = async (req, res) => {
    try {
        const csrs = await Csr.find();
        res.status(200).json(csrs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch CSR images', error: error.message });
    }
};

// Get CSR by ID
const getCSRById = async (req, res) => {
    try {
        const csr = await Csr.findById(req.params.id);
        if (!csr) {
            return res.status(404).json({ message: 'CSR image not found' });
        }
        res.status(200).json(csr);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch CSR image', error: error.message });
    }
};

// Update CSR image
const updateCSR = async (req, res) => {
    try {
        const existingCSR = await Csr.findById(req.params.id);
        if (!existingCSR) {
            return res.status(404).json({ message: 'CSR image not found' });
        }

        // Delete the old file if a new one is provided
        if (req.file) {
            await deleteFile(existingCSR.image);
        }

        const updatedCSR = await Csr.findByIdAndUpdate(
            req.params.id,
            { image: req.file ? req.file.path : existingCSR.image },
            { new: true }
        );

        res.status(200).json({ message: 'CSR image updated successfully', data: updatedCSR });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update CSR image', error: error.message });
    }
};

// Delete CSR
const deleteCSR = async (req, res) => {
    try {
        const deletedCSR = await Csr.findByIdAndDelete(req.params.id);
        if (!deletedCSR) {
            return res.status(404).json({ message: 'CSR image not found' });
        }

        await deleteFile(deletedCSR.image);
        res.status(200).json({ message: 'CSR image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete CSR image', error: error.message });
    }
};

module.exports = {
    createCSR,
    getAllCSR,
    getCSRById,
    updateCSR,
    deleteCSR,
};
