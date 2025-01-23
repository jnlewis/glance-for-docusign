import { cookies } from 'next/headers';

/**
 * Get a cookie by name
 * @param name - The name of the cookie to retrieve
 * @returns The value of the cookie, or null if not found
 */
export function getCookie(name: string): string | null {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value || null;
}

/**
 * Set a cookie by name
 * @param name - The name of the cookie to set
 * @param value - The value of the cookie
 * @param options - Optional settings for the cookie
 */
export function setCookie(
  name: string,
  value: string,
  options?: Partial<{
    httpOnly: boolean;
    secure: boolean;
    path: string;
    maxAge: number; // in seconds
    expires: Date;
  }>,
): void {
  const cookieStore = cookies();

  cookieStore.set(name, value, {
    httpOnly: options?.httpOnly ?? false,
    secure: options?.secure ?? false,
    path: options?.path ?? '/',
    maxAge: options?.maxAge,
    expires: options?.expires,
  });
}
/**
 * Delete a cookie by name
 * @param name - The name of the cookie to delete
 * @param options - Optional settings for the deletion
 */
export function deleteCookie(
  name: string,
  options?: {
    path?: string;
  },
): void {
  const cookieStore = cookies();

  // Overwrite the cookie with an empty value and set maxAge to 0 to delete it
  cookieStore.set(name, '', {
    path: options?.path ?? '/', // Default path to '/'
    maxAge: 0, // Indicates immediate deletion
  });
}
