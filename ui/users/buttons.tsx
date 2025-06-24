'use client';

import { PencilIcon, TrashIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { deleteUser, deleteAllUsers } from '@/lib/actions';
import { useUploadUsers } from '@/lib/hooks';
import React, { useRef } from 'react';
import { toast } from 'sonner';

export function CreateUserButton({ onClick }:
  {
    onClick?: () => void
  }) {
  return (
    <button
      type="button"
      className="flex border items-center rounded-lg bg-black py-3 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 hover:cursor-pointer"
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
          toast.success('Users uploaded successfully!');
        } catch (err) {
          toast.error('Failed to upload users.');
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
        className="flex items-center gap-2 rounded-lg border py-3 px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:cursor-pointer"
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
      className="rounded-md border p-2 hover:bg-gray-100 hover:cursor-pointer"
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
  const action = async (formData: FormData) => {
    try {
      await deleteUserWithId();
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete user.');
    }
  }
  return (
    <form action={action}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100 hover:cursor-pointer"
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
  const action = async (formData: FormData) => {
    try {
      await deleteAllUsers();
      toast.success('All users deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete all users.');
    }
  }
  return (
    <form action={action}>
    <button
      type="submit"
      className="flex items-center gap-2 rounded-lg border py-3 px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:cursor-pointer"
      onClick={onClick}
    >
      <TrashIcon className="w-5" />
      <span>Delete All</span>
    </button>
    </form>
  );
}