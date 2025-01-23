import { AppBreadcrumb } from '@/components/molecules/AppBreadcrumb/AppBreadcrumb';
import Agreements from '@/components/organism/Agreements/Agreements';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glance for Docusign',
  description: 'Generative AI Assistant for Docusign documents',
};

const breadcrumb = [{ label: 'Workspace', href: '/workspace/welcome' }, { label: 'Navigator' }];

export default function Page() {
  return (
    <>
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Agreements</h2>
        <AppBreadcrumb items={breadcrumb} />

        <Agreements />
      </div>
    </>
  );
}
