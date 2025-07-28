import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableRow from '../components/TableRow';
import { GrFormPrevious } from "react-icons/gr";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Number of Records To Show
  const NUMBER_OF_RECORDS = 2;
  const totalPages = Math.ceil(totalUsers / NUMBER_OF_RECORDS);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/job-seeker/list?page=${currentPage}&limit=${NUMBER_OF_RECORDS}`
      );
      if (response.status === 200) {
        setUsers(response.data?.data || []);
        setTotalUsers(response.data?.totalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const onHandlePreviousBtn = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const onHandleNextBtn = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className='p-6'>
      <h2 className="text-center text-xl font-semibold my-8">Registered Users</h2>
      <Link to='/' className="text-blue-500 underline mb-4 block text-center">
        Back to Home
      </Link>
      <div className="overflow-x-auto w-full flex flex-col items-center">
        <table className="min-w-[70%] bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Registration Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} user={user} />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col items-end mr-[200px] my-12'>
        <div className='flex items-center gap-x-3'>
          <button
            className={`flex items-center gap-x-0.5 px-3 py-1.5 rounded  disabled:text-gray-300 disabled:cursor-not-allowed`}
            onClick={onHandlePreviousBtn}
            disabled={currentPage <= 1}
          >
            <GrFormPrevious />
            <p>Previous</p>
          </button>
          <div className='w-8 h-8 border-[2px] rounded-sm border-blue-500 flex items-center justify-center'>
            {currentPage}
          </div>
          <button
            className={`flex items-center gap-x-0.5 px-3 py-1.5 rounded  disabled:text-gray-300 disabled:cursor-not-allowed`}
            onClick={onHandleNextBtn}
            disabled={currentPage >= totalPages}
          >
            <p>Next</p>
            <GrFormPrevious className='rotate-180' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
