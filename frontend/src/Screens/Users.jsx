import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableRow from '../components/TableRow';
import Pagination from '../components/Pagination';
import { fetchUsers } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRegisteredJobSeekers = async () => {
    const [usersData, totalUsers] = await fetchUsers(currentPage);
    setUsers(usersData)
    setTotalUsers(totalUsers)
  };

  useEffect(() => {
    fetchRegisteredJobSeekers()
  }, [currentPage]);


  return (
    <div className='p-6'>
      <h2 className="text-center text-xl font-semibold my-8">Registered Users</h2>
      <Link to='/' className="text-blue-500 underline mb-4 block text-center">
        Back to Home
      </Link>
      <div className="overflow-x-auto w-full flex flex-col md:items-center">
        <table className="min-w-[95%] lg:min-w-[70%] bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
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
      {/*PAGINATION */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalUsers={totalUsers}/>
    </div>
  );
};

export default Users;
