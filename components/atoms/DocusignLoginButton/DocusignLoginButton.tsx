'use client';

import { Button } from '@/components/ui/button';

export function DocusignLoginButton() {
  const handleLogin = () => {
    console.log(`[DocusignLoginButton] handleLogin`);
    window.location.href = '/api/auth/login';
  };

  return <Button onClick={handleLogin}>Connect your Docusign</Button>;
}
