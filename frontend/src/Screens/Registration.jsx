import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "../components/Modal";
import axios from "axios";
import {
  fetchCitiesBasedOnStateId,
  fetchStatesByCountryId,
} from "../services/api";
import {
  validateEmployerData,
  validateJobSeekerData,
} from "../utils/validations";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  

  const navigate = useNavigate()

  const [isModalOpen, setModal] = useState(false);
  const [userType, setUserType] = useState("jobseeker");

  // User Related
  const [name, setName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [role, setRole] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [companyUrl, setCompanyUrl] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [openings, setOpenings] = useState(null);
  const [description, setDescription] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);

  // Error Message
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch States By Country ID
  const fetchStates = async () => {
    const data = await fetchStatesByCountryId();
    setStatesList(data);
  };

  // Fetch City Names By State ID
  const fetchCities = async (stateId) => {
    const data = await fetchCitiesBasedOnStateId(stateId);
    setCitiesList(data);
  };

  useEffect(() => {
    fetchStates();
  }, []);




  // Handle Registration Modal Open
  const onHandleRegistration = () => {
    setModal(true);
  };

  // Handle Modal
  const onModalClose = () => {
    setModal(false);
  };

  // Handle User Type [Employer,JobSeeker]
  const onHandleUserType = (e) => {
    setErrorMessage(null);
    setUserType(e.target.value);
  };

  // Handle Form Submission
  const onHandleFormSubmit = async (e) => {
    e.preventDefault();

    let data = null;
    if (userType === "jobseeker") {
      // Validate the Data
      const error = validateJobSeekerData({
        name,
        email,
        mobile: mobileNumber,
        state,
        city,
        role,
      });
      setErrorMessage(error);

      // Job Seeker data
      data = new FormData();
      data.append("resume", resumeFile);
      const textData = {
        fullName: name,
        role,
        mobile: mobileNumber,
        state: stateName,
        city: cityName,
        email
      }
      // IF NO ERRORS CREATES NEW JOBSEEKER
      if (!error) {
        try {
          const response = await createJobSeeker(textData);
          if (response.status === 200) {
            await jobseekerFileUpload(data); 
          } else {
            console.error('Failed to create job seeker. Status:', response.status);
          }
        } catch (e) {
          console.error('Error during job seeker creation:', e);
        }
      }

    } else {
      // Validate Employer Data
      const error = validateEmployerData({

        name,
        email,
        mobile: mobileNumber,
        companyName,
        companyUrl,
        state,
        city,
        postalCode,
        openings,
        description,
      });
      setErrorMessage(error);
      // Employer data
      data = new FormData();
      data.append("contact_name", name);
      data.append("contact_email", email);
      data.append("company_name", companyName);
      data.append("mobile", mobileNumber);
      data.append("meeting_link", meetingLink);
      data.append("state", stateName);
      data.append("city", cityName);
      data.append("company_url", companyUrl);
      data.append("zipcode", postalCode);
      data.append("total_openings", openings);
      data.append("description", description);
    }
  };

  // JOB SEEKER REGISTRATION
  const createJobSeeker = async (data) => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL
        }/api/job-seeker/registration`;
      const response = await axios.post(apiUrl, data);
      if (response.status === 200) {
        // Empty all input fields
        setName("");
        setMobileNumber("");
        setEmail("");
        setRole("");
        setState("");
        setCity("");
        setResumeFile("");
        // navigate to /users
        navigate('/users')
      }
    } catch (e) {
      setErrorMessage(e.response.data.message ?? 'Some thing Went Wrong')
    }
  };

  const jobseekerFileUpload = async (data) => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL + '/api/job-seeker/uploads'
      const response = await axios.post(apiUrl, data);
      if (response.ok) {
        setErrorMessage('');
      }
      else {
        setErrorMessage('File Upload Failed', response.data.message)
      }
    }
    catch (e) {
      console.error('FILE UPLOAD FAILED FOR JOB-SEEKER: ', e.message)
    }
  }

  // Handle Resume Upload
  const onHandleResumeUpload = (e) => {
    setResumeFile(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl lg:text-4xl font-semibold py-6 ">Welcome to Our App</h1>
      <button
        className="bg-blue-400 px-6 py-1 text-white rounded-sm cursor-pointer hover:bg-blue-500"
        onClick={onHandleRegistration}
      >
        Register Now
      </button>
      <Link className="text-blue-500 underline mt-4" to="/users">
        Show Registered Users
      </Link>
      {/*Modal */}
      {isModalOpen && (
        <Modal>
          <div className="bg-blue-500 p-4 flex items-center justify-between rounded-t-md">
            <h2 className="text-lg font-semibold text-white">
              Job Fair Registration
            </h2>
            <IoClose
              className="text-white text-lg cursor-pointer"
              onClick={onModalClose}
            />
          </div>
          {/*Registration Form */}
          <p className="mt-4 px-4">Register As</p>
          <form className="p-4 w-full overflow-auto" onSubmit={onHandleFormSubmit}>
            <div className="flex gap-x-8">
              {/*Job Seeker */}
              <div>
                <input
                  type="radio"
                  name="user"
                  className="mr-1"
                  id="jobseeker"
                  defaultChecked
                  value="jobseeker"
                  onChange={onHandleUserType}
                />
                <label htmlFor="jobseeker">Jobseeker</label>
              </div>
              {/* Employer */}
              <div>
                <input
                  type="radio"
                  name="user"
                  className="mr-1"
                  id="employer"
                  value="employer"
                  onChange={onHandleUserType}
                />
                <label htmlFor="employer">Employer</label>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-x-8 mt-4">
                {userType !== "jobseeker" && (
                  <div className="my-2 w-[95%] md:w-[60%] lg:w-[45%]">
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      className="border border-gray-300 p-1 outline-none w-full"
                      onChange={(e) => setCompanyName(e.target.value)}
                      value={companyName}
                    />
                  </div>
                )}
                <div className="my-2 w-[95%] md:w-[45%]">
                  <input
                    type="text"
                    required
                    placeholder={
                      userType === "jobseeker" ? "Full Name" : "Contact Name"
                    }
                    className="border border-gray-300 p-1 outline-none w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {userType !== "jobseeker" && (
                  <div className="my-2 w-[95%] md:w-[45%]">
                    <input
                      type=""
                      required
                      placeholder="www.company.com"
                      className="border border-gray-300 p-1 outline-none w-full"
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                    />
                  </div>
                )}
                <div className="my-2 w-[95%] md:w-[45%]">
                  <input
                    type="email"
                    required
                    placeholder={
                      userType !== "employer" ? "Email" : "Contact Email"
                    }
                    className="border border-gray-300 p-1 outline-none w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-2 w-[95%] md:w-[45%]">
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    className="border border-gray-300 p-1 outline-none w-full"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                {userType === "jobseeker" && (
                  <div className="my-2 w-[95%] md:w-[45%]">
                    <input
                      type="text"
                      required
                      placeholder="ex: JS Developer"
                      className="border border-gray-300 p-1 outline-none w-full"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                )}
                {userType !== "jobseeker" && (
                  <div className="my-2 w-[95%] md:w-[45%]">
                    <input
                      type="text"
                      required
                      placeholder="Meeting Link"
                      className="border border-gray-300 p-1 outline-none w-full"
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                    />
                  </div>
                )}
                <div className="my-2 w-[95%] md:w-[45%]">
                  <select
                    className="border border-gray-300 p-1 outline-none w-full"
                    onChange={(e) => {
                      setState(e.target.value);
                      fetchCities(e.target.value);
                      setStateName(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="">Select State</option>
                    {statesList.map((eachState) => (
                      <option key={eachState.id} value={eachState.id}>
                        {eachState.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="my-2 w-[95%] md:w-[45%]">
                  <select
                    className="border border-gray-300 p-1 outline-none w-full"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setCityName(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="">Select City</option>
                    {citiesList.map((eachCity) => (
                      <option key={eachCity.id} value={eachCity.id}>
                        {eachCity.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                {userType !== "jobseeker" && (
                  <div className="my-2 w-[95%] md:w-[45%]">
                    <input
                      type="number"
                      required
                      placeholder="Zip code"
                      className="border border-gray-300 p-1 outline-none w-full"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                )}
                {userType !== "jobseeker" && (
                  <div className="my-2 w-[95%] md:w-[45%]">
                    <input
                      type="number"
                      required
                      placeholder="No of Openings"
                      className="border border-gray-300 p-1 outline-none w-full"
                      value={openings}
                      onChange={(e) => setOpenings(e.target.value)}
                    />
                  </div>
                )}
                {userType !== "jobseeker" && (
                  <textarea
                    required
                    cols="50"
                    rows="3"
                    className="border w-[98%] border-gray-300 my-2 outline-none px-2 py-1 resize-none"
                    placeholder="Major Technologies looking for"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                )}
                {/*Upload Resume*/}
                {userType === "jobseeker" && (
                  <div className="my-2">
                    <label className="block mb-2">Upload Resume</label>
                    <input
                      type="file"
                      id="resume"
                      className="bg-gray-100 px-4 py-1.5 text-sm cursor-pointer"
                      value={resumeFile}
                      onChange={onHandleResumeUpload}
                    />
                    <p className=" text-sm my-2">Note: Accept only pdf,docx</p>
                  </div>
                )}
                {/*Upload Image Files */}
                {userType !== "jobseeker" && (
                  <div className="my-2">
                    <label className="block mb-2" htmlFor="image"></label>
                    <input
                      type="file"
                      id="image"
                      className="bg-gray-200 px-4 py-1.5 text-sm cursor-pointer"
                    />
                    <p className="font-semibold text-sm my-2">
                      CLICK TO ADD IMAGE
                    </p>
                  </div>
                )}
              </div>
              {errorMessage && (
                <p className="text-sm font-semibold text-red-700">
                  ERROR: {errorMessage}
                </p>
              )}
              <button className="my-2 px-6 py-1.5 text-sm bg-amber-400 rounded-sm  cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Registration;
