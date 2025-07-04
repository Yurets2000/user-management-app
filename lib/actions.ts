'use server';

import { z } from 'zod';
import { State, User } from '@/lib/definitions'
import { revalidatePath } from 'next/cache';
import { createUserDB, updateUserDB, deleteUserDB, deleteAllUsersDB, upsertUsersDB } from './data';

const FormSchema = z.object({
    id: z.string(),
    name: z.string()
    .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name must contain only letters and spaces.',
    })
    .min(2, {
        message: 'Name must be at least 2 characters long.',
    })
    .max(50, {
        message: 'Name must not exceed 50 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    createdAt: z.coerce.date({
        invalid_type_error: 'Please enter a valid date.',
    }),
});

const CreateUser = FormSchema.omit({ id: true });

export async function createUser(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        createdAt: formData.get('createdAt'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to create User.',
        };
    }

    const { name, email, createdAt } = validatedFields.data;

    await createUserDB({
        name,
        email,
        createdAt: createdAt.toISOString().split('T')[0],
    });

    revalidatePath('/users');
    return {
        message: 'User created successfully.',
        errors: {},
    };
}

const UpdateUser = FormSchema.omit({ id: true });

export async function updateUser(id: string, prevState: State, formData: FormData): Promise<State> {
    const validatedFields = UpdateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        createdAt: formData.get('createdAt'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to update User.',
        };
    }

    const { name, email, createdAt } = validatedFields.data;

    await updateUserDB({
        id,
        name,
        email,
        createdAt: createdAt.toISOString().split('T')[0],
    });

    revalidatePath('/users');
    return {
        message: 'User updated successfully.',
        errors: {},
    };
}

export async function deleteUser(id: string): Promise<void> {
    await deleteUserDB(id);
    revalidatePath('/users');
}

export async function uploadUsers(users: User[]): Promise<void> {
    await upsertUsersDB(users);
    revalidatePath('/users');
}

export async function deleteAllUsers(): Promise<void> {
    await deleteAllUsersDB();
    revalidatePath('/users');
}