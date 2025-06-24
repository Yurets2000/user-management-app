import { fetchFilteredUsersDB, fetchUsersPagesDB } from '@/lib/data';
import UsersPageClient from '@/app/users/page-client-part';

export default async function UsersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const filteredUsers = await fetchFilteredUsersDB(query, currentPage);
  const totalPages = await fetchUsersPagesDB(query);

  return <UsersPageClient
    users={filteredUsers}
    totalPages={totalPages}
  />;
}