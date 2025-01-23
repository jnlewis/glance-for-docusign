'use client';

import { Button } from '@/components/ui/button';
import { APIEnvelopeItem } from '@/services/apiTypes';
import { FolderOpen } from 'lucide-react';

interface EnvelopesListProps {
  envelopes: APIEnvelopeItem[];
  activeEnvelope: APIEnvelopeItem;
  setActiveEnvelope: (selected: APIEnvelopeItem) => void;
}

export function EnvelopesList({ envelopes, activeEnvelope, setActiveEnvelope }: EnvelopesListProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <div className="flex-grow flex flex-wrap gap-2">
        {envelopes && envelopes.length === 0 && <span className="text-muted">No envelopes found</span>}
        {envelopes &&
          envelopes.length > 0 &&
          envelopes.map((envelope) => (
            <Button
              key={envelope.envelopeId}
              variant={activeEnvelope?.envelopeId === envelope.envelopeId ? 'default' : 'outline'}
              onClick={() => setActiveEnvelope(envelope)}
            >
              <FolderOpen className="w-4 h-4" />
              <span className="ml-2">{envelope.emailSubject}</span>
            </Button>
          ))}
      </div>
    </div>
  );
}
