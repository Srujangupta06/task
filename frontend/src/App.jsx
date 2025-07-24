import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5";
import Modal from "./components/Modal";
import axios from 'axios'
import { fetchStatesByCountryId } from "./services/api";
function App() {
  const [isModalOpen, setModal] = useState(true);
  const [userType, setUserType] = useState('jobseeker');

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

  const [statesList, setStatesList] = useState([]);


  const fetchStates = async () => {
    const data = await fetchStatesByCountryId()
    setStatesList(data?.data?.data)
  }
  useEffect(() => {
    fetchStates()
  }, [])

  const onHandleRegistration = () => {
    setModal(true)
  }

  const onModalClose = () => {
    setModal(false)
  }

  const onHandleUserType = (e) => {
    setUserType(e.target.value)
  }

  const onHandleFormSubmit = (e) => {
    e.preventDefault()

    let data = null;
    if (userType === "jobseeker") {
      // Job Seeker data
      data = {
        fullName: name,
        mobileNumber,
        email,
        role,
        state, city
      }
    }
    else {
      // Employer data
      data = {
        companyName,
        contactName: name,
        mobileNumber,
        contactEmail: email,
        companyUrl,
        openings,
        postalCode,
        meetingLink,
        description,
        state, city
      }
    }
    console.log(data)

  }


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold  py-6">Welcome to Our App</h1>
      <button className="bg-blue-400 px-6 py-1 text-white rounded-sm cursor-pointer hover:bg-blue-500" onClick={onHandleRegistration}>Register Now</button>
      {/*Modal */}
      {isModalOpen && <Modal>
        <div className="bg-blue-500 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Job Fair Registration</h2>
          <IoClose className="text-white text-lg cursor-pointer" onClick={onModalClose} />
        </div>
        {/*Registration Form */}
        <p className="mt-4 px-4">Register As</p>
        <form className="p-4 w-full" onSubmit={onHandleFormSubmit} >
          <div className="flex gap-x-8">
            {/*Job Seeker */}
            <div>
              <input type="radio" name="user" className="mr-1" id="jobseeker" defaultChecked value="jobseeker" onChange={onHandleUserType} />
              <label htmlFor="jobseeker">Jobseeker</label>
            </div>
            {/* Employer */}
            <div>
              <input type="radio" name="user" className="mr-1" id="employer" value="employer" onChange={onHandleUserType} />
              <label htmlFor="employer">Employer</label>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-x-8 mt-4">
              {userType !== "jobseeker" && <div className="my-2 w-[45%]">
                <input type="text" required placeholder="Company Name" className="border border-gray-300 p-1 outline-none w-full" onChange={(e) => setCompanyName(e.target.value)} value={companyName} />
              </div>}
              <div className="my-2 w-[45%]">
                <input type="text" required placeholder={userType === "jobseeker" ? "Full Name" : "Contact Name"} className="border border-gray-300 p-1 outline-none w-full" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              {userType !== "jobseeker" && <div className="my-2 w-[45%]">
                <input type="" required placeholder="www.company.com" className="border border-gray-300 p-1 outline-none w-full" value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} />
              </div>}
              <div className="my-2 w-[45%]">
                <input type="email" required placeholder={userType !== "employer" ? "Email" : "Contact Email"} className="border border-gray-300 p-1 outline-none w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="my-2 w-[45%]">
                <input type="tel" required placeholder="Mobile Number" className="border border-gray-300 p-1 outline-none w-full" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              {userType === 'jobseeker' && <div className="my-2 w-[45%]">
                <input type="text" required placeholder="ex: JS Developer" className="border border-gray-300 p-1 outline-none w-full" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>}
              {userType !== "jobseeker" && <div className="my-2 w-[45%]">
                <input type="text" required placeholder="Meeting Link" className="border border-gray-300 p-1 outline-none w-full" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
              </div>}
              <div className="my-2 w-[45%]">
                <select className="border border-gray-300 p-1 outline-none w-full" value={state} onChange={(e) => setState(e.target.value)}>
                  <option>Select State</option>
                  {
                    statesList.map((eachState) => (
                      <option key={eachState.id}>{eachState.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="my-2 w-[45%]">
                <select className="border border-gray-300 p-1 outline-none w-full" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Select City</option>
                </select>
              </div>
              {userType !== "jobseeker" && <div className="my-2 w-[45%]">
                <input type="number" required placeholder="Zip code" className="border border-gray-300 p-1 outline-none w-full" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </div>}
              {userType !== "jobseeker" && <div className="my-2 w-[45%]">
                <input type="number" required placeholder="No of Openings" className="border border-gray-300 p-1 outline-none w-full" value={openings} onChange={(e) => setOpenings(e.target.value)} />
              </div>}
              {userType !== "jobseeker" && <textarea required cols="50" rows="3" className="border w-[98%] border-gray-300 my-2 outline-none px-2 py-1 resize-none" placeholder="Major Technologies looking for" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>}
              {/*Upload Resume*/}
              {userType === "jobseeker" && <div className="my-2">
                <label className="block mb-2">Upload Resume</label>
                <input type="file" id="resume" accept=".pdf,.docx,.doc" className="bg-gray-200 px-4 py-1.5 text-sm cursor-pointer" />
                <p className="text-red-700 font-semibold text-sm my-2">Note: Accept only pdf,docx</p>
              </div>}
              {/*Upload Image Files */}
              {userType !== "jobseeker" && <div className="my-2">
                <label className="block mb-2" htmlFor="image"></label>
                <input type="file" id="image" className="bg-gray-200 px-4 py-1.5 text-sm cursor-pointer" />
                <p className="font-semibold text-sm my-2">CLICK TO ADD IMAGE</p>
              </div>}

            </div>
            <button className="my-2 px-6 py-1.5 text-sm bg-amber-400 rounded-sm  cursor-pointer">Submit</button>
          </div>
        </form>
      </Modal>}
    </div >
  )
}

export default App