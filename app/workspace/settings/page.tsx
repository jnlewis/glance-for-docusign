import { AppBreadcrumb } from '@/components/molecules/AppBreadcrumb/AppBreadcrumb';
import PreviewUnavailable from '@/components/molecules/PreviewUnavailable/PreviewUnavailable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glance for Docusign',
  description: 'Generative AI Assistant for Docusign documents',
};

const breadcrumb = [{ label: 'Workspace', href: '/workspace/welcome' }, { label: 'Settings' }];

export default function Page() {
  return (
    <>
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <AppBreadcrumb items={breadcrumb} />

        <PreviewUnavailable />
      </div>
    </>
  );
}
