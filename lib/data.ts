import { User } from "./definitions";

export const DATA: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2023-01-01'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: '2023-01-15'
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        createdAt: '2023-02-01'
    }
];

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate fetching users based on the query and pagination
    const filteredUsers = DATA.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    const paginatedUsers = filteredUsers.slice(offset, offset + ITEMS_PER_PAGE);
    return paginatedUsers.map(user => ({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    }));
}

export async function fetchUsersPages(
    query: string
) {
    // Simulate fetching total pages based on the query
    // In a real application, this would involve a database query
    const totalUsers = DATA.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    ).length;

    return Math.ceil(totalUsers / ITEMS_PER_PAGE);
}