'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Folder, Navigation, Settings, Info } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { DocusignLogoutButton } from '@/components/atoms/DocusignLogoutButton/DocusignLogoutButton';
import { useEffect, useState } from 'react';
import { APIFolders } from '@/services/apiTypes';
import { fetchFolders } from '@/services/documentService';
import { getClientCookie } from '@/modules/utils/clientCookiesUtil';

export const getMenuByPath = (path: string) => {
  return MENU_ITEMS.find((x) => x.path === path);
};

export const getMenuByLabel = (menuLabel: string) => {
  return MENU_ITEMS.find((x) => x.label === menuLabel);
};

export const MENU_ITEMS: MenuItem[] = [
  { icon: <Home className="h-5 w-5" />, label: 'Welcome', path: '/workspace/welcome' },
  { icon: <Info className="h-5 w-5" />, label: 'User Guide', path: '/workspace/guide' },
  { icon: <Navigation className="h-5 w-5" />, label: 'Navigator', path: '/workspace/navigator' },
  { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/workspace/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  selectedMenuItem?: MenuItem;
  selectedFolderId?: string;
  toggleSidebar: () => void;
  onSelectMenu: (menu: MenuItem) => void;
  onSelectFolder: (folderId: string) => void;
}

export function Sidebar({
  isCollapsed,
  selectedMenuItem,
  selectedFolderId,
  toggleSidebar,
  onSelectMenu,
  onSelectFolder,
}: SidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userFolders, setUserFolders] = useState<APIFolders | undefined>();

  useEffect(() => {
    const loadUserFolders = async () => {
      setIsLoading(true);
      const folders = await fetchFolders(getClientCookie('dai_accountId'));
      setIsLoading(false);

      setUserFolders(folders);
    };
    loadUserFolders();
  }, []);

  return (
    <aside
      className={`bg-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <Image src="/assets/glance-logo-wide-light.svg" alt="Glance for Docusign" width={100} height={40} />
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-2">
          {MENU_ITEMS.map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} ${
                  selectedMenuItem?.label === item.label
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={() => onSelectMenu(item)}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>

        <ul className="space-y-2 p-4 border-t">
          {isLoading && <li>Loading...</li>}
          {!isLoading &&
            userFolders &&
            userFolders.folders.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} ${
                    selectedFolderId === item.folderId
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5 hover:text-primary'
                  }`}
                  onClick={() => onSelectFolder(item.folderId)}
                >
                  <Folder className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </li>
            ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <DocusignLogoutButton />
      </div>
    </aside>
  );
}
