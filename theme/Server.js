// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// // Configure multer for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, 'dev', 'assets')); // specify 'assets' folder in 'dev' directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'profile-pic.jpg'); // set a fixed filename
//     }
// });

// const upload = multer({ storage });

// // Serve the assets folder to access images
// app.use('/assets', express.static(path.join(__dirname, 'dev', 'assets')));

// // Route to handle file upload
// app.post('/upload', upload.single('profilePic'), (req, res) => {
//     res.json({ message: 'File uploaded successfully' });
// });

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });
