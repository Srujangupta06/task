const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // PATH FOR FILE UPLOADS
  },
  filename: function (req, file, cb) {
    const name = req.body?.fullname?.toLowerCase() || 'user'; 
    const ext = path.extname(file.originalname); 
    const uniqueSuffix = Date.now(); 
    const filename = `${name}-job-seeker-resume-${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

// ALLOWED FILE FORMAT FOR FILE UPLOADING
const allowedMimeTypes = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
}


const upload = multer({
  storage, limits: {
    fileSize: 20 * 1024 * 1024    // Upto 20MB
  }
});

module.exports = upload;
