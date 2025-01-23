import { AppBreadcrumb } from '@/components/molecules/AppBreadcrumb/AppBreadcrumb';
import Envelopes from '@/components/organism/Envelopes/Envelopes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glance for Docusign',
  description: 'Generative AI Assistant for Docusign documents',
};

const breadcrumb = [{ label: 'Workspace', href: '/workspace/welcome' }, { label: 'Folder' }];

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Envelopes & Documents</h2>
        <AppBreadcrumb items={breadcrumb} />

        <Envelopes folderId={id} />
      </div>
    </>
  );
}
