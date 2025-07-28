import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableRow from '../components/TableRow';
const Users = () => {
  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/job-seeker/list');
      if (response.status === 200) {
        setUsers(response.data?.data);
      }
    }
    catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers()
  })
  return (
    <div className='p-6'>
      <h2 className="text-center text-xl font-semibold my-8">Registered Users</h2>
      <Link to='/' className="text-blue-500 underline mb-4 block text-center">
        Back to Home
      </Link>
      <div className="overflow-x-auto  w-full flex flex-col items-center">
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
            {users.map((user) => (
              <TableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Users;
