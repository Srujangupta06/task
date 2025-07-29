const validateData = require('../validations/validations');
const { pool } = require('../config/db')

const uploadJobSeekerResumeFile = async (req, res) => {
    try {
        const file = req.file;
        
        if (!file) {
            return res.status(400).json({
                message: 'File Upload Required'
            })
        }
        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'File Upload failed', error: e.message });
    }
}

const getRegisteredJobSeekers = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const limitValue = parseInt(limit) || 10;
        const pageValue = parseInt(page) || 1;
        const offset = (pageValue - 1) * limitValue;

        const paginatedQuery = `SELECT * FROM jobseeker LIMIT ? OFFSET ?`;
        const [paginatedResults] = await pool.promise().query(paginatedQuery, [limitValue, offset]);

        const countQuery = `SELECT COUNT(*) as totalCount FROM jobseeker`;
        const [countResults] = await pool.promise().query(countQuery);
        const totalCount = countResults[0].totalCount;

        return res.json({
            data: paginatedResults,
            totalCount,
        });
    } catch (e) {
        console.error('ERROR FETCHING JOB SEEKER LIST:', e.message);
        return res.status(400).json({
            statusCode: 400,
            message: e.message || 'Something went wrong',
        });
    }
}

const registerNewJobSeeker = async (req, res) => {
    try {
        let userId;
        const { fullName, role, state, city, email, mobile } = req.body;

        // VALIDATE INPUT 
        validateData({ fullName, role, state, city, email, mobile });


        // Check whether user already registered
        const isUserExistsQuery = `SELECT*  FROM jobseeker WHERE email = ?`;
        // Using parameterized query to prevent SQL injection  
        const [isUserExist] = await pool.promise().query(isUserExistsQuery, [email])
        if (isUserExist.length === 0) {
            // INSERT INTO DB using parameterized query  
            const insertQuery = `
                INSERT INTO jobseeker (full_name, email, role, mobile, state, city)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const [result] = await pool.promise().query(insertQuery, [fullName, email, role, mobile, state, city]);
            userId = result.insertId;
        }
        else {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        return res.status(200).json({
            data: userId,
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
}

module.exports = { getRegisteredJobSeekers, registerNewJobSeeker, uploadJobSeekerResumeFile }