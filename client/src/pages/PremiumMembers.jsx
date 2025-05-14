import { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const PremiumMembers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Axios(SummaryApi.premiumUsers)
        setUsers(res.data.data || [])
      } catch (err) {
        console.error("Failed to fetch premium users", err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Premium Members</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-green-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Requested Media</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                {new Date(user.premiumSince || user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PremiumMembers
