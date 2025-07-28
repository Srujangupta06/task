# JOB FAIR USER REGISTRATION

# For frontend
    - cd frontend

    - To initialize

        - npm install

    - To start development server 

        - npm run dev

# For Backend
    - cd backend

    - To initialize

        - npm install

    - To start development server 

        - npm run dev
    
    - For Production Server

        - npm run start


# Frontend Routes

/ - Home Page for registering new Jobseeker and Employer

/users - Show a list of already registered job seeker


# API LIST
1) METHOD - GET
ENDPOINT - /api/job-seeker/list 
- For retrieving the Registered Job Seekers 

- Query : {
    limit -> default(10)
    page -> default (1)
}

2) METHOD - POST 
ENPOINT - /api/job-seeker/registration
- For Registering new JobSeeker

returns new User ID

3) METHOD - POST
ENDPOINT - /api/job-seeker/uploads
- For Jobseeker resume uploads