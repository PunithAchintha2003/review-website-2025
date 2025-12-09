import { useEffect, useState, useMemo } from 'react';
import SummaryApi from '../common/SummaryApi';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../component/ChangeUserRole';

const columnHelper = createColumnHelper();

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: ''
  });

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(SummaryApi.all_users.url, {
        method: SummaryApi.all_users.method,
        credentials: 'include'
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row, i) => i + 1, {
        id: 'sr',
        header: 'Sr.',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
      }),
      columnHelper.accessor('role', {
        header: 'Role',
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <button
            className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
            onClick={() => {
              setUpdateUserDetails(row.original);
              setOpenUpdateRole(true);
            }}
          >
            <MdModeEdit />
          </button>
        )
      })
    ],
    []
  );

  const table = useReactTable({
    data: allUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
