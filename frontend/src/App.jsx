import { useState } from "react"
import { IoClose } from "react-icons/io5";
function App() {
  const [isModalOpen, setModal] = useState(true);

  const onHandleRegistration = () => {
    setModal(true)
  }

  const onModalClose = ()=>{
    setModal(false)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold  py-6">Welcome to Our App</h1>
      <button className="bg-blue-400 px-6 py-1 text-white rounded-sm cursor-pointer hover:bg-blue-500" onClick={onHandleRegistration}>Register Now</button>
      {/*Modal */}
      {isModalOpen && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             w-[400px] h-[400px] bg-white rounded shadow">
        <div className="bg-blue-500 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Job Fair Registration</h2>
          <IoClose className="text-white text-lg cursor-pointer" onClick={onModalClose}/>
        </div>
      </div>}
    </div>
  )
}

export default App