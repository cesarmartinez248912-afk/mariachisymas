import { isAdminAuthed } from '@/lib/auth';
import { AdminClient } from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return <AdminClient initialAuthed={await isAdminAuthed()} />;
}
