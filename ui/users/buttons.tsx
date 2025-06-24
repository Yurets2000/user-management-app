'use client';

import { PencilIcon, TrashIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { deleteUser, deleteAllUsers } from '@/lib/actions';
import { useUploadUsers } from '@/lib/hooks';
import React, { useRef } from 'react';

export function CreateUserButton({ onClick }:
  {
    onClick?: () => void
  }) {
  return (
    <button
      type="button"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={onClick}
    >
      <span>Create New</span>
    </button>
  );
}

export function UploadUsersButton({ onClick }:
  {
    onClick?: () => void
  }) {
      const fileInputRef = useRef<HTMLInputElement | null>(null);
      const { upload } = useUploadUsers();

      const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
          await upload(file);
        } catch (err) {
          console.error('Error uploading file:', err);
        } finally {
          e.target.value = '';
        }
      };

  return (
    <>
      <input
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        className="flex gap-2 rounded-md border p-2 hover:bg-gray-100"
        onClick={() => {
          onClick?.();
          fileInputRef.current?.click();
        }}
      >
        <ArrowUpTrayIcon className="w-5" />
        <span>Upload XLSX</span>
      </button>
    </>
  );
}

export function UpdateUserButton({ id, onClick }:
  {
    id: string,
    onClick?: (userId: string) => void
  }) {
  return (
    <button
      type="button"
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() => onClick?.(id)}
    >
      <PencilIcon className="w-5" />
    </button>
  );
}

export function DeleteUserButton({ id, onClick }:
  {
    id: string,
    onClick?: (userId: string) => void
  }) {
  const deleteUserWithId = deleteUser.bind(null, id);
  return (
    <form action={deleteUserWithId}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
        onClick={() => onClick?.(id)}
      >
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteAllUsersButton({ onClick }:
  {
    onClick?: () => void
  }) {
  return (
    <form action={deleteAllUsers}>
    <button
      type="submit"
      className="flex gap-2 rounded-md border p-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <TrashIcon className="w-5" />
      <span>Delete All</span>
    </button>
    </form>
  );
}