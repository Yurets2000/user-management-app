'use client';

import { User } from '@/lib/definitions';
import { createUser, updateUser } from '@/lib/actions';
import { State } from '@/lib/definitions';
import { useActionState } from 'react';
import { toast } from 'sonner';

export function CreateUserForm({ formRef, onSubmitSuccess: onSubmitSuccess }:
    {
        formRef: React.RefObject<HTMLFormElement | null>,
        onSubmitSuccess?: () => void
    }
) {
    const initialState: State = { message: null, errors: {} };
    const action = async (prevState: State, formData: FormData) => {
        let result: State;
        try {
            result = await createUser(prevState, formData);
        } catch (error) {
            toast.error('Failed to create user.');
            return prevState;
        }
        if (result.errors && Object.keys(result.errors).length > 0) {
            toast.error('Failed to create user.');
            return result;
        }
        toast.success('User created successfully!');
        onSubmitSuccess?.();
        return result;
    };
    const [state, formAction] = useActionState(action, initialState);
    return (
        <form ref={formRef} action={formAction}>
            {/* Name */}
            <div className="flex gap-2 items-center">
                <label htmlFor="name" className="font-bold text-right mr-2 w-1/5">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-4/5 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Enter user name"
                    required
                />
            </div>
            <div className="my-2 flex gap-2 items-center">
                <div className="w-1/5"/>
                <div id="name-error" aria-live="polite" aria-atomic="true" className="w-4/5">
                    {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                        <p className="px-4 h-6 flex items-center text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            {/* Email */}
            <div className="flex gap-2 items-center">
                <label htmlFor="name" className="font-bold text-right mr-2 w-1/5">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-4/5 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Enter user email"
                    required
                />
            </div>
            <div className="my-2 flex gap-2 items-center">
                <div className="w-1/5"/>
                <div id="name-error" aria-live="polite" aria-atomic="true" className="w-4/5">
                    {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            {/* Created At */}
            <div className="flex gap-2 items-center">
                <label htmlFor="createdAt" className="font-bold text-right mr-2 w-1/5">
                    Created At
                </label>
                <input
                    id="createdAt"
                    name="createdAt"
                    type="date"
                    className="w-4/5 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    required
                />
            </div>
            <div className="my-2 flex gap-2 items-center">
                <div className="w-1/5"/>
                <div id="createdAt-error" aria-live="polite" aria-atomic="true" className="w-4/5">
                    {state.errors?.createdAt &&
                    state.errors.createdAt.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
        </form>
    );
}

export function UpdateUserForm({ user, formRef, onSubmitSuccess }:
    {
        user: User,
        formRef: React.RefObject<HTMLFormElement | null>,
        onSubmitSuccess?: () => void
    }
) {
    const updateUserWithId = updateUser.bind(null, user.id!);
    const initialState: State = { message: null, errors: {} };
    const action = async (prevState: State, formData: FormData) => {
        let result: State; 
        try {
            result = await updateUserWithId(prevState, formData);
        } catch (error) {
            toast.error('Failed to update user.');
            return prevState;
        }
        if (result.errors && Object.keys(result.errors).length > 0) {
            toast.error('Failed to update user.');
            return result;
        }
        toast.success('User updated successfully!');
        onSubmitSuccess?.();
        return result;
    };
    const [state, formAction] = useActionState(action, initialState);
    return (
        <form ref={formRef} action={formAction}>
            {/* Name */}
            <div className="flex gap-2 items-center">
                <label htmlFor="name" className="font-bold text-right mr-2 w-1/5">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user.name}
                    className="w-4/5 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Enter user name"
                    required
                />
            </div>
            <div className="my-2 flex gap-2 items-center">
                <div className="w-1/5"/>
                <div id="name-error" aria-live="polite" aria-atomic="true" className="w-4/5">
                    {state.errors?.name &&
                    state.errors.name.map((error: string) => (
                        <p className="px-4 h-6 flex items-center text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            {/* Email */}
            <div className="flex gap-2 items-center">
                <label htmlFor="email" className="font-bold text-right mr-2 w-1/5">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    className="w-4/5 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Enter user email"
                    required
                />
            </div>
            <div className="my-2 flex gap-2 items-center">
                <div className="w-1/5"/>
                <div id="email-error" aria-live="polite" aria-atomic="true" className="w-4/5">
                    {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            {/* Created At */}
            <div className="flex gap-2 items-center">
                <label htmlFor="createdAt" className="font-bold text-right mr-2 w-1/5">
                    Created At
                </label>
                <input
                    id="createdAt"
                    name="createdAt"
                    type="date"
                    defaultValue={user.createdAt}
                    className="w-4/5 rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    required
                />
            </div>
            <div className="my-2 flex gap-2 items-center">
                <div className="w-1/5"/>
                <div id="createdAt-error" aria-live="polite" aria-atomic="true" className="w-4/5">
                    {state.errors?.createdAt &&
                    state.errors.createdAt.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
        </form>
    );
}