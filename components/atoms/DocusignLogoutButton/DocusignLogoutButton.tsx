'use client';

import { Button } from '@/components/ui/button';

export function DocusignLogoutButton() {
  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  );
}
