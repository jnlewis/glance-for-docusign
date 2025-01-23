'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, getMenuByPath } from '@/components/molecules/Sidebar/Sidebar';
import { MenuItem } from '@/types/menu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | undefined>();
  const [selectedFolderId, setSelectedFolderId] = useState<string>();

  const router = useRouter();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleMenuSelected = (menu: MenuItem) => {
    setSelectedMenuItem(menu);
    setSelectedFolderId(undefined);
    router.push(menu.path);
  };

  const handleFolderSelected = (folderId: string) => {
    setSelectedFolderId(folderId);
    setSelectedMenuItem(undefined);
    router.push(`/workspace/folder/${folderId}`);
  };

  useEffect(() => {
    const menu = getMenuByPath(location.pathname);
    setSelectedMenuItem(menu);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isCollapsed={isCollapsed}
        selectedMenuItem={selectedMenuItem}
        selectedFolderId={selectedFolderId}
        toggleSidebar={toggleSidebar}
        onSelectMenu={(menu) => handleMenuSelected(menu)}
        onSelectFolder={(folderId) => handleFolderSelected(folderId)}
      />

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
