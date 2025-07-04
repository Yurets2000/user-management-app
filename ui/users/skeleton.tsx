function UsersTableRowSkeleton() {
  return (
    <tr className="border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Name */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 rounded bg-gray-100"></div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 rounded bg-gray-100"></div>
      </td>
      {/* Created At */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 flex gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 pt-0">
          <table className="table-fixed min-w-full text-gray-900">
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
            <tbody className="bg-white">
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
              <UsersTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
