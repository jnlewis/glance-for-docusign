'use client';

import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';

export function ContentHeader() {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
