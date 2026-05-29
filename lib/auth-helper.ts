import { cookies } from 'next/headers';

export async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('kps_admin_session')?.value;
    return session === 'true';
  } catch (error) {
    console.error('Error checking auth cookie:', error);
    return false;
  }
}
