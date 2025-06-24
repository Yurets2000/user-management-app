'use client';

import { Suspense, useState, useRef } from 'react';
import Search from '@/ui/search';
import Pagination from '@/ui/pagination';
import UsersTable from '@/ui/users/table';
import { UsersTableSkeleton } from '@/ui/users/skeleton';
import { CreateUserButton, DeleteAllUsersButton, UploadUsersButton } from '@/ui/users/buttons';
import ModalPopup from '@/ui/modal-popup';
import { CreateUserForm, UpdateUserForm } from '@/ui/users/forms';
import { User } from '@/lib/definitions';

export default function UsersPageClientPart({ users, totalPages }: {
  users: User[],
  totalPages: number
}) {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const updateUserFormRef = useRef<HTMLFormElement | null>(null);
  const createUserFormRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      {isCreateUserModalOpen && (
        <ModalPopup
          title="Create User"
          description="Fill in the details to create a new item"
          onSave={() => {
            createUserFormRef?.current?.requestSubmit();
          }}
          onClose={() => setIsCreateUserModalOpen(false)}>
          <CreateUserForm formRef={createUserFormRef} onSubmitSuccess={
            () => {
              setIsCreateUserModalOpen(false);
            }} />
        </ModalPopup>
      )}
      {isUpdateUserModalOpen && selectedUserId && (
        <ModalPopup
          title="Update User"
          description="Update the item details"
          onSave={() => {
            updateUserFormRef?.current?.requestSubmit();
          }}
          onClose={() => {
            setIsUpdateUserModalOpen(false);
            setSelectedUserId(null);
          }}>
          <UpdateUserForm formRef={updateUserFormRef} 
          user={users.find(user => user.id === selectedUserId)!} 
          onSubmitSuccess={
            () => {
              setIsUpdateUserModalOpen(false);
              setSelectedUserId(null);
            }} />
        </ModalPopup>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between gap-2">
          <Search placeholder="Search users" />
          <CreateUserButton onClick={() => {
            setIsCreateUserModalOpen(true);
          }} />
          <UploadUsersButton />
          <DeleteAllUsersButton />
        </div>
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersTable users={users}
            onUpdateUser={(userId) => {
              setSelectedUserId(userId);
              setIsUpdateUserModalOpen(true);
            }}
          />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>);
}