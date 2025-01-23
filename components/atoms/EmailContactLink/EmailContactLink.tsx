'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';

export function EmailContactLink() {
  const user = 'jeffreylewis';
  const domain = 'comexiaslabs.com';
  return (
    <Link
      href="#"
      className="text-white hover:text-white"
      target="_blank"
      onClick={(e) => {
        e.preventDefault();
        alert(`Please drop your email to ${user} @ ${domain}`);
      }}
    >
      <Mail className="w-6 h-6" />
    </Link>
  );
}
