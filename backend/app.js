const express = require('express');
const { initializeDB } = require('./config/db');
require('dotenv').config();

const cors = require('cors');
const jobseekerRoutes = require('./routes/jobseeker.routes')
const employerRoutes = require('./routes/employer.routes')
const app = express();

// PORT DECLARATION
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/job-seeker', jobseekerRoutes)       // JOB SEEKER ROUTES
app.use('/api/employer', employerRoutes)     // EMPLOYER ROUTES

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET']
}))

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
initializeDBAndServer();

