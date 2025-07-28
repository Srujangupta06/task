const { pool } = require('../config/db');

const registerEmployer = async (req, res) => {
    try {
        const { company_name, company_email, meeting_link, contact_name, contact_mobile, zip_code, openings, technologies, contact_email } = req.body;
        
        const insertQuery = `INSERT INTO employer (company_name, company_email, meeting_link, contact_name, contact_mobile, zip_code, openings, technologies ,contact_email) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`

        await pool.promise().query(insertQuery, [company_name, company_email, meeting_link, contact_name, contact_mobile, zip_code, openings, technologies, contact_email]);

        return res.status(200).json({
            statusCode: 200,
            message: 'employer registration successful'
        })

    }
    catch (e) {
        console.error('ERROR JOB SEEKER REGISTRATION:', e.message);
        return res.status(400).json({
            statusCode: 400,
            message: e.message || 'Something went wrong'
        });


    }
}

module.exports = { registerEmployer }