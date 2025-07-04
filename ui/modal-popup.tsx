'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalPopup({ onSave, onClose, title, description, children }: {
  onSave: () => void,
  onClose: () => void,
  title: string,
  description?: string,
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-1/3 bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
          <div className="flex items-start">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
              <XMarkIcon className="w-6 h-6 hover:cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="my-6">
          {children}
        </div>
        <div className="flex justify-end gap-2">
            <button type="button" onClick={onSave} className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium border border-black hover:bg-gray-800 hover:cursor-pointer">Save</button>
            <button type="button" onClick={onClose} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium border hover:bg-gray-100 hover:cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );
}