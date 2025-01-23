'use client';

import { useEffect, useState } from 'react';
import { EnvelopesList } from '@/components/molecules/EnvelopesList/EnvelopesList';
import CardLoading from '@/components/shared/CardLoading';
import { APIEnvelopeDocumentItem, APIEnvelopeItem } from '@/services/apiTypes';
import { fetchDocuments, fetchEnvelopes } from '@/services/documentService';
import { DocumentCard } from '@/components/molecules/DocumentCard/DocumentCard';
import AskAI from '@/components/molecules/AskAI/AskAI';
import { getClientCookie } from '@/modules/utils/clientCookiesUtil';

interface EnvelopesProps {
  folderId: string;
}

export default function Envelopes({ folderId }: EnvelopesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [envelopes, setEnvelopes] = useState<APIEnvelopeItem[]>([]);
  const [documents, setDocuments] = useState<APIEnvelopeDocumentItem[]>([]);

  const [activeEnvelope, setActiveEnvelope] = useState<APIEnvelopeItem>();

  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<APIEnvelopeDocumentItem | undefined>();

  // Load envelopes
  useEffect(() => {
    const loadEnvelopes = async () => {
      setIsLoading(true);
      const envelopesData = await fetchEnvelopes(getClientCookie('dai_accountId'), folderId);
      setIsLoading(false);

      setEnvelopes(envelopesData.envelopes);
      setDocuments([]);
    };
    loadEnvelopes();
  }, [folderId]);

  // Load documents when active envelope changes
  useEffect(() => {
    const loadDocuments = async () => {
      if (activeEnvelope) {
        setIsLoading(true);
        const documentsData = await fetchDocuments(getClientCookie('dai_accountId'), activeEnvelope.envelopeId);
        setIsLoading(false);
        setDocuments(documentsData.envelopeDocuments);
      } else {
        setDocuments([]);
      }
    };
    loadDocuments();
  }, [activeEnvelope]);

  const handleDocumentView = (doc: APIEnvelopeDocumentItem) => {
    setSelectedDoc(doc);
    setIsConfigurationOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <CardLoading />}
      {!isLoading && (
        <>
          <EnvelopesList envelopes={envelopes} activeEnvelope={activeEnvelope} setActiveEnvelope={setActiveEnvelope} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc.documentId} doc={doc} onView={() => handleDocumentView(doc)} />
            ))}
          </div>

          <AskAI
            envelopeId={activeEnvelope?.envelopeId || ''}
            doc={selectedDoc}
            open={isConfigurationOpen}
            onOpenChange={(isOpen) => setIsConfigurationOpen(isOpen)}
          />
        </>
      )}
    </div>
  );
}
