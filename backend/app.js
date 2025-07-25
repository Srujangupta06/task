const express = require('express');
const { initializeDB, pool } = require('./config/db');
require('dotenv').config();
const upload = require('./config/multer');
const validateData = require('./validations/validations');
const cors = require('cors');
const app = express();

// PORT DECLARATION
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET']
}))

// END POINTS

app.post('/api/job-seeker/registration', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, role, state, city, email, mobile } = req.body;

        // VALIDATE INPUT 
        validateData({ fullName, role, state, city, email, mobile });

        // INSERT INTO DB using parameterized query
        const insertQuery = `
            INSERT INTO jobseeker (full_name, email, role, mobile, state, city)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await pool.promise().query(insertQuery, [fullName, email, role, mobile, state, city]);

        return res.status(200).json({
            statusCode: 200,
            message: 'Job Seeker Registration Successful'
        });

    } catch (e) {
        console.error('ERROR JOB SEEKER REGISTRATION:', e.message);
        return res.status(400).json({
            statusCode: 400,
            message: e.message || 'Something went wrong'
        });
    }
});


// SERVER INITIALIZATION
const initializeDBAndServer = async () => {
    try {
        await initializeDB();
        app.listen(PORT, () => console.log(`Server listening at PORT:${PORT}`));
    } catch (e) {
        console.log('FAILED TO START SERVER: ', e.message);
        process.exit(1);
    }
};
initializeDBAndServer()