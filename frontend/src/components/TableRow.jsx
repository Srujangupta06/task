function TableRow({ user }) {
    return (
        <tr key={user.id} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.full_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(user.created_at).toLocaleDateString()}</td>
        </tr>
    )
}
export default TableRow;