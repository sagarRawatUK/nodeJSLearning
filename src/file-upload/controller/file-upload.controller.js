const router = require('express').Router()
const fs = require('fs');
const path = require('path');



exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to upload file.' });
    }
}
