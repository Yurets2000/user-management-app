import { prisma } from '@/lib/prisma';
import { User } from '@/lib/definitions';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredUsersDB(query: string, currentPage: number): Promise<User[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { email: { contains: query } },
      ],
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
    orderBy: {
      created_at: 'desc',
    },
  });

  return users.map(user => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.created_at.toISOString().split('T')[0],
  }));
}

export async function fetchUsersPagesDB(query: string): Promise<number> {
  const totalUsers = await prisma.user.count({
    where: {
      OR: [
        { name: { contains: query } },
        { email: { contains: query } },
      ],
    },
  });

  return Math.ceil(totalUsers / ITEMS_PER_PAGE);
}

export async function updateUserDB(user: User): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(user.id!, 10) },
    data: {
      name: user.name,
      email: user.email,
      created_at: new Date(user.createdAt),
    },
  });

  return {
    id: updatedUser.id.toString(),
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.created_at.toISOString().split('T')[0],
  };
}

export async function createUserDB(user: User): Promise<User> {
  const newUser = await prisma.user.create({
    data: {
      id: user.id ? parseInt(user.id, 10) : undefined,
      name: user.name,
      email: user.email,
      created_at: new Date(user.createdAt),
    },
  });

  return {
    id: newUser.id.toString(),
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.created_at.toISOString().split('T')[0],
  };
}

export async function upsertUsersDB(users: User[]): Promise<User[]> {
  const upsertedUsers = await Promise.all(users.map(async (user) => {
    return prisma.user.upsert({
      where: { id: parseInt(user.id!, 10) },
      update: {
        name: user.name,
        email: user.email,
        created_at: new Date(user.createdAt),
      },
      create: {
        id: parseInt(user.id!, 10),
        name: user.name,
        email: user.email,
        created_at: new Date(user.createdAt),
      },
    });
  }));

  return upsertedUsers.map(user => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.created_at.toISOString().split('T')[0],
  }));
}

export async function deleteUserDB(id: string): Promise<void> {
  await prisma.user.delete({
    where: { id: parseInt(id, 10) },
  });
}

export async function deleteAllUsersDB(): Promise<void> {
  await prisma.user.deleteMany({});
}