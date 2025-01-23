'use client';

import { Loader2 } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="relative">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}
