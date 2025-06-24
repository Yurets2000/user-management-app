'use server';

import { z } from 'zod';
import { State, User } from '@/lib/definitions'
import { revalidatePath } from 'next/cache';
import { DATA } from './data';

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

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    createdAt: formData.get('createdAt'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to Create User.',
    };
  }
 
  const { name, email, createdAt } = validatedFields.data;

  DATA.push({
        id: (DATA.length + 1).toString(),
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

export async function updateUser(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        createdAt: formData.get('createdAt'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to Update User.',
        };
    }

    const { name, email, createdAt } = validatedFields.data;

    const userIndex = DATA.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return {
            message: 'User not found.',
            errors: { id: ['User with this ID does not exist.'] },
        };
    }

    DATA[userIndex] = {
        ...DATA[userIndex],
        name,
        email,
        createdAt: createdAt.toISOString().split('T')[0],
    };

    revalidatePath('/users');
    return {
        message: 'User updated successfully.',
        errors: {},
    };
}

export async function deleteUser(id: string) {
    const userIndex = DATA.findIndex(user => user.id === id);
    if (userIndex === -1) {
        throw new Error('User not found.');
    }
    DATA.splice(userIndex, 1);
    revalidatePath('/users');
}

export async function uploadUsers(users: User[]) {
    users.forEach(user => {
        const existingUserIndex = DATA.findIndex(u => u.id === user.id);
        if (existingUserIndex !== -1) {
            DATA[existingUserIndex] = user; // Update existing user
        } else {
            DATA.push(user); // Add new user
        }
    });
    revalidatePath('/users');
}

export async function deleteAllUsers() {
    DATA.length = 0; // Clear the user data array
    revalidatePath('/users');
}