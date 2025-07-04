'use client';

import { UpdateUserButton, DeleteUserButton } from '@/ui/users/buttons';
import { User } from '@/lib/definitions';

export default function UsersTable({ users, onUpdateUser, onDeleteUser }: 
  {
    users?: User[],
    onUpdateUser?: (userId: string) => void,
    onDeleteUser?: (userId: string) => void
  }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-100 p-2">
          <table className="min-w-full bg-white table-fixed">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b-4 border-gray-100 py-3 text-sm first-of-type:border-t-4 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-3">
                      <UpdateUserButton id={user.id!} onClick={onUpdateUser} />
                      <DeleteUserButton id={user.id!} onClick={onDeleteUser} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
