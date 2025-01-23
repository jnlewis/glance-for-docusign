/**
 * Get a cookie by name
 * @param name - The name of the cookie to retrieve
 * @returns The value of the cookie, or null if not found
 */
export function getClientCookie(name: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document?.cookie.split('; ');
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
}
